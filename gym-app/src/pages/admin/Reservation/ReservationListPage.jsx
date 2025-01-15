import React from 'react'
import ReservationListContainer from '../../../containers/Reservation/ReservationListContainer'
import Header from '../../../components/admin/Header/adminHeader'
import Sidebar from '../../../components/admin/Header/adminSidebar'

const ReservationListPage = () => {
  return (
    <>
      <Header />
        <div className="reservationList-container">
          <Sidebar />
          <div className="main">
            <div className="inner">
              <div className="title">
                <h2>PT 예약 및 완료 목록</h2>
              </div>
              <ReservationListContainer />
            </div>
          </div>
        </div>
    </>
  )
}

export default ReservationListPage
