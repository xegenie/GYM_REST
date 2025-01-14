import React, { useContext } from 'react';
import { LoginContext} from '../../contexts/LoginContextProvider'
import logo from '../../assets/imges/logo2.png';

const LoginForm = () => {

  const { login } = useContext(LoginContext) // LoginContext의 로그인 함수

  const onLogin = (e) =>{
      e.preventDefault()
      const form = e.target
      const id = form.id.value
      const password = form.password.value

      login(id, password)
  }
  return (
    <div className="fullBody">
  

      <div className="container1 col-12 col-md-6 col-lg-4">
        <div className="container1">
          <div className="px-4 py-5 mt-5 text-center">
            <img className="FITlogo" src={logo} alt="Logo" />
            <h1>로그인</h1>
          </div>

          <main className="form-signin login-box w-100 m-auto">
            <form onSubmit={(e) =>onLogin(e)}>
              <div className="form-floating">
                <input
                  type="text"
                  id="id"
                  name="id"
                  placeholder="아이디"
                  autoFocus
                  required
                />
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  id="pw"
                  name="pw"
                  placeholder="비밀번호"
                  required
                />
              </div>

              <div className="form-check text-start my-3 d-flex justify-content-around">
                <div className="item">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="remember-id-check"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="remember-id-check"
                  >
                    아이디 저장
                  </label>
                </div>
                <div className="item">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="remember-me-check"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="remember-me-check"
                  >
                    자동 로그인
                  </label>
                </div>
              </div>

              {/* 로그인 에러/로그아웃 메시지는 상태로 관리 */}
              {/* 
              Example:
              {error && <p className="text-center text-danger">{errorMessage}</p>}
              {logout && <p className="text-center text-success">정상적으로 로그아웃 되었습니다.</p>}
              */}

              <div style={{ textAlign: 'center' }}>
                <button type="submit">로그인</button>
              </div>
              <hr />
              <div className="subbutton">
                <a href="/join">회원가입</a>
                <span>|</span>
                <a href="/user/findId">아이디 찾기</a>
                <span>|</span>
                <a href="/user/findPassword">비밀번호 찾기</a>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
