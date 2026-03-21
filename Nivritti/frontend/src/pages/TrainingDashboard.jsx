import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../config/axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCode, FaBook, FaChartLine, FaUsers, FaVideo, FaQuestionCircle, FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const TrainingDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [technicalCourses, setTechnicalCourses] = useState([]);
  const [nonTechnicalCourses, setNonTechnicalCourses] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  const technicalSkills = [
    { id: 'programming', name: 'Programming & Development', icon: <FaCode /> },
    { id: 'data-science', name: 'Data Science & Analytics', icon: <FaCode /> },
    { id: 'web-development', name: 'Web Development', icon: <FaCode /> },
    { id: 'mobile-development', name: 'Mobile App Development', icon: <FaCode /> },
    { id: 'cloud-computing', name: 'Cloud Computing', icon: <FaCode /> },
    { id: 'cybersecurity', name: 'Cybersecurity', icon: <FaCode /> }
  ];

  const nonTechnicalSkills = [
    { 
      id: 'digital-marketing', 
      name: 'Digital Marketing', 
      icon: <FaBook />,
      description: 'Learn social media marketing, SEO, content marketing, and email marketing strategies'
    },
    { 
      id: 'content-creation', 
      name: 'Content Creation', 
      icon: <FaBook />,
      description: 'Master video editing, graphic design, and content writing for various platforms'
    },
    { 
      id: 'business-skills', 
      name: 'Business Skills', 
      icon: <FaBook />,
      description: 'Develop leadership, project management, and business communication skills'
    },
    { 
      id: 'soft-skills', 
      name: 'Soft Skills', 
      icon: <FaBook />,
      description: 'Enhance communication, teamwork, problem-solving, and emotional intelligence'
    },
    { 
      id: 'financial-literacy', 
      name: 'Financial Literacy', 
      icon: <FaBook />,
      description: 'Learn budgeting, saving, investing, and personal finance management'
    },
    { 
      id: 'entrepreneurship', 
      name: 'Entrepreneurship', 
      icon: <FaBook />,
      description: 'Understand business planning, market research, and startup fundamentals'
    },
    { 
      id: 'public-speaking', 
      name: 'Public Speaking', 
      icon: <FaBook />,
      description: 'Master presentation skills, speech delivery, and audience engagement'
    },
    { 
      id: 'time-management', 
      name: 'Time Management', 
      icon: <FaBook />,
      description: 'Learn productivity techniques, goal setting, and work-life balance'
    },
    { 
      id: 'customer-service', 
      name: 'Customer Service', 
      icon: <FaBook />,
      description: 'Develop customer relationship management and service excellence skills'
    }
  ];

  useEffect(() => {
    fetchCourses();
    fetchRecentActivities();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/training/courses');
      if (response.data.success) {
        const courses = response.data.data;
        // Split courses into technical and non-technical
        setTechnicalCourses(courses.filter(course => course.category === 'technical'));
        setNonTechnicalCourses(courses.filter(course => course.category === 'non-technical'));
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentActivities = async () => {
    try {
      const response = await axios.get('/api/training/activities');
      if (response.data.success) {
        setRecentActivities(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching recent activities:', error);
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
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Training Programs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your learning path and develop new skills to advance your career
          </p>
        </motion.div>

        {/* Technical Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-2 mb-6">
            <FaCode className="text-indigo-600 text-2xl" />
            <h2 className="text-2xl font-semibold">Technical Skills</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
              >
                <Link to={`/training/technical/${skill.id}`} className="block">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        {skill.icon}
                      </div>
                      <FaArrowRight className="text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{skill.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {skill.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Non-Technical Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-2 mb-6">
            <FaBook className="text-indigo-600 text-2xl" />
            <h2 className="text-2xl font-semibold">Non-Technical Skills</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nonTechnicalSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
              >
                <Link to={`/training/non-technical/${skill.id}`} className="block">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        {skill.icon}
                      </div>
                      <FaArrowRight className="text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{skill.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {skill.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Courses Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <FaCode className="text-indigo-600 text-2xl" />
            <h2 className="text-2xl font-semibold">Technical Courses</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalCourses.map((course) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gray-200">
                  {course.thumbnail && (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{course.duration} min</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{course.level}</span>
                    </div>
                    <Link
                      to={`/training/courses/${course._id}`}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      View Course
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Non-Technical Courses Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <FaBook className="text-indigo-600 text-2xl" />
            <h2 className="text-2xl font-semibold">Non-Technical Courses</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nonTechnicalCourses.map((course) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gray-200">
                  {course.thumbnail && (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{course.duration} min</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{course.level}</span>
                    </div>
                    <Link
                      to={`/training/courses/${course._id}`}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      View Course
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <li key={activity._id} className="p-4">
                  <div className="flex items-center space-x-3">
                    {activity.type === 'course_completed' && (
                      <FaBook className="text-green-500" />
                    )}
                    {activity.type === 'quiz_completed' && (
                      <FaQuestionCircle className="text-blue-500" />
                    )}
                    {activity.type === 'video_watched' && (
                      <FaVideo className="text-purple-500" />
                    )}
                    <div>
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingDashboard; 