import axiosClient from '../api/axios.config';

export const _newRating = async (data) => {
    const res = await axiosClient.post('rating/new', data);
    return res;
};

export const _getAllRatingProduct = async (product_id) => {
    const res = await axiosClient.get(`rating/get/product/${product_id}`);
    return res;
};

export const _addDiscussRating = async (id, data) => {
    const res = await axiosClient.put(`/rating/${id}/addDiscuss`, data);
    return res;
};
