import api from './api'

//   예약 전체 조회
export const list = () => api.get(`/admin/reservation/list`)

// 캘린더 예약 목록
export const calendarList = (keyword, code) => api.get(`/admin/reservation/calendar?keyword=${keyword}&code=${code}`)

// 회원 나의 예약 조회
export const userByList = (no, pageNumber, rows) => api.get(`/user/myPage/ptList/${no}?page=${pageNumber}&rows=${rows}`)

// 예약 신청 트레이너 정보
export const sortByTrainer = (no) => api.get(`/user/reservation/reservationInsert/${no}`)

// 예약 신청
export const insert = (data) => api.post(`/user/reservation/reservationInsert`, data)

// 관리자 예약 취소/완료 처리
export const updateReservationByAdmin = (reservationNo, action) => api.put(`/admin/reservation/list?reservationNo=${reservationNo}&action=${action}`)