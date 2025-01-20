import React from 'react'
import ReservationListContainer from '../../../containers/Reservation/ReservationListContainer'
import Header from '../../../components/header/header'
import Footer from '../../../components/Footer/footer'

const ReservationPtListPage = () => {
  return (
    <>
      <Header />
      <ReservationListContainer />
      <Footer />
    </>
  )
}

export default ReservationPtListPage
