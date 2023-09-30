/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import colors from '../../../utils/theme/colors';
import BottomDrawer from '../../../modules/UI/BottomDrawer';
import SearchSwapToken from './SearchSwapToken';
import {NormalText, TitleText} from '../../../modules/UI/CustomText';
import {
  HorizontalDividerComponent,
  SkeletonLoadingComponent,
} from '../../../modules';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-paper';
import {AddIcon, InfoIcon, MinusIcon, WalletIcon} from '../../../modules/Icons';
import {useSelector} from 'react-redux';
import {
  approveTokenForSwap,
  approveTokenForSwapViaWalletConnect,
  checkTokenSwapAllowance,
  getKyberSwapApiTokenAllowance,
} from '../../../packages/apis/web3/swapTokenApi';
import {getSingleTokenBalance} from '../../../packages/apis/web3/walletApi';
import Web3 from 'web3';
import {useQuery} from 'react-query';
import SwapQuotationPreview from './SwapTokenQuotationPreview';
import {getNetworkDefaultTokens} from '../../../packages/hooks';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';
import {useNavigation} from '@react-navigation/native';
import withWalletConnectProvider from '../WalletScreensRootProvider';

const SwapTokenScreen = () => {
  const appStore = useSelector(state => state.reducer);
  const swapTokenListBottomSheetRef = React.useRef();
  const receiveTokenListBottomSheetRef = React.useRef();
  const swapQuotationBottomSheetRef = React.useRef();

  const network = appStore.activeWallet.network;
  const defaultTokens = getNetworkDefaultTokens(network);
  const {isConnected, provider} = useWalletConnectModal();
  const navigation = useNavigation();

  const [error, setError] = useState('');
  const [activeToken, setActiveToken] = useState({
    swapToken: defaultTokens[0],
    receiveToken: defaultTokens[1],
  });
  const [loading, setLoading] = useState({
    swapQuotation: false,
    transactionStatus: false,
  });
  const [values, setValues] = useState({
    swapToken: 0,
    receiveToken: 0,
  });
  const [slippage, setSlippage] = useState(0);
  const [allowanceAmount, setTokenAllowanceAmount] = useState(0);
  const [swapRoutes, setSwapRoutes] = useState(null);
  const [buttonText, setButtonText] = useState('Review');

  const {data: swapTokenBalance, isLoadingWalletTokenBalance} = useQuery(
    ['walletTokenBalance', activeToken.swapToken.contractAddress],
    async () => {
      const balanceA = await getSingleTokenBalance(
        activeToken.swapToken.contractAddress,
        appStore.activeWallet.network,
        appStore.activeWallet.walletAddress,
      );
      return balanceA;
    },
  );

  const fetchSwapQuotationFromKyber = async () => {
    const res = await getKyberSwapApiTokenAllowance({
      src: activeToken.swapToken.contractAddress,
      dst: activeToken.receiveToken.contractAddress,
      from: appStore.activeWallet.walletAddress,
      amount: values.swapToken > 0 ? values.swapToken : '0',
      network,
    });
    setSwapRoutes(res);
    return res;
  };

  const checkAllowance = async () => {
    const amountAllowed = await checkTokenSwapAllowance({
      network,
      senderAddress: '0x6131B5fae19EA4f9D964eAc0408E4408b66337b5',
      walletAddress: appStore.activeWallet.walletAddress,
      tokenAddress: activeToken.swapToken.contractAddress,
    });
    const amount = Web3.utils.fromWei(amountAllowed);
    setTokenAllowanceAmount(amount);
  };

  React.useEffect(() => {
    fetchSwapQuotationFromKyber();
  }, [activeToken, values]);

  React.useEffect(() => {
    checkAllowance();
  }, [
    activeToken,
    appStore.activeWallet.walletAddress,
    network,
    values.swapToken,
  ]);

  React.useEffect(() => {
    updateButtonText();
  }, [
    activeToken.swapToken.contractAddress,
    swapTokenBalance,
    allowanceAmount,
    values,
  ]);

  const getSwapQuotation = async () => {
    if (allowanceAmount > 0) {
      if (values.swapToken <= 0) {
        setError('Token amount should be more than zero');
      } else if (Number(swapTokenBalance) === 0) {
        setError('Insufficient balance');
      } else {
        const res = await getKyberSwapApiTokenAllowance({
          src: activeToken.swapToken.contractAddress,
          dst: activeToken.receiveToken.contractAddress,
          from: appStore.activeWallet.walletAddress,
          amount: values.swapToken,
          network,
        });
        setError(null);
        setSwapRoutes(res);
        swapQuotationBottomSheetRef.current.open();
      }
    } else if (allowanceAmount <= 0) {
      setError('Please, allow token to swap');
    } else {
      setError('Token should be more than zero');
    }
  };

  const updateButtonText = () => {
    if (
      allowanceAmount < 0 ||
      Number(allowanceAmount) < Number(values.swapToken)
    ) {
      setButtonText(
        `APPROVE ${Number(values.swapToken) - Number(allowanceAmount)} ${
          activeToken.swapToken.symbol
        }`,
      );
    } else if (Number(swapTokenBalance) === 0) {
      setError('Insufficient balance');
      setButtonText('Insufficient balance');
    } else {
      setButtonText('Review');
    }
  };

  const handleSwapTokenChange = async value => {
    setError('');
    const finalValue = Web3.utils.fromWei(swapRoutes?.routeSummary?.amountOut);
    setValues({
      swapToken: value,
      receiveToken: finalValue,
    });
  };

  const handleReceiveTokenChange = async value => {
    setError('');
    const finalValue = Web3.utils.fromWei(swapRoutes?.routeSummary?.amountOut);
    setValues({
      swapToken: finalValue,
      receiveToken: value,
    });
  };

  const giveTokenSwapApproval = async () => {
    setLoading({swapQuotation: true});
    if (
      allowanceAmount <= 0 ||
      Number(allowanceAmount) < Number(values.swapToken)
    ) {
      if (isConnected && provider && appStore.isWalletConnectConnected) {
        const {data, status} = await approveTokenForSwapViaWalletConnect({
          senderAddress: '0x6131B5fae19EA4f9D964eAc0408E4408b66337b5',
          walletAddress: appStore.activeWallet.walletAddress,
          tokenAddress: activeToken.swapToken.contractAddress,
          allowanceAmount: 1,
          network,
          provider,
        });
        if (status) {
          setTokenAllowanceAmount(1);
          setLoading({swapQuotation: false});
        } else if (!status) {
          setError('Error in approving token');
          setLoading({swapQuotation: false});
        }
      } else if (appStore.activeWallet.privateKey) {
        const res = await approveTokenForSwap({
          senderAddress: '0x6131B5fae19EA4f9D964eAc0408E4408b66337b5',
          walletAddress: appStore.activeWallet.walletAddress,
          tokenAddress: activeToken.swapToken.contractAddress,
          allowanceAmount: 1,
          network,
          privateKey: appStore.activeWallet.privateKey,
        });
        if (res) {
          setTokenAllowanceAmount(1);
          setLoading({swapQuotation: false});
        }
        return res;
      }
    }
    setLoading({swapQuotation: false});
  };

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={{marginTop: 10}}>
          <View style={styles.draggableIcon} />
          <TitleText style={{fontWeight: '700'}} isCenter>
            Swap
          </TitleText>
          <View style={styles.formContainer}>
            <View style={styles.swapTokenContainer}>
              <View style={styles.flexContainer}>
                <TextInput
                  placeholder="1"
                  value={values.swapToken.toString().substring(0, 6)}
                  onChangeText={handleSwapTokenChange}
                  keyboardType="number-pad"
                  style={styles.swapTokenInput}
                  placeholderTextColor={colors.neutral[300]}
                />
                <View>
                  <TouchableOpacity
                    onPress={() => swapTokenListBottomSheetRef.current.open()}
                    style={styles.selectTokenButton}>
                    <Image
                      source={{
                        uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${activeToken.swapToken.id}.png`,
                      }}
                      width={20}
                      height={20}
                    />
                    <NormalText isCenter style={{marginHorizontal: 10}}>
                      {activeToken.swapToken?.symbol?.toUpperCase()}
                    </NormalText>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.flexContainer}>
                <NormalText
                  style={{
                    color: colors.neutral[400],
                    marginVertical: 4,
                    fontSize: 18,
                  }}>
                  ${Number(swapRoutes?.routeSummary?.amountInUsd).toFixed(6)}
                </NormalText>
                <NormalText
                  style={{
                    color: colors.neutral[400],
                    fontSize: 18,
                  }}>
                  <WalletIcon color={colors.neutral[400]} />{' '}
                  {!isLoadingWalletTokenBalance &&
                    `${Math.round(
                      swapTokenBalance,
                      2,
                    )} ${activeToken.swapToken.symbol.toUpperCase()}`}
                </NormalText>
              </View>
            </View>
            <View style={styles.flexContainer}>
              <View
                style={{
                  marginVertical: 4,
                  alignSelf: 'center',
                }}>
                <Image
                  source={require('../../../assets/icons/arrows-down-icon.png')}
                  width={20}
                  height={20}
                />
              </View>
              <HorizontalDividerComponent />
            </View>
            {error && (
              <View
                style={
                  (styles.flexContainer,
                  {justifyContent: 'center', gap: 10, flexDirection: 'row'})
                }>
                <NormalText isCenter style={{color: colors.red[400]}}>
                  {error}{' '}
                </NormalText>
                {error === 'Insufficient balance' ? (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('BuyTokenScreen', {
                        customToken: activeToken.swapToken,
                      })
                    }>
                    <NormalText style={{color: colors.indigo[600]}}>
                      Buy Token
                    </NormalText>
                  </TouchableOpacity>
                ) : null}
              </View>
            )}
            <View style={styles.receiveTokenContainer}>
              <View style={styles.flexContainer}>
                <TextInput
                  placeholder="1"
                  value={values.receiveToken.toString().substring(0, 6)}
                  onChangeText={handleReceiveTokenChange}
                  keyboardType="number-pad"
                  style={styles.receiveTokenInput}
                  placeholderTextColor={colors.neutral[300]}
                />
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      receiveTokenListBottomSheetRef.current.open()
                    }
                    style={styles.selectTokenButton}>
                    <Image
                      source={{
                        uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${activeToken.receiveToken.id}.png`,
                      }}
                      width={20}
                      height={20}
                    />
                    <NormalText isCenter style={{marginHorizontal: 10}}>
                      {activeToken.receiveToken?.symbol.toUpperCase()}
                    </NormalText>
                  </TouchableOpacity>
                </View>
              </View>
              <NormalText
                style={{
                  color: colors.neutral[400],
                  marginVertical: 4,
                  fontSize: 18,
                }}>
                $ {Number(swapRoutes?.routeSummary?.amountOutUsd).toFixed(6)}
              </NormalText>
            </View>
          </View>
          <HorizontalDividerComponent />
          <View style={{height: 20}} />
          <View style={styles.flexContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 0,
                padding: 10,
              }}>
              <NormalText>Est. Gas Fee: </NormalText>
              <View style={{width: 100}}>
                {swapRoutes?.routeSummary?.gas ? (
                  <NormalText>{swapRoutes.routeSummary.gas}</NormalText>
                ) : (
                  <SkeletonLoadingComponent />
                )}
              </View>
            </View>
            <View>
              <NormalText style={{marginBottom: 4}}>Max Slippage</NormalText>
              <View style={styles.flexContainer}>
                <TouchableOpacity
                  onPress={() => {
                    if (slippage > 0) {
                      setSlippage(slippage - 1);
                    }
                  }}
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: colors.neutral[800],
                  }}>
                  <MinusIcon color="white" />
                </TouchableOpacity>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colors.neutral[700],
                    padding: 4,
                    marginHorizontal: 10,
                  }}>
                  <NormalText>{slippage} %</NormalText>
                </View>
                <TouchableOpacity
                  onPress={() => setSlippage(slippage + 1)}
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: colors.neutral[800],
                  }}>
                  <AddIcon color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{height: 20}} />
          <View style={{marginHorizontal: 4}}>
            {allowanceAmount <= 0 && (
              <View style={styles.flexInfoContainer}>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      `We need approval for swapping ${activeToken.swapToken.symbol} on your behalf`,
                    );
                  }}>
                  <InfoIcon size={20} />
                </TouchableOpacity>
                <NormalText>
                  Please approve {activeToken.swapToken.symbol} for swap
                </NormalText>
              </View>
            )}
            <LinearGradient
              colors={[
                '#509ADD',
                '#2EF2CD',
                '#27F3D1',
                '#F8CF3E',
                '#6C5AE6',
                '#509ADD',
              ]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.reviewButtonContainer}>
              <Button
                labelStyle={styles.reviewButtonLabelStyle}
                buttonColor={colors.neutral[1000]}
                style={styles.reviewButtonContainer}
                mode="text"
                textColor="white"
                loading={loading.swapQuotation}
                onPress={
                  allowanceAmount > 0 &&
                  Number(allowanceAmount) > Number(values.swapToken)
                    ? getSwapQuotation
                    : giveTokenSwapApproval
                }>
                {buttonText}
              </Button>
            </LinearGradient>
          </View>
        </View>
      </View>
      <BottomDrawer
        customHeight={Dimensions.get('screen').height * 0.9}
        ref={swapTokenListBottomSheetRef}
        borderColor>
        <View>
          <SearchSwapToken
            onSelectToken={item => {
              if (
                activeToken.receiveToken.name.toLocaleLowerCase() ===
                item.name.toLocaleLowerCase()
              ) {
                Alert.alert("Both Tokens can't be same");
              } else {
                setActiveToken({
                  swapToken: item,
                  receiveToken: activeToken.receiveToken,
                });
                swapTokenListBottomSheetRef.current.close();
              }
            }}
          />
        </View>
      </BottomDrawer>
      <BottomDrawer
        customHeight={Dimensions.get('screen').height * 0.9}
        ref={receiveTokenListBottomSheetRef}
        borderColor>
        <View>
          <SearchSwapToken
            onSelectToken={item => {
              if (
                activeToken.receiveToken.name.toLocaleLowerCase() ===
                item.name.toLocaleLowerCase()
              ) {
                Alert.alert("Both Tokens can't be same");
              } else {
                setActiveToken({
                  receiveToken: item,
                  swapToken: activeToken.swapToken,
                });
                receiveTokenListBottomSheetRef.current.close();
              }
            }}
          />
        </View>
      </BottomDrawer>
      <BottomDrawer
        customHeight={Dimensions.get('screen').height * 0.9}
        ref={swapQuotationBottomSheetRef}
        borderColor>
        <SwapQuotationPreview
          closePreviewQuotation={() =>
            swapQuotationBottomSheetRef.current.close()
          }
          activeToken={activeToken}
          loading={loading}
          slippage={slippage}
          setLoading={setLoading}
          values={values}
          swapRoutes={swapRoutes}
        />
      </BottomDrawer>
    </View>
  );
};
export default withWalletConnectProvider(SwapTokenScreen);

const styles = StyleSheet.create({
  root: {
    padding: 0,
    backgroundColor: colors.black,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  container: {
    marginTop: 50,
    backgroundColor: colors.neutral[1000],
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    paddingHorizontal: 20,
  },
  draggableIcon: {
    width: 100,
    height: 2,
    borderRadius: 100,
    backgroundColor: colors.neutral[600],
    marginBottom: 20,
    alignSelf: 'center',
  },
  formContainer: {
    marginTop: 20,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  swapTokenContainer: {
    padding: 10,
  },
  swapTokenInput: {
    color: 'white',
    width: '70%',
    fontSize: 24,
    fontWeight: '700',
  },
  receiveTokenInput: {
    color: 'white',
    width: '70%',
    fontSize: 24,
    fontWeight: '700',
  },
  receiveTokenContainer: {
    padding: 10,
    borderRadius: 10,
  },
  selectTokenButton: {
    padding: 10,
    backgroundColor: colors.neutral[800],
    borderRadius: 10,
    flexDirection: 'row',
    marginVertical: 10,
    width: 100,
  },
  accordion: {
    borderColor: colors.neutral[800],
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 4,
    marginVertical: 20,
  },
  slippageAccordion: {
    backgroundColor: colors.neutral[1000],
  },
  slippageAccordionTitle: {
    backgroundColor: colors.neutral[1000],
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
  },
  reviewButtonContainer: {
    borderRadius: 4,
    borderWidth: 1,
    margin: 1,
    color: 'white',
    backgroundColor: colors.neutral[1000],
  },
  reviewButtonLabelStyle: {
    margin: 10,
    textTransform: 'uppercase',
    fontSize: 18,
  },
  selectTokenCard: {
    padding: 10,
    backgroundColor: colors.neutral[800],
    borderRadius: 10,
    flexDirection: 'row',
    width: 100,
  },
  cancelButtonStyle: {
    borderColor: colors.neutral[400],
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 4,
    marginHorizontal: 4,
    marginVertical: 20,
  },
  cancelButtonLabelStyle: {
    textTransform: 'uppercase',
    fontSize: 18,
    padding: 0,
    opacity: 0.7,
  },
  closeButton: {
    textTransform: 'uppercase',
  },
  keyValueCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  valueText: {
    fontWeight: '500',
    color: 'white',
    paddingHorizontal: 10,
    flexWrap: 'wrap',
  },
  keyText: {
    color: colors.neutral[400],
    fontSize: 14,
    alignSelf: 'center',
    fontWeight: '400',
    marginHorizontal: 10,
  },
});
