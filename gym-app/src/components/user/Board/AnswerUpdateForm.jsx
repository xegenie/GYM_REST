import React from 'react'

const AnswerUpdateForm = () => {
  return (
    <div className="board-read">
    <div className="container">
      <div style={{ textAlign: "left", width: "100%" }}>
        <h1 style={{ textAlign: "left", fontSize: "35px", marginLeft: "220px" }}>
          고객문의 게시판
        </h1>
      </div>

      <div className="border" style={{ marginTop: "20px", marginBottom: "20px" }}>
        <div className="inputbox1">
          <label style={{ color: "black", fontSize: "30px" }}>Q.</label>
          <input
            type="text"
            className="titleinput"
            defaultValue={board.title ?? ''} 
            readOnly
            disabled
            style={{
              backgroundColor: "white",
              border: "none",
              fontWeight: "bold",
              color: "black",
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <h3 style={{ color: "black", marginRight: "70px", marginBottom: "10px" }}>
          {board.name ?? ''} 회원님
          </h3>
        </div>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <textarea
            className="textareaInput"
            defaultValue={board.content ?? ''}
            readOnly
            disabled
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              color: "black",
            }}
            rows="5"
            cols="40"
          ></textarea>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "30px" }}>
          <label style={{ color: "black" }}>
            {new Date(board.createdAt).toLocaleString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </label>
        </div>
      </div>

      <div className="btn-box" style={{ width: "880px" }}>
        <button type="button" className="btnInput" onClick={() => navigate("/boardList")}>
          목록
        </button>
        <button
          type="button"
          className="btnInput"
          style={{ backgroundColor: "rgb(172, 235, 77)" }}
          onClick={() => navigate(`/boardUpdate/${board.no}`)}
        >
          수정
        </button>
      </div>

      {/* 답변 섹션 */}
      <div className="answer-section">
        <h2>트레이너 답변</h2>
        {answerList.length > 0 ? (
          // 답변 목록 표시
          <div id="answer-list">
          {answerList.map((answer) => (
            <div key={answer.no} className="answer-box">
              <div className="border" style={{ marginTop: "20px", marginBottom: "20px" }}>
                <div className="inputbox1">
                  <label style={{ color: "black", fontSize: "30px" }}>A.</label>
                  <input
                    type="text"
                    className="titleinput"
                    defaultValue={board.title ?? ""}
                    readOnly
                    disabled
                    style={{
                      backgroundColor: "white",
                      border: "none",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <h3 style={{ color: "black", marginRight: "70px", marginBottom: "10px" }}>
                    {answer?.name ?? ""} 트레이너
                  </h3>
                </div>
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  <textarea
                    className="textareaInput"
                    defaultValue={answer?.content ?? ""}
                    readOnly
                    disabled
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      color: "black",
                    }}
                    rows="5"
                    cols="40"
                  ></textarea>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "30px" }}>
                  <label style={{ color: "black" }}>
                    {new Date(answer?.createdAt).toLocaleString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </label>
                </div>
        
                {/* 어드민 또는 트레이너 권한일 때만 버튼 표시 */}
                {(roles.isAdmin || roles.isTrainer) && (
                  <div style={{ marginTop: "10px" }}>
                    <button
                      className="btnInput"
                      style={{ marginRight: "10px", backgroundColor: "rgb(235, 173, 77)" }}
                      onClick={() => alert("수정 기능 구현")}
                    >
                      수정
                    </button>
                    <button
                      className="btnInput"
                      style={{ backgroundColor: "rgb(235, 77, 77)" }}
                      onClick={onRemove}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>


        ) 
        : roles.isAdmin ? (


          // 어드민에게만 답변 등록 폼 표시
          <div className="border" style={{ marginTop: "20px", marginBottom: "20px" }}>
          <form onSubmit={(e) => answerInsert(e)}>
        <div className="inputbox1">

          <label style={{ color: "black", fontSize: "30px" }}>A.</label>
          <input
            type="text"
            className="titleinput"
            defaultValue={board.title ?? ''} 
            readOnlys
            disabled
            style={{
              backgroundColor: "white",
              border: "none",
              fontWeight: "bold",
              color: "black",
            }}
            />
        </div>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <textarea
          name="contente"
          id="content"
          className="textareaInput"
          required
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            color: "black",
          }}
          rows="5"
          cols="40"
          ></textarea>
        </div>
     
            <button className="btnInput" type="submit">
              답변 등록
            </button>
          </form>
      </div>
      
        
      
      ) : (
          // 일반 유저는 아무 내용도 표시되지 않음
          <p>등록된 답변이 없습니다.</p>
        )}
      </div>
    </div>
  </div>

  )
}

export default AnswerUpdateForm