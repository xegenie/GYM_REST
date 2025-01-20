import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';

const UserForm = ({}) => {


  const { userInfo } = useContext(LoginContext)



  return (
    
    <div className="user">
   <div className="wrapper" style={{ marginTop: '62px' }}>
        <h2 style={{ marginBottom: '15px', fontWeight: 800, color: 'white', marginTop: '-40px' }}>내 정보</h2>
    
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
            <Link 
    to="/UserInfo" 
    className="btn btn-primary" 
    style={{
        backgroundColor: '#142230', 
        float: 'right', 
        marginTop: '-15px', 
        borderColor: '#333',
        margin : '30px'
    }}
>
    정보 수정
</Link>

       
          </div>
   
    </div>
  </div>

  )
}

export default UserForm