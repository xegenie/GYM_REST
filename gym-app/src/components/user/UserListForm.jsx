import React, { useState, useEffect } from "react";
import Sidebar from '../admin/Header/adminSidebar';
import './userListForm.css';

const UserListForm = ({ userList }) => {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState({ first: 1, last: 1, page: 1, start: 1, end: 1 });
  const [message, setMessage] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setPage({ ...page, page: 1 }); // 검색 시 첫 페이지로 초기화
  };

  const handlePageChange = (newPage) => {
    setPage({ ...page, page: newPage });
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
              <form className="search" onSubmit={handleSearch}>
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
                    <th>ID</th>
                    <th>이름</th>
                    <th >이메일</th>
                    <th >연락처</th>
                    <th >권한</th>
                    <th >담당 트레이너</th>
                    <th >가입일자</th>
                    <th>회원수정</th>
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
                          <a href={`read?no=${user.no}`}>{user.id}</a>
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
              <a
                href="#"
                className="first"
                onClick={() => handlePageChange(page.first)}
              >
                ≪
              </a>
              {page.page !== page.first && (
                <a
                  href="#"
                  className="prev"
                  onClick={() => handlePageChange(page.prev)}
                >
                  ＜
                </a>
              )}
              {[...Array(page.end - page.start + 1).keys()].map((no) => (
                <a
                  key={no + page.start}
                  className={page.page === no + page.start ? "active" : ""}
                  href="#"
                  onClick={() => handlePageChange(no + page.start)}
                >
                  {no + page.start}
                </a>
              ))}
              {page.page !== page.last && (
                <a
                  href="#"
                  className="next"
                  onClick={() => handlePageChange(page.next)}
                >
                  ＞
                </a>
              )}
              <a
                href="#"
                className="first"
                onClick={() => handlePageChange(page.last)}
              >
                ≫
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListForm;
