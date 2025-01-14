import api from './api'

// 목록 조회
export const list = (keyword) => api.get(`/admin/trainer/list`, keyword)

// 트레이너 상세 조회
export const select = (no) => api.get(`/admin/trainer/select?${no}`)

// 권한이 트레이너인 유저
export const trainerUser = () => api.get(`/admin/trainer/trainerUsers`)

// 트레이너 번호로 유저 조회
export const getTrainerNo = (trainerNo) => api.put(`/admin/trainer/getTrainerNo?${trainerNo}`)

//트레이너 등록
export const insert = (formData, headers) => api.post(`/admin/trainer/insert`, formData, headers)

//트레이너 수정
export const update = (formData, headers) => api.put(`/admin/trainer/update`, formData, headers)

//트레이너 삭제
export const remove = (no) => api.delete(`/admin/trainer/delete?${no}`)