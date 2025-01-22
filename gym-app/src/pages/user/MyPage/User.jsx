import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../../../apis/auth';
import * as Swal from '../../../apis/alert';
import { LoginContext } from '../../../contexts/LoginContextProvider';
import UserForm from '../../../components/MyPage/UserForm';
import './User.css';
import Header from '../../../components/header/header';
import Footer from '../../../components/Footer/footer';

const User = () => {
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



  return (
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
            <Link to={`/myPage/ptList/${userNo}`}>
            <button>PT 이용 내역</button>
            </Link>
            <button>내 문의사항</button>
          </div>
        </div>
        <div className="wrapper1">
          <UserForm userInfo={userInfo} updateUser={updateUser} removeUser={removeUser} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default User;
