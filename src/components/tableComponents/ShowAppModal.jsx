import React from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import moment from 'moment';
import componentStyle from '../../modal.css.js';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


const ShowAppModal = ({ openShowAppModal, onRequestClose, modalData }) => {
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
      style={customStyles}
      onRequestClose={onRequestClose}
      contentLabel="appointmentCancel"
      ariaHideApp={false}
    >
      <div style={componentStyle.modalContainer}>
        <div style={componentStyle.modalHeaderBlock}>
          <div style={componentStyle.modalHeaderBlockNext}>
            <i className="large material-icons">assignment</i>
            <span style={componentStyle.modalHeaderBlockNextSpan}>{patientInfo.patient.name}</span>
          </div>
        </div>
        <div style={componentStyle.modalBodyBlock}>
          <span>Дата:&ensp;{moment(patientInfo.date).format("DD.MM.YYYY")}</span>
        </div>
        <div style={componentStyle.modalBodyBlock}>
          <span>Врач:&ensp;{currentDoctor.name}</span>
        </div>
        <div style={componentStyle.modalBodyBlock}>
          <span>Кабинет:&ensp;{roomNumber}</span>
        </div>
        <div style={componentStyle.modalBodyBlock}>
          <span>Полис ОМС:&ensp;{patientInfo.patient.healthInsuranceNumber}</span>
        </div>
      </div>
    </Modal>
  )
};
export default ShowAppModal;
