import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../Header/adminSidebar';
import { Chart, registerables } from 'chart.js';
import '../Trainer/css/TrainerList.css'

// 필요한 스케일 및 기본 요소를 모두 등록
Chart.register(...registerables);

const Sales = ({ trainerUsers, salesList, selectedTrainer, fetchSalesData, selectedStartYear, selectedStartMonth, selectedStartDay, selectedEndYear, selectedEndMonth, selectedEndDay }) => {

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();  // 각 월에 맞는 일수를 계산
  };

  const updateDaysInMonth = (isStart, selectedYear, selectedMonth) => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const newDays = Array.from({ length: daysInMonth }, (_, idx) => idx + 1);
    if (isStart) {
      setSelectedStart({ ...selectedStart, day: newDays[0] });
    } else {
      setSelectedEnd({ ...selectedEnd, day: newDays[0] });
    }
  };

  const getToday = () => {
    const today = new Date();
    return {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    };
  };

  const [selectedStart, setSelectedStart] = useState({ year: selectedStartYear || getToday().year, month: selectedStartMonth || getToday().month, day: selectedStartDay || getToday().day });
  const [selectedEnd, setSelectedEnd] = useState({ year: selectedEndYear || getToday().year, month: selectedEndMonth || getToday().month, day: selectedEndDay || getToday().day });

  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }

      const labels = salesList.map(item => item.ticketName);
      const quantities = salesList.map(item => item.salesCount);
      const totalSales = salesList.reduce((acc, item) => acc + (item.ticketPrice * item.salesCount), 0);

      const ctx = chartRef.current.getContext('2d');
      const chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: '판매 수량',
            data: quantities,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                title: function (tooltipItem) {
                  return tooltipItem[0].label;
                },
                label: function (tooltipItem) {
                  return '수량: ' + tooltipItem.raw;
                }
              },
              titleFont: { style: 'normal' },
              bodyFont: { style: 'normal' }
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      chartRef.current.chartInstance = chartInstance;

      document.getElementById('total').innerText = `총 매출 금액: ${totalSales} 원`;
    }
  }, [salesList]);

  // 주소 파라미터 처리하기
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setSelectedStart({
      year: urlParams.get('startYear') || selectedStart.year,
      month: urlParams.get('startMonth') || selectedStart.month,
      day: urlParams.get('startDay') || selectedStart.day,
    });
    setSelectedEnd({
      year: urlParams.get('endYear') || selectedEnd.year,
      month: urlParams.get('endMonth') || selectedEnd.month,
      day: urlParams.get('endDay') || selectedEnd.day,
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const { year: startYear, month: startMonth, day: startDay } = selectedStart;
    const { year: endYear, month: endMonth, day: endDay } = selectedEnd;
  
    const queryParams = new URLSearchParams({
      trainerNo: selectedTrainer,
      startYear,
      startMonth,
      startDay,
      endYear,
      endMonth,
      endDay
    }).toString();

    const searchUrl = `saleList?${queryParams}`;
    window.location.href = searchUrl;
    fetchSalesData();
  };

  const resetForm = (event) => {
    event.preventDefault();
    const today = getToday();
    setSelectedStart({ year: today.year, month: today.month, day: today.day });
    setSelectedEnd({ year: today.year, month: today.month, day: today.day });
    const searchUrl = `salelist`;
    window.location.href = searchUrl;
  }

  return (
    <div className="adminTrainerList">
      <div className="container">
        <Sidebar />
        <div className="main">
          <div className="inner">
            <div className="mainTitle">
              <h2>매출 조회</h2>
            </div>

            <form onSubmit={handleSubmit} action="salesList" method="GET" id="searchForm" style={{ display: 'flex', justifyContent: 'space-between', margin: '0 50px', marginBottom: '100px' }}>
              <div>
                <select className='select' name="trainerNo" value={selectedTrainer} onChange={e => setSelectedTrainer(e.target.value)}>
                  <option value="">트레이너 이름</option>
                  {trainerUsers.map((trainerUser) => (
                    <option value={trainerUser.no} key={trainerUser.no}>
                      {`${trainerUser.trainerName} (${trainerUser.id})`}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <select name="startYear" value={selectedStart.year} onChange={e => setSelectedStart({ ...selectedStart, year: e.target.value })}>
                  <option value="">시작 연도</option>
                  {[...Array(2025 - 2010 + 1)].map((_, idx) => {
                    const year = 2010 + idx;
                    return <option key={year} value={year}>{year}</option>;
                  })}
                </select>

                <select name="startMonth" value={selectedStart.month} onChange={e => setSelectedStart({ ...selectedStart, month: e.target.value })}>
                  <option value="">시작 월</option>
                  {[...Array(12)].map((_, idx) => {
                    const month = idx + 1;
                    return <option key={month} value={month}>{month}월</option>;
                  })}
                </select>

                <select name="startDay" value={selectedStart.day} onChange={e => setSelectedStart({ ...selectedStart, day: e.target.value })}>
                  <option value="">시작 일</option>
                  {[...Array(getDaysInMonth(selectedStart.year, selectedStart.month))].map((_, idx) => {
                    const day = idx + 1;
                    return <option key={day} value={day}>{day}일</option>;
                  })}
                </select>
                ~
                <select name="endYear" value={selectedEnd.year} onChange={e => setSelectedEnd({ ...selectedEnd, year: e.target.value })}>
                  <option value="">종료 연도</option>
                  {[...Array(2025 - 2010 + 1)].map((_, idx) => {
                    const year = 2010 + idx;
                    return <option key={year} value={year}>{year}</option>;
                  })}
                </select>

                <select name="endMonth" value={selectedEnd.month} onChange={e => setSelectedEnd({ ...selectedEnd, month: e.target.value })}>
                  <option value="">종료 월</option>
                  {[...Array(12)].map((_, idx) => {
                    const month = idx + 1;
                    return <option key={month} value={month}>{month}월</option>;
                  })}
                </select>

                <select name="endDay" value={selectedEnd.day} onChange={e => setSelectedEnd({ ...selectedEnd, day: e.target.value })}>
                  <option value="">종료 일</option>
                  {[...Array(getDaysInMonth(selectedEnd.year, selectedEnd.month))].map((_, idx) => {
                    const day = idx + 1;
                    return <option key={day} value={day}>{day}일</option>;
                  })}
                </select>
                <button className='button' type="submit">검색</button>
                <button className='button' type="reset" onClick={resetForm}>초기화</button>
              </div>
            </form>

            <div className="list">
              <div id="chart-container" style={{ width: '900px', height: '500px' }}>
                <canvas ref={chartRef} width="900" height="500"></canvas>
                <div id="total" style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '18px', marginTop: '10px' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
