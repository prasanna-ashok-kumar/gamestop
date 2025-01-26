import React from 'react';
import {CustomButton} from './button';
import {CustomText} from './text';
import {StyleSheet} from 'react-native';

interface DummyChildProps {
  count: number;
  handleCount: () => void;
}

export const DummyChild = React.memo(
  ({count, handleCount}: DummyChildProps) => {
    return (
      <>
        <CustomText text={count} style={rules.text} />
        <CustomButton text="Increment count" onPress={handleCount} />
      </>
    );
  },
);

const rules = StyleSheet.create({
  text: {
    marginHorizontal: 'auto',
    fontSize: 20,
  },
});
