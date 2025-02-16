import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomText} from '../components/text';
import {AuthenticatedRootStackParamsList} from '../navigation/root-navigation';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../slice/cart-slice';
import {CustomReducerType} from '../slice/store';
import {useAuthenticatedNavigation} from '../utils/use-navigation';
import {ProductDetailsProps} from '../types/types';
import FastImage from 'react-native-fast-image';
import {CustomButton} from '../components/button';

export const PDPScreenView = () => {
  // Fetch params for id
  const {
    params: {id: productId},
  } = useRoute<RouteProp<AuthenticatedRootStackParamsList, 'pdp-screen'>>();

  const {navigate} = useAuthenticatedNavigation();
  const dispatch = useDispatch();

  const productInfo = useSelector((state: CustomReducerType) =>
    state.products.productItems.find(
      (product: ProductDetailsProps) => product.id.toString() === productId,
    ),
  );

  const {
    thumbnail,
    title,
    publisher,
    short_description,
    genre,
    platform,
    developer,
    release_date,
  } = productInfo;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: productInfo?.id,
        title: productInfo?.title,
      }),
    );
    navigate('cart-screen');
  };
  return (
    <>
      {productInfo && (
        <View style={rules.pdpContainer}>
          <FastImage
            source={{
              uri: thumbnail,
              priority: FastImage.priority.high,
            }}
            style={rules.productImage}
          />
          <CustomText
            text={`NAME: ${title}`}
            style={rules.productDetailsText}
          />
          <CustomText
            text={`PUBLISHER: ${publisher}`}
            style={rules.productDetailsText}
          />
          <CustomText
            text={`GENRE: ${genre}`}
            style={rules.productDetailsText}
          />
          <CustomText
            text={`PLATFORM: ${platform}`}
            style={rules.productDetailsText}
          />
          <CustomText
            text={`DEVELOPER: ${developer}`}
            style={rules.productDetailsText}
          />
          <CustomText
            text={`RELEASE DATE: ${release_date}`}
            style={rules.productDetailsText}
          />
          <CustomText
            text={`DESCRIPTION: ${short_description}`}
            style={rules.productDetailsText}
          />
          <CustomButton text="ADD TO CART" onPress={handleAddToCart} />
        </View>
      )}
    </>
  );
};

// PDPScreenView.whyDidYouRender = true;

const rules = StyleSheet.create({
  pdpContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginVertical: 16,
  },
  productDetailsText: {
    marginHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  variations: {
    flexDirection: 'row',
    marginHorizontal: 'auto',
  },
  variationsButton: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 5,
    marginHorizontal: 5,
  },
  variationsButtonSelected: {
    backgroundColor: '#000000',
  },
  variationsButtonText: {
    color: '#ffffff',
  },
});
