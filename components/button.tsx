import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {CustomText} from './text';

interface CustomButtonProps {
  onPress: () => void;
  text: string;
  style?: StyleProp<ViewStyle>;
  enabled?: boolean;
}

export const CustomButton = ({
  onPress,
  text,
  style,
  enabled = true,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={StyleSheet.compose(rules.button, style)}
      disabled={!enabled}>
      <CustomText text={text} />
    </TouchableOpacity>
  );
};

const rules = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: '#000000',
    marginHorizontal: 'auto',
    marginVertical: 10,
    padding: 5,
    borderRadius: 5,
  },
});
