import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import HeaderComponent from '../Header';
import {CopyIcon, LayersIcon} from '../Icons';
import Clipboard from '@react-native-clipboard/clipboard';
import colors from '../../utils/theme/colors';

const WalletNavbar = () => {
  const navigation = useNavigation();
  const appStore = useSelector(state => state.reducer);
  return (
    <HeaderComponent>
      <View style={styles.navbar}>
        <TouchableOpacity
          onPress={() => navigation.navigate('LandingScreen')}
          style={styles.header}>
          <LayersIcon />
          <Image
            source={require('../../assets/cgpt-white-logo.png')}
            style={styles.logo}
          />
          <View style={styles.logoContainer}>
            <Text style={{fontSize: 20, color: 'white'}}>
              {appStore?.activeWallet.walletName
                ? appStore?.activeWallet?.walletName
                : 'Wallet'}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.flexContainer}>
          <TouchableOpacity
            onPress={() => {
              Clipboard.setString(appStore?.activeWallet?.walletAddress);
              Alert.alert('Wallet address copied');
            }}
            style={styles.walletAddressComponent}>
            <Text style={styles.walletAddressText}>
              {appStore.activeWallet?.walletAddress?.substring(0, 6)}...
              {appStore.activeWallet?.walletAddress?.substring(35, 42)}
            </Text>
            <CopyIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ReceiveTokenScreen')}>
            <Image
              source={require('../../assets/icons/scan-icon.png')}
              style={styles.scanLogo}
            />
          </TouchableOpacity>
        </View>
      </View>
    </HeaderComponent>
  );
};
export default WalletNavbar;

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    top: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[800],
    paddingVertical: 10,
    paddingHorizontal: 10,
    zIndex: 10,
  },
  scanLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
    objectFit: 'contain',
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 10,
    objectFit: 'contain',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletAddressComponent: {
    padding: 8,
    borderRadius: 10,
    marginHorizontal: 10,
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
});
