import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {NormalText} from '../../../modules/UI/CustomText';
import TransakWebView from '@transak/react-native-sdk';
import {TRANSAK_API_KEY} from '@env';
import {BackIcon} from '../../../modules/Icons';
import {getBuyTokensProviderNetworkName} from '../../../packages/hooks';
import {useSelector} from 'react-redux';

const TransakProvider = ({closeProviderDrawer, tokenDetails}) => {
  const {name, id, symbol, amount} = tokenDetails;
  const {activeNetwork} = useSelector(state => state.reducer);
  const network = getBuyTokensProviderNetworkName(activeNetwork);

  console.log(symbol);
  const onTransakEventHandler = (event, data) => {
    switch (event) {
      case 'ORDER_PROCESSING':
        console.log(data, 'order processing');
        break;

      case 'ORDER_COMPLETED':
        console.log(data, 'order completed');
        break;

      default:
        console.log(data);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity onPress={closeProviderDrawer}>
          <BackIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={closeProviderDrawer}>
          <NormalText>Cancel</NormalText>
        </TouchableOpacity>
      </View>
      <TransakWebView
        queryParams={{
          apiKey: TRANSAK_API_KEY,
          environment: 'PRODUCTION',
          network,
          cryptoAmount: amount,
          defaultCryptoCurrency: 'DAI',
        }}
        defaultCryptoCurrency={'DAI'}
        onTransakEventHandler={onTransakEventHandler}
        style={styles.root}
      />
    </View>
  );
};
export default TransakProvider;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
});
