import React from 'react';
import { cancelAppointment } from '../../redux/actions/doctorsActions';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

const CancelAppModal = ({ showModalCancel, onRequestClose, handleSuccessClose, style }) => {
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
      style={style}
      onRequestClose={onRequestClose}
      contentLabel="appointmentCancel"
      ariaHideApp={false}
    >
      <div style={style.declineModal}>
        <div style={style.declineModalTitle}>
          <i style={style.declineModalTitleIcon} className="large material-icons">error</i>
          <span>Appointment cancellation</span>
        </div>
        <div style={style.declineModalText}>
          Doctor and patient will be informed about the cancellation.
        </div>
        <button
          style={style.declineModalButton}
          onClick={confirmCancellation}
        >
          Cancel
        </button>
        <div style={style.declineModalBackLink} onClick={handleSuccessClose}>Back to the schedule</div>
      </div>
    
    </Modal>
  )
};
export default CancelAppModal;
