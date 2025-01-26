import {useDispatch} from 'react-redux';
import {fetchFromApi} from '../utils/fetch-from-api';
import {setProducts, setProductsError} from '../slice/products-slice';

export const fetchProducts = async () => {
  const dispatch = useDispatch();
  const url = `https://www.freetogame.com/api/games`;
  const [error, response] = await fetchFromApi(url);

  if (Array.isArray(response) && response.length) {
    response.splice(10);
    dispatch(setProducts(response));
  } else {
    dispatch(setProductsError(error));
  }
  console.log(error, response);
  return [error, response];
};
