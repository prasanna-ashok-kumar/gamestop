import {StyleSheet, TextInput, TextInputProps, ViewProps} from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  defaultValue: string;
  placeholderTextColor?: string;
  style?: TextInputProps;
  state?: string;
}

export const CustomTextInput = (passedProps: CustomTextInputProps) => {
  return (
    <TextInput
      style={StyleSheet.compose(rules.input, passedProps.style)}
      {...passedProps}
    />
  );
};

const rules = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0.8,
    borderRadius: 5,
    color: '#000000',
  },
});
