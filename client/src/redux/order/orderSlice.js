import { createSlice } from '@reduxjs/toolkit';

const order = localStorage.getItem('order') !== null ? JSON.parse(localStorage.getItem('order')) : {};
export const orders = createSlice({
    name: 'orders',
    initialState: {
        order: {
            //data: [],
            data: order,
        },
        all: {
            data: null,
        },
        detail:{
            data:null
        }
    },
    reducers: {
        postOrder: (state, action) => {
            state.order.data = action.payload;
            // const orderData = JSON.stringify(action.payload);
            // if (!action.payload.payment.paid) {
            //     localStorage.setItem('order', orderData);
            // }
        },
        allOrder: (state, action) => {
            state.all.data = action.payload;
        },
        orderDetail: (state,action) =>{
            state.detail.data = action.payload
        }
    },
});
export const { postOrder, allOrder,orderDetail } = orders.actions;
export default orders.reducer;
