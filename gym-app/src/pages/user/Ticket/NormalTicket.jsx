import React from 'react'
import Normal from '../../../components/users/Ticket/NormalTicket'
import TicketContextProvider from '../../../contexts/TicketContextProvider'
import LoginContextProvider from '../../../contexts/LoginContextProvider'
import PayContextProvider from '../../../contexts/PayContextProvider'
import Header from '../../../components/header/header'
import Footer from '../../../components/Footer/footer'
const NormalTicket = () => {
  return (
    <PayContextProvider>
      <LoginContextProvider>
        <TicketContextProvider>
          <Header />
            <Normal />
          <Footer />
        </TicketContextProvider>
      </LoginContextProvider>
    </PayContextProvider>
  )
}

export default NormalTicket