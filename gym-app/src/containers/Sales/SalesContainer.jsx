import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // useParams를 추가
import { getSalesList } from '../../apis/buyList';
import * as trainerApi from '../../apis/trainerProfile';
import Sales from '../../components/admin/Sales/Sales';

const SalesContainer = () => {
    const [salesList, setSalesList] = useState([]); // salesList 상태 관리
    const [trainerUsers, setTrainerUsers] = useState([]); // 트레이너 데이터 상태 관리
    
    // URLSearchParams 사용하여 쿼리 파라미터 가져오기
    const searchParams = new URLSearchParams(window.location.search);
    
    const startYear = parseInt(searchParams.get('startYear')) || new Date().getFullYear();
    const startMonth = parseInt(searchParams.get('startMonth')) || new Date().getMonth() + 1;
    const startDay = parseInt(searchParams.get('startDay')) || new Date().getDate();
    const endYear = parseInt(searchParams.get('endYear')) || new Date().getFullYear();
    const endMonth = parseInt(searchParams.get('endMonth')) || new Date().getMonth() + 1;
    const endDay = parseInt(searchParams.get('endDay')) || new Date().getDate();
    const trainerNo = parseInt(searchParams.get('trainerNo')) || ""; // 값이 없으면 빈 문자열로 설정
  
    const fetchSalesData = async () => {
      const params = {
        trainerNo: trainerNo,
        startYear: startYear,
        startMonth: startMonth,
        startDay: startDay,
        endYear: endYear,
        endMonth: endMonth,
        endDay: endDay,
      };
  
      console.log('Sales data params:', params); // 확인용 로그
  
      try {
        const response = await getSalesList(params);
        setSalesList(response.data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };
  
    const getTrainer = async () => {
      try {
        const response = await trainerApi.trainerUser();
        setTrainerUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      // 컴포넌트 마운트 시 데이터 fetch
      fetchSalesData();
      getTrainer(); 
    }, [startYear, startMonth, startDay, endYear, endMonth, endDay, trainerNo]);
  
    return (
      <Sales
        salesList={salesList}
        trainerUsers={trainerUsers}
        selectedTrainer={trainerNo} // URL에서 가져온 trainerNo
        selectedStartYear={startYear}
        selectedStartMonth={startMonth}
        selectedStartDay={startDay}
        selectedEndYear={endYear}
        selectedEndMonth={endMonth}
        selectedEndDay={endDay}
        fetchSalesData={fetchSalesData}
      />
    );
  };
  
export default SalesContainer;
