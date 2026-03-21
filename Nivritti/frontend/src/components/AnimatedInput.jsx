import React, { useState } from 'react';

const AnimatedInput = ({ id, name, type, required, value, onChange, label, error }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`block w-full px-3 py-2 border ${
          error ? 'border-red-300' : 'border-gray-300'
        } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200`}
      />
      <label
        htmlFor={id}
        className={`absolute left-3 transition-all duration-200 ${
          isFocused || value
            ? 'top-0 -translate-y-1/2 text-xs bg-white px-1 text-blue-600'
            : 'top-1/2 -translate-y-1/2 text-gray-500'
        } ${error ? 'text-red-500' : ''}`}
      >
        {label}
      </label>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default AnimatedInput; 