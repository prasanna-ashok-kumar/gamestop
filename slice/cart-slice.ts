import {createSlice} from '@reduxjs/toolkit';

export interface CartItemProps {
  id: string;
  title: string;
  quantity: number;
}

interface CartItems {
  cartItems: Array<CartItemProps>;
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
      const matchedItem = cartItems.find(item => item.id === payload.id);
      if (matchedItem) {
        // Increment the quantity if the cart item already exists
        matchedItem.quantity += 1;
      } else {
        cartItems.push({...payload, quantity: 1});
      }
    },
    removeFromCart: (state, action) => {
      const {cartItems} = state;
      const {payload} = action;
      const matchedItem = cartItems.find(item => item.id === payload.id);
      if (matchedItem) {
        if (matchedItem.quantity === 1) {
          // Remove the product from cart when quantity is 1
          const cartItemsAfterRemoval = cartItems.filter(
            item => item.id !== payload.id,
          );
          state.cartItems = cartItemsAfterRemoval;
        } else {
          matchedItem.quantity -= 1;
        }
      }
    },
    clearCart: state => {
      state.cartItems = [];
    },
  },
});

const {actions, reducer} = cartSlice;
export const {addToCart, removeFromCart, clearCart} = actions;

export default reducer;
