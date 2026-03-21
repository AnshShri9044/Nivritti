import mongoose from 'mongoose';

const userProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true
  },
  skillId: {
    type: String,
    required: true
  },
  videoProgress: {
    type: Map,
    of: Number,
    default: {}
  },
  completedVideos: [{
    type: String
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create compound index for efficient queries
userProgressSchema.index({ user: 1, category: 1, skillId: 1 }, { unique: true });

export default mongoose.model('UserProgress', userProgressSchema); 