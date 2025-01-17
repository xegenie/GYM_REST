import React, { useContext, useEffect } from 'react'
import Cookies from 'js-cookie'; // js-cookie 임포트
import UserInfoForm from '../../../components/MyPage/UserInfoForm'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from '../../../contexts/LoginContextProvider'
import * as auth from '../../../apis/auth'
import * as Swal from '../../../apis/alert'
import './UserInfo.css';
import Header from '../../../components/header/header';
import Footer from '../../../components/Footer/footer';

const UserInfo = () => {

     // context
 const {isLoading, isLogin, roles, logout, userInfo,setUserInfo } = useContext(LoginContext)

 const navigete = useNavigate()

 const updateUser = async (form) => {
   console.log(form);
   let response
   let data
   try {
       response = await auth.update(form)

   } catch (error) {
     console.error(error);
     console.error(`회원정보 수정 중 에러가 발생하였습니다.`)
     return
     
   }
   data = response.data
   const status = response.status


   if(status == 200) {
     console.log(`회원정보 수정 성공`)
     setUserInfo({ ...userInfo, ...form });
     Swal.alert('회원정보 수정 성공', '마이페이지로 이동합니다.', 'success' , () => navigete("/User"))
   }
   else{
     console.log(`회원정보 수정 실패`)
     Swal.confirm('회원정보 수정 실패', '회원정보 수정에 실패했습니다.', 'error' )
   }

 }

 const removeUser = async (no) => {
   console.log("이거 왜 안나옴?" + no)

   let response

   try {
     response = await auth.remove(no)
     console.log("sdfsdfsdf"+response)
   } catch (error) {
 console.log(error)
 console.log('회원 탈퇴 처리 중 에러가 발생하였습니다.');
 
 
   }
   const status = response.status

   if(status == 200){
    Cookies.remove('remember-id'); // 쿠키에서 아이디 삭제
     Swal.alert("회원탈퇴 성공", "그동안 감사했습니다.🎁", "success", 
       // 로그아웃 처리
       () => { logout(true) } )
       navigete("/")
    
   }
   else
   Swal.alert("회원탈퇴 실패", "들어올 땐 마음대로 들어왔지만 나갈 때 그럴 수 없습니다..🎁", "error",
   () => logout(true))

 }

 useEffect(() => {
   if(isLoading) return

 }, [isLoading])
 


  return (
    <>
    <Header/>
    <div className="oswUserInfo" style={{marginBottom: 0}}>
        <h1>UserInfo</h1>
        <hr />
       
        <UserInfoForm userInfo={userInfo} updateUser={updateUser} removeUser={removeUser} />
        
        <Footer/>
    </div>
 </>
  )
}

export default UserInfo