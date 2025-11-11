import mongoose from 'mongoose';

const routineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  goal: String,
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  days: [{
    day: String,
    exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
    notes: String,
  }],
  meta: {
    createdBy: String,
    durationWeeks: Number,
  },
}, { timestamps: true });

export default mongoose.model('Routine', routineSchema);