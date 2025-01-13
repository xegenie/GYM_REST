import React, { StrictMode } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>

    <div>메인화면</div>
    
    <Link to="/login">로그인</Link>
    <Link to="/join">회원가입</Link>
    </>
  )
}

export default Home