import React from 'react';
import {View, Text} from 'react-native';
import withWalletConnectProvider from '../WalletScreensRootProvider';

const WalletSettingScreen = () => {
  return (
    <View>
      <Text>Today</Text>
    </View>
  );
};
export default withWalletConnectProvider(WalletSettingScreen);
