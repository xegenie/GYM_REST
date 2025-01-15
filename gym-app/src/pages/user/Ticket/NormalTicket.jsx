import React from 'react'
import Normal from '../../../components/users/Ticket/NormalTicket'
import TicketContextProvider from '../../../contexts/TicketContextProvider'
import LoginContextProvider from '../../../contexts/LoginContextProvider'
import PayContextProvider from '../../../contexts/PayContextProvider'
const NormalTicket = () => {
  return (
    <PayContextProvider>
      <LoginContextProvider>
        <TicketContextProvider>
          <Normal />
        </TicketContextProvider>
      </LoginContextProvider>
    </PayContextProvider>
  )
}

export default NormalTicket