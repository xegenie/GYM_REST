import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';
import './header.css';

function Header() {
    const { isLogin: isAuthenticated, userInfo, roles, logout } = useContext(LoginContext);

    useEffect(() => {
        const menuBtn = document.getElementById('menu-btn');
        const menu = document.getElementById('menu');

        const handleMenuToggle = () => {
            menuBtn.classList.toggle('open');
            menu.classList.toggle('open');
        };

        menuBtn.addEventListener('click', handleMenuToggle);

        return () => {
            menuBtn.removeEventListener('click', handleMenuToggle);
        };
    }, []);

    const handleQrSubmit = () => {
        document.getElementById('qrForm').submit();
    };

    const handleLogout = (e) => {
        e.preventDefault();
        logout(true);
    };

    // roles 기본값 처리 및 배열 여부 확인
    const rolesArray = Array.isArray(roles) ? roles : [];

    return (
        
        <div className="oswHeader">
        <header className="header">
            <div className="menu-btn" id="menu-btn">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="logo">
                <Link to="/">
                    <img src="/images/logo.png" alt="FITNEXUS Logo" />
                </Link>
            </div>
            <nav className="nav-links">
                {!isAuthenticated && (
                    <>
                        <Link to="/join">회원가입</Link>
                        <Link to="/login">로그인</Link>
                    </>
                )}
                {isAuthenticated && (
                    <>
                        <a href="/generate-qr-code" onClick={handleQrSubmit}>
                            <i className="fa-solid fa-bell" style={{ marginRight: '10px' }}></i>
                            헬스장 입장
                        </a>
                        <a href="#" onClick={handleLogout}>로그아웃</a>
                        {rolesArray.includes('ROLE_USER') && (
                            <Link to="/user/myPage/info">마이페이지</Link>
                        )}
                        {(rolesArray.includes('ROLE_ADMIN') || rolesArray.includes('ROLE_TRAINER')) && (
                            <Link to="/admin/user/list">관리자페이지</Link>
                        )}
                    </>
                )}
            </nav>
        </header>
    </div>
    
    );
}

export default Header;
