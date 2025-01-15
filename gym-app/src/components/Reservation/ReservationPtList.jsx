import React from 'react'
import * as format from '../../utils/format';
import './Reservation.css'

const ReservationPtList = ({ reservationList }) => {
  return (
    <>
      <div className="list">
        <table>
          <thead style={{ fontWeight: 'bold' }}>
            <tr>
              <th>담당 트레이너</th>
              <th>예약 날짜</th>
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
                      <td>{reservation.trainerName}</td>
                      <td style={{ fontWeight: "bold" }}>{format.formatRvDate(reservation.rvDate)}</td>
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
                      <td style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        {reservation.enabled == 1 && (
                          <>
                            <button
                              type="button"
                              className="cancel"
                              data-no={reservation.no}
                              onClick={() => showCancelModal(reservation.no)}
                            >
                              취소하기
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
    </>
  )
}

export default ReservationPtList
