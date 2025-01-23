import React, { useContext, useEffect, useState } from 'react'
import MyBoardListForm from '../../../components/user/Board/MyBoardListForm'
import { LoginContext } from '../../../contexts/LoginContextProvider';
import * as board2 from '../../../apis/board'
import { useLocation } from 'react-router-dom';

const MyBoardListContainer = ({userNo}) => {

    const { userInfo, isLoding } = useContext(LoginContext);
  const [boards, setBoards] = useState([]);
  const [option, setOption] = useState({
    keyword: "",
    rows: 10,
    orderCode: 0,
  });
  const [page, setPage] = useState({
    page: 1,
    rows: 10,
    first: 1,
    last: 1,
    start: 1,
    end: 1,
  });

  const fetchList = async (pageNumber = 1, currentOption = option) => { 
    if (!userInfo || !userInfo.no) return;

    try {
      let response;
    

        response = await board2.myList(userInfo.no, pageNumber, currentOption.rows);
        console.dir(response);

        const data = response.data
        setBoards(data.boardList)
        setPage(data.page)
        console.dir(boards)
     

    } catch (error) {
      console.error("API 요청 실패:", error);
    }
  };

  const handleSearch = (updatedOption = option) => {
    fetchList(1, updatedOption); // 검색 시 첫 페이지로 이동
  };

  const handlePageChange = (pageNumber) => {
    fetchList(pageNumber,option);
  };

  useEffect(() => {
    if (!isLoding && userInfo && userInfo.no) {
      fetchList(); // 조건이 충족되었을 때만 실행
    }
  }, [isLoding, userInfo]);


  return (
    <MyBoardListForm
    boards={boards}
    option={option}
    page={page}
    handlePageChange={handlePageChange}
    setOption={setOption}
    onSearch={handleSearch}
    />
  )
}

export default MyBoardListContainer