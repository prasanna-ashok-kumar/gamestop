import {FlatList, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import React, {useCallback} from 'react';
import {CustomText} from './text';
import {CustomReducerType} from '../slice/store';

export const ProductsList = () => {
  const cartProducts = useSelector(
    (state: CustomReducerType) => state.cart.cartItems,
  );
  const itemSeparatorComponent = useCallback(
    () => <View style={rules.separator} />,
    [],
  );
  return (
    <View style={rules.cartContainer}>
      {!cartProducts.length ? (
        <CustomText
          text={'No products in cart, click on Continue shopping'}
          style={rules.text}
        />
      ) : (
        <FlatList
          data={cartProducts}
          keyExtractor={item => `${item.id}-${item.variant}`}
          renderItem={({item}) => {
            return (
              <View style={rules.cartItemsContainer}>
                <CustomText text={item.name} style={rules.text} />
                <CustomText text={item.variant} style={rules.text} />
                <CustomText text={item.quantity} style={rules.text} />
              </View>
            );
          }}
          ItemSeparatorComponent={itemSeparatorComponent}
          contentContainerStyle={{paddingBottom: 20}}
        />
      )}
    </View>
  );
};

const rules = StyleSheet.create({
  cartContainer: {
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#000000',
    shadowRadius: 5,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.05,
    margin: 10,
  },
  cartItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  separator: {
    borderWidth: 0.2,
    width: 300,
    marginHorizontal: 'auto',
    borderColor: '#ffffff',
  },
  text: {color: '#ffffff', marginHorizontal: 2},
});
