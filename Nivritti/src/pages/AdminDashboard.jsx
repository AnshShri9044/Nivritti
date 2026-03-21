import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../config/axios';
import { motion } from 'framer-motion';
import { FaUsers, FaCog, FaFileAlt, FaChartBar, FaClipboardList, FaCheckCircle, FaTimesCircle, FaClock, FaMoneyBillWave, FaHandHoldingUsd } from 'react-icons/fa';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loanRequests, setLoanRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [fundStats, setFundStats] = useState({
    totalFunds: 0,
    activeFunds: 0,
    totalMembers: 0,
    pendingLoans: 0
  });

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/unauthorized');
      return;
    }
    fetchLoanRequests();
    fetchFundStats();
  }, [user]);

  const fetchLoanRequests = async () => {
    try {
      const response = await axios.get('/api/loans/admin');
      setLoanRequests(response.data);
    } catch (error) {
      console.error('Error fetching loan requests:', error);
      toast.error('Failed to fetch loan requests');
    } finally {
      setLoading(false);
    }
  };

  const fetchFundStats = async () => {
    try {
      const response = await axios.get('/api/funds/admin/stats');
      if (response.data.success) {
        setFundStats(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to fetch fund statistics');
      }
    } catch (error) {
      console.error('Error fetching fund stats:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch fund statistics');
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseDetails = () => {
    setSelectedRequest(null);
  };

  const handleStatusChange = async (status, reason = '') => {
    try {
      console.log('Updating loan status:', {
        loanId: selectedRequest._id,
        status,
        reason
      });

      const response = await axios.put(`/api/loans/${selectedRequest._id}/status`, {
        status,
        rejectionReason: reason
      });

      if (response.data.success) {
        toast.success(`Loan request ${status} successfully`);
        fetchLoanRequests();
        handleCloseDetails();
      } else {
        console.error('Update failed:', response.data);
        toast.error(response.data.message || 'Failed to update loan status');
      }
    } catch (error) {
      console.error('Error updating loan status:', {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'Failed to update loan status';
      
      toast.error(errorMessage);
    }
  };

  const handleRejectClick = () => {
    setShowRejectionModal(true);
  };

  const handleRejectionSubmit = async () => {
    if (!rejectionReason.trim()) {
      toast.error('Please provide a reason for rejection');
      return;
    }
    await handleStatusChange('rejected', rejectionReason);
    setShowRejectionModal(false);
    setRejectionReason('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <FaCheckCircle className="text-green-500" />;
      case 'rejected':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaClock className="text-yellow-500" />;
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user?.name}!
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your platform and users from here
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3">
              <FaMoneyBillWave className="text-indigo-600 text-xl" />
              <div>
                <p className="text-sm text-gray-600">Total Funds</p>
                <p className="text-2xl font-semibold">{fundStats.totalFunds}</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3">
              <FaUsers className="text-indigo-600 text-xl" />
              <div>
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="text-2xl font-semibold">{fundStats.totalMembers}</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3">
              <FaHandHoldingUsd className="text-indigo-600 text-xl" />
              <div>
                <p className="text-sm text-gray-600">Pending Loans</p>
                <p className="text-2xl font-semibold">{fundStats.pendingLoans}</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3">
              <FaChartBar className="text-indigo-600 text-xl" />
              <div>
                <p className="text-sm text-gray-600">Active Funds</p>
                <p className="text-2xl font-semibold">{fundStats.activeFunds}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Fund Management Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Fund Management</h2>
            <button
              onClick={() => navigate('/admin/funds/manage')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Manage Funds
            </button>
          </div>
          <p className="text-gray-600 mb-4">
            Monitor and manage community funds, members, and loan requests.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigate('/admin/funds/manage')}
                  className="w-full text-left px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded"
                >
                  View All Funds
                </button>
                <button
                  onClick={() => navigate('/admin/funds/loans')}
                  className="w-full text-left px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded"
                >
                  View Loan Requests
                </button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Recent Activity</h3>
              <p className="text-gray-600">
                {fundStats.pendingLoans} pending loan requests
              </p>
              <p className="text-gray-600">
                {fundStats.activeFunds} active funds
              </p>
            </div>
          </div>
        </motion.div>

        {/* Loan Management Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Loan Requests</h2>
            <button
              onClick={fetchLoanRequests}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Refresh
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Purpose
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loanRequests.map((request) => (
                  <motion.tr
                    key={request._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {request.borrower?.name || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {request.borrower?.email || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ₹{request.amount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">
                        {request.purpose}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(request)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View Details
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Loan Request Details Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Loan Request Details</h3>
                <button onClick={handleCloseDetails} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Applicant Information</h4>
                  <p>Name: {selectedRequest.borrower?.name || 'N/A'}</p>
                  <p>Email: {selectedRequest.borrower?.email || 'N/A'}</p>
                </div>

                <div>
                  <h4 className="font-medium">Loan Details</h4>
                  <p>Amount: ₹{selectedRequest.amount}</p>
                  <p>Purpose: {selectedRequest.purpose}</p>
                  <p>Description: {selectedRequest.description}</p>
                  <p>Duration: {selectedRequest.duration} months</p>
                  <p>Repayment Plan: {selectedRequest.repaymentPlan}</p>
                </div>

                {selectedRequest.documents && selectedRequest.documents.length > 0 && (
                  <div>
                    <h4 className="font-medium">Supporting Documents</h4>
                    <div className="space-y-2">
                      {selectedRequest.documents.map((doc, index) => (
                        <a
                          key={index}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Document {index + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {selectedRequest.status === 'pending' && (
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleStatusChange('approved')}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={handleRejectClick}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}

                {selectedRequest.status === 'rejected' && selectedRequest.rejectionReason && (
                  <div>
                    <h4 className="font-medium">Rejection Reason</h4>
                    <p className="text-red-600">{selectedRequest.rejectionReason}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Rejection Reason Modal */}
        {showRejectionModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Rejection Reason</h3>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="4"
                  placeholder="Please provide a reason for rejecting this loan request..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    onClick={() => {
                      setShowRejectionModal(false);
                      setRejectionReason('');
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRejectionSubmit}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Admin Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Management Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <FaUsers className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="ml-4 text-xl font-semibold text-gray-800">
                User Management
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Manage user accounts, roles, and permissions
            </p>
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
              Manage Users
            </button>
          </motion.div>

          {/* Content Management Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <FaFileAlt className="text-green-600 text-2xl" />
              </div>
              <h3 className="ml-4 text-xl font-semibold text-gray-800">
                Content Management
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Manage website content, announcements, and resources
            </p>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
              Manage Content
            </button>
          </motion.div>

          {/* Analytics Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaChartBar className="text-blue-600 text-2xl" />
              </div>
              <h3 className="ml-4 text-xl font-semibold text-gray-800">
                Analytics
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              View platform statistics and user insights
            </p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              View Analytics
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 