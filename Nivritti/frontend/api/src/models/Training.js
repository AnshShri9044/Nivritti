import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: String,
  url: String,
  duration: String
});

const trainingSchema = new mongoose.Schema({
  category: { type: String, required: true },
  skillId: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  videos: [videoSchema]
}, { timestamps: true });

export default mongoose.model('Training', trainingSchema);
