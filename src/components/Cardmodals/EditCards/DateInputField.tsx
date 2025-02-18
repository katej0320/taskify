import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateInputFieldProps {
  label: string;
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

const DateInputField: React.FC<DateInputFieldProps> = ({
  label,
  selectedDate,
  onDateChange,
}) => {
  return (
    <div>
      <label>{label}</label>
      <DatePicker
        selected={selectedDate}
        onChange={onDateChange}
        showTimeSelect
        timeFormat="HH:mm"
        dateFormat="yyyy.MM.dd HH:mm"
      />
    </div>
  );
};

export default DateInputField;
