import React, { useState } from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { setTimeFilter } from '../../redux/actions/scheduleActions';


const DaysFilter = () => {
  const [activeButton, setActiveButton] = useState(0);
  const dispatch = useDispatch();

  const handleTimeRange = (e) => {
    dispatch(setTimeFilter(e.target.value));
    setActiveButton(e.target.value);
  }

  return (
    <ButtonToolbar className="schedule-table-filter" >
    <div>Расписание специалистов</div>
      <ButtonGroup >
        <Button
          value={0}
          variant="success"
          onClick={(e) => handleTimeRange(e)}
          active={activeButton === 0}
          >1 день</Button>
        <Button
          value={1}
          variant="success"
          onClick={(e) => handleTimeRange(e)}
          active={activeButton === 1}
          >2 дня</Button>
        <Button 
          variant="success"
          value={6}
          onClick={(e) => handleTimeRange(e)} 
          active={activeButton === 6}
          >Неделя
        </Button>
      </ButtonGroup>
    </ButtonToolbar>
  );
};

export default DaysFilter;

