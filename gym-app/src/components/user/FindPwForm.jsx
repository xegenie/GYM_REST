import React, { useState } from 'react';
import Swal from 'sweetalert2';


const FindPwForm = ({findPw}) => {


  const validateForm = (e) => {
      e.preventDefault();
      const form = e.target;
      const name = form.name.value;
      const phone1 = form.phone1.value;
      const phone2 = form.phone2.value;
      const phone3 = form.phone3.value;
      const question = form.question.value;
      const answer = form.answer.value;
      const id = form.id.value;
  
      const phone = `${phone1}${phone2}${phone3}`;
  
      console.log(name, phone, question, answer)
      // 필수 입력 필드 검사
      if (!name || !question || !answer) {
        Swal.fire('입력 오류', '모든 필드를 입력해주세요.', 'error');
        return;
      }
  
      // 연락처 입력 확인
      if (!phone1 || !phone2 || !phone3) {
        Swal.fire('연락처 오류', '연락처를 정확히 입력해주세요.', 'error');
        return;
      }
  
  
      findPw({id, name, phone, question, answer});
    };
  

    return (
      <div className="container1 col-12 col-lg-4" style={{ marginTop: '50px', marginBottom: '50px' }} id="contain-box">
        <div className="px-4 py-5 mt-5 text-center">
          <img className="FITlogo" src="/img/logo2.png" alt="logo" />
          <h1>비밀번호 찾기</h1>
        </div>
  
        <main className="form-signin login-box w-100 m-auto">
          <form id="form" onSubmit={validateForm} className="needs-validation">
            <div className="centerdhkwnj">
              <div className="input-group my-2">
                <label htmlFor="name">이름</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="이름을 입력해주세요."
                />
              </div>
  
              <div className="input-group my-2">
                <label htmlFor="id">아이디</label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  name="id"
                  placeholder="아이디를 입력해주세요."
                />
              </div>
  
              <div className="input-group my-2 phone-group">
                <label htmlFor="phone">연락처</label>
                <div className="phone-row">
                  <input
                    type="text"
                    className="form-control"
                    id="phone1"
                    name="phone1"
                    placeholder="010"
                  />
                  <span>-</span>
                  <input
                    type="text"
                    className="form-control"
                    id="phone2"
                    name="phone2"
                    placeholder="1234"
                  />
                  <span>-</span>
                  <input
                    type="text"
                    className="form-control"
                    id="phone3"
                    name="phone3"
                    placeholder="5678"
                  />
                </div>
              </div>
  
              <div className="input-group my-2">
                <label htmlFor="question">질문</label>
                <select
                  className="form-control"
                  name="question"
                  id="question"
                >
                  <option value="">질문을 선택하세요</option>
                  <option value="강아지 이름은?">강아지 이름은?</option>
                  <option value="졸업한 초등학교는?">졸업한 초등학교는?</option>
                  <option value="내 보물 1호는?">내 보물 1호는?</option>
                  <option value="내 별명은?">내 별명은?</option>
                </select>
              </div>
  
              <div className="input-group my-2" style={{ marginBottom: '20px' }}>
                <label htmlFor="answer">답변</label>
                <input
                  type="text"
                  className="form-control"
                  id="answer"
                  name="answer"
                  placeholder="답변"
                />
              </div>
            </div>
            <button className="btn-join" type="submit">
              찾기
            </button>
          </form>
        </main>
      </div>
    );
  };
  
  

export default FindPwForm