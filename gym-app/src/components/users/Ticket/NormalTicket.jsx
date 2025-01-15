import React, { useState, useEffect, useContext } from 'react';
import { TicketContext } from '../../../contexts/TicketContextProvider';
import './css/TicketDetail.css';

const NormalTicket = () => {
  const [user, setUser] = useState(null); // 사용자 정보 상태
  const { ticketList, setTicketList } = useContext(TicketContext); // ticketList를 context에서 가져옴

  const handleTicketChange = (selectedTicketNo) => {
    setTicketList((prevTicketList) => 
      prevTicketList.map((ticket) => 
        ticket.no === selectedTicketNo
          ? { ...ticket, checked: !ticket.checked } // 선택한 티켓의 checked 상태를 토글
          : ticket
      )
    );
  };

  const requestPay = () => {
    const checkedTicket = ticketList.find(ticket => ticket.checked);
    if (!checkedTicket) {
      alert('상품을 선택하세요.');
      return;
    }

    const { ticketName, ticketPrice, months } = checkedTicket;
    const price = parseInt(ticketPrice.replace('원', '').replace(',', ''));
    const name = user.name;
    const tel = user.phone;
    const email = user.email;
    const userNo = user.no;
    const startDate = new Date().toISOString();

    let endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + months);

    // 결제 처리 (IMP 라이브러리)
    window.IMP.init('imp24820185');
    window.IMP.request_pay({
      pg: 'html5_inicis',
      pay_method: 'card',
      merchant_uid: "IMP" + Date.now(),
      name: ticketName,
      amount: price,
      buyer_email: email,
      buyer_name: name,
      buyer_tel: tel,
    }, function (rsp) {
      if (rsp.success) {
        const csrfToken = document.querySelector('input[name="csrf"]').value;

        // 결제 성공 후 서버에 데이터 전송
        fetch('/user/pay/paying', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
          },
          body: JSON.stringify({
            ticketNo: checkedTicket.no,
            userNo: userNo,
            startDate: startDate,
            endDate: endDate.toISOString(),
          }),
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              window.location.href = '/user/pay/payResult?result=ok';
            } else {
              alert('구매 목록에 추가하는데 실패했습니다.');
            }
          })
          .catch(error => {
            alert('서버와의 통신에 실패했습니다.');
            console.error(error);
          });
      } else {
        alert('결제가 실패했습니다. 다시 시도해주세요.');
      }
    });
  };

  return (
    <div className="ticketDetail">
      <div className="ticket-container" style={{ marginTop: '150px', marginBottom: '100px' }}>
        <div className="card">
          <div className="hr">
            <span>일반 이용권 구매</span>
          </div>

          <div className="ticket-date d-flex fw-bold justify-content-center align-items-center" style={{ height: '200px' }}>
            <span>보유중인 이용권 : &ensp;</span>
            <span>{ticketList.length > 0 ? ticketList[ticketList.length - 1].ticketName : '없음'}</span>
            &ensp;(&ensp;
            <span>{ticketList.length > 0 ? ticketList[ticketList.length - 1].startDate : '-'}</span>
            <span>{ticketList.length > 0 ? ticketList[ticketList.length - 1].endDate : ''}</span>
            &ensp;)
          </div>
          <div className="hr"></div>

          <div className="ticket d-flex flex-column align-items-center">
            {ticketList.length > 0 ? (
              ticketList
                .filter(ticket => ticket.type === '일반') // '일반' 타입 필터링
                .map(ticket => (
                  <div key={ticket.no} className="item">
                    <div className="d-flex align-items-center border-bottom" style={{ width: '100%', height: '150px' }}>
                      <div className="checkbox">
                        <input
                          type="checkbox"
                          className="ticket-checkbox"
                          name="ticket"
                          value={ticket.no}
                          checked={ticket.checked || false} // 상태에 맞게 checked 설정
                          onChange={() => handleTicketChange(ticket.no)} // 상태 변경 함수 호출
                        />
                        <input type="hidden" name="startDate" value={new Date().toISOString()} />
                      </div>
                      <div className="ticket-content d-flex flex-column">
                        <span className="ticket-name">{ticket.name}</span>
                        <span className="ticket-info">{ticket.info}</span>
                        <span className="ticket-price">{`${ticket.price.toLocaleString()}원`}</span>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div>현재 이용권 목록이 없습니다.</div> // 티켓이 없을 경우 표시할 내용
            )}
          </div>

          <div className="button">
            <button onClick={requestPay} className="btn btn-success">결제하기</button>
          </div>
        </div>

        {/* IAMPORT 결제 라이브러리 추가 */}
        <script src="https://cdn.iamport.kr/v1/iamport.js"></script>
      </div>
    </div>
  );
};

export default NormalTicket;
