import React, { useState } from 'react';
import Modal from 'react-modal';
import { createAppointment } from '../../redux/actions/doctorsActions';
import { useDispatch, useSelector } from 'react-redux';
import SuccessModal  from './SuccessModal';
import ShowAppModal  from './ShowAppModal';
import CancelAppModal from './CancelAppModal';
import { appointmentTypes } from '../../redux/constants/constants';
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

const AppModal = ({ handleClose, show, modalData }) => {
  let data = modalData ? modalData : { 
    startMoment: null,
    rangeString: null,
    fillStatus: null,
  };

  const appointment = {};
  const dispatch = useDispatch();
  const doctor = useSelector((state) => state.doctors.currentDoctor);
  const selectedDate = useSelector((state) => state.doctors.appointmentDate);
  const selectedPatient = useSelector((state) => state.patients.selectedPatient);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [openShowAppModal, setShowAppModal] = useState(false);

  appointment.doctor = doctor;
  appointment.doctorId = doctor.id;
  appointment.date = selectedDate;
  appointment.patient = selectedPatient;
  appointment.appointmentType = appointmentTypes.PATIENT;

  const handleAppCreation = () => {
    dispatch(createAppointment(appointment));
    handleClose();
    handleSuccess();
  }

  const handleAppCancellation = () => {
    setShowModalCancel(true);
    handleClose();
  }

  const handleAppShow = () => {
    setShowAppModal(true);
  }

  const handleCloseAppShow = () => {
    setShowAppModal(false);
    handleClose();
  }

  const handleSuccess = () => {
    setShowModalSuccess(true);
    setTimeout(() => setShowModalSuccess(false), 3000);
  }

  const handleSuccessClose = () => {
    setShowModalCancel(false);
  }

  const isDisabledToCreate = !(selectedPatient && (data.fillStatus && data.fillStatus.length <2));
  const isDisabledToCancel = !(data.fillStatus && data.fillStatus[0] && data.fillStatus[0].appointmentType === "PATIENT");

  return (
    <div>
      <Modal
        isOpen={show}
        onRequestClose={handleClose}
        style={customStyles}
        className={""}
        contentLabel="appointmentModal"
        ariaHideApp={false}
      >
        <div className="modal-container">
          <div style={componentStyle.modalHeaderBlock}>
            <div style={componentStyle.modalHeaderBlockNext}><i className="large material-icons">access_time</i></div>
            <span style={componentStyle.modalHeaderBlockNextSpan}>Выбран интервал времени<br />{data.rangeString}</span>
          </div>
          <div style={componentStyle.modalBodyBlock} disabled={isDisabledToCancel}>
            <div style={componentStyle.modalBodyBlockNextDiv}><i className="large material-icons">assignment</i></div>
            <span
            onClick={() => handleAppShow()}
            > 
            Просмотреть запись
            </span>
          </div>
          <div style={componentStyle.modalBodyBlock} disabled={isDisabledToCreate}>
            <div style={componentStyle.modalBodyBlockNextDiv}><i className="large material-icons">create</i></div>
            <span
              style={isDisabledToCreate ? componentStyle.disabled : componentStyle.modalBodyCreateSpan}
              onClick={() => handleAppCreation()}
              >
                Создать запись
            </span>
            </div>
          <div style={componentStyle.modalBodyBlock} disabled={isDisabledToCancel}>
            <div style={componentStyle.modalBodyBlockNextDiv}><i className="large material-icons">delete</i></div>
            <span
              style={isDisabledToCancel ? componentStyle.disabled : componentStyle.modalBodyCancelSpan}
              onClick={() => handleAppCancellation()}
              >
                Отменить запись
                </span>
            </div>
        </div>
      </Modal>

      <SuccessModal
        show={showModalSuccess}
        onRequestClose={handleSuccessClose}
        style={customStyles}
        ariaHideApp={false}
      />
      <ShowAppModal
        openShowAppModal={openShowAppModal}
        onRequestClose={handleCloseAppShow}
        style={customStyles}
        modalData={modalData}
      />
      <CancelAppModal
        showModalCancel={showModalCancel}
        onRequestClose={handleClose}
        handleSuccessClose={handleSuccessClose}
        style={customStyles}
      />
    </div>
  )
};

export default AppModal;
