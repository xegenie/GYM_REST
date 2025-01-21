import React, { useState, useEffect } from 'react';
import { getSalesList } from '../../apis/buyList';
import * as trainerApi from '../../apis/trainerProfile';
import Sales from '../../components/admin/Sales/Sales';

const SalesContainer = () => {

    const [salesList, setSalesList] = useState([]); // salesList 상태 관리
    const [trainerUsers, setTrainerUsers] = useState([]); // 트레이너 데이터 상태 관리

    // URLSearchParams 사용하여 쿼리 파라미터 가져오기
    const searchParams = new URLSearchParams(window.location.search);
    const startYear = searchParams.get('startYear') || new Date().getFullYear();
    const startMonth = searchParams.get('startMonth') || new Date().getMonth() + 1;
    const startDay = searchParams.get('startDay') || new Date().getDate();
    const endYear = searchParams.get('endYear') || new Date().getFullYear();
    const endMonth = searchParams.get('endMonth') || new Date().getMonth() + 1;
    const endDay = searchParams.get('endDay') || new Date().getDate();
    const trainerNo = searchParams.get('trainerNo') || "";

    // 판매 데이터 fetch 함수
    const fetchSalesData = async () => {
        const params = {
            trainerNo: trainerNo,
            startYear: startYear,
            startMonth: startMonth,
            startDay: startDay,
            endYear: endYear,
            endMonth: endMonth,
            endDay: endDay
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
        fetchSalesData(); // 컴포넌트 마운트 시 데이터 fetch
        getTrainer(); // 트레이너 데이터 가져오기
    }, [startYear, startMonth, startDay, endYear, endMonth, endDay, trainerNo]); // 파라미터가 변경될 때마다 재호출

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
