import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../../contexts/LoginContextProvider';
import { TicketContext } from '../../../contexts/TicketContextProvider';
import './css/PayResultComponent.css'

const PayResultComponent = () => {

  const { ticketList, setTicketList, buyList, startDate, oldTicket } = useContext(TicketContext);
  const { userInfo } = useContext(LoginContext);



  return (
    <body className="payResult-fullBody">
      <div className="container">
        <div className="title d-flex flex-column justify-content-end align-items-center gap-5"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -80%)',
          }}>
          <div className="checkbox-icon"></div>
          <h1>구매 완료</h1>
          <div className="ticket d-flex">
            <span>보유중인 이용권 : &ensp;</span>
            <span>{buyList.length > 0 ? buyList[buyList.length - 1].ticketName : '없음'}</span>
            &ensp;(&ensp;
            <span>{oldTicket ? new Date(oldTicket.startDate).toLocaleDateString() + ' ~ ' : '-'}</span>
            &nbsp;
            <span>{buyList.length > 0 ? new Date(buyList[buyList.length - 1].endDate).toLocaleDateString() : ''}</span>
            &ensp;)
          </div>

          <div className="d-flex gap-5 justify-content-center align-items-center">
            <Link to="/">메인으로</Link>
            <Link to={`/buyList/users/${userInfo?.no}`}>마이페이지</Link>
          </div>

        </div>

      </div>
    </body>
  )
}

export default PayResultComponent
