import axiosClient from '../api/axios.config';

const getBrandsByCategory = async (category) => {
    let response = await axiosClient.get(`/brand/get/category/${category}`);
    return {
        data: response,
        meta: {
            total: response.length,
        },
    };
};

export { getBrandsByCategory };
