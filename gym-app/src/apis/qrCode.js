import api from './api'

export const qrCodes = () => api.post(`/generate-qr-code`)

