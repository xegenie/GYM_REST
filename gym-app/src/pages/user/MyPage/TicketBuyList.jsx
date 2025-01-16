import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../../../apis/auth';
import * as Swal from '../../../apis/alert';
import { LoginContext } from '../../../contexts/LoginContextProvider';
import './UserInfo.css';
import Header from '../../../components/header/header';
import Footer from '../../../components/Footer/footer';

const TicketBuyList = () => {
  const { isLoading, isLogin, roles, logout, userInfo } = useContext(LoginContext);
  const navigate = useNavigate();

  const [userNo, setUserNo] = useState(null);
  const [ticketBuyList, setTicketBuyList] = useState([]);
  const [startedTicket, setStartedTicket] = useState(null);

  // userNo 상태 추가
  useEffect(() => {
    console.log('userInfo:', userInfo);
    if (userInfo && userInfo.no) {
      setUserNo(userInfo.no);
      console.log('userNo:', userInfo.no);
    } else {
      console.log('userInfo가 없거나 userNo가 없습니다.');
    }
  }, [userInfo]);

  useEffect(() => {
    if (userNo) {
      // API 호출하여 구매 내역 데이터 가져오기
      fetch(`http://localhost:8080/buyList/users/${userNo}`)
        .then(response => response.json())
        .then(data => {
          console.log('구매 리스트 데이터:', data);

          // 데이터에서 티켓 구매 내역과 가장 오래된 티켓 가져오기
          setTicketBuyList(data.ticketBuyList);

          const startedTicket = data.ticketBuyList.filter(b => b.status === '정상')
            .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))[0];
          
          setStartedTicket(startedTicket);
        })
        .catch(error => console.error('API 호출 중 오류 발생:', error));
    }
  }, [userNo]);

  const updateUser = async (form) => {
    try {
      const response = await auth.update(form);
      if (response.status === 200) {
        Swal.confirm('회원정보 수정 성공', '로그아웃 후 다시 로그인 해주세요.', 'success', () => logout(true));
      } else {
        Swal.confirm('회원정보 수정 실패', '회원정보 수정에 실패했습니다.', 'error');
      }
    } catch (error) {
      console.error('회원정보 수정 중 에러가 발생하였습니다.');
    }
  };

  const removeUser = async (no) => {
    try {
      const response = await auth.remove(no);
      if (response.status === 200) {
        Swal.alert('회원탈퇴 성공', '그동안 감사했습니다.🎁', 'success', () => logout(true));
      } else {
        Swal.alert('회원탈퇴 실패', '들어올 땐 마음대로 들어왔지만 나갈 때 그럴 수 없습니다..🎁', 'error', () => logout(true));
      }
    } catch (error) {
      console.error('회원 탈퇴 처리 중 에러가 발생하였습니다.');
    }
  };

  useEffect(() => {
    if (isLoading) return; // 로딩 중일 때는 처리하지 않음
    if (!isLogin || !roles.isUser) {
      Swal.alert('로그인을 시도해주세요', '로그인 화면으로 이동합니다', 'warning', () => navigate('/login'));
    }
  }, [isLoading]);

  return (
    <div className='oswTicketBuyList'>
    <div className="oswUser" style={{ height: "100%" }}>
      <Header />
      <div className="container1">
        <h1>마이페이지</h1>
        <hr />
        <h1>마이페이지</h1>
        <div className="button-group">
          <br />
          <div className='btnAll'>
            <Link to="/User">
              <button className="active">내 정보</button>
            </Link>
            <Link to={`/buyList/users/${userNo}`}>
              <button>이용권 내역</button>
            </Link>
            <button>PT 이용 내역</button>
            <button>내 문의사항</button>
          </div>
        </div>
        <div className="wrapper1">

          {/* 내 티켓 구매 내역 렌더링 */}
          <div className="main-text" style={{ color: "#ffffff" }}>보유중인 이용권</div>
          <table className="info-table">
            <tr>
              <th style={{ color: 'rgb(255, 255, 255)' }}>이용권</th>
              <td>{ticketBuyList.length > 0 ? ticketBuyList[ticketBuyList.length - 1].ticketName : '없음'}</td>
            </tr>
            <tr>
              <th style={{ color: 'rgb(255, 255, 255)' }}>구매일시</th>
              <td>{startedTicket ? new Date(startedTicket.startDate).toLocaleDateString() : '-'}</td>
            </tr>
            <tr>
              <th style={{ color: 'rgb(255, 255, 255)' }}>만료일시</th>
              <td>{startedTicket ? new Date(startedTicket.endDate).toLocaleDateString() : '-'}</td>
            </tr>
          </table>

          <div className="main-text" style={{ color: '#ffffff', marginTop: '100px' }}>이용권 내역</div>
          <table className="info-table2" border="1">
            <thead>
              <tr>
                <th style={{ width: '15%', textAlign: 'center' }}>번호</th>
                <th style={{ width: '35%', textAlign: 'center' }}>이용권</th>
                <th style={{ width: '20%', textAlign: 'center' }}>가격</th>
                <th style={{ width: '30%', textAlign: 'center' }}>구매일시</th>
              </tr>
            </thead>
            <tbody>
              {ticketBuyList.map((buy, index) => (
                <tr key={index}>
                  <td style={{ textAlign: 'center' }}>{buy.no}</td>
                  <td style={{ textAlign: 'center' }}>{buy.ticketName}</td>
                  <td style={{ textAlign: 'center' }}>{new Intl.NumberFormat().format(buy.ticketPrice)} 원</td>
                  <td style={{ textAlign: 'center' }}>{new Date(buy.buyDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
      <Footer />
    </div>
    </div>
  );
};

export default TicketBuyList;
