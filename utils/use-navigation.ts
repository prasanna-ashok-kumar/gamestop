import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  AuthenticatedRootStackParamsList,
  UnauthenticatedRootStackParamsList,
} from '../navigation/root-navigation';
import {useNavigation} from '@react-navigation/native';

export const useAuthenticatedNavigation = () => {
  return useNavigation<
    NativeStackNavigationProp<AuthenticatedRootStackParamsList>
  >();
};

export const useUnauthenticatedNavigation = () => {
  return useNavigation<
    NativeStackNavigationProp<UnauthenticatedRootStackParamsList>
  >();
};
