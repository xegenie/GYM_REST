import React from 'react'
import Footer from '../../../components/Footer/footer'
import Header from '../../../components/header/header'
import ReservationListContainer from '../../../containers/Reservation/ReservationListContainer'

const ReservationPtListPage = () => {
  return (
    <>
      <Header />
      <div className="reservationList-container">
        <div className="main">
          <div className="inner">
            <div className="title">
              <h2>PT 예약 및 완료 목록</h2>
            </div>
            <ReservationListContainer />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ReservationPtListPage
