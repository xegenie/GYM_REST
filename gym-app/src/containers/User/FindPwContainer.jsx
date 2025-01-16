import React from 'react'
import FindPwForm from '../../components/user/FindPwForm'
import { useNavigate } from 'react-router-dom'
import * as Swal from '../../apis/alert'
import * as auth from '../../apis/auth'

const FindPwContainer = () => {

  const navigate = useNavigate()

  const findPw = async (form) => {
    console.log(form)

    let response
    let data
      response =await auth.findPws(form)
      data = response.data
      const status = response.status
      console.log(data)
      // data에 코드 정보 전달받아서 데이터로 쿠키 생성 만료시간 30분 컨트롤러에서는 쿠키에 있는 정보 꺼내서 비교
      if(status == 200){
        sessionStorage.setItem('userData', JSON.stringify(data));
        Swal.alert('비밀번호 찾기 성공', '비밀번호 변경 화면으로 이동합니다', 'SUCCESS', () => { navigate('/newPw')})
      }
      else{
        Swal.alert('비밀번호 찾기 실패', '정보가 일치하지 않습니다.', 'error' )
      
      }
    

  }

  return (
    <FindPwForm findPw={findPw}/>
  )
}

export default FindPwContainer