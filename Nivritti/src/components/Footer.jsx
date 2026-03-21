import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useEffect } from 'react';

const Footer = () => {
  useEffect(() => {
    gsap.from('.footer-item', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }, []);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="footer-item">
            <h3 className="text-xl font-bold mb-4">Nivṛtti</h3>
            <p className="text-gray-400">
              Empowering underserved communities through inclusive financial solutions.
            </p>
          </div>

          <div className="footer-item">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/micro-lending" className="text-gray-400 hover:text-white">
                  Micro-Lending
                </Link>
              </li>
              <li>
                <Link to="/community-savings" className="text-gray-400 hover:text-white">
                  Community Savings
                </Link>
              </li>
              <li>
                <Link to="/local-jobs" className="text-gray-400 hover:text-white">
                  Local Jobs
                </Link>
              </li>
              <li>
                <Link to="/literacy" className="text-gray-400 hover:text-white">
                  Financial Literacy
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-item">
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-item">
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                Facebook
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Nivṛtti. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 