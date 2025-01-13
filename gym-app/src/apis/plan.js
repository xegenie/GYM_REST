import api from './api'

export const getPlans = () => api.get(`/user/schedule`)

export const getPlansbyUserNo = (userNo) => api.get(`/user/schedule?userNo=${userNo}`)

export const getPlansbyDate = (year, month, day) => api.get(`/user/schedule/${year}/${month}/${day}`)

export const getPlansbyDateUserNo = (year, month, day, userNo) => api.get(`/user/schedule/${year}/${month}/${day}&userNo=${userNo}`)

export const insert = (data) => api.post(`/user/schedule`, data)

export const update = (data) => api.put(`/user/schedule`, data)

export const remove = (no) => api.delete(`/user/schedule?no=${no}`)


export const insertComment = (data) => api.post(`/user/schedule/comment`, data)

export const updateComment = (data) => api.put(`/user/schedule/comment`, data)
