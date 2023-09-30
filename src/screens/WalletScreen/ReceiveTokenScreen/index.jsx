import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Share,
  Dimensions,
} from 'react-native';
import colors from '../../../utils/theme/colors';
import QRCode from 'react-native-qrcode-svg';
import {useSelector} from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';
import {CopyIcon} from '../../../modules/Icons';
import {Button} from 'react-native-paper';
import {NormalText} from '../../../modules/UI/CustomText';
import withWalletConnectProvider from '../WalletScreensRootProvider';

const ReceiveTokenScreen = () => {
  const appStore = useSelector(state => state.reducer);

  const handleShare = () => {
    Share.share({
      title: 'Share the address to receive the token',
      message: appStore.activeWallet.walletAddress,
    })
      .then(result => {
        console.log('Shared successfully');
      })
      .catch(error => {
        console.error('Error sharing:', error.message);
      });
  };

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.qrCode}>
          {appStore.activeWallet.walletAddress && (
            <QRCode
              value={appStore.activeWallet.walletAddress}
              size={250}
              logo={require('../../../assets/logo.png')}
            />
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            Clipboard.setString(appStore.activeWallet.walletAddress);
            Alert.alert('Wallet address copied');
          }}
          style={styles.walletAddressComponent}>
          <Text style={styles.walletAddressText}>
            {appStore.activeWallet.walletAddress}
          </Text>
          <CopyIcon />
        </TouchableOpacity>
        <NormalText isCenter style={{margin: 10}}>
          Scan address to receive a payment
        </NormalText>
        <Button
          style={styles.closeButton}
          textColor="white"
          onPress={handleShare}>
          Share
        </Button>
      </View>
    </View>
  );
};
export default withWalletConnectProvider(ReceiveTokenScreen);

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.neutral[950],
    paddingTop: 50,
    height: Dimensions.get('screen').height,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    borderBottomWidth: 1,
    borderColor: colors.neutral[900],
  },
  tokenDetailContainer: {
    alignSelf: 'center',
    width: '80%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tokenDetails: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    color: 'white',
  },
  symbol: {
    color: 'white',
    fontSize: 14,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  walletAddressComponent: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 40,
    borderRadius: 10,
    backgroundColor: colors.neutral[900],
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletAddressText: {
    fontSize: 8,
    padding: 2,
    color: colors.neutral[400],
  },
  qrCode: {
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.neutral[900],
    marginHorizontal: 40,
    marginVertical: 10,
  },
  closeButton: {
    borderRadius: 4,
    margin: 40,
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: colors.neutral[400],
  },
});
