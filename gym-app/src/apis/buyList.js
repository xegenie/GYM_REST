import api from './api'

// 구매 등록
export const join = (data) => api.post(`/users`, data)

// 구매 취소
export const login = (username, password) => {
    return api.get(`/login?username=${username}&password=${password}`)
}

// 전체 구매 리스트 조회
export const info = () => api.get(`/users/info`)

// 매출 조회
export const update = (data) => api.put(`/user`, data)

// 마이페이지 구매 리스트 조회
export const remove = (username) => api.delete(`/users/${username}`)