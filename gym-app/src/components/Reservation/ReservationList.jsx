import React from 'react'
import './css/ReservationList.css'

const ReservationList = () => {
  return (
    <div className='ReservationList'>
      <div className="main">
        <div className="inner">
          <div className="title">
            <h2>PT 예약 및 완료 목록</h2>
          </div>
          <div className="search-container">

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
                <tr>
                  <td>1</td>
                  <td>홍길동(hong)</td>
                  <td>김철수</td>
                  <td>2021-07-01 10:00</td>
                  <td>2021-06-30 15:00</td>
                  <td>2021-07-01 10:00</td>
                  <td>완료</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReservationList
