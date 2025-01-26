import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {CustomText} from './text';
import React from 'react';

interface CustomButtonProps {
  onPress: () => void;
  text: string;
  style?: StyleProp<ViewStyle>;
  enabled?: boolean;
  textStyle?: StyleProp<TextStyle>;
}

export const CustomButton = React.memo(
  ({onPress, text, style, enabled = true, textStyle}: CustomButtonProps) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={StyleSheet.compose(rules.button, style)}
        disabled={!enabled}>
        <CustomText
          text={text}
          style={StyleSheet.compose(rules.buttonText, textStyle)}
        />
      </TouchableOpacity>
    );
  },
);

const rules = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: '#2574BB',
    backgroundColor: '#2574BB',
    marginHorizontal: 'auto',
    marginVertical: 10,
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
  },
});
