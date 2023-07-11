import axiosClient from '../api/axios.config';

export const orderService = {
    postOrder(data) {
        return axiosClient.post(`/orders/`, data);
    },
};
