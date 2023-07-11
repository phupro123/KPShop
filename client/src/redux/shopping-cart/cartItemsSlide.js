import { createSlice } from '@reduxjs/toolkit';

const items = localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState = {
    value: items,
};

export const cartItemsSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const indexItem = state.value.findIndex((e) => e._id === newItem._id);
            if (indexItem !== -1) {
                state.value[indexItem] = newItem;
            } else {
                state.value = [...state.value, newItem];
            }
            localStorage.setItem('cartItems', JSON.stringify(state.value));
        },
        updateItem: (state, action) => {
            const updateItem = action.payload;
            const indexItem = state.value.findIndex((e) => e._id === updateItem._id);
            if (indexItem === -1) {
                return;
            }

            state.value[indexItem] = updateItem;
            localStorage.setItem('cartItems', JSON.stringify(state.value));
        },
        removeItem: (state, action) => {
            const item = action.payload;
            state.value = state.value.filter((e) => e._id !== item._id);
            localStorage.setItem('cartItems', JSON.stringify(state.value));
        },
        clearCart: (state) => {
            state.value = [];
            localStorage.removeItem('cartItems');
        },
    },
});

export const { addItem, removeItem, updateItem, clearCart } = cartItemsSlice.actions;

export default cartItemsSlice.reducer;
