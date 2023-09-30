import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Navbar, TokenBalancesComponent} from '../../modules';
import colors from '../../utils/theme/colors';
import {Button} from 'react-native-paper';
import {
  CopyIcon,
  EmptyNFTIcon,
  ReceiveIcon,
  SendIcon,
} from '../../modules/Icons';
import Clipboard from '@react-native-clipboard/clipboard';

const HomeScreen = ({}) => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Tokens');
  const appStore = useSelector(state => state.reducer);

  return (
    <View>
      <Navbar />
      <View style={styles.root}>
        <View style={styles.header}>
          <Text style={styles.balanceText}>
            ${Math.floor(appStore?.activeWallet.balance)}
          </Text>
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
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            icon={() => <SendIcon />}
            onPress={() => navigation.navigate('SendTokenScreen')}
            contentStyle={styles.sendButton}
            textColor="black">
            Send
          </Button>
          <Button
            icon={() => <ReceiveIcon />}
            textColor="black"
            onPress={() => navigation.navigate('ReceiveTokenScreen')}
            contentStyle={styles.receiveButton}>
            Receive
          </Button>
        </View>
        <View style={styles.tabHeader}>
          <TouchableOpacity
            onPress={() => setActiveTab('Tokens')}
            style={
              activeTab === 'Tokens'
                ? styles.activeTabStyle
                : styles.nonActiveTabStyle
            }>
            <Text
              style={
                activeTab === 'Tokens'
                  ? styles.activeTabText
                  : styles.nonActiveTabText
              }>
              Tokens
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('NFTs')}
            style={
              activeTab === 'NFTs'
                ? styles.activeTabStyle
                : styles.nonActiveTabStyle
            }>
            <Text
              style={
                activeTab === 'NFTs'
                  ? styles.activeTabText
                  : styles.nonActiveTabText
              }>
              Transactions
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tokensNFTContainer}>
          {activeTab === 'Tokens' ? (
            <TokenBalancesComponent />
          ) : (
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <EmptyNFTIcon />
              <Text style={{color: 'white', textAlign: 'center'}}>
                No NFTs tokens found
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: colors.neutral[950],
    color: 'white',
  },
  walletAddressComponent: {
    padding: 8,
    borderRadius: 100,
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
  navbar: {
    backgroundColor: '#09090b',
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceText: {
    fontSize: 44,
    color: 'white',
    textAlign: 'left',
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  receiveButton: {
    backgroundColor: colors.white,
    color: 'black',
    borderRadius: 6,
    margin: 4,
    fontSize: 10,
  },
  sendButton: {
    backgroundColor: colors.white,
    color: 'black',
    borderRadius: 6,
    margin: 4,
    fontSize: 10,
  },
  tabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    marginVertical: 20,
    borderBottomWidth: 1,
    borderColor: colors.neutral[700],
  },
  activeTabStyle: {
    fontSize: 14,
    borderBottomColor: colors.pink[600],
    borderBottomWidth: 2,
    flex: 1,
    flexBasis: '50%',
  },
  activeTabText: {
    color: colors.pink[400],
    textAlign: 'center',
    padding: 10,
  },
  nonActiveTabText: {
    color: colors.neutral[400],
    textAlign: 'center',
    padding: 10,
  },
  nonActiveTabStyle: {
    fontSize: 14,
    flex: 1,
    flexBasis: '50%',
  },
  tokensNFTContainer: {
    paddingHorizontal: 20,
  },
});
