import axiosClient from '../../api/axios.config';
import { login, logout } from './userSlice';

export const _loginPass = async (data, dispatch, navigate) => {
    let res = await axiosClient.post('/auth/login', data);
    dispatch(login(res));
    if (res) {
        navigate('/');
    }
};

export const _getSuccess = async (dispatch, navigate) => {
    const res = await axiosClient.get(
        '/auth/login/success',
        { withCredentials: true },
        {
            headers: { 'Access-Control-Allow-Credentials': true },
        },
    );

    dispatch(login(res));
};

export const _loginPhone = async (data, dispatch, navigate) => {
    let res = await axiosClient.post('/auth/phone/signup', data);
};

export const _verifyPhone = async (data, dispatch, navigate) => {
    let res = await axiosClient.post('/auth/phone/verify', data);
    dispatch(login(res));
    if (res) {
        navigate('/');
    }
};

export const _logout = async (dispatch, navigate) => {
    try {
        const b = await axiosClient.post('/auth/logout');
        // window.open('https://kpshop-backend.onrender.com/auth/logout', '_self');
        dispatch(logout());
        navigate('/');
    } catch (err) {}
};

export const _editUser = async (dispatch, data, id) => {
    try {
        const res = await axiosClient.put(`/user/edit/${id}`, data);
        dispatch(login(res));
    } catch (err) {}
};

export const _editPhone = async (dispatch, data, id) => {
    try {
        const res = await axiosClient.put(`/user/editPhone/${id}`, data);
        dispatch(login(res));
    } catch (err) {}
};

export const _editPass = async (dispatch, data, id) => {
    try {
        const res = await axiosClient.put(`/user/editPass/${id}`, data);
        dispatch(login(res));
    } catch (err) {}
};

// {
//     "_id":"6360c477323aa241380d7be3",  id nguoi dùng
//     "prodId": "2"
// }
export const _addWishList = async (dispatch, data) => {
    try {
        const res = await axiosClient.post(`/user/addToWishList`, data);
        dispatch(login(res));
    } catch (err) {
        console.log(err);
    }
};

export const _pushAddress = async (dispatch, data, id) => {
    try {
        const res = await axiosClient.put(`/user/pushAddress/${id}`, data);
        dispatch(login(res));
    } catch (err) {}
};
export const _popAddress = async (dispatch, data, id) => {
    try {
        const res = await axiosClient.put(`/user/popAddress/${id}`, data);
        dispatch(login(res));
    } catch (err) {}
};
export const _editAddress = async (dispatch, data, id) => {
    try {
        const res = await axiosClient.put(`/user/editAddress/${id}`, data);
        dispatch(login(res));
    } catch (err) {}
};

export const _checkMail = async (dispatch, data) => {
    try {
        const res = await axiosClient.put('/user/checkMail', data);
        return res;
    } catch (err) {}
};
export const _changeMail = async ( data, ) => {
    try {
        const res = await axiosClient.post('/services/changeEmail', data);
        
    } catch (err) {}
};

export const _verifyChangeMail= async ( data, dispatch) => {
    try {
        const res = await axiosClient.post('/services/verifyChangeEmail', data);
        dispatch(login(res))
        return res;
    } catch (err) {}
};

export const _forgetPass= async ( data, ) => {
    try {
        const res = await axiosClient.post('/services/forgetPassword', data);
    } catch (err) {}
};

export const _editForgetPassword= async ( data) => {
    try {
        const res = await axiosClient.post('/services/editForgetPassword', data);
    } catch (err) {}
};
export const _loginSucessPhone= async ( data,dispatch) => {
    try {
        const res = await axiosClient.post('/auth/loginSucessPhone', data);
        dispatch(login(res))
    } catch (err) {}
};

export const _getWishList= async ( data,dispatch) => {
    try {
        const res = await axiosClient.post('/user/getWishList', data);
        dispatch(login(res))
    } catch (err) {}
};

export const _succesOrder= async ( data) => {
    try {
        const res = await axiosClient.post('/services/sucessOrder', data);
       
    } catch (err) {}
};