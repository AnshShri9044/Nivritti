import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaInfoCircle, FaEnvelope, FaCog, FaUser, FaSignInAlt, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainLinks = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/about', label: 'About', icon: <FaInfoCircle /> },
    { path: '/contact', label: 'Contact', icon: <FaEnvelope /> },
  ];

  const services = [
    { path: '/micro-lending', label: 'Micro-Lending', icon: <FaCog /> },
    { path: '/community-savings', label: 'Community Savings', icon: <FaCog /> },
    { path: '/local-jobs', label: 'Local Jobs', icon: <FaCog /> },
    { path: '/literacy', label: 'Financial Literacy', icon: <FaCog /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gradient-to-r from-[#f7edd4] via-white to-[#f7edd4] shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="group relative">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold bg-gradient-to-r from-[#b4d9a3] via-[#b28071] to-[#b4d9a3] bg-clip-text text-transparent"
                >
                  Nivritti
                </motion.div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#b4d9a3] via-[#b28071] to-[#b4d9a3]"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4 sm:items-center">
              {mainLinks.map((link) => (
                <motion.div
                  key={link.path}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.path}
                    className={`${
                      location.pathname === link.path
                        ? 'text-[#b4d9a3] border-[#b4d9a3]'
                        : 'text-gray-600 hover:text-[#b4d9a3] border-transparent'
                    } inline-flex items-center px-3 py-2 border-b-2 text-lg font-medium transition-colors duration-300`}
                  >
                    <span className="mr-2">{link.icon}</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              {/* Services Dropdown */}
              <motion.div
                className="relative"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className={`${
                    services.some(s => location.pathname === s.path)
                      ? 'text-[#b4d9a3] border-[#b4d9a3]'
                      : 'text-gray-600 hover:text-[#b4d9a3] border-transparent'
                  } inline-flex items-center px-3 py-2 border-b-2 text-lg font-medium transition-colors duration-300`}
                >
                  <FaCog className="mr-2" />
                  Services
                  <motion.div
                    animate={{ rotate: isServicesOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="ml-2 h-4 w-4" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50"
                    >
                      {services.map((service) => (
                        <Link
                          key={service.path}
                          to={service.path}
                          className="flex items-center px-4 py-2 text-lg text-gray-700 hover:bg-[#b4d9a3]/5 hover:text-[#b4d9a3] transition-colors duration-200"
                        >
                          <span className="mr-2">{service.icon}</span>
                          {service.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
          
          {/* Right side navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-4"
              >
                <Link
                  to={user.role === 'admin' ? '/admin/dashboard' : user.role === 'business' ? '/business/dashboard' : '/user/dashboard'}
                  className="relative group flex items-center space-x-2 bg-[#b4d9a3]/5 hover:bg-[#b4d9a3]/10 px-4 py-2 rounded-lg transition-all duration-200"
                >
                  <FaUser className="h-5 w-5 text-[#b4d9a3]" />
                  <span className="font-medium text-[#b4d9a3]">Dashboard</span>
                </Link>
                <div className="flex items-center space-x-2 bg-[#b4d9a3]/5 px-4 py-2 rounded-full">
                  <div className="h-8 w-8 rounded-full bg-[#b4d9a3]/10 flex items-center justify-center">
                    <span className="text-[#b4d9a3] font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-[#b4d9a3]">
                    {user.name}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-[#b28071] transition-colors duration-200"
                >
                  <FaSignOutAlt className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex space-x-4"
              >
                <Link
                  to="/login"
                  className="flex items-center space-x-1 text-[#b4d9a3] hover:text-[#b28071] transition-colors duration-200"
                >
                  <FaSignInAlt className="h-5 w-5" />
                  <span className="font-medium">Login</span>
                </Link>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/register"
                    className="flex items-center space-x-1 bg-[#b4d9a3] text-white px-6 py-2 rounded-lg hover:bg-[#b28071] transition-colors duration-200 shadow-lg"
                  >
                    <FaUser className="h-5 w-5" />
                    <span className="font-medium">Register</span>
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#b4d9a3] hover:text-[#b28071] focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden"
          >
            <div className="pt-2 pb-3 space-y-1">
              {mainLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${
                    location.pathname === link.path
                      ? 'bg-[#b4d9a3]/10 text-[#b4d9a3]'
                      : 'text-gray-600 hover:bg-[#b4d9a3]/5'
                  } flex items-center px-3 py-2 rounded-md text-lg font-medium`}
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
              {services.map((service) => (
                <Link
                  key={service.path}
                  to={service.path}
                  className="flex items-center px-3 py-2 text-lg font-medium text-gray-600 hover:bg-[#b4d9a3]/5 hover:text-[#b4d9a3]"
                >
                  <span className="mr-2">{service.icon}</span>
                  {service.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 