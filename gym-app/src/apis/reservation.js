import api from './api'

export const list = (keyword, option, page) => api.get(`/admin/reservation/list?keyword=${keyword}&option=${option}&page=${page}`)