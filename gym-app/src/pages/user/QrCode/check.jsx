import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Check.css'; 
const Check = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const qrcodeId = params.get('qrcodeId');
  const uuid = params.get('uuid');

  // 메인 페이지로 이동하는 함수
  const goToMain = () => {
    navigate('/');
  };

  return (

    <div className="oswCheck">
    <div className="container">
      <h1 className="header">출석 체크</h1>
      <form action="/user/attendance/check" method="post">
        <input type="hidden" name="userNo" value={qrcodeId} />
        <input type="hidden" name="qrId" value={uuid} />
      </form>
      <button onClick={goToMain} className="btn">출석확인</button>
      <button onClick={goToMain} className="btn btn-secondary">메인으로</button>
    </div>
    </div>
  );
};

export default Check;
