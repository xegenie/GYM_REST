import React from 'react'
import TrainerDetail from '../../../components/users/Ticket/TrainerDetail'
import PayContextProvider from '../../../contexts/PayContextProvider'
import LoginContextProvider from '../../../contexts/LoginContextProvider'
import TicketContextProvider from '../../../contexts/TicketContextProvider'
import Header from '../../../components/header/header'
import Footer from '../../../components/Footer/footer'

const PtTicket = () => {
  return (
    <PayContextProvider>
      <LoginContextProvider>
        <TicketContextProvider>
          <Header />
            <TrainerDetail />
          <Footer />
        </TicketContextProvider>
      </LoginContextProvider>
    </PayContextProvider>
  )
}

export default PtTicket