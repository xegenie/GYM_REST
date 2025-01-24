import React, { useContext, useEffect, useState } from 'react';
import * as pay from '../../../apis/pay';
import { LoginContext } from '../../../contexts/LoginContextProvider';
import { PayContext } from '../../../contexts/PayContextProvider';
import { TicketContext } from '../../../contexts/TicketContextProvider';
import * as trainerApi from '../../../apis/trainerProfile';
import './css/TrainerDetail.css';

const TrainerDetail = () => {
  const { ticketList, setTicketList, buyList, startDate, oldTicket } = useContext(TicketContext);
  const { userinfo, isLogin } = useContext(LoginContext);
  const { isScriptLoaded } = useContext(PayContext);
  const [trainer, setTrainer] = useState({});
  const [previewSrc, setPreviewSrc] = useState('');

  const trainerNo = new URLSearchParams(location.search).get('trainerNo'); // 쿼리 파라미터에서 trainerNo 가져오기

  // trainerNo로 데이터를 로드하는 함수
  const fetchTrainerData = async (no) => {
    try {
      const response = await trainerApi.select(no); // Trainer 데이터 API 호출
      const trainerData = response.data;
      console.log('트레이너 데이터:', trainerData);
      setTrainer(trainerData); // 가져온 데이터를 trainer에 설정

      // 파일 번호가 있는 경우 파일 API로 이미지 경로를 가져옵니다.
      if (trainerData.fileNo) {
        setPreviewSrc(`/api/files/${trainerData.no}/thumbnail`);
      }

    } catch (error) {
      console.error('트레이너 데이터 로드 오류:', error);
    }
  };

  // 컴포넌트 로드 시 데이터 가져오기
  useEffect(() => {
    if (trainerNo) {
      fetchTrainerData(trainerNo);
    }
  }, [trainerNo]);


  const handleTicketChange = (selectedTicketNo) => {
    setTicketList(prevTicketList =>
      prevTicketList.map(ticket => ({
        ...ticket,
        checked: ticket.no === selectedTicketNo ? !ticket.checked : false
      }))
    );
  };


  const requestPay = async () => {
    if (!isLogin) {
      alert('사용자 정보가 없습니다. 로그인해주세요.');
      return;
    }

    const checkedTicket = ticketList.find((ticket) => ticket.checked);
    if (!checkedTicket) {
      alert('상품을 선택하세요.');
      return;
    }

    console.log('Checked Ticket:', checkedTicket);

    const { name, price, months } = checkedTicket;
    const start = new Date(startDate).toISOString();

    let endDate = new Date(start);
    endDate.setMonth(endDate.getMonth() + months);

    if (isScriptLoaded && window.IMP) {
      window.IMP.init('imp24820185');
      window.IMP.request_pay(
        {
          pg: 'html5_inicis',
          pay_method: 'card',
          merchant_uid: 'IMP' + Date.now(),
          name: name,
          amount: price,
          buyer_email: userinfo?.email,
          buyer_name: userinfo?.name,
          buyer_tel: userinfo?.phone,
        },
        async function (rsp) {
          if (!rsp.success) {
            console.error(`결제 실패: ${rsp.error_msg}`);
          }

          if (rsp.success) {
            try {
              const response = await pay.paying({
                ticketNo: checkedTicket.no,
                userNo: userinfo?.no,
                trainerNo: trainerNo,
                startDate: start,
                endDate: endDate.toISOString(),
              });

              // 서버 응답 처리
              if (response.data.success) {
                window.location.href = '/pay/payResult?result=ok';
              } else {
                alert('구매 목록에 추가하는데 실패했습니다.');
              }
            } catch (error) {
              console.error('결제 요청 중 오류 발생:', error);
              alert('서버와의 통신에 실패했습니다.');
            }
          } else {
            alert('결제가 실패했습니다. 다시 시도해주세요.');
          }
        }
      );
    } else {
      alert('IAMPORT 라이브러리 로드 후 결제를 시도해주세요.');
    }
  };

  return (
    <div className="ptTicket">
      <div style={{ marginTop: '150px', marginBottom: '100px' }} className="ticket-container">
        <div className="card">
          <div className="hr">
            <span>프로필 상세</span>
          </div>

          <div className="card-items d-flex flex-column align-items-center justify-content-center">
            <div className="img border-bottom">
              <img src={previewSrc} alt="프로필 이미지" className="card-img-top" />
            </div>
            <div className="info">
              <p>{trainer?.detailInfo || ''}</p>
            </div>
          </div>

          <div className="hr"></div>

          <div className="ticket-date d-flex fw-bold justify-content-center align-items-center" style={{ height: '200px' }}>
            <span>보유중인 이용권 : &ensp;</span>
            <span>{buyList.length > 0 ? buyList[buyList.length - 1].ticketName : '없음'}</span>
            &ensp;(&ensp;
            <span>{oldTicket ? new Date(oldTicket.startDate).toLocaleDateString() + ' ~ ' : '-'}</span>
            &nbsp;
            <span>{buyList.length > 0 ? new Date(buyList[buyList.length - 1].endDate).toLocaleDateString() : ''}</span>
            &ensp;)
          </div>
          <div className="hr"></div>

          <div className="ticket d-flex flex-column align-items-center">
            {ticketList.length > 0 ? (
              ticketList
                .filter(ticket => ticket.type === 'PT')
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

export default TrainerDetail;
