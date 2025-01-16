import React, { useEffect, useState } from 'react'
import BoardListForm from '../../../components/user/Board/BoardListForm'
import * as boards from '../../../apis/board'
import { useLocation } from 'react-router-dom'

const BoardListContainer = () => {

 // 🧊 state
 const [boardList, setBoardList] = useState([])
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
   const response = await boards.list(page, size)
   const data = await response.data
   const list = data.list
   console.dir(data.list +"리스트 넘어옴?")
   const pagination = data.pagination
   console.dir(data)
   
   console.dir(data.pagination)

   setBoardList( list )
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
  <BoardListForm  boardList={boardList} pagination={pagination}/>
  )
}

export default BoardListContainer