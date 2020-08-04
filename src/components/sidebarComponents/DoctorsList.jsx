import React, { memo, useMemo } from "react"
import sortBy from 'lodash.sortby';
import GroupedByTypeList from "./GroupedByTypeList";
import DoctorLine from "./DoctorLine";

const DoctorsList = ({ groupedByType, doctors, handleDoctorSelect, handleAllCheckByType }) => {
  const groupedDoctorsByType = useMemo(() => {
    return doctors
      .reduce((acc, val) => {
        if (!acc[val.type]) {
          acc[val.type] = [];
        }

        acc[val.type].push(val);
        return acc;
    }, {});
  }, [doctors]);

  if (!doctors || !doctors.length) {
    return null;
  }

  if (groupedByType) {
    return (
      <ul className="leftbar-list__category"> 
        { 
          Object.entries(groupedDoctorsByType).map(([key, value]) => {
            return (
              <GroupedByTypeList
                key={key}
                name={key}
                data={value}
                handleDoctorSelect={handleDoctorSelect}
                handleAllCheckByType={handleAllCheckByType}
              />
            )
          })
        }
      </ul>
    );
  }

  const sortedDoctors = sortBy(doctors, ['name']);

  return (
    <form>
      <div>
        <div key='as' multiple="multiple" name="doctor[]">
          {sortedDoctors.map(doctor => (
            <DoctorLine key={doctor.id} doctor={doctor} handleDoctorSelect={handleDoctorSelect} listType={'alphabet'}/>
          ))}
        </div>
      </div>
    </form>
  );
}

export default memo(DoctorsList);