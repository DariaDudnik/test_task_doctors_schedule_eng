import doctorsArray from '../stub-data/doctorsData.json';
import patientsArray from '../stub-data/patientsData.json';
import messages from '../stub-data/messagesData.json';

const delayed = (data) => new Promise(resolve => {
  setTimeout(() => {
    resolve(data);
  }, 300);
});

export function getDoctorsList() {
 return delayed(doctorsArray);
}

export function getPatientsList() {
  return delayed(patientsArray);
}

export function getMessages() {
  return delayed(messages);
 }