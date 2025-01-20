import React, { useContext, useEffect, useState } from 'react'
import MyBoardListForm from '../../../components/user/Board/MyBoardListForm'
import { LoginContext } from '../../../contexts/LoginContextProvider';
import * as board2 from '../../../apis/board'

const MyBoardListContainer = () => {


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
      try {
        const response = await board2.myList(pageNumber, currentOption.rows)
        const status = response.status
        if (status == 200) {
          
          const data = response.data
          console.dir(data)
          setBoards(data.boardList);
          setPage(data.page);
          console.log(boards)
  
        } else {
          console.error("데이터를 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
      }
    };
  
    const handleSearch = (updatedOption = option) => {
      fetchList(1, updatedOption); // 검색 시 첫 페이지로 이동
    };
  
    const handlePageChange = (pageNumber) => {
      fetchList(pageNumber);
    };
  
    useEffect(() => {
      fetchList();
    }, []);

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