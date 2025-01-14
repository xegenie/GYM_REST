import api from './api'

export const list = (keyword, option, page) => {
    const orderCode = option ?.orderCode || 0;
    const code = option ?.code || 0;

    return api.get(`/admin/reservation/list?keyword=${keyword}&orderCode=${orderCode}&code=${code}&page=${page}`);
};