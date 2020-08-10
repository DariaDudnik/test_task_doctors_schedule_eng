import React from 'react';
import Modal from 'react-modal';

const SuccessModal = ({ show, onRequestClose, style}) => (
  <Modal
    isOpen={show}
    onRequestClose={onRequestClose}
    style={style}
    contentLabel="appointmentSuccess"
    ariaHideApp={false}
  >
    <div style={style.successModal}>
      <div style={style.successModalTitle}>Appointment created</div>
      <div style={style.successModalBody}>
        <i style={style.successModalBodyIcon} className="large material-icons">check_circle</i>
      </div>
    </div>
  </Modal>
);

export default SuccessModal;
