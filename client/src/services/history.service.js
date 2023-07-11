import axiosClient from '../api/axios.config';

export const historyService = {
    getHistoryOrderByPhone(value) {
        return axiosClient.get(`/orders?customer.phone=${value}`);
    },
    updateHistoryOrder(id, data) {
        return axiosClient.patch(`/orders/${id}`, data);
    },
};
