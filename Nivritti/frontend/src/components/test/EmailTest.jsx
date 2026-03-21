import React, { useState } from 'react';
import axios from 'axios';

const EmailTest = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const sendTestEmail = async () => {
    try {
      setLoading(true);
      setMessage('');
      const response = await axios.get('http://localhost:5000/api/test/email');
      setMessage('Test email sent successfully! Please check your inbox.');
    } catch (error) {
      setMessage('Error sending test email: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Email Test</h2>
        <button
          onClick={sendTestEmail}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Test Email'}
        </button>
        {message && (
          <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default EmailTest; 