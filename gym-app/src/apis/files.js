import api from './api'

// 파일 목록 조회
export const join = (data) => api.post(`/users`, data)

// 파일 삭제
export const login = (username, password) => {
    return api.get(`/login?username=${username}&password=${password}`)
}