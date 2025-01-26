import {Image, Pressable, StyleSheet} from 'react-native';
import {CustomText} from './text';
import {useDispatch} from 'react-redux';
import {addToCart} from '../slice/cart-slice';
import {CustomButton} from './button';
import {useAuthenticatedNavigation} from '../utils/use-navigation';
import {ProductDetailsProps} from '../types/types';
import {useCallback} from 'react';

export const ProductTile = ({
  productDetails,
}: {
  productDetails: ProductDetailsProps;
}) => {
  const {navigate} = useAuthenticatedNavigation();
  const {id, title, thumbnail, publisher} = productDetails;
  const dispatch = useDispatch();

  const handleNavigationToPdp = () => {
    navigate('pdp-screen', {id: id.toString()});
  };

  const handleAddToCart = useCallback(() => {
    dispatch(addToCart({id, title, quantity: 1}));
    navigate('cart-screen');
  }, []);

  return (
    <Pressable style={rules.tileContainer} onPress={handleNavigationToPdp}>
      <Image source={{uri: thumbnail}} style={rules.productImage} />
      <CustomText text={title} style={rules.titleText} />
      <CustomText text={publisher} style={{fontSize: 16}} />
      <CustomButton
        onPress={handleAddToCart}
        text="ADD TO CART"
        style={rules.buttonStyle}
        textStyle={rules.buttonTextStyle}
      />
    </Pressable>
  );
};

ProductTile.whyDidYouRender = true;

const rules = StyleSheet.create({
  tileContainer: {
    width: '48%',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 10,
  },
  titleText: {marginVertical: 0, fontSize: 20},
  buttonStyle: {marginVertical: 5, backgroundColor: '#2574BB'},
  buttonTextStyle: {color: '#ffffff'},
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    flex: 1,
    resizeMode: 'cover',
  },
});
