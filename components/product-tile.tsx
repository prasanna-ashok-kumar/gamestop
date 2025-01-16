import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {CustomText} from './text';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../navigation/root-navigation';
import {useDispatch} from 'react-redux';
import {addToCart} from '../slice/cart-slice';
import {CustomButton} from './button';

interface ProductTileProps {
  id: string;
  name: string;
  image: string;
  variations: string[];
}

export const ProductTile = ({
  productDetails,
}: {
  productDetails: ProductTileProps;
}) => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
  const {id, name, image: imageUrl, variations} = productDetails;
  const dispatch = useDispatch();

  const handleNavigationToPdp = () => {
    navigate('pdp-screen', {id});
  };

  const handleAddToCart = () => {
    dispatch(addToCart({id, name, quantity: 1, variant: variations[0]}));
    navigate('cart-screen');
  };

  return (
    <Pressable style={rules.tileContainer} onPress={handleNavigationToPdp}>
      <Image source={{uri: imageUrl}} style={rules.productImage} />
      <CustomText text={name} />
      <CustomButton onPress={handleAddToCart} text="Add to cart" />
    </Pressable>
  );
};

const rules = StyleSheet.create({
  tileContainer: {
    borderWidth: 1,
    borderColor: '#00000',
    margin: 10,
    height: 310,
    justifyContent: 'flex-start',
  },
  productImage: {
    width: 150,
    height: 200,
    resizeMode: 'contain',
  },
});
