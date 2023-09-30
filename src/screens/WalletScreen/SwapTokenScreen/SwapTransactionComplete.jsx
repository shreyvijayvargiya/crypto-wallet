import React from 'react';
import {
  View,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import {HeadText, NormalText} from '../../../modules/UI/CustomText';
import {Button} from 'react-native-paper';
import {CopyIcon, SuccessfullIcon} from '../../../modules/Icons';
import Clipboard from '@react-native-clipboard/clipboard';
import colors from '../../../utils/theme/colors';
import BottomDrawer from '../../../modules/UI/BottomDrawer';
import {useNavigation} from '@react-navigation/native';

const SwapTransactionComplete = ({txnDetails, closePreviewQuotation}) => {
  const navigation = useNavigation();
  const transactionCompleteBottomSheetRef = React.useRef();

  const openSheet = () => {
    transactionCompleteBottomSheetRef.current.open();
  };

  const closeSheet = () => {
    closePreviewQuotation();
    transactionCompleteBottomSheetRef.current.close();
  };

  React.useEffect(() => {
    openSheet();
  }, []);

  const viewOnExplorer = () => {
    if (txnDetails?.network === 'BNB Smart Chain (BEP20)') {
      Linking.openURL(`https://bscscan.com/tx/${txnDetails?.transactionHash}`);
    } else if (txnDetails?.network === 'Ethereum Mainnet') {
      Linking.openURL(`https://etherscan.io/tx/${txnDetails?.transactionHash}`);
    }
  };

  return (
    <BottomDrawer
      ref={transactionCompleteBottomSheetRef}
      onClose={() => {
        navigation.navigate('UserWalletHomeScreen');
      }}
      customHeight={Dimensions.get('screen').height * 0.7}
      borderColor>
      <View style={styles.root}>
        <View style={styles.header}>
          <HeadText style={{color: 'white'}}>Transaction complete</HeadText>
          <SuccessfullIcon />
        </View>
        <TouchableOpacity
          onPress={() => {
            Clipboard.setString(txnDetails.transactionHash);
            Alert.alert('Transaction hash copied');
          }}
          style={{
            flexDirection: 'row',
            margin: 40,
            padding: 10,
            backgroundColor: colors.neutral[800],
            borderRadius: 10,
          }}>
          <CopyIcon />
          <NormalText style={{marginHorizontal: 10, fontSize: 10}}>
            {txnDetails?.transactionHash}
          </NormalText>
        </TouchableOpacity>
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
            onPress={closeSheet}
            buttonColor="transparent"
            labelStyle={styles.okButtonContainer}
            style={styles.okButton}
            textColor="white">
            Sounds, Good!!!
          </Button>
        </View>
      </View>
    </BottomDrawer>
  );
};
export default SwapTransactionComplete;

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.neutral[950],
    height: '100%',
  },
  header: {
    backgroundColor: colors.neutral[950],
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  viewOnExplorerButton: {
    textAlign: 'center',
    padding: 4,
    marginHorizontal: 30,
    borderRadius: 4,
    textTransform: 'uppercase',
  },
  confirmButton: {
    marginHorizontal: 30,
    marginVertical: 10,
    backgroundColor: colors.neutral[100],
    borderColor: colors.neutral[400],
    borderWidth: 1,
    borderRadius: 4,
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
  bottomButtonContainer: {},
});
