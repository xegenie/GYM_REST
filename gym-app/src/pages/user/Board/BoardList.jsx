import React from 'react'
import BoardListContainer from '../../../containers/User/Board/BoardListContainer'
import Header from '../../../components/header/header'
import Footer from '../../../components/Footer/footer'

const BoardList = () => {
  return (
    <>
      <Header />
        <BoardListContainer/>
      <Footer />
    </>
  )
}

export default BoardList