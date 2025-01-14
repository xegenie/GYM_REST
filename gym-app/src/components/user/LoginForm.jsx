import React, { useContext, useState, useEffect } from 'react';
import { LoginContext } from '../../contexts/LoginContextProvider';
import logo from '../../assets/imges/logo2.png';
import '../user/css/login.css';

const LoginForm = () => {
  const { login } = useContext(LoginContext);
  const [rememberId, setRememberId] = useState(false); // 아이디 저장 체크 상태
  const [autoLogin, setAutoLogin] = useState(false); // 자동 로그인 체크 상태
  const [savedId, setSavedId] = useState(''); // 저장된 아이디 상태

  // 페이지 로드 시 초기화
  useEffect(() => {
    const storedId = localStorage.getItem('savedId');
    const storedToken = localStorage.getItem('jwtToken');

    if (storedId) {
      setSavedId(storedId);
      setRememberId(true); // 아이디 저장 체크 상태 활성화
    }

    if (storedToken) {
      setAutoLogin(true); // 자동 로그인 활성화
      // 자동 로그인 처리 (예: 사용자 정보 확인 API 호출 가능)
    }
  }, []);

  const onLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const id = form.id.value;
    const password = form.password.value;

    // 아이디 저장 처리
    if (rememberId) {
      localStorage.setItem('savedId', id);
    } else {
      localStorage.removeItem('savedId');
    }

    // 로그인 처리
    login(id, password).then((token) => {
      if (autoLogin) {
        localStorage.setItem('jwtToken', token); // 자동 로그인: 로컬 스토리지에 저장
      } else {
        sessionStorage.setItem('jwtToken', token); // 세션 로그인: 세션 스토리지에 저장
      }
    });
  };

  return (
    <div className="login">
      <div className="fullBody">
        <div className="container12">
          <div className="container1">
            <div className="textcenter">
              <img className="FITlogo" src={logo} alt="Logo" />
              <h1>로그인</h1>
            </div>

            <main className="formsignin">
              <form onSubmit={onLogin}>
                <div className="form-floating">
                  <input
                    type="text"
                    id="id"
                    name="id"
                    placeholder="아이디"
                    autoFocus
                    required
                    defaultValue={savedId} // 저장된 아이디 표시
                  />
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="비밀번호"
                    required
                  />
                </div>

                <div className="form-check">
                  <div className="item">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="remember-id-check"
                      checked={rememberId}
                      onChange={(e) => setRememberId(e.target.checked)}
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
                      checked={autoLogin}
                      onChange={(e) => setAutoLogin(e.target.checked)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="remember-me-check"
                    >
                      자동 로그인
                    </label>
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <button type="submit">로그인</button>
                </div>
                <br />
                <br />
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
    </div>
  );
};

export default LoginForm;
