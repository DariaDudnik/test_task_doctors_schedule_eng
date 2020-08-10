import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import throttle from 'lodash/throttle';
import PatientDropdown from './PatientDropdown';
import {
  requestPatientsList, selectPatient,
} from '../../redux/actions/patientsActions';
import PatientsCard from './PatientsCard';

const SearchWidget = () => {
  const selectedPatient = useSelector((state) => state.patients.selectedPatient);
  const list = useSelector((state) => state.patients);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();

  const throttledSearchTerm = useRef(throttle((query) => setSearchTerm(query), 500)).current;

  useEffect(() => {
    dispatch(requestPatientsList());
  }, [dispatch]);

  const handleChange = (event) => {
    const results = list.patientList
      .filter((person) => person.name.toLowerCase().includes(event.target.value)
      || person.healthInsuranceNumber.toLowerCase().includes(event.target.value));

    throttledSearchTerm(event.target.value);
    setSearchResults(results);
  };

  const handlePatientSelect = (patient) => {
    dispatch(selectPatient(patient));
    setSearchTerm('');
  };

  const searchItems = searchResults.map((patient) => (
    <Dropdown.Item
      eventKey="1"
      onClick={() => handlePatientSelect(patient)}
      id={patient.id}
    >
      {patient.name},
      {patient.healthInsuranceNumber}
    </Dropdown.Item>
  ));

  const nothingFound = <Dropdown.Item>Nothing found</Dropdown.Item>;

  return (
    <div className="left-bar-container__block">
      <div className="left-bar-container__block__top">
        <h5 className="leftbar-title">Patient</h5>
        <PatientDropdown
          className="btn btn-secondary btn-sm dropdown-toggle patient-button"
          id="dropdownMenuButton"
        />
      </div>
          { selectedPatient ? <PatientsCard checkedPatient={selectedPatient} />
          : (
          <div className="left-bar-container__block__bottom">
            <div className="custom-input-container">
              <input
                type="text"
                placeholder="Type to find..."
                aria-label="текст для поиска"
                aria-describedby="basic-addon2"
                onChange={handleChange}
                value={searchTerm}
              />
              <div className="input-button">
                <span><i className="large material-icons">search</i></span>
              </div>
            </div>
            {(searchItems.length === 0) ? (searchTerm !== '' && nothingFound) : (searchTerm.length >= 3 && searchItems)}
          </div>
        )}
    </div>

  );
};

export default SearchWidget;
