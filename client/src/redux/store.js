import cartItemsReducer from './shopping-cart/cartItemsSlide';
import userReducer from './user/userSlice';
import orderSlice from './order/orderSlice';

import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};
const appReducer = combineReducers({
    user: userReducer,
    cartItems: cartItemsReducer,
    user: userReducer,
    order: orderSlice,
});
const rootReducer = (state, action) => {
    if (action.type === 'auth/logOutSuccess') {
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
