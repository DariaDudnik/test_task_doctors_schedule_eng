import React from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import moment from 'moment';

const ShowAppModal = ({ openShowAppModal, onRequestClose, modalData, style }) => {
  let data = modalData ? modalData : { 
    startMoment: null,
    rangeString: null,
    fillStatus: [],
  };

  let patientInfo = data.fillStatus[0] ? data.fillStatus[0] : {
    patient: {
      name: null,
    },
    date: moment(),
  };
  const currentDoctor = useSelector(state => state.doctors.currentDoctor);
  const roomNumber = currentDoctor.room ? currentDoctor.room.slice(2) : '';

  return (
    <Modal
      isOpen={openShowAppModal}
      style={style}
      onRequestClose={onRequestClose}
      contentLabel="appointmentCancel"
      ariaHideApp={false}
    >
      <div style={style.modalContainer}>
        <div style={style.modalHeaderBlock}>
          <div style={style.modalHeaderBlockNext}>
            <i className="large material-icons">assignment</i>
            <span style={style.modalHeaderBlockNextSpan}>{patientInfo.patient.name}</span>
          </div>
        </div>
        <div style={style.modalBodyBlock}>
          <span>Дата:&ensp;{moment(patientInfo.date).format("DD.MM.YYYY")}</span>
        </div>
        <div style={style.modalBodyBlock}>
          <span>Врач:&ensp;{currentDoctor.name}</span>
        </div>
        <div style={style.modalBodyBlock}>
          <span>Кабинет:&ensp;{roomNumber}</span>
        </div>
        <div style={style.modalBodyBlock}>
          <span>Полис ОМС:&ensp;{patientInfo.patient.healthInsuranceNumber}</span>
        </div>
      </div>
    </Modal>
  )
};
export default ShowAppModal;
