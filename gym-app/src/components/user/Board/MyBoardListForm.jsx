import React from 'react'
import { Link } from 'react-router-dom';

const MyBoardListForm = ({ boards, page}) => {
  return (

<div className='MyBoardList'>
    <div style={{ width: '1000px', textAlign: 'left' }}>
    <h2 style={{ marginBottom: '15px', fontWeight: 800, color: 'white' }}>
      내 문의내역
    </h2>
  </div>

  <table className="table table-bordered text-center" style={{ marginBottom: '30px', borderCollapse: 'collapse', boxShadow: '1px 2px 2px rgba(0, 0.5, 0.5, 0.5)' }}>
    <thead className="table-light">
      <tr style={{ width: '100%' }}>
        <th style={{ width: '45%' }}>문의내용</th>
        <th style={{ width: '20%' }}>문의자</th>
        <th style={{ width: '25%' }}>등록일자</th>
        <th style={{ width: '25%' }}>답변상태</th>
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
                    </td>
                    <td>{board.name}</td>
             
                    <td>
                      {new Date(board.createdAt).toLocaleString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td>
  {board.hasAnswer === 1 ? (
    <label style={{ color: 'rgb(21, 121, 21)' }}>(답변 완료)</label>
  ) : (
    <label style={{ color: 'rgb(200, 0, 0)' }}>(미답변)</label>
  )}
</td>

                  </tr>
                ))
              ) : (
                <tr className="tabletr">
                  <td colSpan="4">조회된 데이터가 없습니다.</td>
                </tr>
              )}
            </tbody>
  </table>

  <div className="insert-button" style={{ width: '1000px', textAlign: 'right' }}>
    <Link to="/user/board/insert" className="btn-primary">문의하기</Link>
  </div>

  <div className="pagination">
    <a href={`?page=${page.first}`} className="first">처음</a>
    {page.page !== page.first && (
      <a href={`?page=${page.prev}`} className="prev">이전</a>
    )}
    {[...Array(page.end - page.start + 1).keys()].map((_, idx) => {
      const no = page.start + idx;
      return (
        <a
          key={no}
          href={`?page=${no}`}
          className={page.page === no ? 'active' : ''}
        >
          {no}
        </a>
      );
    })}
    {page.page !== page.last && (
      <a href={`?page=${page.next}`} className="next">다음</a>
    )}
    <a href={`?page=${page.last}`} className="last">마지막</a>
  </div>
  </div>

);
};
export default MyBoardListForm