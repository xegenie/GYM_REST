import React from 'react'
import Header from '../../../components/admin/Header/adminHeader'
import Sidebar from '../../../components/admin/Header/adminSidebar'
import ReservationCalendarContainer from '../../../containers/Reservation/ReservationCalendarContainer'

const Calendar = () => {
  return (
    <>
      <Header />
      <div className="reservationList-container">
        <Sidebar />
        <div className="main">
          <div className="inner">
            <div className="title">
              <h2 style={{fontWeight : 'bold', fontSize : '20px'}}>월별 PT 예약 및 완료 일정</h2>
            </div>
            <ReservationCalendarContainer />
          </div>
        </div>
      </div>
    </>
  )
}

export default Calendar
