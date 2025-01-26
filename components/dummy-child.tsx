import React from 'react';
import {CustomButton} from './button';
import {CustomText} from './text';

interface DummyChildProps {
  count: number;
  handleCount: () => void;
}

export const DummyChild = React.memo(
  ({count, handleCount}: DummyChildProps) => {
    return (
      <>
        <CustomText text={count} />
        <CustomButton text="Increment count" onPress={handleCount} />
      </>
    );
  },
);
