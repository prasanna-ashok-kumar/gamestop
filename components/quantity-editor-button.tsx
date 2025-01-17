import {StyleSheet, TouchableOpacity} from 'react-native';
import {CustomText} from './text';
import {addToCart, CartItemProps, removeFromCart} from '../slice/cart-slice';
import {useDispatch} from 'react-redux';

interface QuantityEditorButtonProps {
  isDecrement?: boolean;
  product: CartItemProps;
}
export const QuantityEditorButton = ({
  isDecrement = false,
  product,
}: QuantityEditorButtonProps) => {
  const dispatch = useDispatch();
  const handleQuantity = () => {
    if (isDecrement) {
      dispatch(removeFromCart(product));
    } else {
      dispatch(addToCart(product));
    }
  };
  return (
    <TouchableOpacity onPress={handleQuantity} hitSlop={10}>
      <CustomText text={isDecrement ? '-' : '+'} style={rules.text} />
    </TouchableOpacity>
  );
};

const rules = StyleSheet.create({
  text: {
    color: '#ffffff',
  },
});
