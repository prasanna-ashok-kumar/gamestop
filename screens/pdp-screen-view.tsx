import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {CustomText} from '../components/text';
import {AuthenticatedRootStackParamsList} from '../navigation/root-navigation';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../slice/cart-slice';
import {CustomReducerType} from '../slice/store';
import {useAuthenticatedNavigation} from '../utils/use-navigation';
import {ProductDetailsProps} from '../types/types';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('screen');

export const PDPScreenView = () => {
  // Fetch params for id
  const {params} =
    useRoute<RouteProp<AuthenticatedRootStackParamsList, 'pdp-screen'>>();

  // Individual product info
  const [productInfo, setProductInfo] = useState<ProductDetailsProps>();

  const {navigate} = useAuthenticatedNavigation();
  const dispatch = useDispatch();
  const products = useSelector(
    (state: CustomReducerType) => state.products.productItems,
  );

  useEffect(() => {
    // Match the product based on id from route
    if (Array.isArray(products) && products.length) {
      const productDetails = (products as ProductDetailsProps[]).find(
        product => product.id.toString() === params.id,
      );
      setProductInfo(productDetails);
    }
  }, [products]);

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
          <Image
            source={{uri: productInfo?.thumbnail}}
            style={rules.productImage}
          />
          <CustomText
            text={`Name: ${productInfo.title}`}
            style={rules.productDetailsText}
          />
          <CustomText
            text={`Publisher: ${productInfo.publisher}`}
            style={rules.productDetailsText}
          />
          <CustomText
            text={`Description: ${productInfo.short_description}`}
            style={rules.productDetailsText}
          />
          <TouchableOpacity
            style={rules.variationsButton}
            onPress={handleAddToCart}>
            <CustomText text={'Add to cart'} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

// PDPScreenView.whyDidYouRender = true;

const rules = StyleSheet.create({
  pdpContainer: {
    flex: 1,
  },
  productImage: {
    height: HEIGHT * 0.5,
    width: WIDTH,
    resizeMode: 'contain',
  },
  productDetailsText: {
    marginHorizontal: 10,
    fontWeight: 'bold',
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
