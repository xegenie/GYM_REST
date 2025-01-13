import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import JoinForm from '../../../components/user/JoinForm.jsx'
// import './join.css'; // join.css는 기존대로 유지
import * as Swal from '../../../apis/alert.js';  // join.js는 필요에 따라 리팩토링
import * as auth from '../../../apis/user.js';  // join.js는 필요에 따라 리팩토링

const Join = () => {
 
  const navigete = useNavigate()

  // 회원 가입 요청
  const join = async (form) => {
    console.log(form);

    let response
    let data
    try {
      response = await auth.join(form)
      
    } catch (error) {
      console.log(error);
      console.error(`회원가입 중 에러가 발생하였습니다.`)
      return
    }

    data = response.data
    const status = response.status
    console.log(`data : ${data}`);
    console.log(`status : ${status}`);

    if(status == 200){
      console.log('회원가입 성공!');
      Swal.alert('회원가입 성공', '로그인 화면으로 이동합니다', 'success', () => { navigete('../login')})
    }
    else{
      Swal.alert('회원가입 실패', '회원가입에 실패했습니다.', 'error' )
      console.log('회원가입 실패!');
    
    }


  }



  return (
    <>
    <div className="container">
     <JoinForm join={join}/>
    </div>
</>
  )
}

export default Join;
