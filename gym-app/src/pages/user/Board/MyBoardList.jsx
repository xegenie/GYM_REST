import React from 'react'
import MyBoardListContainer from '../../../containers/User/Board/MyBoardListContainer'
import Header from '../../../components/header/header'
import Footer from '../../../components/Footer/footer'

const MyBoardList = () => {
  return (
    <>
      <Header />
      <MyBoardListContainer/>
      <Footer />
    </>
  )
}

export default MyBoardList