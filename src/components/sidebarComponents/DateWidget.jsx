import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import "react-datepicker/dist/";
import addMonths from 'date-fns/addMonths'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { selectDate, toggleCalendar } from '../../redux/actions/scheduleActions';

const DateWidget = () => {
  const selectedDate = useSelector(state => state.schedule.currentDate);
  const datePickerIsOpen = useSelector(state => state.schedule.datePickerIsOpen);
  const dispatch = useDispatch();

  return (
    <div className="left-bar-container__block">
      <div className="left-bar-container__block__top">
      <h5 className="leftbar-title">Appointment date</h5>
    </div>
      <div className="input-group left-bar-container__block__bottom">
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={selectedDate}
          onChange={(e) => dispatch(selectDate(e))}
          minDate={new Date()}
          maxDate={addMonths(new Date(), 5)}
          calendarClassName="rasta-stripes"
          dropdownMode="select"
          placeholderText='DD.ММ.YYYY'
          showDisabledMonthNavigation
          className="search-bar-date-calendar"
          open={datePickerIsOpen}
          onBlur={() => dispatch(toggleCalendar(datePickerIsOpen === false))}
        />
        <button
          className="btn btn-secondary search-bar-date-icon"
          size="sm"
          onClick={() => dispatch(toggleCalendar(!datePickerIsOpen))}
        >
        <FontAwesomeIcon 
          icon={faCalendarAlt}
        />
        </button>
      </div>
    </div>
  );
};

export default DateWidget;

