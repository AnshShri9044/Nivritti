import React, { useState } from 'react';

const AnimatedInput = ({ label, type = 'text', name, value, onChange, error }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative mb-6">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 rounded-lg outline-none transition-all duration-300 ${
          isFocused
            ? 'border-indigo-500 shadow-lg shadow-indigo-500/20'
            : 'border-gray-200 hover:border-indigo-300'
        } ${error ? 'border-red-500' : ''}`}
      />
      <label
        className={`absolute left-4 transition-all duration-300 ${
          isFocused || value
            ? '-top-3 text-xs bg-white px-1 text-indigo-500'
            : 'top-3 text-gray-400'
        } ${error ? 'text-red-500' : ''}`}
      >
        {label}
      </label>
      {error && (
        <p className="absolute -bottom-5 left-0 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default AnimatedInput; 