import React, { useEffect, useState } from 'react'
import './css/ReservationList.css'
import { Link } from 'react-router-dom'
import Sidebar from '../Header/adminSidebar';
import * as format from '../../utils/format';

const ReservationList = ({ reservationList, pagination }) => {

  

  const [pageList, setPageList] = useState([])

  const createPageList = () => {
    let newPageList = []
    for (let i = pagination.start; i <= pagination.end; i++) {
      newPageList.push(i)
    }
    setPageList(newPageList)
  }

  useEffect(() => {
    createPageList()
  }, [pagination])

  return (
    <div className='ReservationList' style={{ display: 'flex' }}>
      <Sidebar />
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
                {
                  reservationList.length == 0
                    ?
                    <tr>
                      <td colSpan={7} align='center'>조회된 데이터가 없습니다.</td>
                    </tr>
                    :
                    reservationList.map((reservation) => {
                      return (
                        <tr key={reservation.no}>
                          <td>{reservation.no}</td>
                          <td>{reservation.userName}({reservation.userId})</td>
                          <td>{reservation.trainerName}</td>
                          <td>{format.formatDate(reservation.rvDate)}</td>
                          <td>{format.formatDate(reservation.createdAt)}</td>
                          {reservation.enabled == 2 ? (
                            <td style={{ color: "#2a9c1b" }}>
                              {format.formatDate(reservation.canceledAt)}</td>
                          )
                            : reservation.enabled == 1 ? (
                              <td></td>
                            )
                              : reservation.enabled == 0 ? (
                                <td style={{ color: '#dc3545' }}>
                                  {format.formatDate(reservation.canceledAt)}</td>
                              )
                                : null}
                          <td style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                            {reservation.enabled == 1 && (
                              <>
                                <button
                                  type="button"
                                  className="complete"
                                  data-no={reservation.no}
                                  onClick={() => showCompleteModal(reservation.no)}
                                >
                                  완료
                                </button>
                                <button
                                  type="button"
                                  className="cancel"
                                  data-no={reservation.no}
                                  onClick={() => showCancelModal(reservation.no)}
                                >
                                  취소
                                </button>
                              </>
                            )}
                            {reservation.enabled == 2 && <span className="ptComplete">완료</span>}
                            {reservation.enabled == 0 && <span className="cancel-text">취소</span>}
                          </td>
                        </tr>
                      )
                    })
                }
              </tbody>
            </table>
          </div>
          {
            (pagination != null && pagination.total > 0)
            &&
            (
              <div className="pagination">
                <Link to={`/admin/reservation/list?keyword=${keyword}&option=${option}&page=1`}>처음</Link>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ReservationList
