import React from 'react'
import FindPwForm from '../../components/user/FindPwForm'
import { useNavigate } from 'react-router-dom'

const FindPwContainer = () => {

  const navigate = useNavigate()

  const findPw = async (form) => {
    console.log(form)

    let response
    let data
      response =await auth.findPws(form)
      data = response.data
      const status = response.status
      // data에 코드 정보 전달받아서 데이터로 쿠키 생성 만료시간 30분 컨트롤러에서는 쿠키에 있는 정보 꺼내서 비교
      if(status == 200){
        Swal.alert('비밀번호 찾기 성공', '비밀번호 변경 화면으로 이동합니다', 'SUCCESS', () => { navigete('/ChangPw')})
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