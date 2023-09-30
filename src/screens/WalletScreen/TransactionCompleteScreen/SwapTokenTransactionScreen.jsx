import React from 'react';
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../../utils/theme/colors';
import {TitleText} from '../../../modules/UI/CustomText';
import {HorizontalDividerComponent} from '../../../modules';
import {Button} from 'react-native-paper';
import {
  CopyIcon,
  InfoIcon,
  ReceiveIcon,
  SendIcon,
  TokenIcon,
  TransactionsHashIcon,
} from '../../../modules/Icons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';
import withWalletConnectProvider from '../WalletScreensRootProvider';

const txnDetails = {
  tx: '0x4a...cf',
  fromToken: {
    symbol: 'ETH',
    decimals: 18,
    amount: '0.1',
    address: '0x...5e',
  },
  toToken: {
    symbol: 'USDC',
    decimals: 6,
    amount: '100',
    address: '0x...b7',
  },
  fromAddress: '0x...1a',
  toAddress: '0x...2b',
  amount: '0.1',
  protocols: ['Uniswap', 'SushiSwap'],
  status: 'success',
  txLink: 'https://etherscan.io/tx/0x4a...cf',
};

const SwapTokenTransactionCompleteScreen = () => {
  const navigation = useNavigation();
  const appStore = useSelector(state => state.reducer);

  const network = appStore.activeWallet.network;

  const navigateToHome = () => {
    navigation.navigate('UserWalletHomeScreen');
  };

  const viewOnExplorer = () => {
    if (network === 'BNB Smart Chain (BEP20)') {
      Linking.openURL(txnDetails.txLink);
    } else if (network === 'Ethereum Mainet') {
      Linking.openURL(txnDetails.txLink);
    }
  };
  return (
    <View style={styles.root}>
      <ScrollView style={styles.transactionPreviewContainer}>
        <View style={styles.draggableIcon} />
        <View style={styles.container}>
          <Image
            source={require('../../../assets/icons/sending-cgpt-icon.png')}
            style={{
              width: 50,
              height: 50,
              alignSelf: 'center',
              marginVertical: 10,
            }}
          />
          <TitleText isCenter>Swapped</TitleText>
        </View>
        <View style={styles.transactionDetailsCard}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <View style={styles.keyValueCard}>
              <InfoIcon style={{margin: 0, marginRight: 10}} />
              <Text style={styles.confirmedText}>Status</Text>
            </View>
            <Text style={styles.valueText}>
              {txnDetails.status && 'Confirmed'}
            </Text>
          </View>
          <HorizontalDividerComponent />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <View style={styles.keyValueCard}>
              <TokenIcon style={{marginRight: 8}} />
              <Text style={styles.keyText}>Token</Text>
            </View>
            <Text style={styles.valueText}>
              {txnDetails?.fromToken.symbol?.toUpperCase()}
            </Text>
          </View>
          <HorizontalDividerComponent />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <View style={styles.keyValueCard}>
              <ReceiveIcon style={{marginRight: 8, margin: 0}} />
              <Text style={styles.keyText}>To</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(txnDetails.fromAddress);
                Alert.alert('Address copied');
              }}
              style={{flexDirection: 'row'}}>
              <Text style={styles.toAddress}>{txnDetails?.toAddress}</Text>
              <CopyIcon />
            </TouchableOpacity>
          </View>
          <HorizontalDividerComponent />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <View style={styles.keyValueCard}>
              <SendIcon style={{margin: 0, marginRight: 10}} />
              <Text style={styles.keyText}>From</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(txnDetails.toAddress);
                Alert.alert('Address copied');
              }}
              style={{flexDirection: 'row'}}>
              <Text style={styles.fromAddress}>{txnDetails.fromAddress}</Text>
              <CopyIcon />
            </TouchableOpacity>
          </View>
          <HorizontalDividerComponent />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <View style={styles.keyValueCard}>
              <TransactionsHashIcon style={{margin: 0, marginRight: 10}} />
              <Text style={styles.keyText}>Transaction Hash</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(txnDetails.tx);
                Alert.alert('Address copied');
              }}
              style={{flexDirection: 'row'}}>
              <Text style={styles.transactionHashText}>
                {txnDetails.tx?.substring(0, 40)}
              </Text>
              <CopyIcon />
            </TouchableOpacity>
          </View>
          <HorizontalDividerComponent />
        </View>
      </ScrollView>
      <View style={styles.bottomButtonContainer}>
        <Button
          onPress={viewOnExplorer}
          mode="text"
          labelStyle={styles.viewOnExplorerButton}
          buttonColor="white"
          style={styles.confirmButton}
          textColor="black">
          View on Explorer
        </Button>
        <Button
          onPress={navigateToHome}
          buttonColor="transparent"
          labelStyle={styles.okButtonContainer}
          style={styles.okButton}
          textColor="white">
          Sounds, Good!!!
        </Button>
      </View>
    </View>
  );
};
export default withWalletConnectProvider(SwapTokenTransactionCompleteScreen);

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.neutral[1000],
    flex: 1,
    color: 'white',
  },
  container: {
    padding: 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[700],
  },
  transactionPreviewContainer: {
    padding: 0,
  },
  draggableIcon: {
    width: 100,
    height: 2,
    marginVertical: 10,
    borderRadius: 100,
    backgroundColor: colors.neutral[600],
    alignSelf: 'center',
  },
  transactionDetailsCard: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  title: {
    fontSize: 18,
    color: 'white',
  },
  successIcon: {
    padding: 4,
  },
  confirmedText: {
    color: colors.neutral[400],
    alignSelf: 'center',
  },
  keyValueCard: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
    paddingBottom: 10,
  },
  valueText: {
    fontWeight: '500',
    color: 'white',
  },
  keyText: {
    color: colors.neutral[400],
    fontWeight: '400',
  },
  toAddress: {
    color: 'white',
    fontWeight: '400',
  },
  fromAddress: {
    color: 'white',
    fontWeight: '400',
  },
  transactionHashText: {
    color: 'white',
    fontWeight: '400',
  },
  confirmButton: {
    marginHorizontal: 30,
    marginVertical: 10,
    backgroundColor: colors.neutral[100],
    borderColor: colors.neutral[400],
    borderWidth: 1,
    borderRadius: 4,
  },
  viewOnExplorerButton: {
    textAlign: 'center',
    width: '100%',
    padding: 4,
    textTransform: 'uppercase',
  },
  okButtonContainer: {
    textAlign: 'center',
    padding: 4,
    textTransform: 'uppercase',
  },
  okButton: {
    marginHorizontal: 30,
    borderRadius: 4,
    borderColor: colors.neutral[400],
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    paddingVertical: 30,
    backgroundColor: colors.neutral[1000],
  },
});
