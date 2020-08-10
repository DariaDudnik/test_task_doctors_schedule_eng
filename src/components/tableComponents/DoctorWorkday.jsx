import React, { useCallback, memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import MomentA from 'moment';
import Moment from 'react-moment';
import { extendMoment } from 'moment-range';
import AppModal from './AppModal';
import { selectDoctor } from '../../redux/actions/doctorsActions';
import { appointmentTypes } from '../../redux/constants/constants';

const moment = extendMoment(MomentA);
const hour = 60;

const AppointmentTime = ({ fillStatus, rangeString, startMoment, showModal }) => {
  const handleClick = useCallback(() => 
    showModal({startMoment, rangeString, fillStatus}),
      [startMoment, rangeString, showModal, fillStatus]
  );


  if(!fillStatus.length) {
    return <div className="schedule-day__time" onClick={handleClick}>{startMoment.format("HH:mm")}</div>
  }

  const fillContent = fillStatus.map((slot, index) => {
    if(slot.appointmentType === appointmentTypes.PATIENT) {
      const shortName = slot.patient.name.split(/\s+/).map((w,i) => i ? w.substring(0,1).toUpperCase() + '.' : w).join(' ');
      const shortDate = moment(slot.date).format("HH:mm")
      return (<div className="schedule-day__time" key={index} onClick={handleClick}>{shortDate}{shortName}</div>)
    }
    if(slot.appointmentType === appointmentTypes.STUDY) {
      return (<div key={index} className="schedule-day__activity-secondary">Studing</div>)
    }
    if(slot.appointmentType === appointmentTypes.PAPERWORK) {
      return (<div key={index} className="schedule-day__activity-secondary"> Work with documents</div>)
    }
    if(slot.appointmentType === appointmentTypes.OFF) {
      return (<div key={index} className="schedule-day__activity-secondary">Doctor is off</div>)
    }
    if(slot.appointmentType === appointmentTypes.NOAPP) {
      return (<div key={index} className="schedule-day__activity-secondary">Doctor doesn't accept patients</div>)
    }

    return( <div key={index} className="schedule-day__activity-secondary">":"</div>)
  })
 
  return (
    <div className="schedule-table-time-box">
      {fillContent}
    </div>
  );
}

const DoctorWorkday = ({ doctor, day }) => {
  const [showAppModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const timeRange = parseInt(doctor.end, 10) - parseInt(doctor.start, 10);
  const intervalMinutes = timeRange * hour;
  const appointmentsNumber = intervalMinutes / parseInt(doctor.interval, 10);
  const appointmentSlots = [];
  const dispatch = useDispatch();

  for (let i = 0; i < appointmentsNumber; i++) {
    const start = parseInt(doctor.start, 10) * 60;
    const cur = start + doctor.interval * i;
    const curHours = Math.floor(cur / 60);
    const curMins = cur % 60;
    const curMinsString = ('0'+curMins).substr(-2);

    const next = start + doctor.interval * i;
    const nextHours = Math.floor(next / 60);
    const nextMins = next % 60 + doctor.interval;
    const nextMinsString = ('0'+nextMins).substr(-2);

    const periodStartMoment = moment(day);
    periodStartMoment.set('hour', curHours);
    periodStartMoment.set('minute', curMins);


    const fillStatus =  doctor.appointments.filter(app => { 
      if(app.date){
        return moment(app.date).isSame(periodStartMoment);
      }
      if(app.appointmentType === "STUDY" || app.appointmentType === "PAPERWORK") {
        const timeFrom = moment(day).isoWeekday(app.dayFrom);
        const timeTo = moment(day).isoWeekday(app.dayTo);
        const isCurDay = moment(day).isBetween(timeFrom, timeTo, undefined, '[]');

        if(isCurDay) {
          const currentDayFrom = moment(day).hours(app.timeFrom.substring(0,2)).minutes(app.timeFrom.substring(0,-2));
          const currentDayTo = moment(day).hours(app.timeTo.substring(0,2)).minutes(app.timeTo.substring(0,-2));
          const isTime= moment(periodStartMoment).isBetween(currentDayFrom, currentDayTo, undefined, '[]');
          return isTime;
        }
        return moment(app.date).isSame(periodStartMoment);
      }
      return false;
    });

    appointmentSlots.push({
      time: `${curHours}:${curMinsString}`,
      rangeString: `${curHours}:${curMinsString}-${nextHours}:${nextMinsString}`,
      startMoment: periodStartMoment,
      fillStatus: fillStatus,
    });
  }

  const showModal = modalData => {
    setModalData(modalData);
    setShowModal(true);
    dispatch(selectDoctor(doctor.id, modalData.startMoment));
  };


  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div >
      <article className="main-container__schedule-day">
        <div  className="schedule-day__date"><Moment format="ddd. DD MMM" date={day} /></div>
        <div className="schedule-day__person">
          <div className="schedule-day__person-name">{doctor.name}</div>
          <div className="schedule-day__person-position">{doctor.type}</div>
        </div>

        <div className="schedule-day__activity-main">
          <div className="schedule-day__activity-title">room {doctor.room}</div>
          <div className="schedule-day__activity-body">{doctor.start}-{doctor.end}</div>
        </div>
        <div  className="schedule-day__time">
          {appointmentSlots.map(({ time, rangeString, startMoment, fillStatus }, index) =>
            <AppointmentTime
              time={time}
              key={index}
              rangeString={rangeString}
              startMoment={startMoment}
              showModal={showModal}
              fillStatus={fillStatus}
            />
          )}
        </div>
      </article>

    <AppModal
      show={showAppModal}
      handleClose={handleClose}
      modalData={modalData}
    />
  </div>
  );
}

export default memo(DoctorWorkday);