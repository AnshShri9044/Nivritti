import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const BusinessDashboard = () => {
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
              {/* Business Profile Card */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Business Profile</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Email:</span> {user?.email}</p>
                  <p><span className="font-medium">Role:</span> Business Partner</p>
                </div>
                <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Edit Profile
                </button>
              </div>

              {/* Job Postings Card */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Postings</h2>
                <p className="text-gray-600 mb-4">Manage your job postings and applications.</p>
                <Link
                  to="/business/jobs"
                  className="block w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-center"
                >
                  Manage Jobs
                </Link>
              </div>

              {/* Applications Card */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Applications</h2>
                <p className="text-gray-600 mb-4">Review and manage job applications.</p>
                <Link
                  to="/business/applications"
                  className="block w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-center"
                >
                  View Applications
                </Link>
              </div>

              {/* Candidates Card */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Candidates</h2>
                <p className="text-gray-600 mb-4">Browse and connect with potential candidates.</p>
                <Link
                  to="/business/candidates"
                  className="block w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-center"
                >
                  Browse Candidates
                </Link>
              </div>

              {/* Analytics Card */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Analytics</h2>
                <p className="text-gray-600 mb-4">View insights about your job postings and applications.</p>
                <Link
                  to="/business/analytics"
                  className="block w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-center"
                >
                  View Analytics
                </Link>
              </div>

              {/* Settings Card */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
                <p className="text-gray-600 mb-4">Manage your business account settings.</p>
                <Link
                  to="/business/settings"
                  className="block w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-center"
                >
                  Manage Settings
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

export default BusinessDashboard; 