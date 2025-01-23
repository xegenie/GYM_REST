import React, { useEffect, useState } from 'react';
import * as buyListApi from '../../apis/buyList';
import BuyList from '../../components/admin/Sales/BuyList';
import { useNavigate, useLocation } from 'react-router-dom';

const BuyListContainer = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [buyList, setBuyList] = useState([]);
  const [page, setPage] = useState({ page: 1, rows: 10, first: 1, last: 1, start: 1, end: 1 });
  const [keyword, setKeyword] = useState(new URLSearchParams(location.search).get("keyword") || "");
  const [currentPage, setCurrentPage] = useState(new URLSearchParams(location.search).get("page") || 1);

  // 구매 목록을 가져오는 함수
  const getBuyList = async (keyword = '', pageNumber = 1) => {
    console.log(`pageNumber : ${pageNumber}`);
    try {
      const response = await buyListApi.getBuyList(keyword, pageNumber);
      const newBuyList = response.data.buyList || [];
      const newPage = response.data.page || {};
      console.log('page 응답 데이터:', newPage);

      setBuyList(newBuyList);
      setPage(newPage);  // 페이지 정보도 업데이트
    } catch (err) {
      console.error(`구매목록 불러오는 중 에러: ${err.message}`);
    }
  };

  // 검색 처리 함수
  const handleSearch = (keyword) => {
    setKeyword(keyword);  // 키워드 상태 업데이트
    setCurrentPage(1);  // 첫 페이지로 초기화
    navigate(`?keyword=${keyword}&pageNumber=1`);  // URL을 변경하여 검색 상태를 반영
  };

  // 상태 변경: 페이지 변경 처리
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // URL에 페이지 번호 업데이트
    navigate(`?keyword=${keyword}&pageNumber=${pageNumber}`);
  };

  // 환불 처리 함수
  const handleRefund = async (no) => {
    if (!window.confirm('정말 환불하시겠습니까?')) {
      return;
    }

    const response = await buyListApi.cancel(no);
    if (response.status === 200) {
      alert('환불되었습니다.');
      getBuyList(keyword, currentPage);  // 환불 후 목록 갱신
    } else {
      alert('환불 실패했습니다.');
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const keywordParam = queryParams.get("keyword");
    const pageParam = queryParams.get("page");

    // keyword와 currentPage 값이 다를 경우에만 상태 변경 및 데이터를 다시 가져옴
    if (keywordParam && keyword !== keywordParam) {
      setKeyword(keywordParam);
    }
    if (pageParam && currentPage !== pageParam) {
      setCurrentPage(Number(pageParam));  // 페이지 번호를 숫자로 설정
    }
    // 상태 값이 바뀌었을 때 데이터를 갱신
    getBuyList(keywordParam || keyword, Number(pageParam) || currentPage);

  }, [location.search]);  // location.search가 변경될 때마다 실행

  return (
    <BuyList
      buyList={buyList}
      handleSearch={handleSearch}
      handleRefund={handleRefund}
      page={page}
      keyword={keyword}
      handlePageChange={handlePageChange}
      currentPage={currentPage}
      setKeyword={setKeyword}
    />
  );
};

export default BuyListContainer;
