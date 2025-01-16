import React from 'react'
import TicketType from '../../../components/users/Ticket/ChoiceTicket'
import TicketContextProvider from '../../../contexts/TicketContextProvider'

const ChoiceTicket = () => {
  return (
    <TicketContextProvider>
      <TicketType />
    </TicketContextProvider>
  )
}

export default ChoiceTicket