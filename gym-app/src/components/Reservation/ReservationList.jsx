import React, { useState } from 'react'
import * as format from '../../utils/format';
import './Reservation.css'
import ReservationListModal from './ReservationListModal';

const ReservationList = ({ reservations, option, page, handlePageChange, setOption, onSearch, fetchList }) => {

  const handleFilterChange = (e) => {
    const { name, value } = e.target

    const updatedOption = { ...option, [name]: value }
    setOption(updatedOption)
    if (name == "rows" || name == "orderCode" || name == "code") {
      setTimeout(() => onSearch(updatedOption), 0)
    }
  }

  const handleFilterSubmit = (e) => {
    e.preventDefault()
    onSearch(option)
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedReservationNo, setSelectedReservationNo] = useState(null)
  const [action, setAction] = useState('')


  const openModal = (reservationNo, action) => {
    setSelectedReservationNo(reservationNo)
    setAction(action)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedReservationNo(null)
    setAction(null)
    setIsModalOpen(false)
  }




  return (
    <>
      <form className="search-container" onSubmit={handleFilterSubmit}>
        <div className="select-contaienr">
          <select name="orderCode" id="order-code" value={option.orderCode} onChange={handleFilterChange}>
            <option value="0">신청순</option>
            <option value="1">예약일순</option>
          </select>
          <select name="code" id="code" value={option.code} onChange={handleFilterChange}>
            <option value="0">전체</option>
            <option value="1">완료건</option>
            <option value="2">예약중</option>
            <option value="3">취소건</option>
          </select>
        </div>
        <div className="search">
          <input type="text" name='keyword' placeholder='검색어를 입력해주세요' value={option.keyword} onChange={handleFilterChange} />
          <button type="submit">검색</button>
        </div>
      </form>
      <div className="ReservationList">
        <table>
          <thead style={{ fontWeight: 'bold' }}>
            <tr>
              <th>No</th>
              <th>회원명(ID)</th>
              <th>트레이너</th>
              <th>예약 시간</th>
              <th>신청 일시</th>
              <th>완료/취소 일시</th>
              <th style={{width: "140px"}}>상태</th>
            </tr>
          </thead>
          <tbody>
            {
              reservations.length == 0
                ?
                <tr>
                  <td colSpan={7} align='center'>조회된 데이터가 없습니다.</td>
                </tr>
                :
                reservations.map((reservation) => {
                  return (
                    <tr key={reservation.no}>
                      <td>{reservation.no}</td>
                      <td>{reservation.userName}({reservation.userId})</td>
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
                              className="complete"
                              data-no={reservation.no}
                              onClick={() => openModal(reservation.no, 'complete')}
                            >
                              완료
                            </button>
                            <button
                              type="button"
                              className="cancel"
                              data-no={reservation.no}
                              onClick={() => openModal(reservation.no, 'cancel')}
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
      <div className="pagination">
        <a
          onClick={() => handlePageChange(page.first)}
          className={`pagetag first ${page.page === page.first}`}
        >
          [처음]
        </a>
        {page.page !== page.first && (
          <a
            onClick={() => handlePageChange(page.page - 1)}
            className={`pagetag prev ${page.page === page.first ? "disabled" : ""}`}
          >
            [이전]
          </a>
        )}
        {Array.from({ length: page.end - page.start + 1 }, (_, idx) => page.start + idx).map((no) => (
          <a
            key={no}
            onClick={() => handlePageChange(no)}
            className={`pagetag ${page.page === no ? "active" : ""}`}
          >
            {no}
          </a>
        ))}
        {page.page !== page.last && (
          <a
            onClick={() => handlePageChange(page.page + 1)}
            className={`pagetag next ${page.page === page.last ? "disabled" : ""}`}
          >
            [다음]
          </a>
        )}
        <a
          onClick={() => handlePageChange(page.last)}
          className={`pagetag last ${page.page === page.last}`}
        >
          [마지막]
        </a>
      </div>
      {isModalOpen && (
        <ReservationListModal
          reservationNo={selectedReservationNo}
          action={action}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          reservations={reservations}
          fetchList={fetchList}
          />
      )}
    </>
  )
}

export default ReservationList
