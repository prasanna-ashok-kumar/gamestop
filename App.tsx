import React from 'react';
import {RootNavigation} from './navigation/root-navigation';
import {store} from './slice/store';
import {Provider} from 'react-redux';
import {QueryClientProvider, QueryClient} from 'react-query';

const queryClient = new QueryClient();
function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
