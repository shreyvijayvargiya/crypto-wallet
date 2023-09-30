import React, {useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {NormalText} from '../../../modules/UI/CustomText';
import Clipboard from '@react-native-clipboard/clipboard';
import colors from '../../../utils/theme/colors';
import Web3 from 'web3';
import TokensList from '../../../modules/UI/TokensList';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import withWalletConnectProvider from '../WalletScreensRootProvider';

const SelectSendToken = () => {
  const navigation = useNavigation();
  const [recipientAddress, setRecipientAddress] = useState(
    '0x51D3Ff1D169A12c496001825f8931c031B1257ac',
  );
  // '0xbB89D19081DeE0abcd62908bA9E6F8BDC0DCf436',
  const [status, setStatus] = useState('');
  const [activeToken, setActiveToken] = useState(null);

  const appStore = useSelector(state => state.reducer);
  const handleBlur = async () => {
    const isValid = Web3.utils.isAddress(recipientAddress);
    if (!isValid) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };

  const handleSelect = item => {
    setActiveToken(item);
    navigation.navigate('SendTokenScreen', {
      activeToken: item,
      recipientAddress,
    });
  };

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.draggableIcon} />
        <NormalText isCenter>Send</NormalText>
        <NormalText>To: Name, ENS, or address</NormalText>
        <View style={styles.flexContainer}>
          <TextInput
            onChangeText={value => {
              setRecipientAddress(value);
            }}
            mode="text"
            onBlur={handleBlur}
            value={recipientAddress}
            error={status}
            placeholderTextColor={colors.neutral[400]}
            contentStyle={{fontSize: 12, ...styles.walletNameInputLabel}}
            style={styles.walletNameInput}
          />
          <TouchableOpacity
            style={styles.pasteButton}
            onPress={async () => {
              const string = await Clipboard.getString();
              console.log(string);
              setRecipientAddress(string);
            }}>
            <NormalText>PASTE</NormalText>
          </TouchableOpacity>
        </View>
        {status && (
          <NormalText style={{margin: 10, color: colors.red[600]}}>
            Invalid address
          </NormalText>
        )}
        <View>
          <TokensList
            customTokens={appStore.activeWalletTokens}
            hideHeader
            onSelect={item => handleSelect(item)}
          />
        </View>
        {/* <View style={{marginBottom: 40}}>
          <NormalText>Popular tokens</NormalText>
          <HorizontalDividerComponent />
          <TokensList hideHeader onSelect={item => handleSelect(item)} />
        </View> */}
      </View>
    </View>
  );
};
export default withWalletConnectProvider(SelectSendToken);

const styles = StyleSheet.create({
  root: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: colors.black,
  },
  container: {
    padding: 10,
    marginVertical: 50,
    backgroundColor: colors.neutral[1000],
    height: '100%',
  },
  draggableIcon: {
    width: 100,
    height: 2,
    borderRadius: 100,
    backgroundColor: colors.neutral[600],
    marginBottom: 20,
    alignSelf: 'center',
  },
  walletNameInput: {
    backgroundColor: 'transparent',
    color: 'white',
    borderWidth: 0,
    width: '80%',
  },
  walletNameInputLabel: {
    borderWidth: 0,
    color: 'white',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[700],
  },
  pasteButton: {
    borderWidth: 1,
    borderColor: colors.neutral[500],
    padding: 4,
  },
});
