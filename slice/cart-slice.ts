import {createSlice} from '@reduxjs/toolkit';

interface CartItems {
  cartItems: Array<{
    id: string;
    name: string;
    quantity: number;
    variant: string;
  }>;
}

const name = 'cart';
const initialState: CartItems = {
  cartItems: [],
};

const cartSlice = createSlice({
  name,
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const {cartItems} = state;
      const {payload} = action;
      const matchedItem = cartItems.find(
        item => item.id === payload.id && item.variant === payload.variant,
      );
      if (matchedItem) {
        matchedItem.quantity += 1;
      } else {
        cartItems.push({...payload, quantity: 1});
      }
    },
    clearCart: state => {
      state.cartItems = [];
    },
  },
});

const {actions, reducer} = cartSlice;
export const {addToCart, clearCart} = actions;

export default reducer;
