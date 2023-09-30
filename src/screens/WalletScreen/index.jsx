import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {LayersIcon} from '../../modules/Icons';
import {useNavigation} from '@react-navigation/native';
import {HeaderComponent} from '../../modules';
import colors from '../../utils/theme/colors';
import EmptyWalletComponent from './EmptyWalletComponent';

const WalletScreen = () => {
  const [visible, setVisible] = useState({
    show: false,
    label: '',
  });
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <HeaderComponent>
        <TouchableOpacity
          style={styles.navbar}
          onPress={() => navigation.navigate('LandingScreen')}>
          <LayersIcon />
          <Image
            source={require('../../assets/cgpt-white-logo.png')}
            style={styles.logo}
          />
          <TouchableOpacity style={styles.logoContainer}>
            <Text style={{fontSize: 20, color: 'white'}}>Wallet</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </HeaderComponent>
      <EmptyWalletComponent visible={visible} setVisible={setVisible} />
    </View>
  );
};
export default WalletScreen;

const styles = StyleSheet.create({
  root: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    color: 'white',
    position: 'relative',
    backgroundColor: colors.neutral[950],
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
  },
  body: {
    position: 'relative',
    marginVertical: 80,
  },
  userAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userProfile: {
    width: 30,
    height: 30,
    marginLeft: 10,
    borderRadius: 4,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[800],
    paddingVertical: 16,
    paddingHorizontal: 10,
    zIndex: 10,
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
  networkDialog: {
    backgroundColor: colors.neutral[950],
    borderColor: colors.neutral[900],
    borderWidth: 1,
    borderRadius: 20,
  },
  dialogContent: {
    color: 'white',
  },
  centerLogo: {
    width: 100,
    height: 100,
    borderRadius: 4,
    alignSelf: 'center',
    margin: 20,
  },
  heading: {
    color: 'white',
    textAlign: 'center',
    fontSize: 10,
    margin: 4,
    fontWeight: '700',
  },
  navbarButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#09090b',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[900],
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  networkChip: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.neutral[600],
  },
  networkChipText: {
    color: 'white',
    fontSize: 12,
  },
  titleText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 14,
    color: 'white',
  },
  priceText: {
    fontWeight: '500',
    color: 'white',
  },
  addressText: {
    color: '#3b82f6',
    fontSize: 10,
    fontWeight: '300',
  },
  balanceText: {
    fontSize: 14,
    color: 'white',
  },
  walletContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.neutral[900],
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 6,
  },
  totalBalanceText: {
    fontSize: 44,
    color: 'white',
    textAlign: 'left',
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  dollarBalance: {
    fontSize: 20,
    color: 'white',
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  date: {
    color: 'white',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginHorizontal: 10,
  },
  inputContent: {
    color: 'white',
    borderWidth: 0,
  },
  walletNameInput: {
    width: '100%',
    backgroundColor: colors.neutral[900],
    borderWidth: 0,
    marginVertical: 10,
  },
  balanceContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    display: 'flex',
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[900],
  },
  buttonContainer: {
    padding: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
  },
  activeWalletIndicator: {
    width: 6,
    height: 6,
    backgroundColor: colors.green[600],
    padding: 5,
    borderRadius: 100,
    marginHorizontal: 10,
  },
  inActiveWalletIndicator: {
    width: 6,
    height: 6,
    backgroundColor: colors.neutral[800],
    padding: 5,
    borderRadius: 100,
    marginHorizontal: 10,
  },
});
