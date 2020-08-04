import {
  SELECT_DATE,
  TOGGLE_CALENDAR,
  SET_TIME_FILTER,
} from '../constants/constants';

export const selectDate = date => ({
  payload: date,
  type: SELECT_DATE,
});

export const toggleCalendar = state => ({
  payload: state,
  type: TOGGLE_CALENDAR,
});

export const setTimeFilter = range => ({
  payload: range,
  type: SET_TIME_FILTER,
});