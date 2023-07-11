import axiosClient from '../api/axios.config';

export const getProducts = async (params) => {
    const response = await axiosClient.get('/product/all', { params });

    return {
        data: response.data,
        meta: {
            total: response.total,
        },
    };
};

export const getProductBySlug = async (slug) => {
    const response = await axiosClient.get(`/product/get/${slug}`);
    return response;
};

export const updateRatingProductById = async (id, star, totalVote) => {
    let res = await axiosClient.put(`/product/edit/${id}`, {
        star,
        totalVote,
    });
    return res;
};

export const checkVoucher = async (name) => {
    let res = await axiosClient.post('voucher/checkVoucher', name);
    return res;
};

export const productService = {
    getProducts(page, limit) {
        return axiosClient.get(`/products/?_page=${page}&_limit=${limit}`);
    },
    getProduct(id) {
        return axiosClient.get(`/products/${id}`);
    },
    getProductByName(name) {
        return axiosClient.get(`/products/${name}`);
    },
    getProductByBrand(category, brand) {
        return axiosClient.get(`/products/?category=${category}&brand=${brand}`);
    },
    getProductByCategoryBrandSex(category, brand, sex) {
        return axiosClient.get(`/products/?category=${category}&brand=${brand}&sex=${sex}`);
    },
    getProductByCategorySex(category, sex) {
        return axiosClient.get(`/products/?category=${category}&sex=${sex}`);
    },
    getProductByCategory(category) {
        return axiosClient.get(`/products/?category=${category}`);
    },
    getProductByPolicy(category, brand) {
        return axiosClient.get(`/products/?category=${category}${brand}`);
    },
    getProductByLocation(location) {
        return axiosClient.get(`/products/?location=${location}`);
    },
    queryProduct() {
        const query = Array.from(arguments)
            .map((param) => {
                return `${param[0]}=${param[1]}`;
            })
            .join('&');
        return axiosClient.get(`/products/?${query}`);
    },

    // queryProduct(["brand", "nokia"], ["title", "Nokia 500"])
    getArticle(id) {
        return axiosClient.get(`/productarticle/?productId=${id}`);
    },
};
