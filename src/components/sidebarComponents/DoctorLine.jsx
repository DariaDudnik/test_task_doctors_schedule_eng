import React, { memo } from 'react';


const DoctorLine = ({ doctor: { id, name, checked, room, type }, handleDoctorSelect, listType }) => (
  <div>
    <hr />
    <li className="leftbar-list__category-item">
      <input
        id="category"
        type="checkbox"
        name={id}
        key={id}
        form="doctors-check"
        className="doctors-checkbox-name"
        checked={checked}
        onChange={() => handleDoctorSelect(id)}
      />
      {listType ? <span>{name}({type}, r.{room})</span> : <span>{name}</span>}
    </li>
  </div>
)

export default memo(DoctorLine);