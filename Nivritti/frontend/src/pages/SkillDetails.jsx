import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay, FaClock, FaLevelUpAlt, FaCheck, FaCertificate } from 'react-icons/fa';
import axios from '../config/axios';
import { toast } from 'react-hot-toast';

const SkillDetails = () => {
  const { category, skillId } = useParams();
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [videoProgress, setVideoProgress] = useState({});
  const [completedVideos, setCompletedVideos] = useState([]);
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    fetchSkills();
    fetchUserProgress();
  }, [category, skillId]);

  const fetchUserProgress = async () => {
    try {
      const response = await axios.get(`/api/training/progress/${category}/${skillId}`);
      if (response.data.success) {
        setVideoProgress(response.data.data.videoProgress || {});
        setCompletedVideos(response.data.data.completedVideos || []);
      }
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  };

  const handleVideoProgress = async (videoId, progress) => {
    try {
      await axios.post(`/api/training/progress/${category}/${skillId}`, {
        videoId,
        progress
      });
      setVideoProgress(prev => ({
        ...prev,
        [videoId]: progress
      }));
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const handleMarkComplete = async (videoId) => {
    try {
      const response = await axios.post(`/api/training/complete/${category}/${skillId}`, {
        videoId: videoId
      });
      
      if (response.data.success) {
        setCompletedVideos(prev => [...prev, videoId]);
        toast.success('Video marked as complete!');
      } else {
        toast.error(response.data.message || 'Failed to mark video as complete');
      }
    } catch (error) {
      console.error('Error marking video as complete:', error);
      toast.error(error.response?.data?.message || 'Failed to mark video as complete');
    }
  };

  const handleGenerateCertificate = async () => {
    try {
      const response = await axios.post(`/api/training/certificate/${category}/${skillId}`);
      if (response.data.success) {
        setShowCertificate(true);
        toast.success('Certificate generated successfully!');
      }
    } catch (error) {
      console.error('Error generating certificate:', error);
      toast.error('Failed to generate certificate');
    }
  };

  const fetchSkills = async () => {
    try {
      // For now, we'll use hardcoded data for programming skills
      if (category === 'technical' && skillId === 'programming') {
        const programmingSkills = [
          {
            _id: 'intro-programming',
            name: 'Introduction to Programming and Computer Science',
            description: 'A comprehensive introduction to programming concepts and computer science fundamentals. Learn about algorithms, data structures, and problem-solving techniques.',
            videoUrl: 'https://www.youtube.com/embed/zOjov-2OZ0E',
            duration: 120,
            level: 'Beginner'
          },
          {
            _id: 'android-development',
            name: 'What is Android & How it Work? | How to Become an Android Developer!',
            description: 'Learn about Android development, its architecture, and how to become an Android developer. This tutorial covers the basics of Android development and career path.',
            videoUrl: 'https://www.youtube.com/embed/HyU4vkZ2NB8',
            duration: 45,
            level: 'Beginner'
          }
        ];
        setSkills(programmingSkills);
        setSelectedSkill(programmingSkills[0]);
      } else if (category === 'technical' && skillId === 'cloud-computing') {
        const cloudComputingSkills = [
          {
            _id: 'intro-cloud-computing',
            name: 'What is Cloud Computing?',
            description: 'Learn about cloud computing concepts, its benefits, and how it works. This tutorial covers the fundamentals of cloud computing and its applications.',
            videoUrl: 'https://www.youtube.com/embed/8C_kHJ5YEiA',
            duration: 30,
            level: 'Beginner'
          }
        ];
        setSkills(cloudComputingSkills);
        setSelectedSkill(cloudComputingSkills[0]);
      } else if (category === 'non-technical' && skillId === 'public-speaking') {
        const publicSpeakingSkills = [
          {
            _id: 'overcome-speaking-fear',
            name: 'If public speaking TERRIFIES you... then watch this video',
            description: 'Learn how to overcome the fear of public speaking and become a confident speaker. This video provides practical tips and techniques for effective public speaking.',
            videoUrl: 'https://www.youtube.com/embed/ZlGIvVQkbgQ',
            duration: 15,
            level: 'Beginner'
          }
        ];
        setSkills(publicSpeakingSkills);
        setSelectedSkill(publicSpeakingSkills[0]);
      } else {
        const response = await axios.get(`/api/training/${category}/${skillId}/skills`);
        if (response.data.success) {
          setSkills(response.data.data);
          if (response.data.data.length > 0) {
            setSelectedSkill(response.data.data[0]);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {category === 'technical' ? 'Technical Skills' : 'Non-Technical Skills'}
          </h1>
          <p className="text-xl text-gray-600">
            Master essential skills through our comprehensive video tutorials
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skills List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Available Skills</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {skills.map((skill) => (
                  <motion.button
                    key={skill._id}
                    onClick={() => setSelectedSkill(skill)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                      selectedSkill?._id === skill._id ? 'bg-indigo-50' : ''
                    }`}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{skill.name}</h3>
                      {completedVideos.includes(skill._id) && (
                        <FaCheck className="text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{skill.description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${videoProgress[skill._id] || 0}%` }}
                      ></div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Video Content */}
          <div className="lg:col-span-2">
            {selectedSkill ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={selectedSkill.videoUrl}
                    title={selectedSkill.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    onTimeUpdate={(e) => {
                      const progress = (e.target.currentTime / e.target.duration) * 100;
                      handleVideoProgress(selectedSkill._id, progress);
                    }}
                  ></iframe>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      {selectedSkill.name}
                    </h2>
                    {!completedVideos.includes(selectedSkill._id) && (
                      <button
                        onClick={() => handleMarkComplete(selectedSkill._id)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                      >
                        Mark as Complete
                      </button>
                    )}
                  </div>
                  <p className="text-gray-600 mb-6">{selectedSkill.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <FaClock className="mr-2" />
                      <span>{selectedSkill.duration} minutes</span>
                    </div>
                    <div className="flex items-center">
                      <FaLevelUpAlt className="mr-2" />
                      <span>{selectedSkill.level}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <p className="text-gray-600">Select a skill to start learning</p>
              </div>
            )}

            {/* Certificate Section */}
            {completedVideos.length > 0 && (
              <div className="mt-8 bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FaCertificate className="text-indigo-600 text-2xl" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Course Completion</h3>
                      <p className="text-sm text-gray-600">
                        {completedVideos.length} of {skills.length} videos completed
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleGenerateCertificate}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Generate Certificate
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDetails; 