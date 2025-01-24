import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UserUpdateForm.css';
import Sidebar from '../admin/Header/adminSidebar';

const UserUpdateForm = ({ user, getUpdate }) => {
  const { no } = useParams(); // URL에서 no 가져오기
  const navigate = useNavigate();

  const [auth, setAuth] = useState('ROLE_USER'); // 기본값 설정

  useEffect(() => {
    // user.authList에서 no와 매칭되는 auth 값 찾기
    if (user?.authList) {
      const matchedAuth = user.authList.find((item) => item.no === parseInt(no))?.auth;
      if (matchedAuth) {
        setAuth(matchedAuth); // auth 값 설정
      }
    }
  }, [user, no]); // user나 no가 변경될 때마다 실행

  const handleDelete = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      console.log('User deleted');
      navigate('/'); // 삭제 후 메인 페이지로 이동
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const phone = form.phone.value;
    const email = form.email.value;
    const name = form.name.value;

    getUpdate({ name, email, phone, userAuth: auth, no });
  };

  return (
    <div className="user-update">
      <div className="container">
        <div className="main">
          <Sidebar />
          <div className="inner">
            <div className="title">
              <h2>회원정보 수정</h2>
            </div>
            <div className="form-container">
              <form onSubmit={handleUpdate} id="form">
                <input type="hidden" name="no" value={user?.no} />
                <table className="info-table">
                  <tbody>
                    <tr>
                      <th>아이디(ID) :</th>
                      <td>{user?.id}</td>
                    </tr>
                    <tr>
                      <th>생년월일 :</th>
                      <td>{user?.birth}</td>
                    </tr>
                    <tr>
                      <th>이름 :</th>
                      <td>
                        <input type="text" name="name" defaultValue={user?.name} />
                      </td>
                    </tr>
                    <tr>
                      <th>이메일 :</th>
                      <td>
                        <input type="text" name="email" defaultValue={user?.email} />
                      </td>
                    </tr>
                    <tr>
                      <th>연락처 :</th>
                      <td>
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
                      <td>
                        <select
                          name="auth"
                          value={auth} // 상태와 연동
                          onChange={(e) => setAuth(e.target.value)} // 변경 시 상태 업데이트
                        >
                          <option value="ROLE_USER">회원</option>
                          <option value="ROLE_TRAINER">트레이너</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="button-group">
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
    </div>
  );
};

export default UserUpdateForm;
