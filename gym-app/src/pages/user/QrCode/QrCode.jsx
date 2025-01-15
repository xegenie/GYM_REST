import React, { useEffect, useState, useContext } from 'react';
import QRCode from 'qrcode';
import { LoginContext } from '../../../contexts/LoginContextProvider';
import * as api from '../../../apis/qrCode';
import './QrCode.css';

const QrCode = () => {
  const { isLoading, isLogin, roles, userInfo } = useContext(LoginContext);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [qrCodeBase64, setQrCodeBase64] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (isLoading || !isLogin || !roles.isUser || !userInfo) return;
    generateQRCode();
  }, [isLoading, isLogin, roles, userInfo]);

  useEffect(() => {
    if (countdown <= 0) {
      setExpired(true);
      deleteQRCode();
    }

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  const generateQRCode = async () => {
    try {
      const uuid = generateUUID();
      // 외부 서버 URL을 React Router 경로로 변경
      const url = `/user/attendance/check?qrcodeId=${userInfo.no}&uuid=${uuid}`;
      const qrCodeImage = await QRCode.toDataURL(url);
      setQrCodeUrl(url);
      setQrCodeBase64(qrCodeImage);
    } catch (err) {
      console.error('QR 코드 생성 실패:', err);
    }
  };

  const deleteQRCode = async () => {
    console.log('QR 코드 만료 처리');
  };

  return (
    <div className="oswQrCode">
    <div className="qr-container">
      <div className="qr-code" id="qrCodeContainer">
        {!expired && qrCodeBase64 && (
          <img src={qrCodeBase64} alt="QR 코드" />
        )}
      </div>
      <div className="timer">
        유효시간: <span id="countdown">{expired ? '만료되었습니다.' : countdown}</span>
        {!expired && <span id="unit">초</span>}
      </div>
      {!expired && (
        <div className="url-text" id="URLTEXT2">
          QR 코드 URL:{' '}
          <a href={qrCodeUrl} target="_blank" rel="noopener noreferrer" id="URLTEXT">
            {qrCodeUrl}
          </a>
        </div>
      )}
      <button className="main-button" id="mainButton" onClick={() => (window.location.href = '/')}>
        메인으로
      </button>

    </div>
    </div>
  );
};

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export default QrCode;
