/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import colors from '../../../utils/theme/colors';
import {useSelector} from 'react-redux';
import {ArrowRightIcon} from '../../../modules/Icons';
import {Button} from 'react-native-paper';
import {
  getSendTokenEstimateGas,
  getSingleTokenBalance,
  sendTokenTransactionDetails,
} from '../../../packages/apis/web3/walletApi';

import TokensList from '../../../modules/UI/TokensList';
import BottomDrawer from '../../../modules/UI/BottomDrawer';
import {useQuery} from 'react-query';
import {NormalText, TitleText} from '../../../modules/UI/CustomText';
import {fetchCoinPrice} from '../../../packages/apis/rest';
import {getNetworkDefaultTokens} from '../../../packages/hooks';
import TransactionDetailsComponent from './TransactionDetailsComponent';
import LinearGradient from 'react-native-linear-gradient';
import Web3 from 'web3';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';
import {ethers} from 'ethers';
import withWalletConnectProvider from '../WalletScreensRootProvider';

const RightUSDComponent = ({activeToken}) => (
  <Text
    style={{
      color: 'white',
      padding: 8,
      margin: 4,
      fontWeight: '600',
      borderBottomWidth: 1,
      borderBottomColor: colors.neutral[700],
    }}>
    {activeToken?.symbol}
  </Text>
);
const SendTokenScreen = ({route}) => {
  const {activeToken: currentToken, recipientAddress} = route.params;
  const appStore = useSelector(state => state.reducer);
  const TOKENS = getNetworkDefaultTokens(appStore.activeWallet.network);
  const {
    provider,
    isConnected,
    address: providerAddress,
  } = useWalletConnectModal();

  const transactionDetailsSheetRef = React.useRef();
  const tokensListBottomSheetRef = React.useRef();
  const amountRef = React.useRef();

  const [address, setAddress] = useState(recipientAddress);
  const [status, setStatus] = useState('');
  const [amount, setAmount] = useState(0);
  const [usdAmount, setUSDAmount] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [error, setError] = useState(false);
  const [usdAmountError, setusdAmountError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeToken, setActiveToken] = useState(
    currentToken ? currentToken : TOKENS[0],
  );
  const [gasDetails, setGasDetails] = useState(null);

  const findTokenBalance = React.useCallback(async () => {
    const balanceA = await getSingleTokenBalance(
      activeToken.contractAddress,
      appStore.activeWallet.network,
      appStore.activeWallet.walletAddress,
    );
    setTokenBalance(balanceA);
    return balanceA;
  }, [activeToken, appStore.activeWalletTokens]);

  const {data: activeTokenUSDPrice} = useQuery(
    [`${activeToken?.id}`],
    async () => await fetchCoinPrice(activeToken?.symbol),
  );

  React.useEffect(() => {
    findTokenBalance();
  }, [findTokenBalance]);

  const sendTokenSubmit = async () => {
    setLoading(true);
    const isValid = Web3.utils.isAddress(recipientAddress);
    try {
      if (appStore?.activeWallet?.walletAddress === recipientAddress) {
        setError('Cannot send to same wallet');
        setLoading(false);
      } else if (!isValid) {
        setStatus(true);
        setError('Invalid error');
        setLoading(false);
      } else if (Number(amount) === 0) {
        setError('Please add amount');
        setLoading(false);
      } else if (Number(amount) > tokenBalance) {
        setError('Insufficient balance');
        setLoading(false);
      } else if ((isConnected, provider)) {
        const res = await getSendTokenEstimateGas({
          walletAddress: providerAddress,
          recipientAddress: address,
          tokenAddress: activeToken.contractAddress,
          amount: amount,
          provider,
        });
        setLoading(false);
        setGasDetails(res);
        setError('');
        transactionDetailsSheetRef.current.open();
      } else {
        setError('');
        const res = await sendTokenTransactionDetails({
          walletAddress: appStore.activeWallet.walletAddress,
          tokenAddress: activeToken.contractAddress,
          recipientAddress: address,
          amount: amount.toString(),
          network: appStore.activeWallet.network,
          privateKey: appStore.activeWallet.privateKey,
        });
        setGasDetails(res);
        setLoading(false);
        transactionDetailsSheetRef.current.open();
      }
    } catch (e) {
      setLoading(false);
      setError('Something went wrong');
      console.log(e, 'error in token submit method');
      return undefined;
    }
  };

  const handleBlur = async () => {
    const isValid = Web3.utils.isAddress(recipientAddress);
    if (!isValid) {
      setStatus(true);
      setError('Invalid address');
    } else {
      setStatus(false);
      setError('Invalid address');
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.body}>
        <View style={styles.header}>
          <View style={styles.draggableIcon} />
          <TitleText isCenter style={{fontWeight: '500', fontSize: 18}}>
            Send
          </TitleText>
        </View>
        <View style={styles.container}>
          <NormalText>To: Name, ENS, or address</NormalText>
          <TextInput
            onChangeText={value => {
              setAddress(value);
            }}
            mode="text"
            onBlur={handleBlur}
            value={address}
            error={status}
            theme={colors.neutral[400]}
            placeholderTextColor={colors.neutral[400]}
            style={styles.walletNameInput}
          />
          {status && (
            <NormalText style={{margin: 10, color: colors.red[600]}}>
              Invalid address
            </NormalText>
          )}
          <TouchableOpacity
            style={styles.tokenDetailContainer}
            onPress={() => tokensListBottomSheetRef.current.open()}>
            <View style={styles.tokenDetails}>
              <Image
                source={{
                  uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${activeToken?.id}.png`,
                }}
                width={30}
                height={30}
                style={styles.image}
              />
              <View style={{marginRight: 20}}>
                <Text style={styles.symbol}>{activeToken?.symbol}</Text>
                <Text style={styles.name}>{activeToken?.name}</Text>
              </View>
            </View>
            <View
              style={{
                padding: 8,
                backgroundColor: colors.neutral[800],
                borderRadius: 10,
              }}>
              <ArrowRightIcon />
            </View>
          </TouchableOpacity>
          <View style={{marginVertical: 20}}>
            <View style={styles.flexContainer}>
              <TextInput
                placeholder="Enter the amount"
                onChangeText={value => {
                  setAmount(value);
                  setUSDAmount(activeTokenUSDPrice?.price * value);
                }}
                value={amount.toString()}
                keyboardType="numeric"
                error={error}
                ref={amountRef}
                placeholderTextColor={colors.neutral[400]}
                style={[styles.numberInput, error && styles.errorInputStyle]}
              />
              <View style={styles.flexBorderlessContainer}>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    borderRadius: 4,
                    backgroundColor: colors.neutral[800],
                  }}
                  onPress={() => {
                    setAmount(Math.round(tokenBalance, 2));
                    setUSDAmount(
                      Math.round(
                        activeTokenUSDPrice?.price * tokenBalance,
                        2,
                      ).toFixed(4),
                    );
                  }}>
                  <NormalText>MAX</NormalText>
                </TouchableOpacity>
                <RightUSDComponent activeToken={activeToken} />
              </View>
            </View>
            <NormalText style={{margin: 10}}>
              Balance: {Math.floor(tokenBalance)} {activeToken?.symbol}
            </NormalText>
            <View style={styles.flexContainer}>
              <TextInput
                placeholder="Enter the amount"
                onChangeText={value => {
                  if (activeTokenUSDPrice.price) {
                    setUSDAmount(value);
                    setAmount(value / activeTokenUSDPrice?.price);
                  } else {
                    // setAmount(0);
                    setUSDAmount(0);
                  }
                }}
                value={activeTokenUSDPrice && usdAmount.toString()}
                placeholderTextColor={colors.neutral[400]}
                error={usdAmountError}
                keyboardType="numeric"
                style={[
                  styles.numberInput,
                  usdAmountError && styles.errorInputStyle,
                ]}
              />
              <Text
                style={{
                  color: 'white',
                  borderBottomWidth: 1,
                  fontWeight: '600',
                  padding: 8,
                  margin: 4,
                  borderBottomColor: colors.neutral[700],
                }}>
                USD
              </Text>
            </View>
          </View>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <NormalText style={{padding: 10, fontSize: 10}}>
            Est. Gas Fee: {gasDetails ? gasDetails.gasLimit : 'Loading'}
          </NormalText>
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
            style={[styles.confirmButtonStyle, {margin: 10}]}>
            <Button
              labelStyle={styles.reviewButtonLabelStyle}
              buttonColor={colors.neutral[950]}
              style={styles.reviewButtonContainer}
              mode="text"
              textColor="white"
              loading={loading}
              onPress={sendTokenSubmit}>
              {amount > 0 ? 'Review' : 'Enter Amount'}
            </Button>
          </LinearGradient>
        </View>
        <BottomDrawer
          ref={tokensListBottomSheetRef}
          customHeight={Dimensions.get('screen').height * 0.7}
          borderColor>
          <TokensList
            customTokens={appStore.activeWalletTokens}
            hideHeader
            onSelect={item => {
              setError('');
              setActiveToken(item);
              tokensListBottomSheetRef.current.close();
            }}
          />
        </BottomDrawer>
        <BottomDrawer
          ref={transactionDetailsSheetRef}
          borderColor
          customHeight={Dimensions.get('screen').height * 0.7}>
          <TransactionDetailsComponent
            amount={amount}
            gasDetails={gasDetails}
            activeToken={activeToken}
            recipientAddress={recipientAddress}
            closeBottomDrawer={() => transactionDetailsSheetRef.current.close()}
          />
        </BottomDrawer>
      </View>
    </View>
  );
};
export default withWalletConnectProvider(SendTokenScreen);

const styles = StyleSheet.create({
  root: {
    padding: 0,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: colors.black,
  },
  body: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: colors.dark,
    marginTop: 50,
  },
  header: {
    margin: 10,
  },
  draggableIcon: {
    width: 100,
    height: 2,
    borderRadius: 100,
    backgroundColor: colors.neutral[600],
    marginBottom: 20,
    alignSelf: 'center',
  },
  transactionPreviewContainer: {
    padding: 20,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginRight: 20,
    flex: 1,
  },
  successIcon: {
    alignSelf: 'center',
  },
  confirmedText: {
    color: 'white',
    alignSelf: 'center',
  },
  keyValueCard: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  keyText: {
    color: colors.neutral[400],
    fontSize: 14,
    alignSelf: 'center',
    fontWeight: '400',
    marginHorizontal: 10,
  },
  confirmButton: {
    borderRadius: 4,
    margin: 10,
  },
  tokenDetailContainer: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[800],
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tokenDetails: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tokenBalance: {
    color: 'white',
    fontSize: 12,
    marginVertical: 4,
  },
  name: {
    color: colors.neutral[400],
  },
  symbol: {
    color: 'white',
    fontSize: 14,
  },
  image: {
    marginRight: 20,
    borderRadius: 10,
  },
  walletAddressComponent: {
    padding: 8,
    margin: 20,
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
  errorText: {
    color: colors.red[600],
    alignSelf: 'center',
    margin: 10,
    marginBottom: 20,
  },
  errorInputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[900],
  },
  inputContent: {
    color: 'white',
    borderWidth: 0,
  },
  walletNameContainer: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[700],
  },
  walletNameInput: {
    backgroundColor: 'transparent',
    color: 'white',
    padding: 10,
    fontSize: 12,
    borderBottomWidth: 1,
    marginVertical: 10,
    borderBottomColor: colors.neutral[700],
  },
  numberInput: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: colors.neutral[100],
    paddingHorizontal: 10,
    marginVertical: 10,
    color: 'white',
    fontSize: 18,
    width: '70%',
  },
  usdPriceText: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingVertical: 4,
    paddingHorizontal: 20,
    marginVertical: 10,
    color: 'white',
    fontSize: 18,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[700],
  },
  flexBorderlessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  reviewButtonContainer: {
    margin: 1,
    color: 'white',
    borderRadius: 4,
    backgroundColor: colors.neutral[1000],
  },
  confirmButtonStyle: {
    borderRadius: 4,
    borderWidth: 1,
    margin: 1,
  },
  confirmButtonLabelStyle: {
    fontSize: 18,
    textTransform: 'uppercase',
    backgroundColor: 'transparent',
    padding: 0,
  },
  closeButton: {
    textTransform: 'uppercase',
  },
  reviewButtonLabelStyle: {
    textTransform: 'uppercase',
    fontSize: 18,
  },
});
