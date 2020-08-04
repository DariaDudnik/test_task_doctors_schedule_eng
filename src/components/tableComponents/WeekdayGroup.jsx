import React, { useMemo, memo } from 'react';
import { useSelector } from 'react-redux';
import DoctorWorkday from './DoctorWorkday';
import moment from 'moment';

const WeekdayGroup = ({ day }) => {
  const doctors = useSelector(state => state.doctors.doctorsList);
  const checkedDoctors = doctors.filter(d => d.checked === true);

  const selectedDoctors = checkedDoctors.length ? checkedDoctors : doctors;

  const workingDoctors = useMemo(() => selectedDoctors.filter((doctor) => {
    const workWeekFrom = moment(day).isoWeekday(doctor.workWeekStart);
    const workWeekTo = moment(day).isoWeekday(doctor.workWeekTo);
    const isWorkingDay = moment(day).isBetween(workWeekFrom, workWeekTo, undefined, '[]');

    return isWorkingDay;
  }), [day, selectedDoctors]);

  return <div className="main-container__schedule">
    {workingDoctors.map(doctor => (
      <DoctorWorkday doctor={doctor} day={day} key={doctor.id} />
    ))}
  </div>
}

export default memo(WeekdayGroup);