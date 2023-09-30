/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {batch, useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  SkeletonLoadingComponent,
  TokenBalancesComponent,
  WalletNavbar,
} from '../../../modules';
import colors from '../../../utils/theme/colors';
import {Menu} from 'react-native-paper';
import {
  ArrowDownIcon,
  BuyIcon,
  EmptyNFTIcon,
  ReceiveIcon,
  SendIcon,
  SwapIcon,
} from '../../../modules/Icons';
import {
  addActiveNetwork,
  addActiveWallet,
  toggleWalletConnectStatus,
} from '../../../redux/slice';
import SeedPhraseScreens from '../SeedPhraseScreens';
import {HeadingText} from '../../../modules/UI/CustomText';
import {useQuery} from 'react-query';
import {getWalletBalance} from '../../../packages/apis/web3/walletApi';
import {getNetworkDefaultTokenDetails} from '../../../packages/hooks';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';
import withWalletConnectProvider from '../WalletScreensRootProvider';
import BottomDrawer from '../../../modules/UI/BottomDrawer';
import BuyTokenScreen from '../BuyTokenScreen';

const UserWalletHomeScreen = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const buyTokenScreenRef = React.useRef();
  const {isConnected, address: providerWalletAddress} = useWalletConnectModal();
  const [activeTab, setActiveTab] = useState('Tokens');
  const appStore = useSelector(state => state.reducer);
  const [activeNetwork, setActiveNetwork] = useState(appStore?.activeNetwork);
  const {activeWallet, totalBalance} = appStore;
  const {network, walletAddress} = activeWallet;
  const {tokenName} = getNetworkDefaultTokenDetails(activeNetwork);

  const {data: walletBalance, isLoading} = useQuery(
    ['walletBalance', activeNetwork],
    async () => {
      const data = await getWalletBalance(walletAddress, activeNetwork);
      return data;
    },
  );

  const [showNetworkOptions, setShowNetworkOptions] = useState(false);

  const changeNetwork = name => {
    setActiveNetwork(name);
    setShowNetworkOptions(false);
    dispatch(addActiveNetwork(name));
  };

  React.useEffect(() => {
    if (isConnected && !appStore.activeWallet.walletAddress) {
      batch(() => {
        dispatch(
          addActiveWallet({
            network: activeNetwork,
            balance: 0,
            walletAddress: providerWalletAddress,
            privateKey: false,
          }),
        );
        dispatch(toggleWalletConnectStatus(true));
      });
    }
  }, [isConnected]);

  return (
    <View style={styles.root}>
      <WalletNavbar />
      <View style={styles.container}>
        <View style={styles.balanceContainer}>
          <View>
            <View style={styles.balanceTextContainer}>
              <Text style={styles.balanceText}>
                ${totalBalance > 0 ? Number(totalBalance).toFixed(4) : 0}
              </Text>
              <Image
                source={require('../../../assets/icons/up-arrow-icon.png')}
              />
            </View>
            <Menu
              visible={showNetworkOptions}
              onDimiss={() => setShowNetworkOptions(false)}
              contentStyle={{marginTop: 50, marginLeft: 10, padding: -10}}
              anchorPosition="top"
              anchor={
                <TouchableOpacity
                  onPress={() => setShowNetworkOptions(!showNetworkOptions)}
                  style={styles.menuAnchor}>
                  <Text style={{flex: 1, color: 'white', fontSize: 10}}>
                    {activeNetwork === 'BNB Smart Chain (BEP20)'
                      ? 'BNB Smart Chain'
                      : activeNetwork}
                  </Text>
                  <ArrowDownIcon />
                </TouchableOpacity>
              }>
              <View style={styles.dropdownMenu}>
                <TouchableOpacity
                  onPress={() => changeNetwork('Ethereum')}
                  style={styles.receiveTokenComponent}>
                  <Text style={styles.walletAddressText}>Ethereum</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => changeNetwork('BNB Smart Chain (BEP20)')}
                  style={styles.receiveTokenComponent}>
                  <Text style={styles.walletAddressText}>BNB Smart Chain</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => changeNetwork('Polygon')}
                  style={styles.receiveTokenComponent}>
                  <Text style={styles.walletAddressText}>Polygon</Text>
                </TouchableOpacity>
              </View>
            </Menu>
          </View>
          <View style={styles.totalTokensContainer}>
            {isLoading ? (
              <SkeletonLoadingComponent />
            ) : (
              <HeadingText>
                {walletBalance?.balance
                  ? Number(walletBalance?.balance).toFixed(4)
                  : 0}
              </HeadingText>
            )}
            <Text style={styles.totalTokensText}>{tokenName}</Text>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            mode="text"
            textColor="white"
            onPress={() => buyTokenScreenRef.current.open()}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginHorizontal: 20,
            }}>
            <BuyIcon size={38} color="white" />
            <Text>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SelectSendTokenScreen');
            }}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginHorizontal: 20,
            }}>
            <SendIcon size={26} color="white" />
            <Text>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SwapTokenScreen')}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginHorizontal: 20,
            }}>
            <SwapIcon
              size={36}
              color="white"
              style={{transform: [{rotate: '90deg'}], margin: 8}}
            />
            <Text>Swap</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ReceiveTokenScreen')}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginHorizontal: 20,
            }}>
            <ReceiveIcon size={32} color="white" style={{margin: 8}} />
            <Text>Receive</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          styles.flexContainer,
          {
            marginVertical: 10,
          },
        ]}>
        <View style={styles.borderLeftContainer} />
        <View style={styles.borderCenterContainer} />
        <View style={styles.borderRightContainer} />
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
            NFTs
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tokensNFTContainer}>
        {activeTab === 'Tokens' ? (
          <TokenBalancesComponent activeNetwork={activeNetwork} />
        ) : (
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <EmptyNFTIcon />
            <Text style={{color: 'white', textAlign: 'center'}}>
              No NFTs tokens found
            </Text>
          </View>
        )}
      </View>
      {route && <SeedPhraseScreens showSeedPhraseScreens={route?.params} />}
      <BottomDrawer
        ref={buyTokenScreenRef}
        customHeight={Dimensions.get('screen').height * 0.95}>
        <BuyTokenScreen
          moveBacktoUserWalletScreen={() => buyTokenScreenRef.current.close()}
        />
      </BottomDrawer>
    </View>
  );
};
export default withWalletConnectProvider(UserWalletHomeScreen);

const styles = StyleSheet.create({
  root: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: colors.neutral[950],
    color: 'white',
    paddingTop: 100,
    position: 'relative',
  },
  container: {
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.neutral[800],
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[800],
    paddingVertical: 16,
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
  dropdownMenu: {
    backgroundColor: colors.neutral[900],
    margin: -10,
    borderRadius: 10,
    width: Dimensions.get('screen').width * 0.5,
  },
  menuAnchor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    zIndex: 10,
    borderRadius: 4,
    backgroundColor: colors.neutral[800],
    padding: 10,
    maxWidth: Dimensions.get('screen').width * 0.6,
    minWidth: Dimensions.get('screen').width * 0.24,
  },
  copyAddressComponent: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: colors.neutral[800],
    borderBottomWidth: 1,
  },
  receiveTokenComponent: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: colors.neutral[900],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.neutral[1000],
    borderWidth: 1,
    borderColor: colors.neutral[700],
  },
  borderLeftContainer: {
    width: Dimensions.get('screen').width * 0.1,
    borderWidth: 1,
    borderColor: colors.neutral[800],
    transform: [
      {translateX: 1 * ((Dimensions.get('screen').width * 0.1) / 2)},
      {
        rotate: '-164deg',
      },
      {translateX: 22},
    ],
  },
  borderCenterContainer: {
    borderWidth: 1,
    width: Dimensions.get('screen').width * 0.8,
    textAlign: 'center',
    alignSelf: 'center',
    borderColor: colors.neutral[800],
  },
  borderRightContainer: {
    borderWidth: 1,
    width: Dimensions.get('screen').width * 0.1,
    borderColor: colors.neutral[800],
    transform: [
      {translateX: -1 * ((Dimensions.get('screen').width * 0.1) / 2)},
      {
        rotate: '-17deg',
      },
      {translateX: 1 * ((Dimensions.get('screen').width * 0.1) / 2)},
    ],
  },
  balanceTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  balanceText: {
    fontSize: 28,
    color: 'white',
    textAlign: 'left',
    fontWeight: '600',
    fontFamily: 'monospace',
    marginRight: 10,
  },
  totalTokensContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  totalTokensText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '400',
    textAlign: 'right',
    fontFamily: 'monospace',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
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
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: colors.neutral[700],
  },
  activeTabStyle: {
    fontSize: 14,
    borderBottomColor: colors.neutral[600],
    borderBottomWidth: 2,
    flex: 1,
    flexBasis: '50%',
  },
  activeTabText: {
    color: colors.neutral[400],
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
    paddingVertical: 0,
  },
});
