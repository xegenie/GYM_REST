import React, { useEffect, useState } from 'react'
import ReservationList from '../../components/Reservation/ReservationList'
import * as reservation from '../../apis/reservation'
const ReservationListContainer = () => {

  const [reservationList, setReservationList] = useState([]);

  const getReservationList = async () => {
    const response = await reservation.list();
    const data = await response.data;
    const list = data.list;

    console.log(list);
    

    setReservationList(list)
  }


  useEffect(() => {
    getReservationList()
  }, []);

  
 
  // handleSearch 함수 정의
  const handleSearch = (event) => {
    event.preventDefault(); // 기본 제출 동작 방지
    console.log("검색 실행:", { keyword, orderCode, code });

    // TODO: 서버 API 호출 로직 추가
  };

  // handleOrderCodeChange 함수 정의
  const handleOrderCodeChange = (event) => {
    setOrderCode(Number(event.target.value));
  };

  // handleCodeChange 함수 정의
  const handleCodeChange = (event) => {
    setCode(Number(event.target.value));
  };

  // 예시 데이터용 handleComplete 및 handleCancel 함수 정의
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
      <ReservationList reservationList={reservationList} />
    </div>
  )
}

export default ReservationListContainer
