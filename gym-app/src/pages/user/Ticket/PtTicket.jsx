import React from 'react'
import TrainerDetail from '../../../components/users/Ticket/TrainerDetail'
import PayContextProvider from '../../../contexts/PayContextProvider'
import LoginContextProvider from '../../../contexts/LoginContextProvider'
import TicketContextProvider from '../../../contexts/TicketContextProvider'

const PtTicket = () => {
  return (
    <PayContextProvider>
      <LoginContextProvider>
        <TicketContextProvider>
          <TrainerDetail />
        </TicketContextProvider>
      </LoginContextProvider>
    </PayContextProvider>
  )
}

export default PtTicket