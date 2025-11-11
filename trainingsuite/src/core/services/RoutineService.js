import Routine from '../../infrastructure/models/Routine.js';
import Exercise from '../../infrastructure/models/Exercise.js';
import generateRoutinePdf from '../../utils/pdfGenerator.js';

/**
 * Service for handling routine-related operations.
 */
class RoutineService {
  /**
   * Create a new routine.
   * @param {Object} data - Routine data.
   * @returns {Promise<Object>} Created routine.
   */
  static async createRoutine(data) {
    // Validate that all referenced exercises exist
    for (const day of data.days) {
      for (const exId of day.exercises) {
        const exercise = await Exercise.findById(exId);
        if (!exercise) {
          throw new Error(`Exercise with ID ${exId} not found`);
        }
      }
    }

    const routine = await Routine.create(data);
    return routine;
  }

  /**
   * Get routine by ID with populated exercises.
   * @param {string} id - Routine ID.
   * @returns {Promise<Object>} Routine object.
   */
  static async getRoutineById(id) {
    const routine = await Routine.findById(id).populate('days.exercises');
    if (!routine) {
      throw new Error('Routine not found');
    }
    return routine;
  }

  /**
   * Generate PDF for a routine.
   * @param {string} id - Routine ID.
   * @returns {Promise<Buffer>} PDF buffer.
   */
  static async generateRoutinePdf(id) {
    const routine = await this.getRoutineById(id);
    const pdfBuffer = await generateRoutinePdf(routine);
    return pdfBuffer;
  }
}

export default RoutineService;