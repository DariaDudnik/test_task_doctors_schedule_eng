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
      name: 'null',
    },
    date: moment(),
  };
  const currentDoctor = useSelector(state => state.doctors.currentDoctor);

console.log(patientInfo, 'asdasdas!!!')

  return (
    <Modal
      isOpen={openShowAppModal}
      style={style}
      onRequestClose={onRequestClose}
      contentLabel="appointmentCancel"
      ariaHideApp={false}
    >
      <div style={style.modalContainer}>
        <div style={style.modalHeaderBlockCenter}>
          <div style={style.modalHeaderBlockNext}>
            <i className="large material-icons">assignment</i>
            <span style={style.modalHeaderBlockNextSpan}>{patientInfo.patient.name}</span>
          </div>
        </div>
        <div style={style.modalBodyBlockInfo}>
          <div style={style.textBoldInfo}>Date:&ensp;</div>
          <div style={style.modalBodyBlockInfoData}>{moment(patientInfo.date).format("DD.MM.YYYY")}</div>
        </div>
        <div style={style.modalBodyBlockInfo}>
          <div style={style.textBoldInfo}>Doctor:&ensp;</div>
          <div style={style.modalBodyBlockInfoData}>{currentDoctor.name}</div>
        </div>
        <div style={style.modalBodyBlockInfo}>
          <div style={style.textBoldInfo}>Room:&ensp;</div>
          <div style={style.modalBodyBlockInfoData}>{currentDoctor.room}</div>
        </div>
        <div style={style.modalBodyBlockInfo}>
          <div style={style.textBoldInfo}>Health insurance number:&ensp;</div>
          <div style={style.modalBodyBlockInfoData}>{patientInfo.patient.healthInsuranceNumber}</div>
        </div>
      </div>
    </Modal>
  )
};
export default ShowAppModal;
