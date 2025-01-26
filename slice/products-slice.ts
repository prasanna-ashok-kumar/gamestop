import {createSlice} from '@reduxjs/toolkit';
import {ProductDetailsProps} from '../types/types';

interface ProductItems {
  productItems: Array<ProductDetailsProps>;
  productItemsError: string;
}

const name = 'products';
const initialState: ProductItems = {
  productItems: [],
  productItemsError: '',
};

const productsSlice = createSlice({
  name,
  initialState,
  reducers: {
    setProducts: (state, action) => {
      const {payload} = action;
      state.productItems = payload;
    },
    setProductsError: (state, action) => {
      const {payload} = action;
      state.productItemsError = payload;
    },
  },
});

const {actions, reducer} = productsSlice;
export const {setProducts, setProductsError} = actions;

export default reducer;
