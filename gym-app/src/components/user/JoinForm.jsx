import '../user/css/join.css';
import React from 'react';
import * as Swal from '../../apis/alert.js';
import logo from '../../assets/imges/logo2.png';


const JoinForm = ({ join,checkId }) => {

  const onJoin = (e) => {
    e.preventDefault();
    const form = e.target;
    const id = form.id.value;
    const password = form.password.value;
    const passwordCheck = form.passwordCheck.value;
    const name = form.name.value;
    const gender = form.gender.value;
    const birth = form.birth.value;
    const question = form.question.value;
    const answer = form.answer.value;
    const email1 = form.email1.value;
    const email2 = form.email2.value;
    const phone1 = form.phone1.value;
    const phone2 = form.phone2.value;
    const phone3 = form.phone3.value;

    if (password !== passwordCheck) {
      Swal.alert('비밀번호가 일치하지 않습니다.', '비밀번호를 확인해주세요', 'error');
      
      const passwordField = document.getElementById("password");
      passwordField.focus();
      

      
      return;
    }
    
    checkId();

    const email = `${email1}@${email2}`;
    const phone = `${phone1}${phone2}${phone3}`;

    join({ id, password, name, email, phone, gender, birth, question, answer });
  };

  

  return (

    <div className="join">
      <body className="fullBody">
        {/* Header Fragment */}
        <div className="topspace"></div>
        <div className="container1" id="contain-box" style={{ margin: '25px 0' }}>
          <div className="wlskrkdy">
            <img className="FITlogo" src={logo} alt="" />
            <h1 className="joins">회원 가입</h1>
          </div>

          <main className="formsignin">
            <form id="form" onSubmit={onJoin} className="needsvalidation">
              <div className="centerdhkwnj">
                {/* 아이디 */}
                    <label className="widd" htmlFor="id">아이디</label>
                <div className="inputid123" id="box-id">
                    <input
                      type="text"
                      className="formCo"
                      id="id"
                      name="id"
                      autoComplete="id"
                      placeholder="아이디"
                      autoFocus
                      required
                    />
                    <button type="button" className="btn btn-outline-secondary" onClick={checkId}>
                      중복확인
                    </button>
                  </div>

                {/* 비밀번호 */}
                  <label  className="widd" htmlFor="password">비밀번호</label>
                <div className="inputid">
                  <input
                    type="password"
                    className="formCo"
                    id="password"
                    name="password"
                     autoComplete='password'
                    placeholder="6자 이상 비밀번호"
                    required
                    
                  />
                </div>

                {/* 비밀번호 확인 */}
                  <label  className="widd" htmlFor="passwordCheck">비밀번호 확인</label>
                <div className="inputid">
                  <input
                    type="password"
                    className="formCo"
                    id="passwordCheck"
                    name="passwordCheck"
                     autoComplete='passwordCheck'
                    placeholder="6자 이상 비밀번호 확인"
                    required
                  />
                </div>

                {/* 이름 */}
                  <label  className="widd" htmlFor="name">이름</label>
                <div className="inputid">
                  <input
                    type="text"
                    className="formCo"
                    id="name"
                    name="name"
                    placeholder="이름"
                  autoComplete='name'
                    pattern="[가-힣]+"
                    title="이름은 한글로 입력해주세요."
                    required
                  />
                </div>

                {/* 성별 */}
                <div className="inputid5" > 
                    <label  className='genderlabel'  htmlFor="gender">성별</label>
                  
                  <div className="gender-options" style={{ marginBottom: '20px', marginTop: '20px' }}>
                    <input
                    
                      type="radio"
                      id="male"
                      name="gender"
                      value="남자"
                      required
                    />
                    <label   htmlFor="male">남자</label>
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="여자"
                      required
                    />
                    <label   htmlFor="female">여자</label>

                  </div>
                </div>

                {/* 생일 */}
                  <label  className="widd" htmlFor="birth">생일</label>
                <div className="inputid">
                  <input
                    type="text"
                    className="formCo"
                    id="birth"
                    name="birth"
                    placeholder="주민번호 앞번호 8자를 입력해주세요."
                     autoComplete='birth'
                    pattern="\d{8}"
                    title="생년월일은 8자리 숫자여야 합니다."
                    required
                  />
                </div>

                {/* 이메일 */}
                  <label  className="widd" htmlFor="email">이메일</label>
                <div className="inputid emailgroup">
              
                    <input
                      type="text"
                      className="formCo"
                      id="email1"
                      name="email1"
                      placeholder="아이디"
                      autoComplete='email1'
                      required
                    />
                    <span>@</span>
                    <select
                      className="formCo"
                      id="email2"
                      name="email2"
                      style={{ width: '50%', cursor: 'pointer' }}
                     autoComplete='email2'
                    >
                      <option value="naver.com">naver.com</option>
                      <option value="gmail.com">gmail.com</option>
                      <option value="nate.com">nate.com</option>
                      <option value="daum.net">daum.net</option>
                      <option value="hanmail.net">hanmail.net</option>
                    </select>
               
                </div>

                {/* 전화번호 */}
                  <label  className="widd" htmlFor="phone">연락처</label>
                <div className="inputid phonegroup">
                  <div className="phoner">
                    <input
                      type="text"
                      className="formCo"
                      id="phone1"
                      name="phone1"
                      placeholder="010"
                      pattern="\d{3}"
                      title="전화번호 첫 3자리는 숫자이어야 합니다."
                       autoComplete='phone1'
                       required
                    />
                    <span>-</span>
                    <input
                      type="text"
                      className="formCo"
                      id="phone2"
                      name="phone2"
                      placeholder="1234"
                      pattern="\d{4}"
                      title="전화번호 다음 4자리는 숫자이어야 합니다."
                       autoComplete='phone2'
                       required
                    />
                    <span>-</span>
                    <input
                      type="text"
                      className="formCo"
                      id="phone3"
                      name="phone3"
                      placeholder="5678"
                      pattern="\d{4}"
                      title="전화번호 마지막 4자리는 숫자이어야 합니다."
                       autoComplete='phone3'
                       required
                    />
                  </div>
                </div>

                {/* 질문 */}
                  <label className="widd" htmlFor="question">질문</label>
                <div className="inputid">
                  <select
                    className="formCo"
                    name="question"
                    id="question"
                     autoComplete='question'
                     style={{ cursor: 'pointer', width: '560px' }}
                  >
                    <option value="강아지 이름은?">강아지 이름은?</option>
                    <option value="졸업한 초등학교는?">졸업한 초등학교는?</option>
                    <option value="내 보물 1호는?">내 보물 1호는?</option>
                    <option value="내 별명은?">내 별명은?</option>
                  </select>
                </div>

                {/* 답변 */}
                  <label className="widd" htmlFor="answer">답변</label>
                <div className="inputid" style={{ marginBottom: '20px' }}>
                  <input
                    type="text"
                    className="formCo"
                    id="answer"
                    name="answer"
                    placeholder="답변"
                     autoComplete='answer'
                     required
                  />
                </div>
              </div>

              <div className="dgridgap">
                <button className="btnjoin" type="submit">가입하기</button>
              </div>
            </form>
          </main>
        </div>

        {/* Footer Fragment */}
      </body>
    </div>
  );
}

export default JoinForm;
