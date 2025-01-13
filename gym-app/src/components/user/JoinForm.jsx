import React, { useState } from 'react';
import '../../apis/user';  // join.js는 필요에 따라 리팩토링

const Join = ({join}) => {

  const onJoin = (e) => {
    e.preventDefault() // submit 기본 동작 방지
    const form = e.target
    const id = form.id.value
    const password = form.password.value
    const name = form.name.value
    const email = "1234"
    const phone = "1234"
    const gender = form.gender.value
    const birth = form.birth.value
    const question = form.question.value
    const answer = form.answer.value

    console.log(id, password, name, email);

    join({ id, password, name, email, phone, gender, birth, question, answer })

}




  return (
    <div className="join">

      
      <body className="fullBody">
        {/* Header Fragment */}
        <div className="top-space"></div>
        <div className="container1" id="contain-box" style={{ margin: '25px 0' }}>
          <div className="px-4 py-5 mt-5 text-center">
            <img className="FITlogo" src="img/logo2.png" alt="" />
            <h1 className="joins">회원 가입</h1>
          </div>

          <main className="form-signin login-box w-100 m-auto">
            <form id="form"  onSubmit={(e) => onJoin(e)} className="needs-validation">
              <input type="hidden" name="_csrf" value="${_csrf.token}" />
              <div className="centerdhkwnj">
                {/* 아이디 */}
                <div className="input-group my-2" id="box-id">
                  <label htmlFor="id">아이디</label>
                  <div className="input-group-id">
                    <input
                      type="text"
                      className="form-control"
                      id="id"
                      name="id"
                      autoComplete='id'
                      placeholder="아이디"
                      autoFocus
                    />
                    <button type="button" className="btn btn-outline-secondary">중복확인</button>
                  </div>
                </div>

                {/* 비밀번호 */}
                <div className="input-group my-2">
                  <label htmlFor="password">비밀번호</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                     autoComplete='password'
                    placeholder="6자 이상 비밀번호"
                    
                  />
                </div>

                {/* 비밀번호 확인 */}
                <div className="input-group my-2">
                  <label htmlFor="passwordCheck">비밀번호 확인</label>
                  <input
                    type="password"
                    className="form-control"
                    id="passwordCheck"
                    name="passwordCheck"
                     autoComplete='passwordCheck'
                    placeholder="6자 이상 비밀번호 확인"
                  />
                </div>

                {/* 이름 */}
                <div className="input-group my-2">
                  <label htmlFor="name">이름</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="이름"
                  autoComplete='name'
                    pattern="[가-힣]+"
                    title="이름은 한글로 입력해주세요."
                  />
                </div>

                {/* 성별 */}
                <div className="input-group my-2 gender-group">
                  <div className="gender-options" style={{ marginBottom: '20px', marginTop: '20px' }}>
                    <label htmlFor="gender" style={{ marginLeft: '0' }}>성별</label>
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="남자"
                    />
                    <label htmlFor="male">남자</label>
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="여자"
                    />
                    <label htmlFor="female">여자</label>
                  </div>
                </div>

                {/* 생일 */}
                <div className="input-group my-2">
                  <label htmlFor="birth">생일</label>
                  <input
                    type="text"
                    className="form-control"
                    id="birth"
                    name="birth"
                    placeholder="주민번호 앞번호 8자를 입력해주세요."
                     autoComplete='birth'
                    pattern="\d{8}"
                    title="생년월일은 8자리 숫자여야 합니다."
                  />
                </div>

                {/* 이메일 */}
                <div className="input-group my-2 email-group">
                  <label htmlFor="email">이메일</label>
                  <div className="email-row">
                    <input
                      type="text"
                      className="form-control"
                      id="email-id"
                      name="email1"
                      placeholder="아이디"
                      autoComplete='email1'
                    />
                    <span>@</span>
                    <select
                      className="form-control"
                      id="email-domain"
                      name="email2"
                      style={{ width: '40%', cursor: 'pointer' }}
                     autoComplete='email2'
                    >
                      <option value="naver.com">naver.com</option>
                      <option value="gmail.com">gmail.com</option>
                      <option value="nate.com">nate.com</option>
                      <option value="daum.net">daum.net</option>
                      <option value="hanmail.net">hanmail.net</option>
                    </select>
                  </div>
                </div>

                {/* 전화번호 */}
                <div className="input-group my-2 phone-group">
                  <label htmlFor="phone">연락처</label>
                  <div className="phone-row">
                    <input
                      type="text"
                      className="form-control"
                      id="phone1"
                      name="phone1"
                      placeholder="010"
                      pattern="\d{3}"
                      title="전화번호 첫 3자리는 숫자이어야 합니다."
                       autoComplete='phone1'
                    />
                    <span>-</span>
                    <input
                      type="text"
                      className="form-control"
                      id="phone2"
                      name="phone2"
                      placeholder="1234"
                      pattern="\d{4}"
                      title="전화번호 다음 4자리는 숫자이어야 합니다."
                       autoComplete='phone2'
                    />
                    <span>-</span>
                    <input
                      type="text"
                      className="form-control"
                      id="phone3"
                      name="phone3"
                      placeholder="5678"
                      pattern="\d{4}"
                      title="전화번호 마지막 4자리는 숫자이어야 합니다."
                       autoComplete='phone3'
                    />
                  </div>
                </div>

                {/* 질문 */}
                <div className="input-group my-2">
                  <label htmlFor="question">질문</label>
                  <select
                    className="form-control"
                    name="question"
                    id="question"
                     autoComplete='question'
                  >
                    <option value="강아지 이름은?">강아지 이름은?</option>
                    <option value="졸업한 초등학교는?">졸업한 초등학교는?</option>
                    <option value="내 보물 1호는?">내 보물 1호는?</option>
                    <option value="내 별명은?">내 별명은?</option>
                  </select>
                </div>

                {/* 답변 */}
                <div className="input-group my-2" style={{ marginBottom: '20px' }}>
                  <label htmlFor="answer">답변</label>
                  <input
                    type="text"
                    className="form-control"
                    id="answer"
                    name="answer"
                    placeholder="답변"
                     autoComplete='answer'
                  />
                </div>
              </div>

              <div className="d-grid gap-2">
                <button className="btn-join" type="submit">가입하기</button>
              </div>
            </form>
          </main>
        </div>

        {/* Footer Fragment */}
      </body>
    </div>
  );
}

export default Join;
