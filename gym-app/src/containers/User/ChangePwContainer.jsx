import React, { useContext } from 'react'
import ChangePwForm from '../../components/User/ChangePwForm'
import * as auth from '../../apis/auth'
import * as Swal from '../../apis/alert'
import { LoginContext } from '../../contexts/LoginContextProvider'

const ChangePwContainer = () => {

  const {pwLogout} = useContext(LoginContext)

const changePw = async (form) => {
  try {
    console.log(form);
    const response = await auth.changePw(form);
    const status = response.status;

    if (status === 200) {
      Swal.alert('비밀번호 변경 성공', '로그인 화면으로 이동합니다', 'success',  () => pwLogout());
    } else {
      Swal.alert('비밀번호 변경 실패', '비밀번호 변경에 실패했습니다.', 'error');
    }
  } catch (error) {
    console.error('비밀번호 변경 중 에러가 발생하였습니다.', error);
    Swal.alert('비밀번호 변경 실패', '비밀번호 변경에 실패했습니다.', 'error');
  }
}

  return (
    <>
      <ChangePwForm changePw ={changePw}/>
    </>
  )
}

export default ChangePwContainer