import React, { useEffect, useState } from 'react'
import UserUpdateForm from '../../components/user/UserUpdateForm'
import { useNavigate, useParams } from 'react-router-dom'
import * as auth from '../../apis/auth'
import * as Swal from '../../apis/alert'
import Header from '../../components/admin/Header/adminHeader'
import AdminFooter from '../../components/admin/Header/adminFooter'

const UserUpdateContainer = () => {


  const navigate = useNavigate()
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
                        navigate('/admin/userList');
                      });
                    } else {
                      Swal.alert('회원정보 수정 실패', '회원정보 수정에 실패했습니다.', 'error');
                    }
                
  }

  useEffect( () => {
    getUser()    // 게시글 정보(게시글 + 파일목록)
    }, [])

  return (
    <>
      <Header />
   <UserUpdateForm user={user} getUpdate={getUpdate}/>
   <AdminFooter />

   </>
   
  )
}

export default UserUpdateContainer