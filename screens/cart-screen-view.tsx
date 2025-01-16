import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../navigation/root-navigation';
import {CartReducerType, ProductsList} from '../components/products-list';
import {useDispatch, useSelector} from 'react-redux';
import {clearCart} from '../slice/cart-slice';
import React from 'react';
import {CustomButton} from '../components/button';

export const CartScreenView = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector(
    (state: CartReducerType) => state.cart.cartItems,
  );
  const isCartEmpty = cartProducts.length === 0;
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

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
      <ProductsList />
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
