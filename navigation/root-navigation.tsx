import {NavigationContainer} from '@react-navigation/native';
import {PLPScreenView} from '../screens/plp-screen-view';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PDPScreenView} from '../screens/pdp-screen-view';
import {CartScreenView} from '../screens/cart-screen-view';
import {CheckoutScreenView} from '../screens/checkout-screen-view';

export type RootStackParamsList = {
  'plp-screen': undefined;
  'pdp-screen': {id: string};
  'cart-screen': undefined;
  'checkout-screen': undefined;
};
const Stack = createNativeStackNavigator();

export const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="plp-screen">
        <Stack.Screen
          name="plp-screen"
          component={PLPScreenView}
          options={{title: 'Product Listing Page'}}
        />
        <Stack.Screen
          name="pdp-screen"
          component={PDPScreenView}
          options={{title: 'Product Description Page'}}
        />
        <Stack.Screen
          name="cart-screen"
          component={CartScreenView}
          options={{title: 'Cart Page'}}
        />
        <Stack.Screen
          name="checkout-screen"
          component={CheckoutScreenView}
          options={{title: 'Checkout'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
