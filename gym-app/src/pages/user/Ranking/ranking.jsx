import React, { useState, useEffect } from 'react';
import './Ranking.css'; // 별도의 CSS 파일

function Ranking() {
  const [rankingList, setRankingList] = useState([]); // 랭킹 목록 상태

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    // 서버로부터 랭킹 데이터를 받아오는 로직
    const fetchRankingData = async () => {
      try {
        const response = await fetch('http://localhost:8080/ranking'); // 서버 API 호출 (실제 URL로 변경 필요)
        if (response.ok) {
          const data = await response.json(); // JSON 응답을 파싱
          setRankingList(data); // 랭킹 데이터를 상태에 저장
        } else {
          console.error('Failed to fetch ranking data');
        } 
      } catch (error) {
        console.error('Error fetching ranking data:', error);
      }
    };

    fetchRankingData();
  }, []); // 빈 배열로 설정해 컴포넌트 마운트 시 한 번만 실행

  return (

   
    <div className="oswRanking">
    <div className="fullBody">
     

      {/* <button>
        <a href="/" style={{ textDecoration: 'none', color: 'rgb(10, 8, 8)' }}>홈으로</a>
      </button> */}

      <div className="main">
        <div className="content1">
          {/* 로그인 여부와 관계없이 나의 랭킹 이동 버튼을 사용할 수 없도록 수정 */}
          <button id="my-ranking-btn" className="btn-primary" disabled>
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
          <button id="my-ranking-btn" className="btn-primary2" disabled>
            1등 : 이용권 1달 무료 + PT 5회<br /><br />
            2등 : 이용권 1달 무료<br /><br />
            3등 : 이용권 50% 할인
          </button>
        </div>
      </div>

      <footer className="footer">
        {/* 공통 푸터 추가 */}
      </footer>

      <script>
        {/* 공통 스크립트 추가 */}
      </script>
    </div>
    </div>
  
  );
}

export default Ranking;
