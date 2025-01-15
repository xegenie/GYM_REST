import React from 'react'
import Choice from '../../../components/users/Ticket/ChoiceTicket'
import TicketContextProvider from '../../../contexts/TicketContextProvider'

const ChoiceTicket = () => {
  return (
    <TicketContextProvider>
      <Choice />
    </TicketContextProvider>
  )
}

export default ChoiceTicket