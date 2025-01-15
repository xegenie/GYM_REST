import React, { useContext, useState, useEffect } from 'react';
import { TicketContext } from '../../../contexts/TicketContextProvider';
import './css/TicketDetail.css';
import { LoginContext } from '../../../contexts/LoginContextProvider';
import { PayContext } from '../../../contexts/PayContextProvider';

const NormalTicket = () => {
  const { ticketList, setTicketList, buyList, startDate } = useContext(TicketContext);
  const { userinfo, isLogin } = useContext(LoginContext);
  const { isScriptLoaded } = useContext(PayContext)

  const handleTicketChange = (selectedTicketNo) => {
    setTicketList(prevTicketList => 
      prevTicketList.map(ticket => 
        ticket.no === selectedTicketNo
          ? { ...ticket, checked: !ticket.checked }
          : ticket
      )
    );
  };

  const requestPay = () => {
    if (!isLogin) {
      alert('사용자 정보가 없습니다. 로그인해주세요.');
      return;
    }

    const checkedTicket = ticketList.find(ticket => ticket.checked);
    if (!checkedTicket) {
      alert('상품을 선택하세요.');
      return;
    }

    const { ticketName, ticketPrice, months } = checkedTicket;
    const name = userinfo?.name;
    const tel = userinfo?.phone;
    const email = userinfo?.email;
    const userNo = userinfo?.no;
    const startDate = new Date().toISOString();

    let endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + months);

    // IAMPORT 스크립트가 로드된 후 결제 요청
    if (isScriptLoaded && window.IMP) {
      window.IMP.init('imp24820185');
      window.IMP.request_pay({
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: "IMP" + Date.now(),
        name: ticketName,
        amount: ticketPrice,
        buyer_email: email,
        buyer_name: name,
        buyer_tel: tel,
      }, function (rsp) {
        if (rsp.success) {
          const csrfToken = document.querySelector('input[name="csrf"]').value;

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
    } else {
      alert("IAMPORT 라이브러리 로드 후 결제를 시도해주세요.");
    }
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
            <span>{buyList.length > 0 ? buyList[buyList.length - 1].ticketName : '없음'}</span>
            &ensp;(&ensp;
            <span>{startDate ? new Date(startDate.startDate).toLocaleDateString() + ' ~ ' : '-'}</span>
            &nbsp;
            <span>{buyList.length > 0 ? new Date(buyList[buyList.length - 1].endDate).toLocaleDateString() : ''}</span>
            &ensp;)
          </div>
          <div className="hr"></div>

          <div className="ticket d-flex flex-column align-items-center">
            {ticketList.length > 0 ? (
              ticketList
                .filter(ticket => ticket.type === '일반')
                .map(ticket => (
                  <div key={ticket.no} className="item">
                    <div className="d-flex align-items-center border-bottom" style={{ width: '100%', height: '150px' }}>
                      <div className="checkbox">
                        <input
                          type="checkbox"
                          className="ticket-checkbox"
                          name="ticket"
                          value={ticket.no}
                          checked={ticket.checked || false}
                          onChange={() => handleTicketChange(ticket.no)}
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
              <div>현재 이용권 목록이 없습니다.</div>
            )}
          </div>

          <div className="button">
            <button onClick={requestPay} className="btn btn-success">결제하기</button>
          </div>
        </div>
        <script src="https://cdn.iamport.kr/v1/iamport.js"></script>
      </div>
    </div>
  );
};

export default NormalTicket;
