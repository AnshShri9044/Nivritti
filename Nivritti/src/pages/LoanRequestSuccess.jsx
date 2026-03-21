import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

const LoanRequestSuccess = () => {
  const navigate = useNavigate();
  const containerRef = useRef();
  const iconRef = useRef();
  const textRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial state
    gsap.set([iconRef.current, textRef.current, buttonRef.current], {
      opacity: 0,
      y: 20
    });

    // Animate container
    tl.to(containerRef.current, {
      duration: 0.5,
      opacity: 1,
      ease: 'power2.out'
    })
    // Animate check icon
    .to(iconRef.current, {
      duration: 0.5,
      opacity: 1,
      y: 0,
      scale: 1,
      ease: 'back.out(1.7)'
    })
    // Animate text
    .to(textRef.current, {
      duration: 0.5,
      opacity: 1,
      y: 0,
      ease: 'power2.out'
    })
    // Animate button
    .to(buttonRef.current, {
      duration: 0.5,
      opacity: 1,
      y: 0,
      ease: 'power2.out'
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50"
      style={{ opacity: 0 }}
    >
      <div className="max-w-md w-full mx-4 p-8 bg-white rounded-2xl shadow-xl">
        <div className="text-center">
          <motion.div
            ref={iconRef}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6"
          >
            <svg
              className="h-16 w-16 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>

          <div ref={textRef} className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Loan Request Submitted!
            </h2>
            <p className="text-lg text-gray-600">
              Your loan request has been successfully submitted. Our team will review it and get back to you shortly.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>What happens next?</p>
              <ul className="list-disc list-inside space-y-1">
                <li>We'll review your application</li>
                <li>Verify your documents</li>
                <li>Contact you for any additional information</li>
                <li>Process your loan request</li>
              </ul>
            </div>
          </div>

          <motion.button
            ref={buttonRef}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/user/dashboard')}
            className="mt-8 w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Return to Dashboard
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default LoanRequestSuccess; 