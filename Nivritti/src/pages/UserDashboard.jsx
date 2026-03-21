import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaUsers, FaMoneyBillWave, FaHandHoldingUsd } from 'react-icons/fa';

const UserDashboard = () => {
  const { user } = useAuth();

  // Role-specific content
  const getRoleSpecificContent = () => {
    switch (user?.role) {
      case 'user':
        return (
          <>
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
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Find Jobs</h2>
              <p className="text-gray-600 mb-4">Browse and apply for available jobs in your area.</p>
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

            {/* Community Fund Card */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FaMoneyBillWave className="text-indigo-600 text-xl" />
                <h2 className="text-lg font-semibold text-gray-900">Community Funds</h2>
              </div>
              <p className="text-gray-600 mb-4">View and participate in community savings funds.</p>
              <div className="space-y-3">
                <Link
                  to="/community/funds"
                  className="block w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-center"
                >
                  View Funds
                </Link>
              </div>
            </div>

            {/* Loan Request Card */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Loan Request</h2>
              <p className="text-gray-600 mb-4">Submit a new loan request.</p>
              <Link
                to="/request-loan"
                className="block w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-center"
              >
                Request Loan
              </Link>
            </div>
          </>
        );
      case 'business':
        return (
          <>
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

            {/* Community Fund Card */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FaMoneyBillWave className="text-indigo-600 text-xl" />
                <h2 className="text-lg font-semibold text-gray-900">Community Funds</h2>
              </div>
              <p className="text-gray-600 mb-4">View and participate in community savings funds.</p>
              <div className="space-y-3">
                <Link
                  to="/community/funds"
                  className="block w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-center"
                >
                  View Funds
                </Link>
              </div>
            </div>
          </>
        );
      case 'admin':
        return (
          <>
            {/* Admin Profile Card */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Admin Profile</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Email:</span> {user?.email}</p>
                <p><span className="font-medium">Role:</span> Administrator</p>
              </div>
              <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                Edit Profile
              </button>
            </div>

            {/* User Management Card */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">User Management</h2>
              <p className="text-gray-600 mb-4">Manage users and their roles.</p>
              <Link
                to="/admin/users"
                className="block w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-center"
              >
                Manage Users
              </Link>
            </div>

            {/* Content Management Card */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Management</h2>
              <p className="text-gray-600 mb-4">Manage website content and settings.</p>
              <Link
                to="/admin/content"
                className="block w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-center"
              >
                Manage Content
              </Link>
            </div>

            {/* Community Fund Management Card */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FaMoneyBillWave className="text-indigo-600 text-xl" />
                <h2 className="text-lg font-semibold text-gray-900">Community Funds</h2>
              </div>
              <p className="text-gray-600 mb-4">Manage community funds and monitor activities.</p>
              <div className="space-y-3">
                <Link
                  to="/admin/funds"
                  className="block w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-center"
                >
                  Manage Funds
                </Link>
                <Link
                  to="/admin/funds/loans"
                  className="block w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-center"
                >
                  View Loan Requests
                </Link>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome, {user?.name}!
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {getRoleSpecificContent()}
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

export default UserDashboard; 