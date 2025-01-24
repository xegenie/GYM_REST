import React, { useEffect, useState } from 'react'
import UserListForm from '../../components/user/UserListForm'
import * as auth from '../../apis/auth'
import { useLocation, useNavigate } from 'react-router-dom'

const UserListContainer = () => {

  const navigate = useNavigate();
  const location = useLocation();
   
 const [userList, setUserList] = useState([])
  const [page, setPage] = useState({ page: 1, rows: 10, first: 1, last: 1, start: 1, end: 1 });
  const [keyword, setKeyword] = useState(new URLSearchParams(location.search).get("keyword") || "");
  const [currentPage, setCurrentPage] = useState(new URLSearchParams(location.search).get("page") || 1);


 // 🎁 게시글 목록 데이터
 const getList = async (keyword = '', pageNumber = 1) => {
  console.log(`pageNumber : ${pageNumber}`);
  try{
   const response = await auth.list(keyword, pageNumber)
   const data = await response.data
   const list = data.list
   const newPage = data.page
   console.dir(list)
   
   console.dir(data.page)

   setUserList( list )
   setPage(newPage); 
  }
  catch (err) {
    console.error(`구매목록 불러오는 중 에러: ${err.message}`);
}
   
 }

  // 상태 변경: 페이지 변경 처리
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // URL에 페이지 번호 업데이트
    navigate(`?keyword=${keyword}&pageNumber=${pageNumber}`);
  };

  // 검색 처리 함수
  const handleSearch = (keyword) => {
    setKeyword(keyword);  // 키워드 상태 업데이트
    setCurrentPage(1);  // 첫 페이지로 초기화
    navigate(`?keyword=${keyword}&pageNumber=1`);  // URL을 변경하여 검색 상태를 반영
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
      getList(keywordParam || keyword, Number(pageParam) || currentPage);
    }, [location.search]);  // location.search가 변경될 때마다 실행
  


  return (
    
    <UserListForm userList={userList}   handleSearch={handleSearch}
    page={page}
    keyword={keyword}
    handlePageChange={handlePageChange}
    currentPage={currentPage}
    setKeyword={setKeyword}/>
  )
}

export default UserListContainer