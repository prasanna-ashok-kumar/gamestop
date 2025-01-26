import React, {useCallback, useState} from 'react';
import {CustomText} from '../components/text';
import {DummyChild} from '../components/dummy-child';
import {CustomButton} from '../components/button';

export const DummyScreen = () => {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleLoading = () => {
    setIsLoading(prevLoading => !prevLoading);
  };
  const handleCount = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  return (
    <>
      <CustomText text={isLoading ? 'true' : 'false'} />
      <CustomButton text="Toggle loading" onPress={handleLoading} />
      <DummyChild count={count} handleCount={handleCount} />
    </>
  );
};

DummyScreen.whyDidYouRender = true;
