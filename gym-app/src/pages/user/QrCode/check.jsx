import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Check.css'; 

const Check = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const qrcodeId = params.get('qrcodeId');  // 사용자 ID
  const uuid = params.get('uuid');  // QR 코드 ID

  // 출석 체크 요청을 서버로 보내는 함수
  const handleAttendanceCheck = async () => {
    try {
      // JWT 토큰 없이 요청
      const response = await fetch('/api/user/attendance/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ qrId: uuid }), // 필요한 데이터만 보내기
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message || "출석 체크 완료");
      } else {
        alert(data.message || "출석 체크 실패");
      }
    } catch (error) {
      console.error('출석 체크 오류:', error);
      alert('출석 체크 중 오류가 발생했습니다.');
    }
  };

  // 메인 페이지로 이동하는 함수
  const goToMain = () => {
    navigate('/');
  };

  return (
    <div className="oswCheck">
      <div className="container">
        <h1 className="header">출석 체크</h1>
        <button onClick={handleAttendanceCheck} className="btn">출석 확인</button>
        <button onClick={goToMain} className="btn btn-secondary">메인으로</button>
      </div>
    </div>
  );
};

export default Check;
