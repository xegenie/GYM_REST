import api from './api'

export const list = () => api.get(`/board`)