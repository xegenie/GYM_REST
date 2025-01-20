
import api from './api';



export const check = (uuid) => api.get(`/user/attendance/check/${uuid}`)

