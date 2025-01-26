import {StyleProp, StyleSheet, Text, TextProps, TextStyle} from 'react-native';

interface CustomTextProps extends TextProps {
  text: string | number;
  style?: StyleProp<TextStyle>;
}

export const CustomText = ({text, style, ...props}: CustomTextProps) => {
  return (
    <Text style={StyleSheet.compose(rules.content, style)} {...props}>
      {text}
    </Text>
  );
};

const rules = StyleSheet.create({
  content: {
    color: '#000000',
    marginVertical: 10,
  },
});
