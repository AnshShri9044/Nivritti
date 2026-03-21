import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from '../../config/axios';
import toast from 'react-hot-toast';

const FundBorrow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [fund, setFund] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    amount: '',
    purpose: '',
    duration: 12,
    description: ''
  });

  const loanPurposes = [
    { value: 'education', label: 'Education' },
    { value: 'medical', label: 'Medical Expenses' },
    { value: 'business', label: 'Business' },
    { value: 'home_improvement', label: 'Home Improvement' },
    { value: 'debt_consolidation', label: 'Debt Consolidation' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'vehicle', label: 'Vehicle Purchase' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    fetchFundDetails();
  }, [id]);

  const fetchFundDetails = async () => {
    try {
      const response = await axios.get(`/api/funds/${id}`);
      setFund(response.data.data);
    } catch (error) {
      console.error('Error fetching fund details:', error);
      toast.error('Failed to fetch fund details');
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
      const response = await axios.post(`/api/funds/${id}/request-loan`, formData);
      toast.success('Loan request submitted successfully');
      navigate(`/community/funds/${id}`);
    } catch (error) {
      console.error('Error submitting loan request:', error);
      toast.error(error.response?.data?.message || 'Failed to submit loan request');
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
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Borrow from {fund.name}</h2>
            <button
              onClick={() => navigate(`/community/funds/${id}`)}
              className="text-gray-500 hover:text-gray-700"
            >
              Back to Fund
            </button>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Fund Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Maximum Loan Amount</p>
                <p className="font-semibold">₹{fund.maxLoanAmount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Interest Rate</p>
                <p className="font-semibold">{fund.interestRate}%</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Loan Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                min="1000"
                max={fund.maxLoanAmount}
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Maximum loan amount: ₹{fund.maxLoanAmount}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Purpose</label>
              <input
                type="text"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Duration (months)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                min="1"
                max="60"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate(`/community/funds/${id}`)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FundBorrow; 