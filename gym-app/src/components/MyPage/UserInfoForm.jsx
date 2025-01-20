import React from 'react'
import { Link } from 'react-router-dom'
import './UserInfoForm.css'

const UserInfoForm = ({ updateUser, userInfo, removeUser }) => {

    // 정보 수정
    const onUpdate = (e) => {
        e.preventDefault()
        const form = e.target
        const phone = form.phone.value
        const email = form.email.value
        const name = userInfo.name
        const no = userInfo.no

        console.log(phone, email, no, name)

        // topBtn 관련 코드 제거 (필요시 제대로 참조하도록 수정)
        // topBtn.style.display = "none";

        updateUser({ phone, email, no, name })
    }

    return (
        <div className='oswUserInfoForm'>
            <div className='UserInfo'>
                <div id="edit-form">
                    <h2>회원정보 수정</h2>
                    <form className='login-form' onSubmit={onUpdate}> {/* onSubmit에 함수 직접 전달 */}
                        <table className="info-table">
                            <tbody>
                                <tr>
                                    <th>아이디</th>
                                    <td><label>{userInfo?.id}</label></td>
                                </tr>
                                <tr>
                                    <th>이름</th>
                                    <td><label>{userInfo?.name}</label></td>
                                </tr>
                                <tr>
                                    <th>생일</th>
                                    <td><label>{userInfo?.birth}</label></td>
                                </tr>
                                <tr>
                                    <th>성별</th>
                                    <td><label>{userInfo?.gender}</label></td>
                                </tr>
                                <tr>
                                    <th>연락처</th>
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
                                    <th>이메일</th>
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
                                        <button type="button" className="delete" onClick={() => removeUser(userInfo.no)}>
                                            탈퇴하기
                                        </button>
                                        <Link to='/ChangePw'>
                                            <button type="button" className="change-password">
                                                비밀번호 수정
                                            </button>
                                        </Link>
                                        <button type="submit">
                                            수정완료
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserInfoForm
