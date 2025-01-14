import React from 'react'
import Footer from '../../../components/Header/adminFooter'
import Header from '../../../components/Header/adminHeader'
import InsertContainer from '../../../containers/Ticket/InsertContainer'

const TicketInsert = () => {
  return (
    <>
      <Header />,
      <InsertContainer />,
      <Footer />
    </>
  )
}

export default TicketInsert