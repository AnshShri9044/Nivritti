const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Training = require('../models/Training');
const UserProgress = require('../models/UserProgress');
const Certificate = require('../models/Certificate');

// Get user progress for a specific category and skill
router.get('/progress/:category/:skillId', auth, async (req, res) => {
  try {
    const { category, skillId } = req.params;
    const userId = req.user.id;

    const progress = await UserProgress.findOne({
      user: userId,
      category,
      skillId
    });

    if (!progress) {
      return res.json({
        success: true,
        data: {
          videoProgress: {},
          completedVideos: []
        }
      });
    }

    res.json({
      success: true,
      data: {
        videoProgress: progress.videoProgress,
        completedVideos: progress.completedVideos
      }
    });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Update video progress
router.post('/progress/:category/:skillId', auth, async (req, res) => {
  try {
    const { category, skillId } = req.params;
    const { videoId, progress } = req.body;
    const userId = req.user.id;

    let userProgress = await UserProgress.findOne({
      user: userId,
      category,
      skillId
    });

    if (!userProgress) {
      userProgress = new UserProgress({
        user: userId,
        category,
        skillId,
        videoProgress: {},
        completedVideos: []
      });
    }

    userProgress.videoProgress[videoId] = progress;
    await userProgress.save();

    res.json({
      success: true,
      data: userProgress
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Mark video as complete
router.post('/complete/:category/:skillId', auth, async (req, res) => {
  try {
    const { category, skillId } = req.params;
    const { videoId } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!videoId) {
      return res.status(400).json({
        success: false,
        message: 'Video ID is required'
      });
    }

    // Check if training exists
    const training = await Training.findOne({ category, skillId });
    if (!training) {
      return res.status(404).json({
        success: false,
        message: 'Training not found'
      });
    }

    // Check if video exists in training
    const videoExists = training.videos.some(video => video._id.toString() === videoId);
    if (!videoExists) {
      return res.status(404).json({
        success: false,
        message: 'Video not found in this training'
      });
    }

    let userProgress = await UserProgress.findOne({
      user: userId,
      category,
      skillId
    });

    if (!userProgress) {
      userProgress = new UserProgress({
        user: userId,
        category,
        skillId,
        videoProgress: {},
        completedVideos: []
      });
    }

    if (!userProgress.completedVideos.includes(videoId)) {
      userProgress.completedVideos.push(videoId);
      await userProgress.save();
    }

    res.json({
      success: true,
      data: userProgress
    });
  } catch (error) {
    console.error('Error marking video as complete:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Generate certificate
router.post('/certificate/:category/:skillId', auth, async (req, res) => {
  try {
    const { category, skillId } = req.params;
    const userId = req.user.id;

    // Check if user has completed all videos
    const userProgress = await UserProgress.findOne({
      user: userId,
      category,
      skillId
    });

    if (!userProgress) {
      return res.status(400).json({
        success: false,
        message: 'No progress found for this course'
      });
    }

    const training = await Training.findOne({ category, skillId });
    if (!training) {
      return res.status(404).json({
        success: false,
        message: 'Training not found'
      });
    }

    // Check if all videos are completed
    const allVideosCompleted = training.videos.every(video =>
      userProgress.completedVideos.includes(video._id)
    );

    if (!allVideosCompleted) {
      return res.status(400).json({
        success: false,
        message: 'Complete all videos to generate certificate'
      });
    }

    // Check if certificate already exists
    let certificate = await Certificate.findOne({
      user: userId,
      category,
      skillId
    });

    if (!certificate) {
      // Generate certificate
      certificate = new Certificate({
        user: userId,
        category,
        skillId,
        issueDate: new Date(),
        certificateNumber: `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      });
      await certificate.save();
    }

    res.json({
      success: true,
      data: certificate
    });
  } catch (error) {
    console.error('Error generating certificate:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router; 