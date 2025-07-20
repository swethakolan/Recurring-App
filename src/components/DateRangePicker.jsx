import React from 'react';

const DateRangePicker = ({ startDate, endDate, onStartChange, onEndChange }) => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">📅 Date Range:</h3>
      <div className="flex flex-col gap-2">
        <div>
          <label className="block mb-1">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartChange(e.target.value)}
            className="border rounded p-2 w-full text-black"
          />
        </div>
        <div>
          <label className="block mb-1">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndChange(e.target.value)}
            className="border rounded p-2 w-full text-black"
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
