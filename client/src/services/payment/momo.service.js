import axios from 'axios';
import axiosClient from '../../api/axios.config';
export const momo = {
    createMomoPayment(data) {
        // return axios.post('https://momopayment.glitch.me/paymentUrl', data);
        return axiosClient.post('payment/paymentUrl',data)
    },
};
