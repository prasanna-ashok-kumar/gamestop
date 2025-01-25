import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAuthToken = (token: string) => {
  return AsyncStorage.setItem('authToken', token);
};
