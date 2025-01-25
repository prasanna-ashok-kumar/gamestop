import {View} from 'react-native';
import {ProductsList} from '../components/products-list';
import {useDispatch, useSelector} from 'react-redux';
import {clearCart} from '../slice/cart-slice';
import React from 'react';
import {CustomButton} from '../components/button';
import {CustomReducerType} from '../slice/store';
import {useAuthenticatedNavigation} from '../utils/use-navigation';

export const CartScreenView = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector(
    (state: CustomReducerType) => state.cart.cartItems,
  );
  const isCartEmpty = cartProducts.length === 0;
  const {navigate} = useAuthenticatedNavigation();

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const handleNavigationToCheckout = () => {
    navigate('checkout-screen');
  };
  const handleNavigationToPlp = () => {
    navigate('plp-screen');
  };
  return (
    <View>
      <ProductsList showQuantityEditor />
      {!isCartEmpty && (
        <>
          <CustomButton onPress={handleClearCart} text={'Clear cart'} />
          <CustomButton
            onPress={handleNavigationToCheckout}
            text={'Proceed to checkout'}
          />
        </>
      )}
      <CustomButton
        onPress={handleNavigationToPlp}
        text={'Continue shopping'}
      />
    </View>
  );
};
