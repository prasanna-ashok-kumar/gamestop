import React from 'react';
import {RootNavigation} from './navigation/root-navigation';
import {store} from './slice/store';
import {Provider} from 'react-redux';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}

export default App;
