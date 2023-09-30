import React from 'react';
import {Text} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {QueryClient, QueryClientProvider} from 'react-query';
import {persistor, store} from './src/redux/store';
import moralis from 'moralis';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider as ReduxProvider} from 'react-redux';

const RootProvider = ({children}) => {
  const startMoralis = async () => {
    moralis.start({
      apiKey:
        'lVmHamY3EEGCcSNED3LAsGz4usvKO8xsZnmt1iNftVjLqYaQ5pfI1univ8fI0FPc',
    });
  };

  React.useEffect(() => {
    startMoralis();
  }, []);
  const queryClient = new QueryClient();

  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          <PersistGate persistor={persistor} loading={<Text>...</Text>}>
            {children}
          </PersistGate>
        </ReduxProvider>
      </QueryClientProvider>
    </PaperProvider>
  );
};
export default RootProvider;
