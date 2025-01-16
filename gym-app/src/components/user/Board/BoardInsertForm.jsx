import React from 'react'
import { useNavigate } from 'react-router-dom'

const BoardInsertForm = ({insertBoard}) => {

 const navigate = useNavigate()

const onInsert = (e) => {
  e.preventDefault()
  const form = e.target
  const title = form.title.value
  const content = form.content.value

  console.log(title, content);

  insertBoard({title, content})

}


  return (
    <div className="boardInsert">
      <form onSubmit={(e) => onInsert(e)}>
        <h1>고객문의 게시판</h1>

        <div className="border" style={{ marginTop: '40px' }}>
          <div className="inputbox1">
            <label htmlFor="title" style={{ color: 'black', fontSize: '30px' }}>
              Q.{' '}
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="titleinput"
              placeholder="문의사항을 알려주세요."
              required
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <textarea
              className="textareaInput"
              name="content"
              rows="5"
              cols="40"
              required
            />
          </div>
        </div>

        <div className="btn-box" style={{ marginTop: '10px' }}>
          <button
            type="button"
            className="btnInput"
            onClick={() => navigate('/boardList')}
          >
            목록
          </button>
          <input
            type="submit"
            style={{ backgroundColor: 'rgb(172, 235, 77)' }}
            className="btnInput"
            value="등록"
          />
        </div>
      </form>
    </div>
  )
}

export default BoardInsertForm