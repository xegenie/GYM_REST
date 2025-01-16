import React, { useEffect, useState } from 'react'
import UserListForm from '../../components/user/UserListForm'
import * as auth from '../../apis/auth'
import { useLocation } from 'react-router-dom'

const UserListContainer = () => {

   
 const [userList, setUserList] = useState([])
 const [pagination, setPagination] = useState({})
 const [page, setPage] = useState(1)
 const [size, setSize] = useState(10)

 const location = useLocation()
 
 const updatePage = () => {
   const query = new URLSearchParams(location.search)
   const newPage = query.get("page") ?? 1
   const newSize = query.get("size") ?? 10

   setPage(newPage)
   setSize(newSize)

 }

 // 🎁 게시글 목록 데이터
 const getList = async () => {
   const response = await auth.list(page, size)
   const data = await response.data
   const list = data.list
   const pagination = data.pagination
   console.dir(list)
   
   console.dir(data.pagination)

   setUserList( list )
   setPagination( pagination)
   
   
   
 }

 // ❓ 
 useEffect( () => {
   getList()
 }, [page, size])

 useEffect(() => {
   updatePage()
 }, [location.search])
 

  return (
    <UserListForm userList={userList} pagination={pagination} />
  )
}

export default UserListContainer