import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-300">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-300">About</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-300">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/micro-lending" className="hover:text-gray-300">Micro-Lending</Link>
              </li>
              <li>
                <Link to="/community-savings" className="hover:text-gray-300">Community Savings</Link>
              </li>
              <li>
                <Link to="/local-jobs" className="hover:text-gray-300">Local Jobs</Link>
              </li>
              <li>
                <Link to="/literacy" className="hover:text-gray-300">Financial Literacy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>Email: contact@nivritti.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Main Street, City, State 12345</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} Nivritti. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 