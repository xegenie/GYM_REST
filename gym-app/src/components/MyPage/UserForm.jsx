import React, { useState } from 'react'

const UserForm = ({userInfo, updateUser, removeUser}) => {

      const [editMode, setEditMode] = useState(false);

      // 정보 수정
      const onUpdate = (e) => {
        e.preventDefault()
        const form = e.target
        const id = form.username.value
        const name = form.name.value
        const password = form.password.value
        const email = form.email.value

        console.log(id, password, name, email)

        updateUser({id, name, password, email})
    }

    console.log(userInfo)
  
    const handleCancelEdit = () => {
      setEditMode(false);
      setFormData({ phone, email });
    };

    




  return (
    <div className="user">
   <div className="wrapper" style={{ marginTop: '80px' }}>
        <h2 style={{ marginBottom: '15px', fontWeight: 800, color: 'white' }}>내 정보</h2>
    
          <div id="user-info">
            <table className="info-table">
              <tbody>
                <tr>
                  <th>아이디</th>
                  <td>{userInfo?.id}</td>
                </tr>
                <tr>
                  <th>이름</th>
                  <td>{userInfo?.name}</td>
                </tr>
                <tr>
                  <th>생일</th>
                  <td>{userInfo?.birth}</td>
                </tr>
                <tr>
                  <th>성별</th>
                  <td>{userInfo?.gender}</td>
                </tr>
                <tr>
                  <th>연락처</th>
                  <td>{userInfo?.phone}</td>
                </tr>
                <tr>
                  <th>이메일</th>
                  <td>{userInfo?.email}</td>
                </tr>
              </tbody>
            </table>
            <Link to="/UserInfo" className="btn btn-primary">정보 수정</Link>
          </div>
   
    </div>
  </div>
  )
}

export default UserForm