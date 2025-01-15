import React, { useState } from 'react'
import * as reservation from '../../apis/reservation'

const ReservationListModal = ({ reservationNo, action, isModalOpen, closeModal }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

      const result = await reservation.updateReservationByAdmin(reservationNo, action)

      if (result == '예약 처리 성공') {
        alert(`${action == 'complete' ? '완료' : '취소'} 처리되었습니다.`)
        closeModal()
      } else {
        setError(result)
      }
      window.location.reload()

    setLoading(false)
  }

  return (
    <>
      <div id="completeModal" className='modal' style={{ display: isModalOpen ? 'block' : 'none' }}>
        <div className="modal-container">
          <h2>{action == 'complete' ? '예약을 완료 처리하시겠습니까?' : '예약을 취소 처리하시겠습니까?'}</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="modal-action">
            <button onClick={handleSubmit} disabled={loading}>
              {loading ? '처리 중...' : '예'}
            </button>
            <button onClick={closeModal}>아니오</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReservationListModal