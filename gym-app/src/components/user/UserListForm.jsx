import React, { useState, useEffect } from "react";
import Sidebar from '../admin/Header/adminSidebar';
import './userListForm.css';

const UserListForm = ({ userList,page, keyword, currentPage, handleSearch, handlePageChange, setKeyword }) => {


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(keyword);
  };

  const handlePageLinkClick = (pageNumber) => {
    handlePageChange(pageNumber);
  };
  return (
    <div className="godDoUser">
      <div className="container">
      
        <div className="main">
          <Sidebar />
          <div className="inner">
            <div className="title">
              <h2>유저 목록</h2>
            </div>

            {/* 검색창 */}
            <div className="search-container">
              <form className="search" onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  name="keyword"
                  placeholder="등록명으로 검색"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit">검색</button>
              </form>
            </div>

            {/* 유저 목록 */}
            <div className="list">
              <table>
                <thead>
                  <tr >
                    <th style={{ width: "10%" }}>ID</th>
                    <th style={{ width: "10%" }}>이름</th>
                    <th style={{ width: "20%" }}>이메일</th>
                    <th style={{ width: "15%" }}>연락처</th>
                    <th style={{ width: "10%" }}>권한</th>
                    <th style={{ width: "12%" }}>담당 트레이너</th>
                    <th style={{ width: "13%" }}>가입일자</th>
                    <th style={{ width: "10%" }}>회원수정</th>
                  </tr>
                </thead>
                <tbody >
                  {userList.length === 0 ? (
                    <tr>
                      <td colSpan="8">조회된 데이터가 없습니다.</td>
                    </tr>
                  ) : (
                    userList.map((user) => (
                      <tr key={user.no} >
                        <td >
                          {user.id}
                        </td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td >{user.phone}</td>
                        <td >
                          {user.userAuth === "ROLE_ADMIN"
                            ? "관리자"
                            : user.userAuth === "ROLE_USER"
                            ? "회원"
                            : user.userAuth === "ROLE_TRAINER"
                            ? "트레이너"
                            : "기타"}
                        </td>
                        <td  >{user.trainerNo === null || user.trainerNo === 0 ? "-" : user.trainerName}</td>
                        <td>{new Date(user.createdAt).toLocaleString()}</td>
                        {user.userAuth !== "ROLE_ADMIN" && (
                          <td >
                            <a className="updateBtn" href={`update/${user.no}`}>
                              수정
                            </a>
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* 페이지네이션 */}
           
            <div className="pagination">
              {page && (
                <>
                  <a href="#" onClick={() => handlePageLinkClick(page.first)}>
                    ≪
                  </a>
                  {page.page !== page.first && (
                    <a href="#" onClick={() => handlePageLinkClick(page.prev)}>
                      ＜
                    </a>
                  )}
                  {Array.from({ length: page.end - page.start + 1 }, (_, i) => page.start + i).map((no) => (
                    <a
                      href="#"
                      key={no}
                      className={currentPage === no ? "active" : ""}
                      onClick={() => handlePageLinkClick(no)}
                    >
                      {no}
                    </a>
                  ))}
                  {page.page !== page.last && (
                    <a href="#" onClick={() => handlePageLinkClick(page.next)}>
                      ＞
                    </a>
                  )}
                  <a href="#" onClick={() => handlePageLinkClick(page.last)}>
                    ≫
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListForm;
