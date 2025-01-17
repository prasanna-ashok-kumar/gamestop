import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './cart-slice';
import productsReducer from './products-slice';
import {combineReducers} from '@reduxjs/toolkit';

const rootReducer = combineReducers({});

export type CustomReducerType = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});
