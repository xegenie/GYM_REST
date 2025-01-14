import React, { useEffect, useState } from 'react';
import ReservationList from '../../components/Reservation/ReservationList';
import * as reservation from '../../apis/reservation';

const ReservationListContainer = () => {
  const [reservationList, setReservationList] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [orderCode, setOrderCode] = useState(0);
  const [code, setCode] = useState(0);
  const [page, setPage] = useState(1);  // 페이지 상태 추가

  const getReservationList = async () => {
    try {
      const option = { orderCode, code };  // option 객체 생성
      const response = await reservation.list(keyword, option, page);
      const data = response.data;  // 데이터 구조에 맞게 처리
      const list = data.list;  // 목록 추출

      console.log(list);
      setReservationList(list);  // 상태 업데이트
    } catch (error) {
      console.error('Error fetching reservation list:', error);
    }
  };

  useEffect(() => {
    getReservationList();
  }, [keyword, orderCode, code, page]);  // 의존성 배열에 page 추가

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("검색 실행:", { keyword, orderCode, code });
    getReservationList();  // 검색 후 목록 다시 불러오기
  };

  const handleOrderCodeChange = (event) => {
    setOrderCode(Number(event.target.value));
  };

  const handleCodeChange = (event) => {
    setCode(Number(event.target.value));
  };

  const handleComplete = (reservationNo) => {
    console.log(`완료 처리: ${reservationNo}`);
    // TODO: 완료 처리 로직 추가
  };

  const handleCancel = (reservationNo) => {
    console.log(`취소 처리: ${reservationNo}`);
    // TODO: 취소 처리 로직 추가
  };

  return (
    <div>
      <ReservationList
        reservationList={reservationList}
        handleSearch={handleSearch}
        handleOrderCodeChange={handleOrderCodeChange}
        handleCodeChange={handleCodeChange}
      />
    </div>
  );
};

export default ReservationListContainer;
