import React, { useContext, useEffect, useState } from 'react'
import MyBoardListContainer from '../../../containers/User/Board/MyBoardListContainer'
import Header from '../../../components/header/header'
import Footer from '../../../components/Footer/footer'
import { Link, useNavigate } from 'react-router-dom'
import * as Swal from '../../../apis/alert'
import { LoginContext } from '../../../contexts/LoginContextProvider'

const MyBoardList = () => {
  const { isLoading, isLogin, roles, logout, userInfo } = useContext(LoginContext);
  const navigate = useNavigate();

  // userNo 상태 추가
  const [userNo, setUserNo] = useState(null);

  // userInfo가 변경될 때마다 userNo 상태를 업데이트
  useEffect(() => {
    if (isLoading) {
      // 로딩 중일 때는 아무 동작도 하지 않음
      return;
    }
  
    // 로딩 완료 후 로그인 여부 확인
    if (!isLogin) {
      Swal.alert('로그인을 시도해주세요', '로그인 화면으로 이동합니다', 'warning', () => {
        navigate('/login');
      });
      return;
    }
  
    // 로그인되어 있다면 userInfo를 확인
    if (userInfo && userInfo.no) {
      setUserNo(userInfo.no);
      console.log('userNo:', userInfo.no);
    } else {
      console.log('userInfo가 없거나 userNo가 없습니다.');
    }
  }, [isLoading, userInfo, navigate]);

  return (
    <>
      <Header />
      <div className='oswUser'>
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
            <Link to={`/myPage/ptList/${userNo}`}>
            <button>PT 이용 내역</button>
            </Link>
            <Link to={`/myPage/boardList`}>
            <button>내 문의사항</button>
            </Link>
          </div>
        </div>
        </div>
        <div className="wrapper1">
      <div className="oswUserInfo" >
      <MyBoardListContainer userNo={userNo}/>
        </div>
      </div>
      </div>
      <Footer />
    </>
  )
}

export default MyBoardList