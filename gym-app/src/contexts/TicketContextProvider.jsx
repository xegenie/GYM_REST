import React, { createContext, useState, useEffect } from 'react';
import * as ticket from '../apis/ticket'

// TicketContext 생성
export const TicketContext = createContext();

export const TicketContextProvider = ({ children }) => {
    const [ticketList, setTicketList] = useState([])

  // getList 함수 정의
  const getList = async () => {
    try {
      const response = await ticket.list(""); // 빈 문자열로 전체 목록을 가져옴
      console.log("API 응답 데이터:", response);  // 응답 확인
      setTicketList(response.data);
    } catch (error) {
      console.error("티켓 목록을 가져오는 데 실패했습니다.", error);
    }
  };

  // 컴포넌트가 마운트 될 때 getList 호출
  useEffect(() => {
    getList();
  }, []); // 빈 배열을 두면 컴포넌트가 처음 렌더링될 때만 실행됨

  return (
    <TicketContext.Provider value={{ ticketList }}>
      {children}
    </TicketContext.Provider>
  );
};

export default TicketContextProvider;
