import { combineReducers } from 'redux';
import doctors from './doctorsReducer';
import patients from './patientsReducer';
import schedule from './scheduleReducer';

export default combineReducers({
  doctors,
  schedule,
  patients,
});
