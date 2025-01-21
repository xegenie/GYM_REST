import api from './api'

// 구매 등록
export const insert = (buyList) => api.post(`/buyList/admin`, buyList)

// 구매 취소
export const cancel = (no) => api.put(`/buyList/admin/${no}/cancel`)

// 전체 구매 리스트 조회
export const getBuyList = (keyword) => api.get(`/buyList/admin?${keyword}`)

// 매출 조회
export const getSalesList = ({ trainerNo, startYear, startMonth, startDay, endYear, endMonth, endDay }) => {
    // URL에 쿼리 파라미터로 전달할 데이터를 포함시킵니다.
    const queryParams = new URLSearchParams({
      trainerNo: trainerNo || '',  // trainerNo 값이 없으면 빈 문자열을 전달
      startYear: startYear || '',  // startYear 값이 없으면 빈 문자열을 전달
      startMonth: startMonth || '',  // startMonth 값이 없으면 빈 문자열을 전달
      startDay: startDay || '',  // startDay 값이 없으면 빈 문자열을 전달
      endYear: endYear || '',  // endYear 값이 없으면 빈 문자열을 전달
      endMonth: endMonth || '',  // endMonth 값이 없으면 빈 문자열을 전달
      endDay: endDay || '',  // endDay 값이 없으면 빈 문자열을 전달
    }).toString();
  
    return api.get(`/buyList/admin/sales?${queryParams}`);
  };
  
// 마이페이지 구매 리스트 조회
export const getMyBuyList = (userNo) => api.delete(`/users/${userNo}/buyList`)