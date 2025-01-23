import React from "react";
import Sidebar from "../Header/adminSidebar";
import './css/BuyList.css';

const BuyList = ({ buyList, page, keyword, currentPage, handleRefund, handleSearch, handlePageChange, setKeyword }) => {

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(keyword);
  };

  const handlePageLinkClick = (pageNumber) => {
    handlePageChange(pageNumber);
  };

  return (
    <div className="buyList">
      <div className="container">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="main">
          <div className="inner">
            <div className="mainTitle">
              <h2>구매내역 조회</h2>
            </div>

            <div className="search-container">
              <form
                className="search"
                onSubmit={handleSearchSubmit}
              >
                <input
                  type="text"
                  name="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}  // 상태를 직접 관리하지 않고 컨테이너에서 처리하도록
                  placeholder="고객명으로 검색"
                />
                <button className="searchBtn" type="submit">검색</button>
              </form>
            </div>

            <div className="list">
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>고객명</th>
                    <th>상품명</th>
                    <th>상품가격</th>
                    <th>담당 트레이너</th>
                    <th>구매일자</th>
                    <th>환불/만료 일자</th>
                    <th>상태</th>
                    <th>비고</th>
                  </tr>
                </thead>
                <tbody>
                  {buyList.length > 0 ? (
                    buyList.map((item, index) => (
                      <tr key={index}>
                        <td>{item.no}</td>
                        <td>{item.userName}</td>
                        <td>{item.ticketName}</td>
                        <td>{item.ticketPrice}</td>
                        <td>{item.trainerName || "-"}</td>
                        <td>
                          {new Date(item.buyDate).toLocaleString("ko-KR")}
                        </td>
                        <td>
                          {item.canceledAt
                            ? new Date(item.canceledAt).toLocaleString("ko-KR")
                            : new Date(item.endDate).toLocaleString("ko-KR")}
                        </td>
                        <td
                          style={{
                            fontWeight: "bold",
                            color:
                              item.status === "환불"
                                ? "red"
                                : item.status === "정상"
                                  ? "green"
                                  : item.status === "만료"
                                    ? "blue"
                                    : "black",
                          }}
                        >
                          {item.status}
                        </td>
                        <td>
                          {item.status !== "환불" && item.status !== "만료" && (
                            <button
                              className="deleteBtn"
                              onClick={(e) => {
                                e.stopPropagation(); // 이벤트 전파 방지
                                handleRefund(item.no);
                              }}
                              style={{ color: "white" }}
                            >
                              환불
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" style={{ textAlign: "center" }}>
                        데이터가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              {page && (
                <>
                  <a href="#" onClick={() => handlePageLinkClick(page.first)}>
                    ≪
                  </a>
                  {page.page !== page.first && (
                    <a href="#" onClick={() => handlePageLinkClick(page.prev)}>
                      ＜
                    </a>
                  )}
                  {Array.from({ length: page.end - page.start + 1 }, (_, i) => page.start + i).map((no) => (
                    <a
                      href="#"
                      key={no}
                      className={currentPage === no ? "active" : ""}
                      onClick={() => handlePageLinkClick(no)}
                    >
                      {no}
                    </a>
                  ))}
                  {page.page !== page.last && (
                    <a href="#" onClick={() => handlePageLinkClick(page.next)}>
                      ＞
                    </a>
                  )}
                  <a href="#" onClick={() => handlePageLinkClick(page.last)}>
                    ≫
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyList;
