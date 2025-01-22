import React from 'react'
import TicketType from '../../../components/users/Ticket/ChoiceTicket'
import TicketContextProvider from '../../../contexts/TicketContextProvider'
import Header from '../../../components/header/header'
import Footer from '../../../components/Footer/footer'

const ChoiceTicket = () => {
  return (
    <TicketContextProvider>
      <Header />
      <TicketType />
      <Footer />
    </TicketContextProvider>
  )
}

export default ChoiceTicket