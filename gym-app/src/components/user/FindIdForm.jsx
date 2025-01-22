import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../user/css/FindId.css';
import logo from '../../assets/imges/logo2.png';

const FindIdForm = ({ findId }) => {
  const validateForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const phone1 = form.phone1.value;
    const phone2 = form.phone2.value;
    const phone3 = form.phone3.value;
    const question = form.question.value;
    const answer = form.answer.value;

    const phone = `${phone1}${phone2}${phone3}`;

    if (!name || !question || !answer) {
      Swal.fire('입력 오류', '모든 필드를 입력해주세요.', 'error');
      return;
    }

    if (!phone1 || !phone2 || !phone3) {
      Swal.fire('연락처 오류', '연락처를 정확히 입력해주세요.', 'error');
      return;
    }

    findId({ name, phone, question, answer });
  };

  return (
    <body className='find-id'>
      
    
    <div className="find-id-container">
      <div className="custom-container">
        <div className="header-section">
           <img className="FITlogo" src={logo} alt="Logo" />
          <h1 className="title">아이디 찾기</h1>
        </div>
        <form id="find-id-form" onSubmit={validateForm}>
          <div className="input-group">
            <label htmlFor="name">이름</label>
            <input type="text" id="name" name="name" className="custom-input" placeholder="이름" />
          </div>
          <div className="input-group">
            <label htmlFor="phone">연락처</label>
            <div className="phone-row">
              <input type="text" id="phone1" name="phone1" className="custom-input phone-input" placeholder="010" />
              <span>-</span>
              <input type="text" id="phone2" name="phone2" className="custom-input phone-input" placeholder="1234" />
              <span>-</span>
              <input type="text" id="phone3" name="phone3" className="custom-input phone-input" placeholder="5678" />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="question">질문</label>
            <select id="question" name="question" className="custom-select">
              <option value="강아지 이름은?">강아지 이름은?</option>
              <option value="졸업한 초등학교는?">졸업한 초등학교는?</option>
              <option value="내 보물 1호는?">내 보물 1호는?</option>
              <option value="내 별명은?">내 별명은?</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="answer">답변</label>
            <input type="text" id="answer" name="answer" className="custom-input" placeholder="답변" />
          </div>
          <div className='btn-div'>
          <button type="submit" className="submit-btn">
            찾기
          </button>
          </div>
        </form>
      </div>
    </div>
    </body>
  );
};

export default FindIdForm;