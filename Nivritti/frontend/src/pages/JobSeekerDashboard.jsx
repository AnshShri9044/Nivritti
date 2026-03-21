import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const JobSeekerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome, {user?.name}!
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {/* Profile Card */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Profile</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Email:</span> {user?.email}</p>
                  <p><span className="font-medium">Role:</span> Job Seeker</p>
                </div>
                <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Edit Profile
                </button>
              </div>

              {/* Job Applications Card */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Applications</h2>
                <p className="text-gray-600 mb-4">Track your job applications and their status.</p>
                <Link
                  to="/user/applications"
                  className="block w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-center"
                >
                  View Applications
                </Link>
              </div>

              {/* Skills Card */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Skills</h2>
                <p className="text-gray-600 mb-4">Manage your skills and certifications.</p>
                <Link
                  to="/user/skills"
                  className="block w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-center"
                >
                  Manage Skills
                </Link>
              </div>

              {/* Job Search Card */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Search</h2>
                <p className="text-gray-600 mb-4">Find and apply for jobs that match your skills.</p>
                <Link
                  to="/jobs"
                  className="block w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-center"
                >
                  Browse Jobs
                </Link>
              </div>

              {/* Training Card */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Training Programs</h2>
                <p className="text-gray-600 mb-4">Enroll in training programs to enhance your skills.</p>
                <Link
                  to="/training"
                  className="block w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-center"
                >
                  View Programs
                </Link>
              </div>

              {/* Community Card */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Community</h2>
                <p className="text-gray-600 mb-4">Connect with other job seekers and share experiences.</p>
                <Link
                  to="/community"
                  className="block w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-center"
                >
                  Join Community
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600">No recent activity to show.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard; 