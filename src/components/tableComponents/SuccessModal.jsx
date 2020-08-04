import React from 'react';
import Modal from 'react-modal';
import componentStyle from '../../modal.css.js';

const SuccessModal = ({ show, onRequestClose, style}) => (
  <Modal
    isOpen={show}
    onRequestClose={onRequestClose}
    style={style}
    contentLabel="appointmentSuccess"
    ariaHideApp={false}
  >
    <div style={componentStyle.successModal}>
      <div style={componentStyle.successModalTitle}>Запись создана</div>
      <div style={componentStyle.successModalBody}>
        <i style={componentStyle.successModalBodyIcon} className="large material-icons">check_circle</i>
      </div>
    </div>
  </Modal>
);

export default SuccessModal;
