import React from 'react'
import BoardInsertForm from '../../../components/user/Board/BoardInsertForm'
import * as board from '../../../apis/board'
import * as Swal from '../../../apis/alert'
import {useNavigate} from 'react-router-dom'

const BoardInsertContainer = () => {

  const navigate = useNavigate()

  const insertBoard = async (form) =>{
    const response = await board.insert(form)
    const status = response.status
    if(status == 200){
      Swal.alert("게시글 등록 성공", "게시글 등록에 성공했습니다.", "success", () => navigate('/boardList'))
    }
    else{
      Swal.alert("게시글 등록 실패", "잠시 후 다시 시도해주세요", "error", () => navigate('/boardList'))
    }

  }

  return (
    <BoardInsertForm insertBoard={insertBoard}/>
  )
}

export default BoardInsertContainer