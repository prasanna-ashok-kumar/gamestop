import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CustomReducerType} from '../slice/store';
import {CustomButton} from '../components/button';
import {
  addToCart,
  CartItemProps,
  clearCart,
  removeFromCart,
} from '../slice/cart-slice';
import {useAuthenticatedNavigation} from '../utils/use-navigation';
import {CustomText} from '../components/text';

export const CartScreenView = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector(
    (state: CustomReducerType) => state.cart.cartItems,
  );
  const isCartEmpty = cartProducts.length === 0;

  const handleQuantity = (isDecrement: boolean, product: CartItemProps) => {
    if (isDecrement) {
      dispatch(removeFromCart(product));
    } else {
      dispatch(addToCart(product));
    }
  };
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

  const renderCartItem = (product: CartItemProps) => (
    <View style={rules.cartItem}>
      <Text style={rules.itemName}>{product.title}</Text>
      <View style={rules.quantityWrapper}>
        <TouchableOpacity
          onPress={() => handleQuantity(true, product)}
          style={rules.quantityButton}>
          <Text style={rules.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={rules.quantity}>{product.quantity}</Text>
        <TouchableOpacity
          onPress={() => handleQuantity(false, product)}
          style={rules.quantityButton}>
          <Text style={rules.quantityText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const listFooterComponent = useCallback(
    () => (
      <>
        <CustomButton onPress={handleClearCart} text={'CLEAR CART'} />
        <CustomButton
          onPress={handleNavigationToCheckout}
          text={'PROCEED TO CHECKOUT'}
        />
        <CustomButton
          onPress={handleNavigationToPlp}
          text={'CONTINUE SHOPPING'}
        />
      </>
    ),
    [],
  );

  return (
    <View style={rules.container}>
      {!isCartEmpty && (
        <>
          <FlatList
            data={cartProducts}
            renderItem={({item}) => renderCartItem(item)}
            keyExtractor={item => item.id}
            ListFooterComponent={listFooterComponent}
          />
        </>
      )}
      {isCartEmpty && (
        <>
          <CustomText
            text={'No products in cart, click on Continue shopping'}
            style={rules.cartEmptyText}
          />
          <CustomButton
            onPress={handleNavigationToPlp}
            text={'CONTINUE SHOPPING'}
          />
        </>
      )}
    </View>
  );
};

const rules = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  cartEmptyText: {
    fontSize: 20,
  },
  cartItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#2574BB',
    padding: 10,
    borderRadius: 5,
  },
  quantityText: {
    color: '#fff',
    fontSize: 18,
  },
  quantity: {
    fontSize: 18,
    width: 40,
    textAlign: 'center',
  },
});
