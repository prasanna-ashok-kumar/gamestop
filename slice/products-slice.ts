import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ProductDetailsProps} from '../types/types';
import {fetchFromApi} from '../utils/fetch-from-api';
import {store} from './store';

interface ProductItems {
  productItems: Array<ProductDetailsProps>;
  productItemsError: string;
  productsLoading: boolean;
}

const name = 'products';
const initialState: ProductItems = {
  productItems: [],
  productItemsError: '',
  productsLoading: false,
};

const URL = `https://www.freetogame.com/api/games`;

export const fetchProducts = createAsyncThunk(
  `${name}/fetchProducts`,
  async (_, {rejectWithValue}) => {
    const [error, response] = await fetchFromApi(URL);

    if (Array.isArray(response) && response.length) {
      return response.slice(0, 50);
    } else {
      rejectWithValue(error);
    }
  },
);

export const productsSlice = createSlice({
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
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.productsLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsLoading = false;
        state.productItems = action.payload ?? [];
        state.productItemsError = '';
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.productsLoading = false;
        state.productItems = [];
        state.productItemsError = 'Error while fetching the products';
      });
  },
});

const {actions, reducer} = productsSlice;
export const {setProducts, setProductsError} = actions;
export default reducer;
export type ProductsDispatch = typeof store.dispatch;
