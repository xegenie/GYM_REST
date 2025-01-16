import React, { useEffect, useState } from 'react'
import BoardUpdateForm from '../../../components/user/Board/BoardUpdateForm'
import { useNavigate, useParams } from 'react-router-dom'
import * as Boards from '../../../apis/board'
import * as Swal from '../../../apis/alert'

const BoardUpdateContainer = () => {

  const navigate = useNavigate()


  const { no } = useParams()

  const [board, setBoard] = useState({})

  const getBoard = async() => {
    const response = await Boards.select(no)
    const data = await response.data
    console.log(data)
    setBoard(data.board)


  }
  
  useEffect( () => {
    getBoard()    // 게시글 정보(게시글 + 파일목록)
  }, [])



const onDelete = async (no) => {
  try{
    console.log(no+"뭐임?")
  const response = await Boards.remove(no)

  const status = response.status
  if(status == 200){
    Swal.alert("게시글 삭제 성공", "게시글이 삭제되었습니다.", "success", () => navigate('/boardList'))
  }
  else
  Swal.alert("게시글 삭제 실패", "잠시 후 다시 시도해주세요.", "error", () => navigate('/boardList'))
}catch(error){
  console.log(error)
}
}



const updateBoard = async (form) => {

  const response = await Boards.update(form)
  const status = response.status

  if(status == 200){
    Swal.alert("게시글 수정 성공", "게시글이 수정되었습니다.", "success", () => navigate(`/boardRead/${no}`))
  }
  else
  Swal.alert("게시글 수정 실패", "잠시 후 다시 시도해주세요.", "error", () => navigate(`/boardRead/${no}`))
}

  return (
    <BoardUpdateForm onDelete={onDelete} updateBoard={updateBoard}  board={board} />
  )
}

export default BoardUpdateContainer