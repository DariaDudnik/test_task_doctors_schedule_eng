import {
  REQUEST_PATIENTS_LIST,
  REQUEST_PATIENTS_LIST_SUCCESS,
  SELECT_PATIENT,
  REMOVE_PATIENT,
} from '../constants/constants';

export const requestPatientsList = data => ({
  payload: data,
  type: REQUEST_PATIENTS_LIST,
});

export const requestPatientsListSuccess = list => ({
  payload: list,
  type: REQUEST_PATIENTS_LIST_SUCCESS,
});

export const selectPatient = patientInfo => ({
  payload: patientInfo,
  type: SELECT_PATIENT,
});

export const removePatient = data => ({
  payload: data,
  type: REMOVE_PATIENT,
});




