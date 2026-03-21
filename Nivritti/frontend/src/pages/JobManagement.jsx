import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../config/axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const JobManagement = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplications, setShowApplications] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/jobs/my-jobs');
      console.log('Jobs response:', response.data);
      
      if (response.data.success) {
        setJobs(response.data.data);
      } else {
        console.error('API response indicates failure:', response.data);
        toast.error(response.data.message || 'Failed to fetch jobs');
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

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      const response = await axios.put(`/api/jobs/${jobId}`, {
        status: newStatus
      });

      if (response.data.success) {
        toast.success(`Job ${newStatus} successfully`);
        fetchJobs();
      }
    } catch (error) {
      console.error('Error updating job status:', error);
      toast.error('Failed to update job status');
    }
  };

  const handleApplicationStatus = async (jobId, applicationId, newStatus) => {
    try {
      const response = await axios.put(`/api/jobs/${jobId}/applications/${applicationId}`, {
        status: newStatus
      });

      if (response.data.success) {
        toast.success(`Application ${newStatus} successfully`);
        setJobs(prevJobs => 
          prevJobs.map(job => 
            job._id === jobId ? response.data.data : job
          )
        );
        if (selectedJob && selectedJob._id === jobId) {
          setSelectedJob(response.data.data);
        }
      } else {
        toast.error(response.data.message || 'Failed to update application status');
      }
    } catch (error) {
      console.error('Error updating application status:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      toast.error(error.response?.data?.message || 'Failed to update application status');
    }
  };

  const filteredJobs = jobs.filter(job => job.status === activeTab);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Job Management</h1>
          <Link
            to="/local-jobs?tab=post"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Post New Job
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'active'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('active')}
          >
            Active Jobs
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'closed'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('closed')}
          >
            Closed Jobs
          </button>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p>📍 {job.location}</p>
                    <p>💰 {job.salary}</p>
                    <p>⏱️ {job.type}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedJob(job);
                      setShowApplications(true);
                    }}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
                  >
                    View Applications ({job.applications.length})
                  </button>
                  {job.status === 'active' ? (
                    <button
                      onClick={() => handleStatusChange(job._id, 'closed')}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                    >
                      Close Job
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusChange(job._id, 'active')}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                    >
                      Reopen Job
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Applications Modal */}
        {showApplications && selectedJob && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Applications for {selectedJob.title}
                </h2>
                <button
                  onClick={() => setShowApplications(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
              </div>

              <div className="space-y-4">
                {selectedJob.applications.map((application) => (
                  <div
                    key={application._id}
                    className="border rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">
                          {application.applicant.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {application.applicant.email}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Applied on {new Date(application.appliedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <a
                          href={application.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                        >
                          View Resume
                        </a>
                        {application.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApplicationStatus(selectedJob._id, application._id, 'accepted')}
                              className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleApplicationStatus(selectedJob._id, application._id, 'rejected')}
                              className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    {application.coverLetter && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Cover Letter</h4>
                        <p className="text-gray-700 whitespace-pre-line">
                          {application.coverLetter}
                        </p>
                      </div>
                    )}
                    <div className="mt-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        application.status === 'accepted'
                          ? 'bg-green-100 text-green-800'
                          : application.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobManagement; 