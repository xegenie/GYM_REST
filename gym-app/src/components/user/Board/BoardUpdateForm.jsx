import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BoardUpdateForm = ({ updateBoard,onDelete,board }) => {

  const { no } = useParams()

  const navigate = useNavigate()

  const onUpdate = (e) => {
    e.preventDefault()
    const form = e.target
    const title = form.title.value
    const content = form.content.value
  
    console.log(title, content);
  
    updateBoard({no ,title, content})
  
  }

  const onRemove = () => {
    const check = window.confirm('정말로 삭제하시겠습니까?')
    if( check )
        onDelete(no)
  }

  return (
    <div className="container">
      <form onSubmit={(e) => onUpdate(e)}>
        <h1>고객문의 게시판</h1>

        <div className="border" style={{ marginTop: "40px" }}>
          <div className="inputbox1">
            <label htmlFor="title" style={{ color: "black", fontSize: "30px" }}>
              Q.
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={board.title}
              className="titleinput"
       
              required
            />
          </div>

          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <textarea
              className="textareaInput"
              name="content"
              rows="5"
              cols="40"
              defaultValue={board.content}
            />
          </div>
        </div>

        <div className="btn-box" style={{ marginTop: "10px" }}>
          <button
            type="button"
            className="btnInput"
            onClick={() => navigate("/boardList")}
          >
            목록
          </button>
          <input
            type="submit"
            style={{ backgroundColor: "rgb(172, 235, 77)" }}
            className="btnInput"
            value="수정"
          />
          <button
            type="button"
            onClick={onRemove}
            style={{ backgroundColor: "rgb(238, 106, 83)" }}
            className="btnInput"
          >
            삭제
          </button>
        </div>
      </form>
    </div>
  );
};

export default BoardUpdateForm;