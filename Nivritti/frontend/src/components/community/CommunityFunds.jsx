import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from '../../config/axios';
import { motion } from 'framer-motion';
import { FaUsers, FaMoneyBillWave, FaHandHoldingUsd, FaChartLine } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const CommunityFunds = () => {
  const { user } = useAuth();
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [selectedFund, setSelectedFund] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    minContribution: 1000,
    maxLoanAmount: 50000
  });

  useEffect(() => {
    fetchFunds();
  }, []);

  const fetchFunds = async () => {
    try {
      const response = await axios.get('/api/funds');
      setFunds(response.data.data);
    } catch (error) {
      console.error('Error fetching funds:', error);
      toast.error('Failed to fetch community funds');
    } finally {
      setLoading(false);
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
      toast.error(error.response?.data?.message || 'Failed to create fund');
    }
  };

  const handleContribute = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/funds/${selectedFund._id}/contribute`, {
        amount: formData.amount,
        type: 'regular'
      });
      toast.success('Contribution made successfully');
      setShowContributeModal(false);
      fetchFunds();
    } catch (error) {
      console.error('Error making contribution:', error);
      toast.error(error.response?.data?.message || 'Failed to make contribution');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Community Funds</h2>
        {user.role === 'admin' && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Create New Fund
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {funds.map((fund) => (
          <motion.div
            key={fund._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">{fund.name}</h3>
              <span className={`px-3 py-1 rounded-full text-sm ${
                fund.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {fund.status}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Amount</span>
                <span className="font-semibold">₹{fund.totalAmount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Members</span>
                <span className="font-semibold">{fund.memberCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Min Contribution</span>
                <span className="font-semibold">₹{fund.minContribution}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Max Loan</span>
                <span className="font-semibold">₹{fund.maxLoanAmount}</span>
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => {
                  setSelectedFund(fund);
                  setShowContributeModal(true);
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Contribute
              </button>
              <Link
                to={`/community/funds/${fund._id}`}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-center"
              >
                View Details
              </Link>
              <Link
                to={`/community/funds/${fund._id}/borrow`}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Borrow Money
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

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

      {/* Contribute Modal */}
      {showContributeModal && selectedFund && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Make Contribution</h3>
            <form onSubmit={handleContribute}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    min={selectedFund.minContribution}
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Minimum contribution: ₹{selectedFund.minContribution}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowContributeModal(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Contribute
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityFunds; 