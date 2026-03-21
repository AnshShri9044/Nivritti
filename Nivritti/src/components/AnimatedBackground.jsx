import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Animated circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full opacity-20 animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-indigo-200 rounded-full opacity-20 animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-300 rounded-full opacity-20 animate-pulse" style={{ animationDuration: '5s' }}></div>
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            animation: 'gridMove 20s linear infinite'
          }}></div>
        </div>
      </div>
      
      <style>
        {`
          @keyframes gridMove {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 40px 40px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AnimatedBackground; 