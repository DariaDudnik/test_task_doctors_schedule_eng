import React from 'react';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import MomentA from 'moment';
import { extendMoment } from 'moment-range';
import WeekdayGroup from './WeekdayGroup'

const moment = extendMoment(MomentA);

const Schedule = () => {
  const timeRangeFrom = useSelector((state) => state.schedule.timeRangeFrom);
  const timeRangeTo = useSelector((state) => state.schedule.timeRangeTo);
  const selectedDate = useSelector((state) => state.schedule.currentDate);
  const selectedDoctors = useSelector((state) => state.doctors.selectedDoctors);
  const range = moment.range(timeRangeFrom, timeRangeTo);
  const daysRange = Array.from(range.by('day'));

  return (
    <div className="scroll-container">
      {
      (selectedDoctors || selectedDate) ? 
        daysRange.map(day => 
          <WeekdayGroup key={day.format('MMM Do YY')} day={day} />
        )
        :
        <div className="empty-data">To view the schedule, select at least one Available resource</div>
      }
    </div>
  )
}

export default Schedule;
