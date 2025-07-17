// components/Calendar.js
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Calendar = ({ selectedDate, onDateChange }) => {
  const getDaysOfWeek = () => {
    const startOfWeek = new Date(selectedDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }

    return days;
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + direction * 7);
    onDateChange(newDate);
  };

  const renderCalendar = () => {
    const days = getDaysOfWeek();
    const dayNames = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

    return days.map((date, index) => {
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = date.toDateString() === selectedDate.toDateString();

      return (
        <div
          key={index}
          onClick={() => onDateChange(date)}
          className={`
            flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-all duration-200 min-w-[60px]
            ${
              isSelected
                ? "bg-blue-600 text-white shadow-lg"
                : "hover:bg-gray-100"
            }
            ${isToday && !isSelected ? "bg-blue-50 text-blue-600" : ""}
          `}
        >
          <span className="text-xs font-medium mb-1">{dayNames[index]}</span>
          <span className="text-lg font-semibold">{date.getDate()}</span>
        </div>
      );
    });
  };

  return (
    <div className="flex items-center justify-center mb-6 lg:mb-8">
      <button
        onClick={() => navigateWeek(-1)}
        className="p-2 lg:p-3 hover:bg-gray-100 rounded-full"
      >
        <FaChevronLeft className="text-gray-500 text-sm lg:text-lg" />
      </button>
      <div className="flex space-x-1 lg:space-x-4 mx-4 lg:mx-8 overflow-x-auto">
        {renderCalendar()}
      </div>
      <button
        onClick={() => navigateWeek(1)}
        className="p-2 lg:p-3 hover:bg-gray-100 rounded-full"
      >
        <FaChevronRight className="text-gray-500 text-sm lg:text-lg" />
      </button>
    </div>
  );
};

export default Calendar;