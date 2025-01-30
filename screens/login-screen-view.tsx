import React, {useState} from 'react';
import {CustomTextInput} from '../components/text-input';
import {CustomButton} from '../components/button';
import {setAuthToken} from '../utils/authentication-storage';
import {useUnauthenticatedNavigation} from '../utils/use-navigation';
import {CommonActions} from '@react-navigation/native';

interface LoginDetails {
  email: string;
  password: string;
}

const defaultLoginDetails = {
  email: '',
  password: '',
};

export const LoginScreenView = () => {
  const [loginDetails, setLoginDetails] =
    useState<LoginDetails>(defaultLoginDetails);
  const {dispatch, navigate} = useUnauthenticatedNavigation();

  const handleLoginInput = (key: string, value: string) => {
    setLoginDetails({
      ...loginDetails,
      [key]: value,
    });
  };

  const handleLoginButtonPress = async () => {
    await setAuthToken('Logged In');
    dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'authenticated-screen',
          },
        ],
      }),
    );
    // navigate('authenticated-screen', {screen: 'cart-screen'});
    // dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [
    //       {
    //         name: 'authenticated-screen',
    //         state: {
    //           routes: [
    //             {
    //               name: 'cart-screen',
    //             },
    //           ],
    //         },
    //       },
    //     ],
    //   }),
    // );
  };

  return (
    <>
      <CustomTextInput
        value={loginDetails.email}
        defaultValue=""
        placeholder="Enter the email address.."
        onChangeText={text => handleLoginInput('email', text)}
      />
      <CustomTextInput
        value={loginDetails.password}
        defaultValue=""
        placeholder="Enter the password"
        onChangeText={text => handleLoginInput('password', text)}
        secureTextEntry
      />
      <CustomButton text="LOGIN" onPress={handleLoginButtonPress} />
    </>
  );
};
