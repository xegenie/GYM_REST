import React from 'react'
import Normal from '../../../components/users/Ticket/NormalTicket'
import TicketContextProvider from '../../../contexts/TicketContextProvider'
const NormalTicket = () => {
  return (
    <TicketContextProvider>
      <Normal />
    </TicketContextProvider>
  )
}

export default NormalTicket