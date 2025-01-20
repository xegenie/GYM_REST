import React from 'react';
import Header from '../../../components/admin/Header/adminHeader';
import AttendanceTable from '../../../components/admin/Attendance/AttendanceList';
import AdminFooter from '../../../components/admin/Header/adminFooter';

const AttendanceList = () => {
 
  return (
    <>
      <Header />
      <AttendanceTable />
     
      <AdminFooter />
    
    </>
  );
};

export default AttendanceList;
