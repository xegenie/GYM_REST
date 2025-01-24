import React from "react";
import { Link } from "react-router-dom";
import '../Board/css/BoardList.css';

const BoardListForm = ({ option, boards, page, handlePageChange, setOption, onSearch }) => {
  // 검색 및 필터 변경 처리
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    // 상태 업데이트와 동시에 최신 상태로 검색 실행
    const updatedOption = { ...option, [name]: value };
    setOption(updatedOption); // 상태 업데이트
    if (name === "rows" || name === "orderCode") {
      setTimeout(() => onSearch(updatedOption), 0); // 상태 변경 후 정확한 값으로 검색 실행
    }
  };

  // 검색 버튼 클릭 시 실행
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    onSearch(option); // 검색 버튼 눌렀을 때 검색 실행
  };

  return (
    <div className="boardList">
      <div className="board-list">
        <h1 style={{ marginTop: "50px" }}>고객문의 게시판</h1>
        <div className="container">
          <div className="form-box">
            <form onSubmit={handleFilterSubmit} className="forms">
              <select
                name="rows"
                value={option.rows}
                onChange={handleFilterChange}
              >
                <option value="10">10개</option>
                <option value="30">30개</option>
                <option value="50">50개</option>
                <option value="100">100개</option>
              </select>
              <select
                name="orderCode"
                value={option.orderCode}
                onChange={handleFilterChange}
              >
                <option value="0">최신순</option>
                <option value="1">제목순</option>
              </select>
              <input
                type="text"
                id="keyword"
                name="keyword"
                placeholder="검색어를 입력해주세요"
                value={option.keyword}
                onChange={handleFilterChange}
              />
              <button
                type="submit"
                className="scButton"
              >
                검색
              </button>
            </form>
          </div>

          {/* 게시글 목록 테이블 */}
          <table className="table table-bordered text-center" style={{ marginBottom: "30px", borderCollapse: "collapse", boxShadow: "1px 2px 2px rgba(0, 0.5, 0.5, 0.5)" }}>
            <thead className="table-light">
              <tr>
                <th style={{ width: "45%" }}>문의내용</th>
                <th style={{ width: "20%" }}>문의자</th>
                <th style={{ width: "10%" }}>유저</th>
                <th style={{ width: "25%" }}>등록일자</th>
              </tr>
            </thead>
            <tbody>
              {boards.length > 0 ? (
                boards.map((board) => (
                  <tr key={board.no} className="tabletr" style={{ textAlign: "center", borderBottom: "1px solid white" }}>
                      <td className="wlskrkdy">
                      <Link className="titlebt" to={`/boardRead/${board.no}`}>
                        {board.title}
                      </Link>
                      {board.hasAnswer === 1 && (
                        <label style={{ color: "rgb(241, 10, 10)", fontSize:"20px" }}>
                          (답변 완료)
                        </label>
                      )}
                    </td>
                    <td>{board.name}</td>
                    <td>
                      {board.auth === "ROLE_USER"
                        ? "회원"
                        : board.auth === "ROLE_TRAINER"
                        ? "트레이너"
                        : "관리자"}
                    </td>
                    <td>
                      {new Date(board.createdAt).toLocaleString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
               
                <tr colSpan="4" className="tabletr">
                  <td colSpan="4">조회된 데이터가 없습니다.</td>
                </tr>

              )}
            </tbody>
          </table>

          <div className="insert-button">
            <Link to="/boardInsert" style={{ color: "white", textDecoration: "none", fontSize:"23px" }}>
              문의하기
            </Link>
          </div>

        {/* 페이지 네비게이션 */}
<div className="pagination">
  <a
    onClick={() => handlePageChange(page.first)}
    className={`pagetag first ${page.page === page.first }`}
  >
    [처음]
  </a>
  {page.page !== page.first && (
    <a
      onClick={() => handlePageChange(page.page - 1)}
      className={`pagetag prev ${page.page === page.first ? "disabled" : ""}`}
    >
      [이전]
    </a>
  )}
  {Array.from({ length: page.end - page.start + 1 }, (_, idx) => page.start + idx).map((no) => (
    <a
      key={no}
      onClick={() => handlePageChange(no)}
      className={`pagetag ${page.page === no ? "active" : ""}`}
    >
      {no}
    </a>
  ))}
  {page.page !== page.last && (
    <a
      onClick={() => handlePageChange(page.page + 1)}
      className={`pagetag next ${page.page === page.last ? "disabled" : ""}`}
    >
      [다음]
    </a>
  )}
  <a
    onClick={() => handlePageChange(page.last)}
    className={`pagetag last ${page.page === page.last}`}
  >
    [마지막]
  </a>
</div>
<div style={{marginBottom: "220px"}}>
</div>

        </div>
      </div>
    </div>
  );
};

export default BoardListForm;
