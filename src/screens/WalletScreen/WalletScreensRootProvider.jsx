/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import BottomDrawer from '../../modules/UI/BottomDrawer';
import {WalletConnectModal} from '@walletconnect/modal-react-native';
import {WALLET_CONNECT_PROJECT_ID, providerMetadata} from '../../constants';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';
import {useSelector, useDispatch} from 'react-redux';
import {NormalText} from '../../modules/UI/CustomText';
import {Button} from 'react-native-paper';
import {addActiveNetwork, addActiveWallet} from '../../redux/slice';
import {getNetworkChainName} from '../../packages/hooks';
import colors from '../../utils/theme/colors';
import LinearGradient from 'react-native-linear-gradient';

const WalletScreensRootProvider = ({children}) => {
  const appStore = useSelector(state => state.reducer);
  const bottomDrawerRef = React.useRef();
  const {isConnected, open, provider} = useWalletConnectModal();
  const dispatch = useDispatch();
  const {isWalletConnectConnected, showWalletConnectProvider, activeWallet} =
    appStore;

  const {privateKey} = activeWallet;

  const getWalletConnectedProvider = () => {
    if (!provider) {
      open();
    } else {
      provider?.on('accountsChanged', info => {
        dispatch(
          addActiveWallet({
            network: '',
            walletAddress: info[0],
            balance: 0,
            privateKey: false,
            walletName: appStore.activeWallet.walletName,
          }),
        );
      });
      provider?.on('chainChanged', info => {
        const chainName = getNetworkChainName(info);
        dispatch(addActiveNetwork(chainName));
      });
    }
  };

  React.useEffect(() => {
    if (!provider && !isConnected && typeof privateKey !== 'string') {
      bottomDrawerRef.current.open();
    } else {
      bottomDrawerRef.current.close();
    }
  }, []);

  return (
    <View>
      {children}
      <BottomDrawer
        ref={bottomDrawerRef}
        borderColor
        customHeight={Dimensions.get('screen').height * 0.3}>
        <View style={{padding: 20}}>
          <NormalText isCenter>Sync with Wallet Connect</NormalText>
          <View style={{height: 20}} />
          <LinearGradient
            colors={[
              '#27F3D1',
              '#F8CF3E',
              '#509ADD',
              '#2EF2CD',
              '#6C5AE6',
              '#509ADD',
            ]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={[styles.connectButtonStyle, {margin: 10}]}>
            <Button
              onPress={getWalletConnectedProvider}
              mode="text"
              buttonColor={colors.neutral[800]}
              textColor="white"
              labelStyle={{
                padding: 4,
                textTransform: 'uppercase',
              }}
              style={styles.connectButtonLabelStyle}>
              Sync with Wallet Connect
            </Button>
          </LinearGradient>
          {!isConnected && !privateKey && (
            <WalletConnectModal
              projectId={WALLET_CONNECT_PROJECT_ID}
              providerMetadata={providerMetadata}
              themeMode="dark"
            />
          )}
        </View>
      </BottomDrawer>
    </View>
  );
};

const withWalletConnectProvider = Component => {
  const WrappedComponent = props => {
    return (
      <WalletScreensRootProvider>
        <Component {...props} />
      </WalletScreensRootProvider>
    );
  };

  return WrappedComponent;
};

export default withWalletConnectProvider;

const styles = StyleSheet.create({
  connectButtonStyle: {
    borderRadius: 4,
    borderWidth: 1,
    margin: 1,
  },
  connectButtonLabelStyle: {
    margin: 1,
    color: 'white',
    borderRadius: 4,
    backgroundColor: colors.neutral[1000],
  },
});
