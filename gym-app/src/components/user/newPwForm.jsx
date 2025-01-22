import React, { useContext } from 'react';
import * as Swal from '../../apis/alert';
import styles from '../../components/user/css/ChangePw.module.css'; // 모듈화된 CSS import
import logo from '../../assets/imges/logo2.png';
import LoginContext from '../../contexts/LoginContextProvider';

const NewPwForm = ({ newPws }) => {


  
  const newPassword = (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.newPassword.value;
    const passwordCheck = form.passwordCheck.value;
    const userdata = sessionStorage.getItem('userData');
    const code = JSON.parse(userdata);

    if (password !== passwordCheck) {
      Swal.alert('비밀번호가 일치하지 않습니다.', '비밀번호를 확인해주세요', 'error');

      const passwordField = document.getElementById('password');
      passwordField.focus();
      return;
    }

    newPws({ password, code });
  };

 

  return (
    <body className={`${styles.body}`}>

    
    <div className={`${styles.container1}`} id="contain-box">
      <div className="px-4 py-5 mt-5 text-center">
           <img className={styles.FITlogo} src={logo} alt="" />
        <h1 className={styles.h1}>비밀번호 변경</h1>
      </div>

      <form id="form" onSubmit={(e) => newPassword(e)}>
        <div className={styles.centerdhkwnj}>
          <div className={styles.inputtags}>
         
          <div className="input-group my-2">
            <div className={styles.label2}>
            <label className={styles.label}>새 비밀번호</label>
            </div>
            <div className={styles.formCenter}>
            <input
              type="newPassword"
              className={styles.formControl}
              id="newPassword"
              name="newPassword"
              autoComplete="password"
              placeholder="새 비밀번호를 입력해주세요."
            />
          </div>
          </div>

          <div className="input-group my-2" >
          <div>
            <label className={styles.label}>새 비밀번호 확인</label>
             </div>
            <div className={styles.formCenter}>
            <input
              type="password"
              id="passwordCheck"
              name="passwordCheck"
              autoComplete="passwordCheck"
              className={styles.formControl}
              placeholder="새 비밀번호를 입력해주세요."
            />
            </div>
          </div>
          </div>

          <div style={{ marginTop: 10, textAlign: 'center' }}>
            <button className={styles.btnJoin} type="submit">
              비밀번호 변경
            </button>
          </div>
        </div>
      </form>
    
    </div>
    </body>
  );
};

export default NewPwForm;
