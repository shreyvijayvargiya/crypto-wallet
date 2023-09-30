import React, {useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  ArrowRightIcon,
  ReceiveIcon,
  SendIcon,
  TokenIcon,
} from '../../../modules/Icons';
import {HorizontalDividerComponent} from '../../../modules';
import colors from '../../../utils/theme/colors';
import {NormalText, TitleText} from '../../../modules/UI/CustomText';
import {useSelector} from 'react-redux';
import {Button} from 'react-native-paper';
import {
  sendTokenViaWalletConnectApi,
  sendTokensApi,
} from '../../../packages/apis/web3/walletApi';
import BottomDrawer from '../../../modules/UI/BottomDrawer';
import TransactionCompleteScreen from '../TransactionCompleteScreen';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';

const TransactionDetailsComponent = ({
  amount,
  activeToken,
  gasDetails,
  recipientAddress,
  closeBottomDrawer,
}) => {
  const transactionDetailsBottomDrawer = React.useRef();
  const appStore = useSelector(state => state.reducer);
  const [confirmLoader, setConfirmLoader] = useState(false);
  const [txnDetails, setTxnDetails] = useState();
  const {provider, isConnected, address} = useWalletConnectModal();
  const [error, setError] = useState(false);

  const confirmSendToken = async () => {
    setConfirmLoader(true);
    try {
      if ((isConnected, provider, appStore.isWalletConnectConnected)) {
        const res = await sendTokenViaWalletConnectApi({
          provider,
          walletAddress: appStore.activeWallet.walletAddress,
          recipientAddress,
          amount,
          tokenAddress: activeToken.contractAddress,
          network: appStore.activeNetwork,
        });
        setConfirmLoader(false);
        if (res) {
          console.log(res, 'res');
          setTxnDetails({
            network: appStore.activeWallet.network,
            activeToken,
            amount,
            transactionCompleteDetails: res,
          });
          transactionDetailsBottomDrawer.current.open();
        } else {
          setError('Opps something went wron');
          throw Error('Error in sending token');
        }
      } else {
        const res = await sendTokensApi(
          appStore.activeWallet.walletAddress,
          activeToken.contractAddress,
          recipientAddress,
          amount,
          appStore.activeWallet.network,
          appStore.activeWallet.privateKey,
        );
        setConfirmLoader(false);
        if (res) {
          setTxnDetails({
            network: appStore.activeWallet.network,
            activeToken,
            amount,
            transactionCompleteDetails: res,
          });
          transactionDetailsBottomDrawer.current.open();
        } else {
          throw Error('Error in sending token');
        }
      }
    } catch (e) {
      setError('Opps something went wrong');
      console.log(e, 'error');
      setConfirmLoader(false);
      return undefined;
    }
  };

  return (
    <View style={styles.transactionPreviewContainer}>
      <View>
        <TitleText isCenter>Sending</TitleText>
        <Image
          source={require('../../../assets/icons/sending-cgpt-icon.png')}
          style={{
            width: 50,
            height: 50,
            alignSelf: 'center',
            marginVertical: 10,
          }}
        />
        <View style={styles.flexBorderlessContainer}>
          <View>
            <View style={styles.amountContainer}>
              <ArrowRightIcon />
              <Text style={styles.keyText}>Amount</Text>
            </View>
            <Text style={styles.valueText}>
              {amount} {activeToken?.symbol.toUpperCase()}
            </Text>
          </View>
          <Image
            source={{uri: activeToken?.image}}
            style={{width: 30, height: 30}}
          />
        </View>
        <HorizontalDividerComponent />
        <View style={styles.flexBorderlessContainer}>
          <View style={styles.keyValueCard}>
            <TokenIcon color={colors.neutral[400]} />
            <Text style={styles.keyText}>Token</Text>
          </View>
          <Text style={styles.valueText}>
            {activeToken?.symbol.toUpperCase()}
          </Text>
        </View>
        <HorizontalDividerComponent />
        <View style={styles.flexBorderlessContainer}>
          <View style={styles.keyValueCard}>
            <ReceiveIcon color={colors.neutral[400]} />
            <Text style={styles.keyText}>To</Text>
          </View>
          <Text style={styles.valueText}>
            {recipientAddress?.substring(0, 6)}...
            {recipientAddress?.substring(35, 42)}
          </Text>
        </View>
        <HorizontalDividerComponent />
        <View style={styles.flexBorderlessContainer}>
          <View style={styles.keyValueCard}>
            <SendIcon style={{margin: 0}} color={colors.neutral[400]} />
            <Text style={styles.keyText}>From</Text>
          </View>
          <Text style={styles.valueText}>
            {appStore.activeWallet.walletAddress.substring(0, 6)}...
            {appStore.activeWallet.walletAddress.substring(35, 42)}
          </Text>
        </View>
        <HorizontalDividerComponent />
        {error && (
          <NormalText isCenter style={{color: colors.red[600]}}>
            {error}
          </NormalText>
        )}
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
            onPress={confirmSendToken}
            labelStyle={styles.confirmButtonLabelStyle}
            style={styles.confirmButtonStyle}
            buttonColor={colors.neutral[1000]}
            loading={confirmLoader}
            textColor="white">
            {confirmLoader ? '...Sending token' : 'Confirm'}
          </Button>
        </LinearGradient>
        <Button
          mode="text"
          buttonColor={colors.neutral[1000]}
          labelStyle={styles.cancelButtonLabelStyle}
          style={styles.cancelButtonStyle}
          textColor="white"
          onPress={closeBottomDrawer}>
          Reject
        </Button>
        <NormalText style={{padding: 10, fontSize: 10}}>
          Est. Gas Fee: {gasDetails.gasLimit}
        </NormalText>
      </View>
      <BottomDrawer
        ref={transactionDetailsBottomDrawer}
        customHeight={Dimensions.get('screen').height * 0.71}
        borderColor>
        <TransactionCompleteScreen
          txnDetails={txnDetails}
          closeBottomDrawers={() => {
            closeBottomDrawer();
            transactionDetailsBottomDrawer.current.close();
          }}
        />
      </BottomDrawer>
    </View>
  );
};
export default TransactionDetailsComponent;

const styles = StyleSheet.create({
  transactionPreviewContainer: {
    padding: 20,
  },
  flexBorderlessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
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
    marginVertical: 4,
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
    width: 30,
    height: 30,
    marginRight: 20,
    borderRadius: 10,
  },
  header: {
    margin: 20,
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
  },
  errorInputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[900],
  },
  inputContent: {
    color: 'white',
    borderWidth: 0,
  },
  walletNameInput: {
    backgroundColor: 'transparent',
    color: 'white',
    padding: 10,
    marginVertical: 10,
    borderBottomWidth: 1,
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
  cancelButtonStyle: {
    borderColor: colors.neutral[400],
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 4,
    margin: 10,
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
});
