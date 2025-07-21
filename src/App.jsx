import React, { useState,useEffect} from 'react';
import {
  addDays,parseISO,isAfter,isBefore,isValid,format,getDay,addMonths,setDate,setMonth,setYear,addWeeks, 
} from 'date-fns';

import RecurringOptions from './components/RecurringOptions';
import CustomizationSection from './components/CustomizationSection';
import DateRangePicker from './components/DateRangePicker';
import CalendarPreview from './components/CalendarPreview';

const App = () => {
  const [recurrenceType, setRecurrenceType] = useState('daily');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
 
 const [interval, setInterval] = useState(1); 
 const [selectedDays, setSelectedDays] = useState([]); 
  const [monthDay, setMonthDay] = useState(0); 
  const [yearlyMonth, setYearlyMonth] = useState(0); 
  const [yearlyDay, setYearlyDay] = useState(1); 
  const [dates, setDates] = useState([]);
 
 useEffect(() => {
  if (!startDate || interval < 1) {
    setDates([]);
    return;
  }

  try {
    const result = [];
    let current = parseISO(startDate);
    const end = endDate ? parseISO(endDate) : null;

    const start = parseISO(startDate); 

    let count = 0;

    while (count < 100) {
      if (end && isAfter(current, end)) break;
      if (!isValid(current)) break;

      switch (recurrenceType) {
         case 'Daily': {
      
      

      result.push(format(current, 'yyyy-MM-dd'));
      current = addDays(current, interval); 
      break;
    }

        case 'weekly': {
  if (!selectedDays || selectedDays.length === 0) break;

  for (let i = 0; i < 7; i++) {
    const weekDay = addDays(current, i);
    if (end && isAfter(weekDay, end)) break;
    if (selectedDays.includes(getDay(weekDay))) {
      result.push(format(weekDay, 'yyyy-MM-dd'));
    }
  }

  current = addWeeks(current, interval);
  break;
}

        case 'monthly':
  
  const monthlyDate = setDate(current, monthDay);

  
  if ((!start || !isBefore(monthlyDate, start)) && (!end || !isAfter(monthlyDate, end))) {
    result.push(format(monthlyDate, 'yyyy-MM-dd'));
  }

  
  current = addMonths(current, interval);
  break;

case 'yearly':
  const year = current.getFullYear();

  const yearlyDate = setYear(setMonth(setDate(new Date(), yearlyDay), yearlyMonth), year);
  
  if (!end || !isAfter(yearlyDate, end)) {
    result.push(format(yearlyDate, 'yyyy-MM-dd'));
  }
  
  current = setYear(current, year + interval);
  break;

        default:
          break;
      }

      count++;
    }

    setDates(result);
  } catch (err) {
    console.error('Error in recurrence generation:', err);
    setDates([]);
  }
}, [
  recurrenceType,
  interval,
  startDate,
  endDate,
  selectedDays,
  monthDay,
  yearlyMonth,
  yearlyDay,
]);





  return (
    
      
    
    <div className="flex items-center justify-center text-black">

      <div className="border border-gray-300
hover:border-pink-500
 rounded-lg w-[600px] h-auto bg-white/20 p-6 shadow-xl space-y-6 mt-10">
        <h1 className="text-4xl bg-gradient-to-r from-black via-black t0-black font-bold text-center bg-clip-text text-transparent">Recurring Date Picker </h1>

        {/* Recurrence Options Buttons */}
        <RecurringOptions selected={recurrenceType} onChange={setRecurrenceType} />

        {/* Currently selected type */}
        <p className="text-center text-xl">
          <strong>Currently Selected:</strong> {recurrenceType}
        </p>

        {/* Customization Section */}
       <CustomizationSection
          interval={interval}
          setInterval={setInterval}
          recurrenceType={recurrenceType}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
          monthDay={monthDay}
          setMonthDay={setMonthDay}
          yearlyMonth={yearlyMonth}
          setYearlyMonth={setYearlyMonth}
          yearlyDay={yearlyDay}
          setYearlyDay={setYearlyDay}
        />



        {/* Date Picker */}
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartChange={setStartDate}
          onEndChange={setEndDate}
        />

        {/* Calendar Preview */}
        <CalendarPreview dates={dates} />
      </div>
    </div>
    
  );
};

export default App;  