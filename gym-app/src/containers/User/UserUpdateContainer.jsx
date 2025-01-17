import React, { useEffect, useState } from 'react'
import UserUpdateForm from '../../components/user/UserUpdateForm'
import { useParams } from 'react-router-dom'
import * as auth from '../../apis/auth'

const UserUpdateContainer = () => {

  const {no} = useParams()

  const[user, setUser] = useState({})
  
  const getUser = async() =>{
    console.log(no)
    const response = await auth.select(no)
    const data = await response.data
    console.log(data)
    setUser(data.user)
  }

  const getUpdate = async(form) => {
    console.dir(form)
    const response = await auth.adminUpdate(form)
           const status = response.status;
              
                    if (status === 200) {
                      Swal.alert('회원정보 수정 성공', '회원정보 수정에 성공하였습니다.', 'success', () => {
                        navigate('/admin/update/:no');
                      });
                    } else {
                      Swal.alert('회원정보 수정 실패', '회원정보 수정에 실패했습니다.', 'error');
                    }
                
  }

  useEffect( () => {
    getUser()    // 게시글 정보(게시글 + 파일목록)
    }, [])

  return (
   <UserUpdateForm user={user} getUpdate={getUpdate}/>
  )
}

export default UserUpdateContainer