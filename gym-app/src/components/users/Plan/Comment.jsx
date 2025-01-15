import React, { useEffect, useState } from 'react'
import { useDate } from '../../../contexts/DateContextProvider';

const Comment = () => {

  const { currentDate, setCurrentDate, comment } = useDate();

  const [ccontent, setCcontent] = useState('');
  const [fcontent, setFcontent] = useState('');
  const [commentDate, setCommentDate] = useState('')

  useEffect(() => {
    console.dir(comment)
    if (comment){
      setCcontent(comment.ccontent);
      setFcontent(comment.fcontent);
      const date = new Date(comment.commentDate);
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()} (${date.toLocaleDateString('ko-KR', { weekday: 'short' })})`;
      setCommentDate(formattedDate);
    }

  }, [comment])
  
  return (
    <div className='comment-container pt-4'>
      <form id="updateCommentForm">
        <div className="comment">
          <div className="comment-title">
            <p>trainer's comment</p>
          </div>
          <div className="comment-content">
            <span className="comment-date">{commentDate}</span>
            <input type="hidden" name="commentDate" id='commentDate' />
            <div className="comment-c comment-detail">
              <span><b>코멘트</b></span><br />
              <span className="cContent">
                {ccontent}  
              </span><br /><br />
              <span><b>식단</b></span><br />
              <span className="fContent">{fcontent}</span>
            </div>
            <div className="comment-c comment-edit" style={{display:"none"}}>
              <input type="hidden" name="no" id="commentNo" />
              <input type="hidden" name="userNo" id="userNo" />
              <span><b>코멘트</b></span><br />
              <textarea className="cContent cContent-edit" name="cContent"></textarea><br />
              <span><b>추천 식단</b></span><br />
              <textarea className="fContent fContent-edit" name="fContent"></textarea>
            </div>
          </div>
        </div>
        <div className="comment-btn-container button-container pt-2">
          <button type="button" id="editCommentButton">comment 입력</button>
          <div className="comment-edit" style={{display:"none"}}>
            <div className="comment-edit-container">
              <button type="button" id="cancelEditComment">취소</button>
              <button type="submit"  id="updateCommentButton">수정</button>
              <button type="button" id="insertCommentButton">저장</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Comment