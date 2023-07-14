import axiosClient from '../api/axios.config';

export const _newRating = async (data,axiosJWT,id) => {
    const res = await axiosJWT.post(`rating/new/${id}`, data);
    return res;
};

export const _getAllRatingProduct = async (product_id) => {
    const res = await axiosClient.get(`rating/get/product/${product_id}`);
    return res;
};

export const _addDiscussRating = async (id, data,axiosJWT,_id) => {
    const res = await axiosJWT.put(`/rating/${id}/addDiscuss/${_id}`, data);
    return res;
};
