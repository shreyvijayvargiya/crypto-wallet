/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {HorizontalDividerComponent} from '../../../modules';
import {NormalText, TitleText} from '../../../modules/UI/CustomText';
import colors from '../../../utils/theme/colors';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import {CopyIcon} from '../../../modules/Icons';
import {useSelector} from 'react-redux';
import {
  performSwap,
  performSwapViaWalletConnect,
  swapTokenViaKyberSwapApi,
} from '../../../packages/apis/web3/swapTokenApi';
import Web3 from 'web3';
import SwapTransactionComplete from './SwapTransactionComplete';
import SwapTokenError from './SwapError';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';

const SwapQuotationPreview = ({
  closePreviewQuotation,
  activeToken,
  setLoading,
  swapRoutes,
  slippage,
  loading,
  values,
}) => {
  const appStore = useSelector(state => state.reducer);
  const network = appStore.activeNetwork;

  const [routesName, setRoutesNames] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [swapTxnDetails, setSwapTxnDetails] = useState(null);
  const [error, setError] = useState('');
  const {isConnected, provider} = useWalletConnectModal();

  const routes = swapRoutes?.routeSummary?.route[0];

  const filterNames = async () => {
    const uniRoutes = new Set();
    routes?.forEach(item => {
      if (!uniRoutes.has(item.exchange)) {
        uniRoutes.add(item.exchange);
      } else {
        return null;
      }
    });
    setRoutesNames(uniRoutes);
  };

  React.useEffect(() => {
    filterNames();
  }, []);

  const confirmTokenSwap = async () => {
    setLoading({transactionStatus: true});
    try {
      setTransactionStatus('pending');
      const swapTxnDetailFromKyber = await swapTokenViaKyberSwapApi({
        sender: appStore.activeWallet.walletAddress,
        network,
        recipient: swapRoutes.routerAddress,
        routeSummary: swapRoutes.routeSummary,
        slippageTolerance: slippage,
      });
      if ((isConnected, provider)) {
        const {data, status} = await performSwapViaWalletConnect({
          walletAddress: appStore.activeWallet.walletAddress,
          txnQuote: swapTxnDetailFromKyber,
          gasPrice: swapRoutes?.routeSummary.gasPrice,
          network,
          provider,
        });
        if (status) {
          setError(null);
          setSwapTxnDetails(data);
          setTransactionStatus('success');
          setLoading({transactionStatus: false});
        } else if (!status) {
          setError(data);
          setTransactionStatus('error');
          setSwapTxnDetails(null);
          setLoading({transactionStatus: false});
        }
      } else if (swapTxnDetailFromKyber && appStore.activeWallet.privateKey) {
        const {data: swapTxn, status} = await performSwap({
          walletAddress: appStore.activeWallet.walletAddress,
          privateKey: appStore.activeWallet.privateKey,
          txnQuote: swapTxnDetailFromKyber,
          gasPrice: swapRoutes?.routeSummary.gasPrice,
          network,
        });
        if (status) {
          setError(null);
          setSwapTxnDetails(swapTxn);
          setTransactionStatus('success');
          setLoading({transactionStatus: false});
        } else if (!status) {
          setError(swapTxn);
          setTransactionStatus('error');
          setSwapTxnDetails(null);
          setLoading({transactionStatus: false});
        }
      } else {
        setError('Error in swapping token');
        setLoading({transactionStatus: false});
        setSwapTxnDetails(null);
        setTransactionStatus('error');
      }
    } catch (e) {
      setError(e);
      setLoading({transactionStatus: false});
      console.log('Error', e);
      setSwapTxnDetails(null);
      setTransactionStatus('error');
    }
  };

  const amountOut = Web3.utils.fromWei(swapRoutes?.routeSummary?.amountOut);
  const amountIn = Web3.utils.fromWei(swapRoutes?.routeSummary?.amountIn);
  return (
    <View>
      <View style={{padding: 20}}>
        <TitleText isCenter style={{marginVertical: 10}}>
          Review
        </TitleText>
        <View style={styles.swapTokenContainer}>
          <View style={styles.flexContainer}>
            <View style={styles.swapTokenInput}>
              <TitleText>{Number(amountIn).toFixed(4)}</TitleText>
              <NormalText
                style={{
                  color: colors.neutral[400],
                  marginVertical: 4,
                }}>
                $ {Number(swapRoutes?.routeSummary?.amountInUsd).toFixed(6)}
              </NormalText>
            </View>
            <View style={styles.selectTokenCard}>
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
            </View>
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
        <View style={styles.receiveTokenContainer}>
          <View style={styles.flexContainer}>
            <View>
              <TitleText>{Number(amountOut).toFixed(4)}</TitleText>
              <NormalText
                style={{
                  color: colors.neutral[400],
                  marginVertical: 4,
                  fontSize: 18,
                }}>
                $ {Number(swapRoutes?.routeSummary?.amountOutUsd).toFixed(6)}
              </NormalText>
            </View>
            <View style={styles.selectTokenCard}>
              <Image
                source={{
                  uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${activeToken.receiveToken.id}.png`,
                }}
                width={20}
                height={20}
              />
              <NormalText isCenter style={{marginHorizontal: 10}}>
                {activeToken.receiveToken?.symbol?.toUpperCase()}
              </NormalText>
            </View>
          </View>
        </View>
        <HorizontalDividerComponent />
        <View>
          <View style={styles.keyValueCard}>
            <NormalText style={{color: colors.neutral[400]}}>
              Minimum received{' '}
            </NormalText>
            <Text style={styles.valueText}>{values?.receiveToken}</Text>
          </View>
          <View style={styles.keyValueCard}>
            <NormalText style={{color: colors.neutral[400]}}>
              Swap via{' '}
            </NormalText>
            {routesName && (
              <Text style={styles.valueText}>
                {Array.from(routesName).map(item => item + ' ')}
              </Text>
            )}
          </View>
          <View style={styles.keyValueCard}>
            <NormalText style={{color: colors.neutral[400]}}>
              ChainGPT Fee{' '}
            </NormalText>
            <Text style={styles.valueText}>0%</Text>
          </View>
          <HorizontalDividerComponent />
          <View style={styles.keyValueCard}>
            <NormalText style={{color: colors.neutral[400]}}>
              Exchange Rate{' '}
            </NormalText>
            <Text style={styles.valueText}>
              {Math.floor(values?.swapToken)} {activeToken?.swapToken?.name} for{' '}
              {Number(values?.receiveToken).toFixed(4)}{' '}
              {activeToken.receiveToken?.name}
            </Text>
          </View>
          <View style={styles.keyValueCard}>
            <NormalText style={{color: colors.neutral[400]}}>
              {activeToken.receiveToken.name}{' '}
            </NormalText>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(activeToken.receiveToken.contractAddress);
                Alert.alert('Address copied');
              }}
              style={{flexDirection: 'row'}}>
              <Text style={styles.valueText}>
                {activeToken.receiveToken.contractAddress.substring(0, 10)}
                ...
              </Text>
              <CopyIcon />
            </TouchableOpacity>
          </View>
          <HorizontalDividerComponent />
        </View>
        <View>
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
              loading={loading.transactionStatus}
              onPress={confirmTokenSwap}>
              {loading.transactionStatus ? 'Submitting' : 'Confirm'}
            </Button>
          </LinearGradient>
          <Button
            mode="text"
            buttonColor={colors.neutral[1000]}
            labelStyle={styles.cancelButtonLabelStyle}
            style={styles.cancelButtonStyle}
            textColor="white"
            onPress={closePreviewQuotation}>
            Cancel
          </Button>
        </View>
        {swapRoutes?.routeSummary?.gas && (
          <NormalText style={{padding: 10}}>
            Est. Gas Fee: {swapRoutes.routeSummary.gas}
          </NormalText>
        )}
      </View>
      {transactionStatus === 'success' && (
        <SwapTransactionComplete
          txnDetails={swapTxnDetails}
          closePreviewQuotation={closePreviewQuotation}
        />
      )}
      {transactionStatus === 'error' && (
        <SwapTokenError
          error={error}
          closePreviewQuotation={closePreviewQuotation}
        />
      )}
    </View>
  );
};
export default SwapQuotationPreview;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: colors.black,
  },
  container: {
    backgroundColor: colors.neutral[1000],
    paddingHorizontal: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  swapTokenContainer: {
    paddingVertical: 10,
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
    paddingVertical: 10,
  },
  selectTokenButton: {
    padding: 10,
    backgroundColor: colors.neutral[800],
    borderRadius: 10,
    flexDirection: 'row',
    width: 100,
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
