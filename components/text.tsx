import {StyleProp, StyleSheet, Text, TextProps, TextStyle} from 'react-native';

export const CustomText = ({
  text,
  style,
}: {
  text: string;
  style?: TextStyle;
}) => {
  return <Text style={StyleSheet.compose(rules.content, style)}>{text}</Text>;
};

const rules = StyleSheet.create({
  content: {
    color: '#000000',
    marginHorizontal: 'auto',
    marginVertical: 10,
  },
});
