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
import products from '../data/products.json';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CustomText} from '../components/text';
import {RootStackParamsList} from '../navigation/root-navigation';
import {useDispatch} from 'react-redux';
import {addToCart} from '../slice/cart-slice';

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
  const {params} = useRoute<RouteProp<RootStackParamsList, 'pdp-screen'>>();
  const [productInfo, setProductInfo] = useState<ProductDetailsProps>();
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
  const dispatch = useDispatch();
  const [variant, setVariant] = useState<string>(
    productInfo?.variations[0] as string,
  );
  useEffect(() => {
    const productDetails = products.find(product => product.id === params.id);
    setProductInfo(productDetails);
  }, []);
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
