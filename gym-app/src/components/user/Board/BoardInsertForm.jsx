import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../Board/css/BoardInsert.module.css'

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

    <div className={styles.body}>
    <div className={styles.boardInsert}>
      <form onSubmit={(e) => onInsert(e)}>
        <h1>고객문의 게시판</h1>

        <div className={styles.border} style={{ marginTop: '40px' }}>
          <div className={styles.inputbox1}>
            <label htmlFor="title" style={{ color: 'black', fontSize: '30px' }}>
              Q.{' '}
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className={styles.titleinput}
              placeholder="문의사항을 알려주세요."
              required
            />
          </div>

          <div className={styles.texbottom} style={{ textAlign: 'center'}}>
            <textarea
              className={styles.textareaInput}
              name="content"
              rows="5"
              cols="40"
              required
            />
          </div>
        </div>

        <div className={styles.btnBox}>
          <button
            type="button"
            className={styles.btnInput}
            onClick={() => navigate('/boardList')}
          >
            목록
          </button>
          <input
            type="submit"
            style={{ backgroundColor: 'rgb(172, 235, 77)' }}
            className={styles.btnInput}
            value="등록"
          />
        </div>
      </form>
    </div>
    </div>
  )
}

export default BoardInsertForm
