import React from 'react'
import NewPwForm from '../../components/user/newPwForm'
import { useNavigate } from 'react-router-dom';
import * as Swal from '../../apis/alert'
import * as auth from '../../apis/auth'



const NewPwContainer = () => {

  const navigate = useNavigate();

  const newPws = async (form) => {
    try {
      console.log(form);
      const response = await auth.newPw(form);
      const status = response.status;
      sessionStorage.removeItem('userData');
      if (status === 200) {
  
        Swal.alert('비밀번호 변경 성공', '로그인 화면으로 이동합니다', 'success',   () => { navigate('/login')});
      } else {
  
        Swal.alert('비밀번호 변경 실패', '잠시 후 다시 시도해주세요.', 'error',  () => { navigate('/login')});
      }
    } catch (error) {
      console.error('비밀번호 변경 중 에러가 발생하였습니다.', error);
      
      Swal.alert('비밀번호 변경 실패', '비밀번호 변경에 실패했습니다.', 'error');
    }
  }


  return (
    <>
    <NewPwForm newPws={newPws}/> 
    </>
     )

}

export default NewPwContainer