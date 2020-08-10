import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import DoctorsList from './DoctorsList';
import { requestDoctorsList } from '../../redux/actions/doctorsActions';
import { selectDoctor, toggleAllDoctors, toggleDoctorsByType } from '../../redux/actions/doctorsActions';

const DoctorsWidget = () => {
  const list = useSelector(state => state.doctors.doctorsList);
  const dispatch = useDispatch();
  const [groupedByType, setGroupedByType] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');  
  const [searchResults, setSearchResults] = useState([]);
  const [allChecked, setAllChecked] = useState(false);

  const numberOfCheckedDoctors = useMemo(() => (list && list.filter(x => x.checked).length), [list]);

  useEffect(() => {
    dispatch(requestDoctorsList());
  }, [dispatch]);

  useEffect(() => {
    const isAllChecked = list.every(item => item.checked === true);
    setAllChecked(isAllChecked);
  }, [list])

  const handleDoctorSelect = (id) => {
    dispatch(selectDoctor(id));
    setSearchTerm('');
  };

  const handleAllCheck = e => {
    dispatch(toggleAllDoctors(true));
  }

  const handleAllCheckByType = (ids, newVal) => {
    dispatch(toggleDoctorsByType(ids, newVal));
  }
  const handleRemoveCheckAll = e => {
    dispatch(toggleAllDoctors(false));
  }

  const handleSearch = event => {
    const results = list.filter(person => 
      (person.name.toLowerCase().indexOf(event.target.value) === 0 )||
      (person.type.toLowerCase().indexOf(event.target.value) === 0)
      )
    setSearchTerm(event.target.value);
    setSearchResults(results);
  };

  const searchItems = searchResults.map(doctor => (
    <Dropdown.Item
      eventKey="1"
      onClick={() => handleDoctorSelect(doctor.id)}
      id={doctor.id}
    >
      {doctor.name}({doctor.type})
    </Dropdown.Item>))

  const nothingFound = <Dropdown.Item>No matches</Dropdown.Item>

  return (
    <div>
      <div className="left-bar-container__block__top">
        <div className="d-flex">
          <h5 className="mr-1 leftbar-title">Specialists</h5>
          <span>{numberOfCheckedDoctors}/{list.length}</span>
          <div className="dropdown patient-dropdown">
            <button 
              className="btn btn-secondary dropdown-toggle patient-button"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="large material-icons">filter_list</i>
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button className="dropdown-item"
                onClick={(e) => handleAllCheck(e)}
                disabled={allChecked}
              >
                <FontAwesomeIcon icon={faCheck} />
                Select all
              </button>
              <button className="dropdown-item" href="#"
                onClick={(e) => handleRemoveCheckAll(e)}
                disabled={!allChecked}
                >
                  <FontAwesomeIcon icon={faTimes} />
                  Deselect all
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="left-bar-container__block__bottom">
        <div className="custom-input-container">
          <input
            type="text"
            placeholder="Type to find..."
            onChange={handleSearch}
            value={searchTerm}
          />
          <div className="input-button">
              <span><i className="large material-icons">search</i></span>
          </div>
        </div>
        {(searchItems.length === 0) ? (searchTerm !== '' && nothingFound) : (searchTerm.length >= 3 && searchItems)}
        <div className='leftbar-filter-toggler'>
          <button
            onClick={() => setGroupedByType(false)}
            className={`leftbar-filter-toggler__right ${!groupedByType ? 'leftbar-toggler__active' : ''}`}
          >
            Alphabetically
          </button>
          <button
            className={`leftbar-filter-toggler__left ${groupedByType ? 'leftbar-toggler__active' : ''}`}
            onClick={() => setGroupedByType(true)}
          >
            By type
          </button>
        </div>
      </div>
      <div className="leftbar-list mt-3">
        <DoctorsList
          doctors={list}
          groupedByType={groupedByType}
          handleDoctorSelect={handleDoctorSelect}
          handleAllCheckByType={handleAllCheckByType}
        />
      </div>
    </div>
  );
};

export default DoctorsWidget;
