import React, { useEffect, useState } from 'react'
import BoardReadForm from '../../../components/user/Board/BoardReadForm'
import * as Boards from '../../../apis/board'
import * as Swal from '../../../apis/alert' 
import { Link, useNavigate, useParams } from 'react-router-dom'

const BoardReadContainer = () => {


  const { no } = useParams()

  const [board, setBoard] = useState({})
  const [answer, setAnswer] = useState({})

  const getBoard = async() => {
    const response = await Boards.select(no)
    const data = await response.data
    console.log(data)
    setBoard(data.board)
    setAnswer(data.answer)


  }

  const insertA = async(data) =>{
    const response = await Boards.answerInsert(data)
       const status = response.status

        if(status == 200){
          Swal.alert("답변 등록 성공", "답변 등록에 성공했습니다.", "success" )
         getBoard()
        }
        else{
          Swal.alert("답변 등록 실패", "잠시 후 다시 시도해주세요", "error", () => navigate(`/boardRead/${no}`))
        }
    
  }


  const answerUpdate = async(form) =>{
    console.info("sdfdsf" + form)
    const response = await Boards.AnswerUp(form)

    const status = response.status

    if(status == 200){
     Swal.alert("답변 수정 성공", "답변이 수정되었습니다.", "success", () => location.reload()  );
    }
   
    else{
      Swal.alert("답변 수정 실패", "잠시 후 다시 시도해주세요", "error", () => navigate(`/boardRead/${no}`))
    }
  }



  
  const AnswerDelete = async() =>{
    console.log(no)
    const response = await Boards.AnswerDel(no)
    const status = response.status

    if(status == 200){
      Swal.alert("답변 삭제 성공", "답변 삭제에 성공했습니다.", "success" )
      getBoard()
    }
    else{
      Swal.alert("답변 삭제 실패", "잠시 후 다시 시도해주세요", "error", () => navigate(`/boardRead/${no}`))
    }
  }


  useEffect( () => {
    getBoard()    // 게시글 정보(게시글 + 파일목록)
  }, [])


  return (
    <BoardReadForm board={board}  answerList={answer} insertA={insertA} AnswerDelete={AnswerDelete} answerUpdate={answerUpdate} getBoard={getBoard}/>
  )
}

export default BoardReadContainer