import React, { useState, useEffect } from 'react';

const CustomizationSection = ({
  interval,
  setInterval,
  recurrenceType,
  selectedDays,
  setSelectedDays,
  monthDay,
  setMonthDay,
  yearlyMonth,
  setYearlyMonth,
  yearlyDay,
  setYearlyDay,
}) => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const toggleDay = (dayIndex) => {
    setSelectedDays((prev) =>
      prev.includes(dayIndex)
        ? prev.filter((d) => d !== dayIndex)
        : [...prev, dayIndex]
    );
  };

  return (
    <div className="p-4 bg-white text-black rounded-xl space-y-4">
      {/* Interval Input */}
      <div>
        <label className="block mb-1 font-semibold">Every:</label>
        <input
          type="number"
          min="1"
          value={interval}
          onChange={(e) =>
            setInterval(Math.max(1, Number(e.target.value) || 1))
          }
          className="border rounded p-2 w-full"
          placeholder={`Every X ${recurrenceType}`}
        />
      </div>

      {/* Weekly - Select Weekdays */}
      {recurrenceType === 'weekly' && (
        <div>
          <label className="block mb-2 font-semibold">Select Weekdays:</label>
          <div className="flex flex-wrap gap-2">
            {weekdays.map((day, index) => (
              <button
                key={index}
                onClick={() => toggleDay(index)}
                className={`px-3 py-2 rounded border text-sm transition ${
                  selectedDays.includes(index)
                    ? 'bg-white text-black font-semibold'
                    : 'bg-black text-white border-white'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Monthly - Select Day of Month */}
      {recurrenceType === 'monthly' && (
  <div>
    <label className="block mb-2 font-semibold">Select Month:</label>
    <select
      value={monthDay}
      onChange={(e) => setMonthDay(Number(e.target.value))}
      className="border rounded p-2 w-full"
    >
      {[
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ].map((month, index) => (
        <option key={index} value={index}>
          {month}
        </option>
      ))}
    </select>
  </div>
)}

      {/* Yearly - Select Month and Day */}
      {recurrenceType === 'yearly' && (
        <div className="space-y-2">
          <label className="block font-semibold">Select Month & Day:</label>
          <select
            value={yearlyMonth}
            onChange={(e) => setYearlyMonth(Number(e.target.value))}
            className="border p-2 w-full rounded"
          >
            {months.map((m, i) => (
              <option key={i} value={i}>{m}</option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            max="31"
            value={yearlyDay}
            onChange={(e) => setYearlyDay(Math.min(31, Math.max(1, Number(e.target.value) || 1)))}
            className="border rounded p-2 w-full"
            placeholder="Day of Month (e.g. 20)"
          />
        </div>
      )}
    </div>
  );
};

export default CustomizationSection;
