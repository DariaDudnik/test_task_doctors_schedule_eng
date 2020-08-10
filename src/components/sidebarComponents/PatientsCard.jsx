import React from 'react';

const PatientCard = (props) => (
  <div className="patient-card">
    <p>{props.checkedPatient.name}</p>
    <p>{props.checkedPatient.birthDate}</p>
    <p>Health insurance number :&ensp; {props.checkedPatient.healthInsuranceNumber}</p>
  </div>
);

export default PatientCard;
