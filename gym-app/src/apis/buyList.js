import api from './api'

// 구매 등록
export const insert = (buyList) => api.post(`/buyList/admin`, buyList)

// 구매 취소
export const cancel = (no) => api.put(`/buyList/admin/${no}/cancel`)

// 전체 구매 리스트 조회
export const getBuyList = (keyword) => api.get(`/buyList/admin?${keyword}`)

// 매출 조회
export const getSalesList = () => api.get(`/buyList/admin/sales`)

// 마이페이지 구매 리스트 조회
export const getMyBuyList = (userNo) => api.delete(`/users/${userNo}/buyList`)