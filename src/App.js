import React from 'react';
import './App.scss';
import HeaderLine from './components/HeaderLine';
import ScheduleTable from './components/tableComponents/ScheduleTable';
import SearchSideBar from './components/sidebarComponents/SearchSideBar';

function App() {
  return (
    <div className="App">
      <HeaderLine />
      <ScheduleTable />
      <SearchSideBar />
    </div>
  );
}

export default App;
