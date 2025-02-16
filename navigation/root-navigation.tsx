import {NavigationContainer} from '@react-navigation/native';
import {PLPScreenView} from '../screens/plp-screen-view';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PDPScreenView} from '../screens/pdp-screen-view';
import {CartScreenView} from '../screens/cart-screen-view';
import {CheckoutScreenView} from '../screens/checkout-screen-view';

export type AuthenticatedRootStackParamsList = {
  'plp-screen': undefined;
  'pdp-screen': {id: string};
  'cart-screen': undefined;
  'checkout-screen': undefined;
};

const AuthenticatedStack = createNativeStackNavigator();

export const RootNavigation = () => {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};
