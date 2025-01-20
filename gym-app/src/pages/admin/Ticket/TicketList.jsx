import React from 'react'
import ListContainer from '../../../containers/Ticket/ListContainer'
import Footer from '../../../components/admin/Header/adminFooter'
import Header from '../../../components/admin/Header/adminHeader'

const TicketList = () => {
  return (
    <>
      <Header />
      <ListContainer />
      <Footer />
    </>
  )
}

export default TicketList