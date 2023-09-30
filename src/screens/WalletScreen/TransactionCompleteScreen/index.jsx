import React, {useState} from 'react';
import {View, Text, StyleSheet, Linking, Image} from 'react-native';
import {ReceiveIcon, SendIcon} from '../../../modules/Icons';
import colors from '../../../utils/theme/colors';
import {Button} from 'react-native-paper';
import {HorizontalDividerComponent} from '../../../modules';
import {NormalText, TitleText} from '../../../modules/UI/CustomText';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const TransactionCompleteScreen = ({txnDetails, closeBottomDrawers}) => {
  const appStore = useSelector(state => state.reducer);
  const navigation = useNavigation();
  const navigateToHome = () => {
    closeBottomDrawers();
    navigation.navigate('WalletHistoryScreen');
  };

  const [details, setDetails] = useState(null);

  const viewOnExplorer = () => {
    if (txnDetails?.network === 'BNB Smart Chain (BEP20)') {
      Linking.openURL(
        `https://bscscan.com/tx/${txnDetails?.transactionCompleteDetails?.transactionHash}`,
      );
    } else if (txnDetails?.network === 'Ethereum Mainnet') {
      Linking.openURL(
        `https://etherscan.io/tx/${txnDetails?.transactionCompleteDetails?.transactionHash}`,
      );
    }
  };

  React.useEffect(() => {
    setDetails(txnDetails?.transactionCompleteDetails);
  }, [txnDetails]);
  return (
    <View style={styles.root}>
      <View style={styles.transactionPreviewContainer}>
        <View style={styles.header}>
          <Image
            source={require('../../../assets/icons/sending-cgpt-icon.png')}
            style={{
              width: 50,
              height: 50,
              alignSelf: 'center',
              marginVertical: 10,
            }}
          />
          <TitleText isCenter>Sent</TitleText>
        </View>
        <View style={styles.transactionDetailsCard}>
          <View style={{margin: 4, marginHorizontal: 20}}>
            <View style={styles.keyValueCard}>
              <Image
                source={{uri: txnDetails?.activeToken?.image}}
                style={{
                  width: 20,
                  height: 20,
                  alignSelf: 'center',
                  marginRight: 10,
                }}
              />
              <Text style={styles.keyText}>Token</Text>
            </View>
            <Text style={styles.valueText}>
              {txnDetails?.amount}{' '}
              {txnDetails?.activeToken?.symbol.toUpperCase()}
            </Text>
          </View>
          <HorizontalDividerComponent />
          <View style={{margin: 4, marginHorizontal: 20}}>
            <View style={styles.keyValueCard}>
              <ReceiveIcon style={{marginRight: 8, margin: 0}} />
              <Text style={styles.keyText}>To</Text>
            </View>
            <NormalText style={styles.toAddress}>{details?.to}</NormalText>
          </View>
          <HorizontalDividerComponent />
          <View style={{margin: 4, marginHorizontal: 20}}>
            <View style={styles.keyValueCard}>
              <SendIcon style={{margin: 0, marginRight: 10}} />
              <Text style={styles.keyText}>From</Text>
            </View>
            <Text style={styles.fromAddress}>
              {appStore.activeWallet.walletAddress}
            </Text>
          </View>
          <HorizontalDividerComponent />
        </View>
      </View>
      <View style={styles.bottomButtonContainer}>
        <Button
          onPress={viewOnExplorer}
          mode="text"
          labelStyle={styles.viewOnExplorerButton}
          buttonColor="white"
          style={styles.confirmButton}
          textColor="black">
          View on Explorer
        </Button>
        <Button
          onPress={navigateToHome}
          buttonColor="transparent"
          labelStyle={styles.okButtonContainer}
          style={styles.okButton}
          textColor="white">
          Check in History
        </Button>
      </View>
    </View>
  );
};
export default TransactionCompleteScreen;

const styles = StyleSheet.create({
  root: {
    padding: 0,
    backgroundColor: colors.neutral[1000],
  },
  header: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionPreviewContainer: {
    padding: 0,
  },
  transactionDetailsCard: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    color: 'white',
  },
  successIcon: {
    padding: 4,
  },
  confirmedText: {
    color: colors.neutral[400],
    alignSelf: 'center',
  },
  keyValueCard: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
  },
  valueText: {
    fontWeight: '500',
    color: 'white',
  },
  keyText: {
    color: colors.neutral[400],
    fontWeight: '400',
  },
  toAddress: {
    color: 'white',
    fontWeight: '400',
  },
  fromAddress: {
    color: 'white',
    fontWeight: '400',
  },
  transactionHashText: {
    color: 'white',
    fontWeight: '400',
  },
  confirmButton: {
    marginHorizontal: 30,
    marginVertical: 10,
    backgroundColor: colors.neutral[100],
    borderColor: colors.neutral[400],
    borderWidth: 1,
    borderRadius: 4,
  },
  viewOnExplorerButton: {
    textAlign: 'center',
    width: '100%',
    padding: 4,
    textTransform: 'uppercase',
  },
  okButtonContainer: {
    textAlign: 'center',
    padding: 4,
    textTransform: 'uppercase',
  },
  okButton: {
    marginHorizontal: 30,
    borderRadius: 4,
    borderColor: colors.neutral[400],
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  bottomButtonContainer: {
    backgroundColor: colors.neutral[1000],
  },
});
