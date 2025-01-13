import api from './api'

// 티켓 기간
export const ticketDate = () => api.get(`/user/ticketDate`)

// 트레이너 목록
export const trainerList = () => api.get(`user/ticket/trainerList`)

// 일반 이용권 목록
export const normal = () => api.get(`/user/ticket/normal`)

// 결제
export const paying = () => api.post(`/user/pay/paying`)

// 결제 결과 페이지
export const remove = () => api.delete(`/user/pay/payresult`)