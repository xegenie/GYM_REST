import React, { useState, useEffect, useContext } from 'react';
import { TicketContext } from '../../../contexts/TicketContextProvider'
import * as pay from '../../../apis/pay';
import './css/ChoiceTicket.css';

const ChoiceTicket = () => {
  const { buyList, setBuyList, startDate, setStartDate } = useContext(TicketContext);
  const [error, setError] = useState(null);

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
