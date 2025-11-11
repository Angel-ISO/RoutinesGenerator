import axios from 'axios';
import Exercise from '../../infrastructure/models/Exercise.js';


class ExerciseService {
  
  static async importExercises(limit = 100) {
    try {
      const url = `${process.env.EXERCISEDB_URL}/exercises`;
      const response = await axios.get(url);
      const exercises = response.data.slice(0, limit);

      let imported = 0;
      for (const ex of exercises) {
        const existing = await Exercise.findOne({ name: ex.name });
        if (!existing) {
          await Exercise.create({
            name: ex.name,
            target: ex.target,
            equipment: ex.equipment,
            gifUrl: ex.gifUrl,
            instructions: ex.instructions,
            sourceEndpoint: `${process.env.EXERCISEDB_URL}/exercises/name/${encodeURIComponent(ex.name)}`,
            tags: ex.secondaryMuscles || [],
          });
          imported++;
        }
      }
      return { imported, total: exercises.length };
    } catch (error) {
      throw new Error(`Failed to import exercises: ${error.message}`);
    }
  }

  
  static async getExercises(page = 1, limit = 10, filter = {}) {
    const query = {};
    if (filter.target) query.target = filter.target;
    if (filter.equipment) query.equipment = filter.equipment;

    const exercises = await Exercise.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Exercise.countDocuments(query);

    return { exercises, total, page, limit };
  }
}

export default ExerciseService;