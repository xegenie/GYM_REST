import React, { useState, useEffect } from 'react';

const ChoiceTicket = () => {
  // 예시 데이터 (실제 데이터를 받아오는 로직 추가 가능)
  const [buyList, setBuyList] = useState([]);
  const [oldestBuyList, setOldestBuyList] = useState(null);

  // useEffect를 사용하여 초기 데이터 로딩 처리
  useEffect(() => {
    // 실제 데이터를 불러오는 로직 예시
    // 예를 들어, fetch나 axios 등을 사용해서 buyList와 oldestBuyList를 가져옴
    setBuyList([
      { ticketName: 'VIP 이용권', endDate: '2025-01-30' }
    ]);
    setOldestBuyList({ startDate: '2023-12-01' });
  }, []);

  return (
    <div className="container">
      <div className="title d-flex flex-column justify-content-end align-items-center gap-5" style={{ height: "300px" }}>
        <h1>이용권 구매</h1>
        <div className="ticket d-flex">
          <span>보유중인 이용권 : &ensp;</span>
          <span>{buyList.length > 0 ? buyList[buyList.length - 1].ticketName : '없음'}</span>
          &ensp;(&ensp;
          <span>{oldestBuyList ? new Date(oldestBuyList.startDate).toLocaleDateString() + ' ~ ' : '-'}</span>
          <span>{buyList.length > 0 ? new Date(buyList[buyList.length - 1].endDate).toLocaleDateString() : ''}</span>
          &ensp;)
        </div>
      </div>

      <div className="button d-flex gap-5 justify-content-center align-items-center" style={{ height: "460px" }}>
        <a className="normal rounded-4" href="/user/ticket/normal">일반 이용권 구매</a>
        <a className="pt rounded-4" href="/user/ticket/trainerList">PT + 이용권 구매</a>
      </div>
    </div>
  );
};

export default ChoiceTicket;
