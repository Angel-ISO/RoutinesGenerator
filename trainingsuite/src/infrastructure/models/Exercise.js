import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  target: String,
  equipment: String,
  gifUrl: String,
  instructions: [String],
  sourceEndpoint: String,
  tags: [String],
});

export default mongoose.model('Exercise', exerciseSchema);