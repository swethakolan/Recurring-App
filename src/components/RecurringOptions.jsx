// src/RecurringOptions.jsx
import React from 'react';

const RecurringOptions = ({ selected, onChange }) => {
  const options = ['Daily', 'weekly', 'monthly', 'yearly'];

  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-4 py-2 rounded border text-sm capitalize transition-all duration-200
            ${selected === option
              ? 'bg-black text-white font-semibold'
              : 'bg-white text-black border-white hover:bg-gray-800'}
          `}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default RecurringOptions;
