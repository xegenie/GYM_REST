import React from "react";
import { Link } from "react-router-dom";

const BoardListForm = ({ option, boardList, page, handlePageChange, setOption, onSearch }) => {
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
                style={{ fontSize: "15px", cursor: "pointer" }}
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
                style={{ cursor: "pointer" }}
                value={option.orderCode}
                onChange={handleFilterChange}
              >
                <option value="0">최신순</option>
                <option value="1">제목순</option>
              </select>
              <input
                type="text"
                name="keyword"
                placeholder="검색어를 입력해주세요"
                value={option.keyword}
                onChange={handleFilterChange}
              />
              <button
                type="submit"
                className="scButton"
                style={{ borderRadius: "5px", cursor: "pointer" }}
              >
                검색
              </button>
            </form>
          </div>

          {/* 게시글 목록 테이블 */}
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>문의내용</th>
                <th>문의자</th>
                <th>유저</th>
                <th>등록일자</th>
              </tr>
            </thead>
            <tbody>
              {boardList.length > 0 ? (
                boardList.map((board) => (
                  <tr key={board.no}>
                    <td>
                      <Link className="titlebt" to={`/boardRead/${board.no}`}>
                        {board.title}
                      </Link>
                      {board.hasAnswer === 1 && (
                        <label style={{ color: "rgb(15, 255, 15)" }}>
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
                <tr>
                  <td colSpan="4">조회된 데이터가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* 페이지 네비게이션 */}
          <div className="pagination">
            <a onClick={() => handlePageChange(page.first)} className="first">
              [처음]
            </a>
            {page.page !== page.first && (
              <a onClick={() => handlePageChange(page.page - 1)} className="prev">
                [이전]
              </a>
            )}
            {Array.from({ length: page.end - page.start + 1 }, (_, idx) => page.start + idx).map(
              (no) => (
                <a
                  key={no}
                  onClick={() => handlePageChange(no)}
                  className={page.page === no ? "active" : ""}
                >
                  {no}
                </a>
              )
            )}
            {page.page !== page.last && (
              <a onClick={() => handlePageChange(page.page + 1)} className="next">
                [다음]
              </a>
            )}
            <a onClick={() => handlePageChange(page.last)} className="last">
              [마지막]
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardListForm;
