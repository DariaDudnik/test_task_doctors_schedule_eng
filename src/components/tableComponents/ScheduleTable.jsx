import React from 'react';
import DaysFilter from './DaysFilter';
import Schedule from './Schedule';

const ScheduleTable = () => (
  <div className="schedule-table">
    <DaysFilter />
    <Schedule />
  </div>
);

export default ScheduleTable;
