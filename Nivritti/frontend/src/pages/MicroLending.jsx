import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MicroLending = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Micro-Lending Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access small loans for your business or personal needs with flexible repayment options.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2">Small Business Loans</h3>
            <p className="text-gray-600 mb-4">
              Get funding for your small business with competitive interest rates and flexible terms.
            </p>
            <Link
              to="/register"
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Apply Now
            </Link>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Personal Loans</h3>
            <p className="text-gray-600 mb-4">
              Access personal loans for education, medical expenses, or other needs.
            </p>
            <Link
              to="/register"
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-semibold mb-2">Flexible Repayment</h3>
            <p className="text-gray-600 mb-4">
              Choose from various repayment plans that suit your financial situation.
            </p>
            <Link
              to="/register"
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              View Plans
            </Link>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-6">
            Join our community and access the financial support you need.
          </p>
          <Link
            to="/register"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Create Your Account
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default MicroLending; 