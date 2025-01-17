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
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CustomText} from '../components/text';
import {RootStackParamsList} from '../navigation/root-navigation';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../slice/cart-slice';
import {CustomReducerType} from '../slice/store';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('screen');

export interface ProductDetailsProps {
  id: string;
  name: string;
  image: string;
  type: string;
  variations: string[];
  details: string;
}

export const PDPScreenView = () => {
  // Fetch params for id
  const {params} = useRoute<RouteProp<RootStackParamsList, 'pdp-screen'>>();

  // Individual product info
  const [productInfo, setProductInfo] = useState<ProductDetailsProps>();

  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
  const dispatch = useDispatch();
  const products = useSelector(
    (state: CustomReducerType) => state.products.productItems,
  );

  // Set the chosen variant to add to cart
  const [variant, setVariant] = useState<string>();
  useEffect(() => {
    // Match the product based on id from route
    if (Array.isArray(products)) {
      const productDetails = (products as ProductDetailsProps[]).find(
        product => product.id === params.id,
      );
      setProductInfo(productDetails);
      setVariant(productDetails?.variations[0]);
    }
  }, [products]);

  const isVariationsEmpty =
    Array.isArray(productInfo?.variations) && !productInfo?.variations.length;

  const handleVariation = (variation: string) => {
    setVariant(variation);
  };
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: productInfo?.id,
        name: productInfo?.name,
        variant: variant,
      }),
    );
    navigate('cart-screen');
  };

  return (
    <>
      {productInfo && (
        <View style={rules.pdpContainer}>
          <Image
            source={{uri: productInfo?.image}}
            style={rules.productImage}
          />
          <CustomText
            text={`Name: ${productInfo.name}`}
            style={rules.productDetailsText}
          />
          <CustomText
            text={`Type: ${productInfo.type}`}
            style={rules.productDetailsText}
          />
          <CustomText text={'Variations:'} style={rules.productDetailsText} />
          <View style={rules.variations}>
            {!isVariationsEmpty &&
              productInfo.variations.map((variation: string, index: number) => {
                const isSelected = variant === variation;
                return (
                  <TouchableOpacity
                    onPress={() => handleVariation(variation)}
                    style={
                      isSelected
                        ? StyleSheet.compose(
                            rules.variationsButton,
                            rules.variationsButtonSelected,
                          )
                        : rules.variationsButton
                    }
                    key={index}>
                    <CustomText
                      text={variation}
                      style={isSelected ? rules.variationsButtonText : {}}
                    />
                  </TouchableOpacity>
                );
              })}
          </View>
          <CustomText
            text={`Description: ${productInfo.details}`}
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
