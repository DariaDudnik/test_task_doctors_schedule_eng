import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { faPowerOff, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { removePatient } from '../../redux/actions/patientsActions';

const PatientDropdown = () => {
  const isChecked = useSelector(state => state.patients.selectedPatient);
  const dispatch= useDispatch();

  const handlePatientRemove = patient => {
    dispatch(removePatient(patient));
  };

  return (
    <Dropdown as={ButtonGroup} >
      <Dropdown.Toggle variant="success" drop="down" size="sm" disabled= {isChecked ? false : true}>
        <FontAwesomeIcon icon={faUserAlt} />
      </Dropdown.Toggle>
      <Dropdown.Menu className="super-colors">
        <Dropdown.Item 
        onClick={() => handlePatientRemove()}
        >
          <FontAwesomeIcon icon={faPowerOff} />
            Close patient's card
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PatientDropdown;

