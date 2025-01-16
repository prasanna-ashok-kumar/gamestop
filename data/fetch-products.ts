import products from './products.json';

export const fetchProducts = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(products);
    }, 2000);
  });
};
