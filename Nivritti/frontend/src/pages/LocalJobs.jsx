import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../config/axios';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LocalJobs = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('browse');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    type: 'full-time',
    description: '',
    requirements: '',
    skills: '',
    expiresAt: ''
  });

  useEffect(() => {
    // Set initial tab based on URL query parameter
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab === 'post' && user?.role === 'business') {
      setActiveTab('post');
    }
    fetchJobs();
    gsap.from('.job-card', {
      scrollTrigger: {
        trigger: '.job-card',
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
    });
  }, [user]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      let response;
      if (user?.role === 'business') {
        console.log('Fetching business jobs...');
        response = await axios.get('/api/jobs/my-jobs');
        console.log('Business jobs response:', response.data);
      } else {
        response = await axios.get('/api/jobs', {
          params: { status: 'active' }
        });
      }
      if (response.data.success) {
        setJobs(response.data.data);
      } else {
        console.error('API response indicates failure:', response.data);
        toast.error('Failed to fetch jobs');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      toast.error(error.response?.data?.message || 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Set expiration date to 30 days from now if not provided
      if (!formData.expiresAt) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);
        formData.expiresAt = expiresAt.toISOString().split('T')[0];
      }

      const response = await axios.post('/api/jobs', formData);
      
      if (response.data.success) {
        toast.success('Job posted successfully!');
        setFormData({
          title: '',
          company: '',
          location: '',
          salary: '',
          type: 'full-time',
          description: '',
          requirements: '',
          skills: '',
          expiresAt: ''
        });
        fetchJobs();
        setActiveTab('browse');
      }
    } catch (error) {
      console.error('Error posting job:', error);
      const errorMessage = error.response?.data?.message || 'Failed to post job';
      toast.error(errorMessage);
      
      // Log detailed error information
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId) => {
    if (!user) {
      toast.error('Please login to apply for jobs');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post(`/api/jobs/${jobId}/apply`, {
        resume: 'resume_url', // This should be handled with file upload
        coverLetter: 'cover_letter' // This should be handled with text input
      });

      if (response.data.success) {
        toast.success('Application submitted successfully!');
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      toast.error(error.response?.data?.message || 'Failed to submit application');
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Local Jobs</h1>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'browse'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('browse')}
          >
            Browse Jobs
          </button>
          {user?.role === 'business' && (
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'post'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('post')}
            >
              Post a Job
            </button>
          )}
        </div>

        {/* Post Job Form */}
        {activeTab === 'post' && user?.role === 'business' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Post a Job</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter job title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter company name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter location"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Salary Range
                </label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="e.g., ₹8,000 - ₹10,000/month"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Job Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Job Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter job description"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Requirements
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter job requirements"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Required Skills
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter skills (comma separated)"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Application Deadline
                </label>
                <input
                  type="date"
                  name="expiresAt"
                  value={formData.expiresAt}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? 'Posting...' : 'Post Job'}
              </button>
            </form>
          </div>
        )}

        {/* Jobs List */}
        {activeTab === 'browse' && (
          <div className="space-y-6">
            {/* Search and Filter Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  onChange={(e) => {
                    // Implement search functionality
                  }}
                />
                <select
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  onChange={(e) => {
                    // Implement type filter
                  }}
                >
                  <option value="">All Job Types</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
                <input
                  type="text"
                  placeholder="Location..."
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  onChange={(e) => {
                    // Implement location filter
                  }}
                />
              </div>
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>📍 {job.location}</p>
                    <p>💰 {job.salary}</p>
                    <p>⏱️ {job.type}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link
                      to={`/jobs/${job._id}`}
                      className="block w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* No Jobs Found */}
            {jobs.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
                <p className="mt-2 text-gray-600">
                  {user?.role === 'business'
                    ? "You haven't posted any jobs yet."
                    : "There are no jobs available at the moment."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocalJobs; 