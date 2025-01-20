import api from './api'

// 목록
export const list = () => api.get(`/board`)

// 조회
export const select = (no) => api.get(`/board/${no}`)

// 등록
export const insert = (form) => api.post(`/board`, form)

// 수정
export const update = (form) => api.put(`/board`, form)

// 삭제
export const remove = (no) => api.delete(`/board/${no}`)

// 답변 등록
export const answerInsert = (form) => api.post(`/answer`, form)

// 답변 삭제
export const AnswerDel = (no) => api.delete(`/answer/${no}`)

// 답변 수정
export const AnswerUp = (form) => api.put(`/answer`, form)

export const myList = (pageNumber, rows) => api.get(`/user/myBoardList?page=${pageNumber}&rows=${rows}`)
