import React, { useState } from 'react';
import './css/ReservationList.module.css';

const ReservationList = ( {reservationList} ) => {
  const [keyword, setKeyword] = useState("");
  const [orderCode, setOrderCode] = useState(0);
  const [code, setCode] = useState(0);
  
  return (
    <div className='main'>
      <div className="inner">
        <div className="title">
          <h2>PT 예약 및 완료 목록</h2>
        </div>
        <div className="search-container">
          <form className="search" onSubmit={handleSearch}>
            <div className="left-align">
              <select value={orderCode} onChange={handleOrderCodeChange}>
                <option value="0">신청순</option>
                <option value="1">예약일순</option>
              </select>
              <select value={code} onChange={handleCodeChange}>
                <option value="0">전체</option>
                <option value="1">완료건</option>
                <option value="2">예약중</option>
                <option value="3">취소건</option>
              </select>
            </div>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="검색어를 입력해주세요"
            />
            <button type="submit">검색</button>
          </form>
        </div>

        <div className="list">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>회원명(ID)</th>
                <th>트레이너</th>
                <th>예약 시간</th>
                <th>신청 일시</th>
                <th>완료/취소 일시</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {reservationList.map((reservation) => (
                <tr key={reservation.no}>
                  <td>{reservation.no}</td>
                  <td>{`${reservation.userName} (${reservation.userId})`}</td>
                  <td>{reservation.trainerName}</td>
                  <td>{reservation.rvDate}</td>
                  <td>{reservation.createdAt}</td>
                  <td
                    style={{
                      color:
                        reservation.enabled === 0
                          ? '#dc3545'
                          : reservation.enabled === 2
                            ? '#2a9c1b'
                            : '',
                    }}
                  >
                    {reservation.canceledAt}
                  </td>
                  <td>
                    {reservation.enabled === 1 && (
                      <>
                        <button onClick={() => handleComplete(reservation.no)}>
                          완료
                        </button>
                        <button onClick={() => handleCancel(reservation.no)}>
                          취소
                        </button>
                      </>
                    )}
                    {reservation.enabled === 2 && <span>완료</span>}
                    {reservation.enabled === 0 && <span>취소</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          {/* 페이지네이션 로직 */}
          <button>처음</button>
          <button>이전</button>
          {/* 페이지 번호 로직 */}
          <button>다음</button>
          <button>마지막</button>
        </div>
      </div>
    </div>
  );
};

export default ReservationList;
