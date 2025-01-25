import {useEffect, useState} from 'react';
import {AppState} from 'react-native';
import {setAuthToken} from './authentication-storage';
import {useDispatch} from 'react-redux';
import {clearCart} from '../slice/cart-slice';

export const useAppState = () => {
  const [currentAppState, setCurrentAppState] = useState(AppState.currentState);
  const dispatch = useDispatch();

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      nextAppState => {
        if (nextAppState === 'active' && currentAppState === 'background') {
          setAuthToken('');
        } else if (nextAppState === 'background') {
          dispatch(clearCart());
          setAuthToken('');
        }
        setCurrentAppState(nextAppState);
      },
    );
    return () => {
      appStateListener.remove();
    };
  }, []);
  return currentAppState;
};
