import {StyleSheet, Text, TextStyle} from 'react-native';

export const CustomText = ({
  text,
  style,
  ...props
}: {
  text: string;
  style?: TextStyle;
}) => {
  return (
    <Text style={StyleSheet.compose(rules.content, style)} {...props}>
      {text}
    </Text>
  );
};

const rules = StyleSheet.create({
  content: {
    color: '#000000',
    marginHorizontal: 'auto',
    marginVertical: 10,
  },
});
