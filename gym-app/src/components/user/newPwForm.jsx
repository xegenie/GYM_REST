import React from 'react'
import * as Swal from '../../apis/alert'

const NewPwForm = ({newPws}) => {

 const newPasswrod = (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;
    const passwordCheck = form.passwordCheck.value;
    const userdata = sessionStorage.getItem('userData');
    const code = JSON.parse(userdata); 

      if (password !== passwordCheck) {
          Swal.alert('비밀번호가 일치하지 않습니다.', '비밀번호를 확인해주세요', 'error');
          
          const passwordField = document.getElementById("password");

          passwordField.focus();
          
          
          return;
        }

        newPws( {password,code} );
}

  return (
    <div style={{ marginTop: 50, marginBottom: 50 }} className="container1 col-12 col-lg-4" id="contain-box">
      <div className="px-4 py-5 mt-5 text-center">
        <img className="FITlogo" src="/img/logo2.png" alt=""/>
        <h1 className="joins">비밀번호 변경</h1>
      </div>

      <form id="form" onSubmit={(e) => newPasswrod(e)}>
        <div className="centerdhkwnj">

          <div style={{ marginTop: 20 }} className="input-group my-2">
            <label>새 비밀번호</label>
            <input
              type="password"
              className="form-control"
              id='password'
              name='password'
              autoComplete='password'
              placeholder="새 비밀번호를 입력해주세요."
            />
          </div>

          <div style={{ marginTop: 20 }} className="input-group my-2">
            <label>새 비밀번호 확인</label>
            <input
              type="password"
              id='passwordCheck'
              name='passwordCheck'
              autoComplete='passwordCheck'
              className="form-control"
              placeholder="새 비밀번호를 입력해주세요."
            />
          </div>

          <div style={{ marginTop: 10 }}>
            <button className="btn-join" type="submit">비밀번호 변경</button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default NewPwForm