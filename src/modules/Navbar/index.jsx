import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {CameraIcon, WalletIcon} from '../Icons';
import UserAvatar from '../UI/UserAvatar';
import colors from '../../utils/theme/colors';

const Navbar = ({}) => {
  const navigation = useNavigation();
  const data = useSelector(state => state.reducer);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        onPress={() => navigation.navigate('WalletScreen')}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <WalletIcon />
        <Text style={styles.signature}>Wallets</Text>
      </TouchableOpacity>
      <Text style={styles.addressText}>
        {data.activeWallet?.walletAddress?.substring(0, 6)}...
        {data.activeWallet?.walletAddress?.substring(35, 42)}
      </Text>
      <TouchableOpacity onPress={() => setIsCameraOpen(true)}>
        <CameraIcon />
      </TouchableOpacity>
    </View>
  );
};
export default Navbar;

const styles = StyleSheet.create({
  root: {
    width: Dimensions.get('screen').width,
    backgroundColor: colors.neutral[950],
  },
  navbar: {
    backgroundColor: '#09090b',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 0,
    borderBottomColor: colors.neutral[900],
    borderWidth: 1,
  },
  signature: {
    fontSize: 14,
    color: colors.neutral[300],
    alignSelf: 'center',
  },
  date: {
    color: 'white',
    marginHorizontal: 10,
  },
  symbol: {
    color: 'white',
    marginRight: 20,
  },
  coinName: {
    color: 'white',
  },
  text: {
    color: 'white',
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  price: {
    color: 'white',
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'right',
  },
  header: {
    padding: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#27272a',
    borderBottomWidth: 1,
  },
  increasePrecentageChange: {
    color: '#86efac',
    textAlign: 'right',
    fontSize: 10,
  },
  decreasePrecentageChange: {
    color: '#fda4af',
    textAlign: 'right',
    fontSize: 10,
  },
  addressText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '300',
  },
  balanceText: {
    fontSize: 24,
    color: 'white',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginHorizontal: 10,
  },
  coinCardContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: '#27272a',
    borderWidth: 1,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  postCard: {
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 10,
  },
  postTitle: {
    color: 'white',
    fontWeight: '500',
  },
  subtitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: '300',
  },
  modalContainerStyle: {
    backgroundColor: 'white',
    padding: 20,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'scroll',
  },
});
