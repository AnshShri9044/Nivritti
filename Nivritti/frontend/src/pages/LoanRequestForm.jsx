import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../config/axios';
import { toast } from 'react-hot-toast';

const LoanRequestForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    amount: '',
    purpose: '',
    description: '',
    duration: '',
    repaymentPlan: '',
    documents: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loanPurposes = [
    { value: 'equipment_purchase', label: 'Equipment Purchase' },
    { value: 'working_capital', label: 'Working Capital' },
    { value: 'expansion', label: 'Business Expansion' },
    { value: 'other', label: 'Other' }
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'documents') {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      
      // Log the form data before sending
      console.log('Form Data:', {
        amount: formData.amount,
        purpose: formData.purpose,
        description: formData.description,
        duration: formData.duration,
        repaymentPlan: formData.repaymentPlan
      });

      // Append form data
      formDataToSend.append('amount', formData.amount);
      formDataToSend.append('purpose', formData.purpose);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('duration', formData.duration);
      formDataToSend.append('repaymentPlan', formData.repaymentPlan);
      
      // Append files if any
      if (formData.documents) {
        Array.from(formData.documents).forEach((file) => {
          formDataToSend.append('documents', file);
        });
      }

      // Log the FormData contents
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}: ${value}`);
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.post('/api/loans', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        toast.success('Loan request submitted successfully!');
        // Reset form data after successful submission
        setFormData({
          amount: '',
          purpose: '',
          description: '',
          duration: '',
          repaymentPlan: '',
          documents: null
        });
        setTimeout(() => {
          navigate('/loan-request/success');
        }, 1000);
      } else {
        throw new Error(response.data.message || 'Failed to submit loan request');
      }
    } catch (error) {
      console.error('Error submitting loan:', error);
      console.error('Error response:', error.response?.data);
      
      if (error.response?.data) {
        const { message, missingFields, validationErrors } = error.response.data;
        
        if (missingFields) {
          const missingFieldNames = Object.entries(missingFields)
            .filter(([_, isMissing]) => isMissing)
            .map(([field]) => field)
            .join(', ');
          toast.error(`Please fill in all required fields: ${missingFieldNames}`);
        } else if (validationErrors) {
          const validationMessages = Object.entries(validationErrors)
            .map(([field, error]) => `${field}: ${error.message}`)
            .join('\n');
          toast.error(`Validation errors:\n${validationMessages}`);
        } else {
          toast.error(message || 'Error submitting loan request');
        }
      } else {
        toast.error('Error submitting loan request. Please try again.');
      }
      setError('Failed to submit loan request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Request a Loan</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Loan Amount (minimum 1000)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="1000"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
            Purpose
          </label>
          <select
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select a purpose</option>
            {loanPurposes.map((purpose) => (
              <option key={purpose.value} value={purpose.value}>
                {purpose.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duration (months, minimum 1)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="repaymentPlan" className="block text-sm font-medium text-gray-700">
            Repayment Plan
          </label>
          <select
            id="repaymentPlan"
            name="repaymentPlan"
            value={formData.repaymentPlan}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select a repayment plan</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="bi-annual">Bi-Annual</option>
            <option value="annual">Annual</option>
          </select>
        </div>

        <div>
          <label htmlFor="documents" className="block text-sm font-medium text-gray-700">
            Supporting Documents (PDF, JPEG, PNG)
          </label>
          <input
            type="file"
            id="documents"
            name="documents"
            onChange={handleChange}
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanRequestForm; 