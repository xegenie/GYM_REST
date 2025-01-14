import React from 'react';
import './adminHeader.module.css';
import './adminStyle.css';

const Header = () => {

  const handleLogout = async () => {
    // 로그아웃 요청을 보낼 때 CSRF 토큰을 헤더에 포함시켜 보냅니다.
    try {
      await fetch('/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), // 필요한 경우 body에 데이터 추가
      });
      // 로그아웃 후 처리
      window.location.href = '/'; // 또는 원하는 리디렉션
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <header>
      <div className="logo">
        <a href="/"><img src="/img/logo.png" alt="로고" /></a>
      </div>
      <div className="header-link">
        <a href="/">메인화면</a>
        <button 
          type="button"
          onClick={handleLogout}
          style={{ textDecoration: 'none', color: 'inherit', border: 'none', background: 'none' }}>
          로그아웃
        </button>
      </div>
    </header>
  );
}

export default Header;
