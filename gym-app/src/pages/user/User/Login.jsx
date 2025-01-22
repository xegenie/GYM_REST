import React from 'react'
import LoginContainer from '../../../containers/User/LoginContainer'
import Header from '../../../components/header/header'
import Footer from '../../../components/Footer/footer'

const Login = () => {
  return (
    <>
      <Header />
    <LoginContainer/>
      <Footer />
    </>
  )
}

export default Login