import React, { useState } from "react";
import { Link } from "react-router-dom";

const BoardListForm = ({ boardList, page, rows, orderCode, keyword }) => {
  const [filters, setFilters] = useState({
    rows: rows || 10,
    orderCode: orderCode || 0,
    keyword: keyword || "",
  });

  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    // API 호출 로직 추가
    console.log("Filters submitted:", filters);
  };

  return (
    <div className="boardList">
        <div className="board-list">
          <div className="top-space"></div>
          <h1 style={{ marginTop: "50px" }}>고객문의 게시판</h1>
          <div className="container">
            <div className="form-box">
              <form onSubmit={handleFilterSubmit} className="forms">
                <select
                  name="rows"
                  style={{ fontSize: "15px", cursor: "pointer" }}
                  value={filters.rows}
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
                  value={filters.orderCode}
                  onChange={handleFilterChange}
                >
                  <option value="0">최신순</option>
                  <option value="1">제목순</option>
                </select>
                <input
                  type="text"
                  name="keyword"
                  placeholder="검색어를 입력해주세요"
                  value={filters.keyword}
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
    
            <table
              className="table table-bordered text-center"
              style={{
                marginBottom: "30px",
                borderCollapse: "collapse",
                boxShadow: "1px 2px 2px rgba(0, 0.5, 0.5, 0.5)",
              }}
            >
              <thead className="table-light">
                <tr style={{ width: "100%" }}>
                  <th style={{ width: "45%" }}>문의내용</th>
                  <th style={{ width: "20%" }}>문의자</th>
                  <th style={{ width: "10%" }}>유저</th>
                  <th style={{ width: "25%" }}>등록일자</th>
                </tr>
              </thead>
              <tbody>
                {boardList && boardList.length > 0 ? (
                  boardList.map((board) => (
                    <tr
                      key={board.no}
                      style={{
                        textAlign: "center",
                        borderBottom: "1px solid white",
                        color: board.hasAnswer === 1 ? "green" : "red",
                        fontWeight: board.hasAnswer === 1 ? "bold" : "normal",
                      }}
                      className="tabletr"
                    >
                      <td>
                        <Link className="titlebt" to={`/read?no=${board.no}`}>
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
          </div>
    
          <div className="insert-button">
            <Link to="/insert" className="btn-primary">
              문의하기
            </Link>
          </div>
    
          {/* <div
            style={{
              marginBottom: "100px",
              width: "100%",
              display: "flex",
              gap: "15px",
              justifyContent: "center",
            }}
          >
            <Link className="pagetag" style={{ fontSize: "15px" }} to={`?page=${page.first}`}>
              {"<<"}
            </Link>
            {page.page !== page.first && (
              <Link className="pagetag" style={{ fontSize: "15px" }} to={`?page=${page.prev}`}>
                {"<"}
              </Link>
            )}
            {Array.from({ length: page.end - page.start + 1 }, (_, idx) => {
              const pageNo = page.start + idx;
              return page.page === pageNo ? (
                <span
                  key={pageNo}
                  className="pagetag"
                  style={{
                    fontSize: "20px",
                    color: "rgb(22, 22, 22)",
                    backgroundColor: "rgb(221, 223, 223)",
                  }}
                >
                  {pageNo}
                </span>
              ) : (
                <Link
                  key={pageNo}
                  className="pagetag"
                  style={{ fontSize: "20px" }}
                  to={`?page=${pageNo}`}
                >
                  {pageNo}
                </Link>
              );
            })}
            {page.page !== page.last && (
              <Link className="pagetag" style={{ fontSize: "15px" }} to={`?page=${page.next}`}>
                {">"}
              </Link>
            )}
            <Link className="pagetag" style={{ fontSize: "15px" }} to={`?page=${page.last}`}>
              {">>"}
            </Link> */}
          {/* </div> */}
        </div>
    </div>
      );
    };


export default BoardListForm