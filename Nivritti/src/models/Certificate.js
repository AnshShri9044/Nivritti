const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
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
  certificateNumber: {
    type: String,
    required: true,
    unique: true
  },
  issueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'revoked'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Create compound index for efficient queries
certificateSchema.index({ user: 1, category: 1, skillId: 1 }, { unique: true });

module.exports = mongoose.model('Certificate', certificateSchema); 