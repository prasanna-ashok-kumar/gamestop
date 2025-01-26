import React, {useCallback, useState} from 'react';
import {CustomText} from '../components/text';
import {DummyChild} from '../components/dummy-child';
import {CustomButton} from '../components/button';
import {StyleSheet} from 'react-native';

export const DummyScreen = () => {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleLoading = useCallback(() => {
    setIsLoading(prevLoading => !prevLoading);
  }, []);
  const handleCount = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);
  return (
    <>
      <CustomText text={isLoading ? 'true' : 'false'} style={rules.text} />
      <CustomButton text="Toggle loading" onPress={handleLoading} />
      <DummyChild count={count} handleCount={handleCount} />
    </>
  );
};

const rules = StyleSheet.create({
  text: {
    marginHorizontal: 'auto',
    fontSize: 20,
  },
});

DummyScreen.whyDidYouRender = true;
