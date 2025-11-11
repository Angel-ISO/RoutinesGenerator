import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import ExerciseService from '../core/services/ExerciseService.js';

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const limit = parseInt(process.env.EXERCISEDB_LIMIT) || 100;

    console.log(`Importing up to ${limit} exercises from ExerciseDB...`);

    const result = await ExerciseService.importExercises(limit);

    console.log(`Imported ${result.imported} exercises out of ${result.total} fetched.`);

  } catch (error) {
    console.error('Error importing exercises:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

main();