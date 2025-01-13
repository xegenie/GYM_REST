import api from './api'

// 티켓 목록 조회
export const list = (data) => api.get(`/admin/ticket/list?${data}`)

// 티켓 등록
export const insert = (data) => api.post(`/admin/ticket/insert`, data)

// 수정
export const update = (data) => api.put(`/admin/ticket/update`, data)

// 삭제
export const remove = (ticketNos) => api.delete(`/admin/ticket/delete?${ticketNos}`)