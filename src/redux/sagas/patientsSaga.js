/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
import { call, put, takeEvery } from 'redux-saga/effects';
import { getPatientsList } from '../services-fake';
import {
  REQUEST_PATIENTS_LIST,
  REQUEST_PATIENTS_LIST_FAILED,
} from '../constants/constants';

import { requestPatientsListSuccess } from '../actions/patientsActions';

function *fetchPatients(action) {
  try {
    const data = yield call(getPatientsList);

    yield put(requestPatientsListSuccess(data.patients));
  } catch (error) {
    yield put({
      type: REQUEST_PATIENTS_LIST_FAILED,
      message: error.message,
    });
  }
}

export default function *fetchPatientsInfoWatcher() {
  yield takeEvery(REQUEST_PATIENTS_LIST, fetchPatients);
}
