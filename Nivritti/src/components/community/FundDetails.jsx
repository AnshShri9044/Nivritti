import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from '../../config/axios';
import { motion } from 'framer-motion';
import { FaUsers, FaMoneyBillWave, FaHandHoldingUsd, FaChartLine } from 'react-icons/fa';
import toast from 'react-hot-toast';
import FundLoanRequest from './FundLoanRequest';

const FundDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [fund, setFund] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoanModal, setShowLoanModal] = useState(false);

  useEffect(() => {
    if (!id) {
      toast.error('Invalid fund ID');
      navigate('/community/funds');
      return;
    }
    fetchFundDetails();
  }, [id, navigate]);

  const fetchFundDetails = async () => {
    try {
      if (!id) {
        throw new Error('Fund ID is required');
      }
      const response = await axios.get(`/api/funds/${id}`);
      if (response.data.success) {
        setFund(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to fetch fund details');
      }
    } catch (error) {
      console.error('Error fetching fund details:', error);
      if (error.response?.status === 404) {
        toast.error('Fund not found');
        navigate('/community/funds');
      } else if (error.response?.status === 500) {
        toast.error('Server error. Please try again later.');
        navigate('/community/funds');
      } else {
        toast.error(error.response?.data?.message || 'Failed to fetch fund details');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!fund) {
    return <div className="text-center text-gray-600">Fund not found</div>;
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">{fund.name}</h2>
          <span className={`px-3 py-1 rounded-full text-sm ${
            fund.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {fund.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <FaMoneyBillWave className="text-indigo-600 text-xl" />
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-lg font-semibold">₹{fund.totalAmount}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <FaUsers className="text-indigo-600 text-xl" />
              <div>
                <p className="text-sm text-gray-600">Members</p>
                <p className="text-lg font-semibold">{fund.memberCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <FaHandHoldingUsd className="text-indigo-600 text-xl" />
              <div>
                <p className="text-sm text-gray-600">Min Contribution</p>
                <p className="text-lg font-semibold">₹{fund.minContribution}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <FaChartLine className="text-indigo-600 text-xl" />
              <div>
                <p className="text-sm text-gray-600">Max Loan</p>
                <p className="text-lg font-semibold">₹{fund.maxLoanAmount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Loans */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Active Loans</h3>
            <button
              onClick={() => setShowLoanModal(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Request Loan
            </button>
          </div>
          <div className="space-y-4">
            {fund.loans?.filter(loan => loan.status === 'approved').map(loan => (
              <div key={loan._id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">₹{loan.amount}</p>
                    <p className="text-sm text-gray-600">{loan.purpose}</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Active
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <p>Duration: {loan.duration} months</p>
                  <p>Interest Rate: {loan.interestRate}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Contributions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Contributions</h3>
          <div className="space-y-4">
            {fund.contributions?.slice(0, 5).map(contribution => (
              <div key={contribution._id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">₹{contribution.amount}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(contribution.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    contribution.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {contribution.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loan Request Modal */}
      {showLoanModal && (
        <FundLoanRequest
          fund={fund}
          onClose={() => setShowLoanModal(false)}
        />
      )}
    </div>
  );
};

export default FundDetails; 