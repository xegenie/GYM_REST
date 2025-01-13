import api from './api'

// 번호로 파일 목록 조회
export const getFileList = (profileNo) => api.get(`/users`, profileNo)

// 이미지 썸네일
export const getThunbnail = (no) => api.get(`/files/tuhmbnail/${no}`)

// 파일 삭제
export const deleteFile = (no) => api.delete(`/files/${no}`)