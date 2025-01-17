import {createSlice} from '@reduxjs/toolkit';
import {ProductDetailsProps} from '../screens/pdp-screen-view';

interface ProductItems {
  productItems: Array<ProductDetailsProps>;
}

const name = 'products';
const initialState: ProductItems = {
  productItems: [],
};

const productsSlice = createSlice({
  name,
  initialState,
  reducers: {
    setProducts: (state, action) => {
      const {payload} = action;
      state.productItems = payload;
    },
  },
});

const {actions, reducer} = productsSlice;
export const {setProducts} = actions;

export default reducer;
