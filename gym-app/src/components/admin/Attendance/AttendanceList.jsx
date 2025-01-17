import React, { useState, useEffect } from 'react';
import './AttendanceList.css';
import Sidebar from '../Header/adminSidebar';

const AttendanceTable = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [option, setOption] = useState({ keyword: '', code: '', orderCode: '' });
  const [page, setPage] = useState({ page: 1, rows: 10, first: 1, last: 1, start: 1, end: 1 });

  // 출석 리스트 가져오기
  const fetchAttendanceList = async (pageNumber = 1) => {
    try {
      const response = await fetch(`http://localhost:8080/admin/attendance/list?page=${pageNumber}&keyword=${option.keyword}`);
      if (response.ok) {
        const { attendanceList, option: newOption, page: newPage } = await response.json();
        setAttendanceList(attendanceList);
        setOption(newOption);
        setPage(newPage);
      } else {
        console.error('Failed to fetch attendance list');
      }
    } catch (error) {
      console.error('Error fetching attendance list:', error);
    }
  };

  useEffect(() => {
    fetchAttendanceList();
  }, []);

  // 페이지 변경
  const handlePageChange = (pageNumber) => {
    setPage((prev) => ({ ...prev, page: pageNumber }));
    fetchAttendanceList(pageNumber);
  };

  return (
    <div className="oswAttendanceList">
      <div className="container">

        <Sidebar />
        <div className="main">
          <div className="inner">

            <div className="mainTitle">
              <h2 style={{ fontWeight: 'bold', fontSize: '20px' }}>출석 내역</h2>
            </div>

            {/* 검색 폼 */}
            <form
              className="search"
              onSubmit={(e) => {
                e.preventDefault();
                fetchAttendanceList(1);
              }}
            >
              <input
                type="text"
                name="keyword"
                placeholder="검색어를 입력해주세요."
                value={option.keyword}
                onChange={(e) => setOption({ ...option, keyword: e.target.value })}
              />
              <button type="submit" className="button">검색</button>
            </form>

            {/* 출석 테이블 */}
            <div className="list">
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>아이디</th>
                    <th>이름</th>
                    <th>이메일</th>
                    <th>핸드폰 번호</th>
                    <th>입장 시각</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceList.length === 0 ? (
                    <tr>
                      <td colSpan="6" align="center">출석 이용자가 없습니다.</td>
                    </tr>
                  ) : (
                    attendanceList.map((attendance) => (
                      <tr key={attendance.qrId}>
                        <td>{attendance.userNo}</td>
                        <td>{attendance.users.id}</td>
                        <td>{attendance.users.name}</td>
                        <td>{attendance.users.email}</td>
                        <td>{attendance.users.phone}</td>
                        <td>{new Date(attendance.checkTime).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* 페이지네이션 */}
            <div className="pagination">
              <a onClick={() => handlePageChange(page.first)} className="first">[처음]</a>
              {page.page !== page.first && (
                <a onClick={() => handlePageChange(page.page - 1)} className="prev">[이전]</a>
              )}
              {Array.from({ length: page.end - page.start + 1 }, (_, idx) => page.start + idx).map((no) => (
                <a
                  key={no}
                  onClick={() => handlePageChange(no)}
                  className={page.page === no ? 'active' : ''}
                >
                  {no}
                </a>
              ))}
              {page.page !== page.last && (
                <a onClick={() => handlePageChange(page.page + 1)} className="next">[다음]</a>
              )}
              <a onClick={() => handlePageChange(page.last)} className="last">[마지막]</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTable;
