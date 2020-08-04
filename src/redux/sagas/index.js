import { all } from 'redux-saga/effects';
import doctors from './doctorsSaga';
import patients from './patientsSaga';

export default function* rootSaga() {
   yield all([
      doctors(),
      patients(),
   ])
}