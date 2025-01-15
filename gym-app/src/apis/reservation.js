import api from './api'

// 예약 전체 조회
export const list = (keyword, option, page) => api.get(`/admin/reservation/list?keyword=${keyword}&option=${option}&page=${page}`)

// 회원 나의 예약 조회
export const userByList = (userNo, option, page) => api.get(`/user/myPage/ptList?userNo=${userNo}&option=${option}&page=${page}`)

// 관리자 예약 취소/완료 처리
export const updateReservationByAdmin = (reservationNo, action) => api.put(`/admin/reservation/list`, {reservationNo, action})



