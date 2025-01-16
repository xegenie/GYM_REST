import React from 'react'
import { Link } from 'react-router-dom'

const UserInfoForm = ({updateUser, userInfo, removeUser}) => {

        // 정보 수정
        const onUpdate = (e) => {
            e.preventDefault()
            const form = e.target
            const phone = form.phone.value
            const email = form.email.value
            const name = userInfo.name
            const no = userInfo.no
    
            console.log(phone, email, no, name)
    
            updateUser({phone, email, no, name})
        }

  return (
    <div className='UserInfo'>
    <div id="edit-form">
    <h2 style={{ marginBottom: "10px", fontWeight: 800, color: "white", marginLeft: "600px" }}>회원정보 수정</h2>
    <form className='login-form' onSubmit={(e) => onUpdate(e)}>

      <table className="info-table">
        <tbody>
          <tr>
            <th style={{ color: "black" }}>아이디</th>
            <td><label>{userInfo?.id}</label></td>
          </tr>
          <tr>
            <th style={{ color: "black" }}>이름</th>
            <td>
              <label>{userInfo?.name}</label>
            </td>
          </tr>
          <tr>
            <th style={{ color: "black" }}>생일</th>
            <td><label>{userInfo?.birth}</label></td>
          </tr>
          <tr>
            <th style={{ color: "black" }}>성별</th>
            <td><label>{userInfo?.gender}</label></td>
          </tr>
          <tr>
            <th style={{ color: "black" }}>연락처</th>
            <td>
              <div className="input-container">
                <i className="fa-solid fa-phone input-icon"></i>
                <input
                  type="text"
                  name="phone"
                  defaultValue={userInfo?.phone}
                  className="styled-input"
                  pattern="010\d{8}"
                  title="010이 포함된 11자리 숫자여야 합니다."
                  placeholder="연락처를 입력하세요"
                />
              </div>
            </td>
          </tr>
          <tr>
            <th style={{ color: "black" }}>이메일</th>
            <td>
              <div className="input-container">
                <i className="fa-solid fa-envelope input-icon"></i>
                <input
                  type="email"
                  name="email"
                  defaultValue={userInfo?.email}
                  className="styled-input"
                  placeholder="이메일을 입력하세요"
                />
              </div>
            </td>
          </tr>

          <tr className="button-tr">
            <td className="buttons" colSpan="2">
              <div style={{ float: "left" }}>
                <button type="button" className="delete" onClick={() => removeUser(userInfo.no)} >
                  탈퇴하기
                </button>
              <Link to='/ChangePw'>  <button type="button" className="change-password">
                  비밀번호 수정
                </button></Link>
              </div>
              <button style={{ float: "right" }} type="submit">
                수정완료
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
  </div>
)
}

export default UserInfoForm