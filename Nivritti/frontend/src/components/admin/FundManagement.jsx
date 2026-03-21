import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from '../../config/axios';
import { motion } from 'framer-motion';
import { FaUsers, FaMoneyBillWave, FaHandHoldingUsd, FaChartLine, FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const FundManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFund, setSelectedFund] = useState(null);
  const [showFundModal, setShowFundModal] = useState(false);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    minContribution: 1000,
    maxLoanAmount: 50000
  });
  const [stats, setStats] = useState({
    totalFunds: 0,
    activeFunds: 0,
    totalMembers: 0,
    totalLoans: 0,
    pendingLoans: 0,
    totalContributions: 0
  });
  const [loanRequests, setLoanRequests] = useState([]);

  useEffect(() => {
    // Check if user is admin
    if (user.role !== 'admin') {
      toast.error('You are not authorized to access this page');
      navigate('/unauthorized');
      return;
    }
    fetchFunds();
    fetchStats();
    fetchLoanRequests();
  }, [user, navigate]);

  const fetchFunds = async () => {
    try {
      const response = await axios.get('/api/funds/admin');
      setFunds(response.data.data);
    } catch (error) {
      console.error('Error fetching funds:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error('You are not authorized to access this page');
        navigate('/unauthorized');
      } else {
        toast.error('Failed to fetch community funds');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/funds/admin/stats');
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error('You are not authorized to access this page');
        navigate('/unauthorized');
      } else {
        toast.error('Failed to fetch fund statistics');
      }
    }
  };

  const fetchLoanRequests = async () => {
    try {
      const response = await axios.get('/api/funds/admin/loan-requests');
      setLoanRequests(response.data.data);
    } catch (error) {
      console.error('Error fetching loan requests:', error);
      toast.error('Failed to fetch loan requests');
    }
  };

  const handleFundStatusChange = async (fundId, newStatus) => {
    try {
      await axios.put(`/api/funds/${fundId}/status`, { status: newStatus });
      toast.success(`Fund status updated to ${newStatus}`);
      fetchFunds();
    } catch (error) {
      console.error('Error updating fund status:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error('You are not authorized to perform this action');
        navigate('/unauthorized');
      } else {
        toast.error('Failed to update fund status');
      }
    }
  };

  const handleLoanApproval = async (loanId, status, reason = '') => {
    try {
      await axios.put(`/api/funds/loans/${loanId}/status`, { status, rejectionReason: reason });
      toast.success(`Loan ${status} successfully`);
      fetchFunds();
      fetchLoanRequests();
      setShowLoanModal(false);
    } catch (error) {
      console.error('Error updating loan status:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error('You are not authorized to perform this action');
        navigate('/unauthorized');
      } else {
        toast.error('Failed to update loan status');
      }
    }
  };

  const handleMemberRemoval = async (fundId, userId) => {
    try {
      await axios.delete(`/api/funds/${fundId}/members/${userId}`);
      toast.success('Member removed successfully');
      fetchFunds();
    } catch (error) {
      console.error('Error removing member:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error('You are not authorized to perform this action');
        navigate('/unauthorized');
      } else {
        toast.error('Failed to remove member');
      }
    }
  };

  const handleCreateFund = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/funds/create', formData);
      toast.success('Community fund created successfully');
      setShowCreateModal(false);
      fetchFunds();
    } catch (error) {
      console.error('Error creating fund:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error('You are not authorized to perform this action');
        navigate('/unauthorized');
      } else {
        toast.error(error.response?.data?.message || 'Failed to create fund');
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="p-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <FaMoneyBillWave className="text-indigo-600 text-xl" />
            <div>
              <p className="text-sm text-gray-600">Total Funds</p>
              <p className="text-2xl font-semibold">{stats.totalFunds}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <FaUsers className="text-indigo-600 text-xl" />
            <div>
              <p className="text-sm text-gray-600">Total Members</p>
              <p className="text-2xl font-semibold">{stats.totalMembers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <FaHandHoldingUsd className="text-indigo-600 text-xl" />
            <div>
              <p className="text-sm text-gray-600">Pending Loans</p>
              <p className="text-2xl font-semibold">{stats.pendingLoans}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Funds List */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Manage Funds</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Create New Fund
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fund Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Members
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {funds.map((fund) => (
                <tr key={fund._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{fund.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      fund.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {fund.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{fund.memberCount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₹{fund.totalAmount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          setSelectedFund(fund);
                          setShowFundModal(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleFundStatusChange(fund._id, fund.status === 'active' ? 'inactive' : 'active')}
                        className={`${
                          fund.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                        }`}
                      >
                        {fund.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Loan Requests Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Loan Requests</h2>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Borrower
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fund
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loanRequests.map((loan) => (
                  <tr key={loan._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{loan.borrowerId.name}</div>
                      <div className="text-sm text-gray-500">{loan.borrowerId.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{loan.fundId.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹{loan.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{loan.purpose}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        loan.status === 'approved' ? 'bg-green-100 text-green-800' :
                        loan.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {loan.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleLoanApproval(loan._id, 'approved')}
                          className="text-green-600 hover:text-green-900"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            setSelectedLoan(loan);
                            setShowLoanModal(true);
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Fund Details Modal */}
      {showFundModal && selectedFund && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">{selectedFund.name}</h3>
              <button
                onClick={() => setShowFundModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fund Details */}
              <div>
                <h4 className="font-semibold mb-4">Fund Details</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Status:</span> {selectedFund.status}</p>
                  <p><span className="font-medium">Total Amount:</span> ₹{selectedFund.totalAmount}</p>
                  <p><span className="font-medium">Members:</span> {selectedFund.memberCount}</p>
                  <p><span className="font-medium">Min Contribution:</span> ₹{selectedFund.minContribution}</p>
                  <p><span className="font-medium">Max Loan:</span> ₹{selectedFund.maxLoanAmount}</p>
                </div>
              </div>

              {/* Members List */}
              <div>
                <h4 className="font-semibold mb-4">Members</h4>
                <div className="space-y-2">
                  {selectedFund.members?.map((member) => (
                    <div key={member._id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.email}</p>
                      </div>
                      <button
                        onClick={() => handleMemberRemoval(selectedFund._id, member._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pending Loans */}
            <div className="mt-6">
              <h4 className="font-semibold mb-4">Pending Loans</h4>
              <div className="space-y-4">
                {selectedFund.loans?.filter(loan => loan.status === 'pending').map((loan) => (
                  <div key={loan._id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">₹{loan.amount}</p>
                        <p className="text-sm text-gray-600">{loan.purpose}</p>
                        <p className="text-sm text-gray-600">Duration: {loan.duration} months</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleLoanApproval(loan._id, 'approved')}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            setSelectedLoan(loan);
                            setShowLoanModal(true);
                          }}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loan Rejection Modal */}
      {showLoanModal && selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Reject Loan Request</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const reason = e.target.reason.value;
              handleLoanApproval(selectedLoan._id, 'rejected', reason);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Rejection Reason</label>
                  <textarea
                    name="reason"
                    rows="4"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowLoanModal(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Reject Loan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Fund Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Create New Fund</h3>
            <form onSubmit={handleCreateFund}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fund Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Minimum Contribution</label>
                  <input
                    type="number"
                    value={formData.minContribution}
                    onChange={(e) => setFormData({ ...formData, minContribution: Number(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    min="100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Maximum Loan Amount</label>
                  <input
                    type="number"
                    value={formData.maxLoanAmount}
                    onChange={(e) => setFormData({ ...formData, maxLoanAmount: Number(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    min="1000"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Create Fund
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundManagement; 