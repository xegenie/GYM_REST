import React from 'react'
import BoardReadContainer from '../../../containers/User/Board/BoardReadContainer'
import Header from '../../../components/header/header'
import Footer from '../../../components/Footer/footer'

const BoardRead = () => {
  return (
    <>
      <Header />
    <BoardReadContainer />
      <Footer />
    </>
  )
}

export default BoardRead