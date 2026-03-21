import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../config/axios';
import { toast } from 'react-hot-toast';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applicationData, setApplicationData] = useState({
    resume: null,
    coverLetter: ''
  });

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`/api/jobs/${id}`);
      setJob(response.data.data);
    } catch (error) {
      console.error('Error fetching job details:', error);
      toast.error('Failed to fetch job details');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setApplicationData(prev => ({
        ...prev,
        resume: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to apply for jobs');
      navigate('/login');
      return;
    }

    setApplying(true);
    try {
      const formData = new FormData();
      formData.append('resume', applicationData.resume);
      formData.append('coverLetter', applicationData.coverLetter);

      const response = await axios.post(`/api/jobs/${id}/apply`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        toast.success('Application submitted successfully!');
        navigate('/job-application/success');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Job not found</h2>
          <p className="mt-2 text-gray-600">The job you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/local-jobs')}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Job Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                <p className="mt-2 text-xl text-gray-600">{job.company}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">{job.salary}</p>
                <p className="text-sm text-gray-600">{job.type}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-gray-600">
              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{job.location}</span>
            </div>
          </div>

          {/* Job Details */}
          <div className="p-6">
            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-4">Job Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{job.description}</p>

              <h2 className="text-xl font-semibold mt-8 mb-4">Requirements</h2>
              <p className="text-gray-700 whitespace-pre-line">{job.requirements}</p>

              <h2 className="text-xl font-semibold mt-8 mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Application Form */}
          {user?.role === 'user' && (
            <div className="p-6 border-t border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Apply for this Position</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Resume
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="mt-1 block w-full"
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Upload your resume (PDF, DOC, or DOCX)
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cover Letter
                  </label>
                  <textarea
                    value={applicationData.coverLetter}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, coverLetter: e.target.value }))}
                    rows="4"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Tell us why you're interested in this position..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={applying}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                >
                  {applying ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails; 