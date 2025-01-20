import React, { useContext, useEffect, useState } from 'react'
import * as format from '../../utils/format';
import './Reservation.css'
import * as Swal from '../../apis/alert';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';

const ReservationPtList = ({ reservationList }) => {

  const { userInfo, isLogin } = useContext(LoginContext)
  const [disabledCount, setDisabledCount] = useState(0)
  const [ptCount, setPtCount] = useState(0)

  const navigate = useNavigate()

  const [userNo, setUserNo] = useState(null);

  useEffect(() => {
    console.log('userInfo:', userInfo);

    if (!isLogin) {
      Swal.alert('로그인을 시도해주세요', '로그인 화면으로 이동합니다', 'warning', () => { navigate('/login') })
      return
    }

    if (userInfo && userInfo.no) {
      setUserNo(userInfo.no);
      console.log('userNo:', userInfo.no);
    } else {
      console.log('userInfo가 없거나 userNo가 없습니다.');
    }
  }, [userInfo]);



  return (
    <>
      <body className="fullBody ptList" style={{ color: "rgb(3, 3, 3)", backgroundColor: "#333" }}>
        <div className="wrapper" style={{ marginTop: '80px' }}>
          <main>
            <div className="main-text1" style={{ color: '#9FD0D5' }}>마이페이지</div>

            <div className="button-group">
              <button onClick={() => navigate('/User')}>내 정보</button>
              <button onClick={() => navigate(`/buyList/users/${userNo}`)}>이용권 내역</button>
              <button className="active" onClick={() => navigate(`/myPage/ptList/${userNo}`)}>PT 이용 내역</button>
              <button onClick={() => navigate('/user/myPage/myBoardList')}>내 문의사항</button>
            </div>

            <div className="pt-count">
              <div className="disabled-count">
                <span>완료 PT 횟수 : </span>
                <span>{disabledCount}</span>
              </div>
              <div className="pt-count-container">
                <span>남은 PT 횟수 : </span>
                <span>{ptCount}</span>
              </div>
            </div>
          </main>
        </div>

        <div className="list">
          <table>
            <thead style={{ fontWeight: 'bold' }}>
              <tr>
                <th>담당 트레이너</th>
                <th>예약 날짜</th>
                <th>신청 일시</th>
                <th>완료/취소 일시</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {
                reservationList.length == 0
                  ?
                  <tr>
                    <td colSpan={7} align='center'>조회된 데이터가 없습니다.</td>
                  </tr>
                  :
                  reservationList.map((reservation) => {
                    return (
                      <tr key={reservation.no}>
                        <td>{reservation.trainerName}</td>
                        <td style={{ fontWeight: "bold" }}>{format.formatRvDate(reservation.rvDate)}</td>
                        <td>{format.formatDate(reservation.createdAt)}</td>
                        {reservation.enabled == 2 ? (
                          <td style={{ color: "#2a9c1b" }}>
                            {format.formatDate(reservation.canceledAt)}</td>
                        )
                          : reservation.enabled == 1 ? (
                            <td></td>
                          )
                            : reservation.enabled == 0 ? (
                              <td style={{ color: '#dc3545' }}>
                                {format.formatDate(reservation.canceledAt)}</td>
                            )
                              : null}
                        <td style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                          {reservation.enabled == 1 && (
                            <>
                              <button
                                type="button"
                                className="cancel"
                                data-no={reservation.no}
                                onClick={() => showCancelModal(reservation.no)}
                              >
                                취소하기
                              </button>
                            </>
                          )}
                          {reservation.enabled == 2 && <span className="ptComplete">완료</span>}
                          {reservation.enabled == 0 && <span className="cancel-text">취소</span>}
                        </td>
                      </tr>
                    )
                  })
              }
            </tbody>
          </table>
        </div>
      </body>
    </>
  )
}

export default ReservationPtList
