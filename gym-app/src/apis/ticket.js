import api from './api'

// 티켓 목록 조회
export const list = (keyword) => api.get(`/admin/ticket/list?${keyword}`)

// 티켓 등록
export const insert = (formData, headers) => api.post(`/admin/ticket/insert`, formData, headers)

// 수정
export const update = (formData, headers) => api.put(`/admin/ticket/update`, formData, headers)

// 삭제
export const remove = (ticketNos) => api.delete(`/admin/ticket/delete?${ticketNos}`)