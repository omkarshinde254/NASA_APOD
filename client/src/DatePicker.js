import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import setDateCtr from './pages/ApodHome'

const MyDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    var timeDifference = new Date().getTime() - date.getTime();
    var dayDifference = timeDifference / (1000 * 3600 * 24);
    setDateCtr(previousCount => dayDifference);
    setSelectedDate(date);
  };

  return (
    <div className="w-full max-w-xs">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MMM dd, yyyy"
        placeholderText="Select a date"
        // className="w-full border border-blue-500  bg-[#a1a1aa] rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        className="w-full border border-[#393E46]  bg-[#e4e4e7] rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default MyDatePicker;