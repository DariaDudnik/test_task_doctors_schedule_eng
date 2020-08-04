import React from 'react';
import { cancelAppointment } from '../../redux/actions/doctorsActions';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
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


const CancelAppModal = ({ showModalCancel, onRequestClose, handleSuccessClose }) => {
  const appointment = {};
  const dispatch = useDispatch();
  const doctor = useSelector((state) => state.doctors.currentDoctor);
  const selectedDate = useSelector((state) => state.doctors.appointmentDate);

  appointment.doctorId = doctor.id;
  appointment.date = selectedDate;

  const confirmCancellation = () => {
      dispatch(cancelAppointment(appointment));
      handleSuccessClose();
  }

  return (
    <Modal
      isOpen={showModalCancel}
      style={customStyles}
      onRequestClose={onRequestClose}
      contentLabel="appointmentCancel"
      ariaHideApp={false}
    >
      <div style={componentStyle.declineModal}>
        <div style={componentStyle.declineModalTitle}>
          <i style={componentStyle.declineModalTitleIcon} className="large material-icons">error</i>
          <span>Отмена записи</span>
        </div>
        <div style={componentStyle.declineModalText}>
          Врач и пациент будут уведомлены об отмене записи.
        </div>
        <button
          style={componentStyle.declineModalButton}
          onClick={confirmCancellation}
        >
          Отменить
        </button>
        <div style={componentStyle.declineModalBackLink} onClick={handleSuccessClose}>Вернуться к расписанию</div>
      </div>
    
    </Modal>
  )
};
export default CancelAppModal;
