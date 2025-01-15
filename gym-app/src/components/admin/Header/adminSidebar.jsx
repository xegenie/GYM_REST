import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './adminSidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const handleMouseOver = (e) => {
    const subMenu = e.currentTarget.querySelector(".sub-menu");
    if (subMenu) {
      subMenu.classList.add("active");
    }
  };
  
  const handleMouseOut = (e) => {
    const subMenu = e.currentTarget.querySelector(".sub-menu");
    if (subMenu && !subMenu.querySelector("a.current")) {
      subMenu.classList.remove("active");
    }
  };
  
  useEffect(() => {
    const currentUrl = location.pathname;
    const menuLinks = document.querySelectorAll(".sub-menu a");
  
    menuLinks.forEach((link) => {
      if (link.getAttribute("href") === currentUrl) {
        link.classList.add("current");
        const parentMenu = link.closest(".sub-menu");
        if (parentMenu) {
          parentMenu.classList.add("active");
        }
      } else {
        link.classList.remove("current");
      }
    });
  }, [location]);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Link to="/admin/reservation/list">
          <h2>관리</h2>
        </Link>
      </div>
      <nav>
        <ul className="main-menu">
          <li onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <h3>회원</h3>
            <ul className="sub-menu">
              <li><Link to="/admin/user/list">회원 목록</Link></li>
              <li><Link to="/admin/user/insert">회원 등록</Link></li>
            </ul>
          </li>
          <li onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <h3>트레이너</h3>
            <ul className="sub-menu">
              <li><Link to="/admin/trainer/list">트레이너 목록</Link></li>
              <li><Link to="/admin/trainer/insert">트레이너 등록</Link></li>
            </ul>
          </li>
          <li onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <h3>출석</h3>
            <ul className="sub-menu">
              <li><Link to="/admin/attendance/list">출석 회원 목록</Link></li>
            </ul>
          </li>
          <li onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <h3>이용권</h3>
            <ul className="sub-menu">
              <li><Link to="/admin/ticket/ticketList">이용권 목록</Link></li>
              <li><Link to="/admin/ticket/insert">이용권 등록</Link></li>
            </ul>
          </li>
          <li onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <h3>예약</h3>
            <ul className="sub-menu">
              <li><Link to="/admin/reservation/list">예약 목록</Link></li>
              <li><Link to="/admin/reservation/calendar">월별 예약 일정</Link></li>
            </ul>
          </li>
          <li onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <h3>매출</h3>
            <ul className="sub-menu">
              <li><Link to="/admin/sales/salesList">매출 조회</Link></li>
              <li><Link to="/admin/sales/buyList">구매내역 조회</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
