import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UserUpdateForm = ({user, getUpdate }) => {

  const no = useParams()

  const handleSubmit = (e) => {
    e.preventDefault();
    // 데이터 제출 로직 구현 (예: API 호출)
    console.log('Form submitted:', formData);
  };

  const handleDelete = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      // 삭제 요청 API 호출 구현
      console.log('User deleted');
      navigate('/'); // 삭제 후 메인 페이지로 이동
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault()
    const form = e.target
    const phone = form.phone.value
    const email = form.email.value
    const name = form.name.value
    const userAuth = form.auth.value

k

    getUpdate({name, email, phone, userAuth, no})

  }

  return (
    <div className="container">
      <div className="main">
        <div className="inner" style={{ textAlign: 'center', height: '700px' }}>
          <div className="title" style={{ marginBottom: '20px' }}>
            <h2>회원정보 수정</h2>
          </div>

          <div className="container-form">
            <form onSubmit={(e) => handleUpdate(e)} id="form">
              <input type="hidden" name="no" value={user?.no} />
              <table style={{ borderCollapse: 'collapse', borderBottom: '20px' }}>
                <tbody>
                  <tr>
                    <th>아이디(ID) :</th>
                    <td style={{ width: '300px' }}>{user?.id}</td>
                  </tr>
                  <tr>
                    <th>생년월일 :</th>
                    <td style={{ width: '300px' }}>{user?.birth}</td>
                  </tr>
                  <tr>
                    <th>이름 :</th>
                    <td style={{ width: '300px' }}>
                      <input
                        type="text"
                        name="name"
                        defaultValue={user?.name}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>이메일 :</th>
                    <td style={{ width: '300px' }}>
                      <input
                        type="text"
                        name="email"
                        defaultValue={user?.email}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>연락처 :</th>
                    <td style={{ width: '300px' }}>
                      <input
                        type="text"
                        name="phone"
                        defaultValue={user?.phone}
                        pattern="\d{11}"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>회원분류 :</th>
                    <td style={{ width: '300px' }}>
                      <select
                        name="auth"
                        defaultValue={user?.auth}
                      >
                        <option value="ROLE_USER">회원</option>
                        <option value="ROLE_TRAINER">트레이너</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="btn-box">
                <button type="submit">수정하기</button>
                <button
                  type="button"
                  style={{ backgroundColor: 'rgb(238, 120, 120)' }}
                  onClick={handleDelete}
                >
                  삭제하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserUpdateForm;
