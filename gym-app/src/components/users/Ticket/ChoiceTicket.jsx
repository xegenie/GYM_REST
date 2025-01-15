import React, { useState, useEffect } from 'react';
import * as pay from '../../../apis/pay';
import './css/ChoiceTicket.css';

const ChoiceTicket = () => {
  const [buyList, setBuyList] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const response = await pay.ticketDate();
        const { buyList, startedTicket } = response.data;
        setBuyList(buyList); // 구매 리스트 업데이트
        setStartDate(startedTicket); // 가장 오래된 티켓 업데이트
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다."); // 에러 상태 설정
        console.error(err);
      }
    };

    fetchTicketData();
  }, []);

  return (
    <div className="ChoiceTicket">
      <div className="container">
        <div
          className="title d-flex flex-column justify-content-end align-items-center gap-5"
          style={{ height: "300px" }}
        >
          <h1>이용권 구매</h1>
          <div className="ticket d-flex">
            <span>보유중인 이용권 : &ensp;</span>
            {/* 이용권 이름 */}
            <span>{buyList.length > 0 ? buyList[buyList.length - 1].ticketName : '없음'}</span>
            &ensp;(&ensp;
            {/* 시작 날짜 */}
            <span>{startDate ? new Date(startDate.startDate).toLocaleDateString() + ' ~ ' : '-'}</span>
            &nbsp;
            {/* 만료 날짜 */}
            <span>{buyList.length > 0 ? new Date(buyList[buyList.length - 1].endDate).toLocaleDateString() : ''}</span>
            &ensp;)
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>} {/* 에러 메시지 */}
        </div>

        <div
          className="button d-flex gap-5 justify-content-center align-items-center"
          style={{ height: "460px" }}
        >
          <a className="normal rounded-4" href="/ticket/normalTicket">
            일반 이용권 구매
          </a>
          <a className="pt rounded-4" href="/user/ticket/trainerList">
            PT + 이용권 구매
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChoiceTicket;
