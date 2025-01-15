import React, { createContext, useState, useEffect } from 'react';
import * as ticket from '../apis/ticket';
import * as pay from '../apis/pay';

// TicketContext 생성
export const TicketContext = createContext();

export const TicketContextProvider = ({ children }) => {
  const [ticketList, setTicketList] = useState([]); // 티켓 목록 상태
  const [buyList, setBuyList] = useState([]); // 구매한 티켓 목록 상태
  const [startDate, setStartDate] = useState(null); // 티켓 시작 날짜 상태

  const getList = async () => {
    try {
      const response = await ticket.list(""); // 빈 문자열로 전체 목록을 가져옴
      console.log("API 응답 데이터:", response);  // 응답 확인
  
      // 각 티켓에 checked: false를 기본값으로 추가
      const updatedTickets = response.data.map(ticket => ({
        ...ticket, // 기존의 ticket 데이터
        checked: false, // 기본 checked는 false
      }));
  
      // setTicketList로 상태 업데이트
      setTicketList(updatedTickets);
    } catch (error) {
      console.error("티켓 목록을 가져오는 데 실패했습니다.", error);
    }
  };
  

  // 데이터를 가져오기 위한 useEffect
  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const response = await pay.ticketDate();
        const { buyList, startedTicket } = response.data;
        setBuyList(buyList); // 구매 리스트 업데이트
        setStartDate(startedTicket); // 가장 오래된 티켓 업데이트
      } catch (err) {
        console.error("데이터를 불러오는 중 오류가 발생했습니다.", err);
      }
    };

    // 티켓 목록과 관련된 데이터 가져오기
    getList();
    // 티켓 정보와 구매 정보 업데이트
    fetchTicketData();
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행됨

  return (
    <TicketContext.Provider value={{ ticketList, setTicketList, buyList, startDate }}>
      {children}
    </TicketContext.Provider>
  );
};

export default TicketContextProvider;
