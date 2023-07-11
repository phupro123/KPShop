import axiosClient from '../../api/axios.config';
import { postOrder, allOrder, orderDetail } from './orderSlice';

export const postOrders = async (dispatch, data) => {
    let res = await axiosClient.post('order/new', data);
    dispatch(postOrder(data));
};

export const saveOrders = async (dispatch, data) => {
    dispatch(postOrder(data));
};

export const _getAllOrders = async (dispatch, data) => {
    let res = await axiosClient.get(`order/getbyid/${data}`);
    dispatch(allOrder(res));
};

export const _editOrder = async (data) => {
    let res = await axiosClient.put(`/order/edit/${data.id}`, data);
};

export const _getOrderDetail = async (dispatch, id) => {
    let res = await axiosClient.get(`order/getorderdetail/${id}`);
    dispatch(orderDetail(res));
};
