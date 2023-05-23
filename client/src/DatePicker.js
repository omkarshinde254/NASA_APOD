import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MyDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="w-full max-w-xs">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MMM dd, yyyy"
        placeholderText="Select a date"
        className="w-full border border-blue-500 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default MyDatePicker;