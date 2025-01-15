import React, { useState, useEffect, useContext } from 'react';
import './Ranking.css'; // 별도의 CSS 파일
import LoginContextProvider from '../../../contexts/LoginContextProvider';

function Ranking() {
  const [rankingList, setRankingList] = useState([]); // 랭킹 목록 상태
  const {userInfo, isLogin} = useContext(LoginContextProvider)
  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    // 서버로부터 랭킹 데이터를 받아오는 로직
    const fetchRankingData = async () => {
      try {
        console.log('userInfo'); // 데이터 확인
        const response = await fetch('http://localhost:8080/ranking'); // 서버 API 호출 (실제 URL로 변경 필요)
        if (response.ok) {
          const data = await response.json(); // JSON 응답을 파싱
          console.log('Ranking data:', data); // 데이터 확인

          // rankingList가 배열인지 확인하고, 그렇지 않으면 빈 배열로 설정
          setRankingList(Array.isArray(data.rankingList) ? data.rankingList : []);
        } else {
          console.error('Failed to fetch ranking data');
        }
      } catch (error) {
        console.error('Error fetching ranking data:', error);
      }  
    };

    fetchRankingData();

    // 예시로 로그인된 사용자 ID 설정 (실제 로그인 처리 로직을 통해 설정 필요)
    // setUserId('testUserId'); // 로그인된 사용자 ID로 설정
  }, []); // 빈 배열로 설정해 컴포넌트 마운트 시 한 번만 실행

  // 나의 랭킹으로 이동하는 함수
  const goToMyRanking = () => {
    console.log('Button clicked'); // 버튼 클릭 로그 추가
    if (!userId) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }

    const targetRank = document.getElementById(`rank-${userId}`);
    if (!targetRank) {
      alert('출석 정보가 존재하지 않습니다.');
      return;
    }

    // 스크롤 동작
    targetRank.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    // 하이라이트 효과 적용
    targetRank.classList.add('highlight');
    setTimeout(() => {
      targetRank.classList.remove('highlight');
    }, 2000); // 2초 후 하이라이트 제거
  };

  return (
    <div className="oswRanking">
      <div className="fullBody">
        <div className="main">
          <div className="content1">
            {/* 로그인 여부와 관계없이 나의 랭킹 이동 버튼을 활성화 */}
            <button
              id="my-ranking-btn"
              className="btn-primary"
              onClick={goToMyRanking} // 클릭 시 goToMyRanking 함수 실행
              disabled={!userInfo.id} // userId가 없으면 비활성화
            >
              나의 랭킹으로 이동
            </button>
          </div>

          <div className="content2">
            <div className="text">
              <h1 style={{ marginLeft: '-35px', padding: '30px' }}>출석 랭킹</h1>
            </div>

            <div className="table-container">
              <table className="attendance-table" style={{ fontSize: 'large', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th><br /><br />랭킹</th>
                    <th><br /><br />회원ID</th>
                    <th><br /><br />출석횟수</th>
                  </tr>
                </thead>
                <tbody>
                  {rankingList.map(rank => (
                    <tr key={rank.userId} id={`rank-${rank.userId}`}>
                      <td>
                        {rank.rank === 1 && (
                          <img src="images/gold.png" alt="" className="ranking-icon" />
                        )}
                        {rank.rank === 2 && (
                          <img src="images/silver.png" alt="" className="ranking-icon" />
                        )}
                        {rank.rank === 3 && (
                          <img src="images/bronze.png" alt="" className="ranking-icon" />
                        )}
                        {rank.rank > 3 && <span>{rank.rank}</span>}
                      </td>
                      <td>{rank.userId}</td>
                      <td>{rank.attendanceCount}회</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="content3">
            {/* 1등, 2등, 3등 정보를 보여주는 버튼 */}
            <button
              id="reward-btn" // id 수정
              className="btn-primary2"
              disabled
            >
              1등 : 이용권 1달 무료 + PT 5회<br /><br />
              2등 : 이용권 1달 무료<br /><br />
              3등 : 이용권 50% 할인
            </button>
          </div>
        </div>

        <footer className="footer">
          {/* 공통 푸터 추가 */}
        </footer>
      </div>
    </div>
  );
}

export default Ranking;
