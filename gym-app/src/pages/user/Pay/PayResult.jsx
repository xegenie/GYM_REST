import React from 'react'
import Header from '../../../components/header/header'
import Footer from '../../../components/Footer/footer'
import PayResultComponent from '../../../components/users/Pay/PayResultComponent'
import TicketContextProvider from '../../../contexts/TicketContextProvider'

const PayResult = () => {
  return (
    <TicketContextProvider>
      <Header />
      <PayResultComponent />
      <Footer />
    </TicketContextProvider>
  )
}

export default PayResult