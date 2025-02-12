import {NavigationContainer} from '@react-navigation/native';
import {PLPScreenView} from '../screens/plp-screen-view';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PDPScreenView} from '../screens/pdp-screen-view';
import {CartScreenView} from '../screens/cart-screen-view';
import {CheckoutScreenView} from '../screens/checkout-screen-view';
import {LoginScreenView} from '../screens/login-screen-view';
import {useAppState} from '../utils/use-app-state';
import {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DummyScreen} from '../screens/dummy-screen';

export type AuthenticatedRootStackParamsList = {
  'plp-screen': undefined;
  'pdp-screen': {id: string};
  'cart-screen': undefined;
  'checkout-screen': undefined;
};

export type UnauthenticatedRootStackParamsList = {
  'login-screen': undefined;
  'dummy-screen': undefined;
  'authenticated-screen': undefined;
};
const AuthenticatedStack = createNativeStackNavigator();
const UnauthenticatedStack = createNativeStackNavigator();

const AuthenticatedNavigation = () => {
  return (
    <AuthenticatedStack.Navigator initialRouteName="plp-screen">
      <AuthenticatedStack.Screen
        name="plp-screen"
        component={PLPScreenView}
        options={{title: 'Product Listing Page', gestureEnabled: false}}
      />
      <AuthenticatedStack.Screen
        name="pdp-screen"
        component={PDPScreenView}
        options={{title: 'Product Description Page'}}
      />
      <AuthenticatedStack.Screen
        name="cart-screen"
        component={CartScreenView}
        options={{title: 'Cart Page'}}
      />
      <AuthenticatedStack.Screen
        name="checkout-screen"
        component={CheckoutScreenView}
        options={{title: 'Checkout'}}
      />
    </AuthenticatedStack.Navigator>
  );
};

const UnAuthenticatedNavigation = () => {
  return (
    <UnauthenticatedStack.Navigator initialRouteName="login-screen">
      <UnauthenticatedStack.Screen
        name="login-screen"
        component={LoginScreenView}
        options={{title: 'Login'}}
      />
      <UnauthenticatedStack.Screen
        name="dummy-screen"
        component={DummyScreen}
        options={{title: 'Dummy Screen'}}
      />
      <UnauthenticatedStack.Screen
        name="authenticated-screen"
        component={AuthenticatedNavigation}
        options={{
          headerShown: false,
        }}
      />
    </UnauthenticatedStack.Navigator>
  );
};

export const RootNavigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useAppState();
  const fetchToken = useCallback(async () => {
    const authToken = await AsyncStorage.getItem('authToken');
    setIsAuthenticated(!!authToken);
  }, []);

  useEffect(() => {
    void fetchToken();
  }, [fetchToken]);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AuthenticatedNavigation />
      ) : (
        <UnAuthenticatedNavigation />
      )}
    </NavigationContainer>
  );
};
