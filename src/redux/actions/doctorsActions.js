import {
  REQUEST_DOCTORS_LIST,
  REQUEST_DOCTORS_LIST_SUCCESS,
  SELECT_DOCTOR,
  TOGGLE_ALL_DOCTORS,
  TOGGLE_DOCTORS_BY_TYPE,
  CREATE_APPOINTMENT,
  CANCEL_APPOINTMENT,
  SHOW_APPOINTMENT,
} from '../constants/constants';

export const requestDoctorsList = (data) => ({
  payload: data,
  type: REQUEST_DOCTORS_LIST,
});

export const requestDoctorsListSuccess = (list) => ({
  payload: list,
  type: REQUEST_DOCTORS_LIST_SUCCESS,
});

export const selectDoctor = (id, date) => ({
  payload: id,
  date,
  type: SELECT_DOCTOR,
});

export const toggleDoctorsByType = (ids, newVal) => ({
  payload: { ids, newVal},
  type: TOGGLE_DOCTORS_BY_TYPE,
});

export const toggleAllDoctors = (state) => ({
  payload: state,
  type: TOGGLE_ALL_DOCTORS,
});

export const createAppointment = (appointmentInfo) => ({
  payload: appointmentInfo,
  type: CREATE_APPOINTMENT,
});

export const cancelAppointment = (state) => ({
  payload: state,
  type: CANCEL_APPOINTMENT,
});

export const showAppointment = (state) => ({
  payload: state,
  type: SHOW_APPOINTMENT,
});
