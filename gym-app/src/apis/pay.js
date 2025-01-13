import api from './api'

// 이용권 선택 페이지
export const join = (data) => api.post(`/users`, data)

// 트레이너 목록
export const login = (username, password) => {
    return api.get(`/login?username=${username}&password=${password}`)
}

// 일반 이용권 목록
export const info = () => api.get(`/users/info`)

// 결제
export const update = (data) => api.put(`/user`, data)

// 결제 결과 페이지
export const remove = (username) => api.delete(`/users/${username}`)