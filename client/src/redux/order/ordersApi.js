import axiosClient from '../../api/axios.config';
import { postOrder, allOrder, orderDetail } from './orderSlice';

export const postOrders = async (dispatch, data,axiotJWT,id) => {
    let res = await axiotJWT.post(`order/new/${id}`, data);
    dispatch(postOrder(data));
};

export const _getAllOrders = async (dispatch, data,axiotJWT,id) => {
    let res = await axiotJWT.get(`order/getbyid/${data}/${id}`);
    dispatch(allOrder(res));
};

export const _editOrder = async (data,axiotJWT,id) => {
    let res = await axiotJWT.put(`/order/cancel/${data.id}/${id}`, data);
};


export const _getOrderDetail = async (dispatch, id) => {
    let res = await axiosClient.get(`order/getorderdetail/${id}`);
    dispatch(orderDetail(res));
};
export const saveOrders = async (dispatch, data) => {
    dispatch(postOrder(data));
};