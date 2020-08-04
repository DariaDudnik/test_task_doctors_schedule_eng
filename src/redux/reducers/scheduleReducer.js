import {
  SELECT_DATE,
  TOGGLE_CALENDAR,
  SET_TIME_FILTER,
} from '../constants/constants';
import produce from "immer";
import moment from 'moment';

const initialState = {
  currentDate: null,
  datePickerIsOpen: false,
  timeRangeFrom: moment(),
  timeRangeTo: moment(),
  dayFilterInterval: 0,
};

const schedule = (state = initialState, action) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case SELECT_DATE:
        draftState.currentDate = action.payload;
        draftState.datePickerIsOpen = false;
        const filter = moment(draftState.currentDate).add(draftState.dayFilterInterval, 'day')
        if(draftState.currentDate !== null) {
          draftState.timeRangeFrom = draftState.currentDate;
        }
        draftState.timeRangeTo = filter;
        break;
      case TOGGLE_CALENDAR:
        draftState.datePickerIsOpen = action.payload;
        break;
      case SET_TIME_FILTER:
        const timeFilter = moment(draftState.currentDate).add(action.payload, 'days')
        if(draftState.currentDate !== null) {
          draftState.timeRangeFrom = draftState.currentDate;
          draftState.timeRangeTo = timeFilter;
        }
        draftState.dayFilterInterval = action.payload;
        break;
      default:
        return state;
    }
  });
};

export default schedule;

