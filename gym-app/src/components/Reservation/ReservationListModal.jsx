import React, { useState } from 'react';
import * as reservation from '../../apis/reservation';

const ReservationListModal = ({
  reservationNo,
  action,
  isModalOpen,
  closeModal,
  reservations,
  fetchList
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    console.log('예약번호 : ' + reservationNo);
    console.log('완료/취소 구분 : ' + action);

    try {
      const response = await reservation.updateReservationByAdmin(reservationNo, action);

      console.log('응답 결과 : ' + response);
      if (response.data === '예약 처리 성공') {
        alert(`${action === 'complete' ? '완료' : '취소'} 처리되었습니다.`);

        fetchList();

        closeModal();  
      } else {
        setError(response.data || '예약 처리에 실패했습니다.');
      }
    } catch (err) {
      console.error('예약 처리 중 오류 발생:', err);
      setError('서버 오류 발생. 다시 시도해 주세요.');
    }

    setLoading(false);
  };

  return (
    <>
      <div id="completeModal" className="modal" style={{ display: isModalOpen ? 'block' : 'none' }}>
        <div className="modal-container">
          <h2>{action === 'complete' ? '예약을 완료 처리하시겠습니까?' : '예약을 취소 처리하시겠습니까?'}</h2>
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
  );
};

export default ReservationListModal;
