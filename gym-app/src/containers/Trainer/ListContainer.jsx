import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as trainerApi from '../../apis/trainerProfile';
import TrainerList from '../../components/admin/Trainer/TrainerList.jsx';

const ListContainer = () => {
  const [trainerList, setTrainerList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 리다이렉트 처리

  const updatePage = () => {
    const query = new URLSearchParams(location.search);
    const newKeyword = query.get("keyword") ?? "";
    setKeyword(newKeyword); // URL에서 keyword를 추출하여 상태 업데이트
  };

  // getList 함수, 검색어가 빈 값일 경우 전체 리스트를 반환
  const getList = async (searchKeyword) => {
    console.log("검색어:", searchKeyword);

    // 검색어가 비어있을 때 전체 목록을 불러옴
    if (searchKeyword === "") {
      const response = await trainerApi.list(""); // 빈 문자열로 전체 목록을 가져옴
      setTrainerList(response.data);
    } else {
      const response = await trainerApi.list(searchKeyword); // 검색어로 필터링된 목록을 가져옴
      setTrainerList(response.data);
    }
  };

  // 삭제
  const onDelete = async (trainerNo) => {
    // 배열로 받은 trainerNo를 쿼리스트링으로 변환
  
    // ticket.remove 호출시 올바르게 URL을 넘김
    const response = await trainerApi.remove(trainerNo);
    if (response.status === 200) {
      alert("삭제되었습니다.");
      getList(keyword); // 삭제 후 목록을 갱신
    } else {
      alert("삭제에 실패했습니다.");
    }
  };

  // 선택
  const selectTrainer = async (no) => {
    navigate(`/admin/trainer/update?no=${no}`);
    
  }
  
  // URL 파라미터 변경 시 검색어 업데이트
  useEffect(() => {
    updatePage(); // URL이 변경될 때마다 검색어 업데이트
  }, [location.search]);

  // 검색어 변경 시, API 호출
  useEffect(() => {
    getList(keyword); // keyword가 변경될 때마다 getList 호출
  }, [keyword]);

  const handleSearch = (newKeyword) => {
    setKeyword(newKeyword);  // 검색어 상태 업데이트
    navigate(`?keyword=${newKeyword}`);  // URL에 검색어를 쿼리 파라미터로 추가
  };

  return (
    <TrainerList trainerList={trainerList} onSearch={handleSearch} keyword={keyword} onDelete={onDelete} selectTrainer={selectTrainer} />
  );
};

export default ListContainer;