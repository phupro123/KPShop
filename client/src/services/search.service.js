import axiosClient from '../api/axios.config';

const getResultSearch = async (value) => {
    const response = await axiosClient.get(`/product/search/${value}`);
    return response;
};

export { getResultSearch };
