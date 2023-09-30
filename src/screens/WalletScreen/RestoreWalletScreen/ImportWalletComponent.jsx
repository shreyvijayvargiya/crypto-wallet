import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {batch, useDispatch} from 'react-redux';
import {generateWalletFromMnemonic} from '../../../packages/apis/web3';
import {addActiveNetwork, addActiveWallet} from '../../../redux/slice';
import {Button, Modal, Portal} from 'react-native-paper';
import colors from '../../../utils/theme/colors';
import {
  HeadingText,
  NormalText,
  TitleText,
} from '../../../modules/UI/CustomText';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {validateMnemonic} from 'bip39';
import Clipboard from '@react-native-clipboard/clipboard';
import walletNameIcon from '../../../assets/vectors/walletNameXml.js';
import {SvgXml} from 'react-native-svg';

const ImportWalletComponent = ({}) => {
  const [mnemonic, setMnemonic] = useState(
    'brain weekend dawn language dolphin absurd episode quiz power mesh shrimp logic',
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [walletName, setWalletName] = useState('');
  const [wallet, setWallet] = useState();

  const handleImportWallet = async () => {
    setLoading(true);
    try {
      if (mnemonic.length < 12) {
        setLoading(false);
        setError('Invalid Recovery Phrase');
      }
      if (!validateMnemonic(mnemonic)) {
        setError('Invalid Recovery Phrase');
        setLoading(false);
        setShowModal(false);
      } else {
        const {newWallet, ethBalance} = await generateWalletFromMnemonic(
          mnemonic,
        );
        if (newWallet === undefined && ethBalance === undefined) {
          setLoading(false);
          setError('Error in importing wallet');
        } else {
          setWallet({
            walletAddress: newWallet.address,
            balance: ethBalance,
            privateKey: newWallet.privateKey,
            network: 'Ethereum',
            walletName,
          });
          batch(() => {
            dispatch(
              addActiveWallet({
                walletAddress: newWallet.address,
                balance: ethBalance,
                privateKey: newWallet.privateKey,
                network: 'Ethereum',
                walletName,
              }),
            );
            dispatch(addActiveNetwork('Ethereum'));
          });
          setLoading(false);
          setShowModal(true);
        }
      }
    } catch (e) {
      setLoading(false);
      setShowModal(false);
      console.log(e, 'error in importing wallet');
      setError('Invalid Recovery Phrase');
    }
  };

  const importWalletMethod = () => {
    dispatch(addActiveWallet(wallet));
    setShowModal(false);
    navigation.navigate('UserWalletHomeScreen', {
      screen: 'Home',
      params: {
        seedPhrase: mnemonic,
        showSeedPhraseScreens: true,
      },
    });
  };

  return (
    <ScrollView style={styles.root}>
      <View style={styles.bodyContainer}>
        <View>
          <HeadingText isCenter>Restore a wallet</HeadingText>
          <Text style={styles.caption}>
            Restore with recovery phrase or private key from ChainGPT or another
            crypto wallet
          </Text>
        </View>
        <View>
          <TextInput
            label="Mnemonic Phrase"
            value={mnemonic}
            error={error}
            placeholder="Enter 12 words seed phrase"
            placeholderTextColor={colors.neutral[400]}
            onChangeText={setMnemonic}
            style={[styles.input]}
            multiline
            numberOfLines={3}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
          <TouchableOpacity
            mode="text"
            textColor="white"
            onPress={() => {
              const value = Clipboard.getString();
              setMnemonic(value);
            }}
            style={styles.copyButton}>
            <NormalText style={{color: colors.neutral[100]}}>PASTE</NormalText>
          </TouchableOpacity>
        </View>
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
          style={[styles.importButtonLabelStyle, {width: '100%'}]}>
          <Button
            mode="text"
            onPress={handleImportWallet}
            labelStyle={styles.importTouchableOpacityLabelStyle}
            style={styles.button}
            textColor="white"
            loading={loading}
            buttonColor={colors.neutral[1000]}>
            Continue
          </Button>
        </LinearGradient>
      </View>
      <Portal>
        <Modal
          visible={showModal}
          onDismiss={() => setShowModal(false)}
          contentContainerStyle={styles.confirmModal}
          style={styles.confimModalContainer}>
          <View style={styles.confirmModal}>
            <SvgXml
              xml={walletNameIcon}
              width={100}
              height={100}
              style={{
                alignSelf: 'center',
                marginVertical: 20,
              }}
            />
            <TitleText
              isCenter
              style={{color: colors.normalTextColor, fontSize: 24}}>
              Name your wallet
            </TitleText>
            {wallet && (
              <View
                style={{
                  padding: 8,
                  backgroundColor: colors.neutral[800],
                  borderRadius: 8,
                  marginVertical: 10,
                  width: 160,
                  alignSelf: 'center',
                }}>
                <NormalText isCenter>
                  {wallet?.walletAddress.substring(0, 6)} ...
                  {wallet.walletAddress.substring(36, 42)}
                </NormalText>
              </View>
            )}
            <TextInput
              name="walletName"
              placeholder="Enter your wallet name"
              color="white"
              placeholderTextColor="white"
              style={styles.walletNameInput}
              onChangeText={setWalletName}
            />
            <View style={styles.buttonContainer}>
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
                style={{margin: 1, borderRadius: 8}}>
                <Button
                  mode="contained"
                  textColor="white"
                  buttonColor={colors.neutral[1000]}
                  style={styles.createWalletButtonContainer}
                  labelStyle={styles.createWalletButton}
                  onPress={importWalletMethod}>
                  Import Wallet
                </Button>
              </LinearGradient>
              <Button
                mode="outlined"
                textColor="white"
                buttonColor="transparent"
                onPress={() => setShowModal(false)}
                labelStyle={styles.cancelButton}
                style={styles.cancelButtonContainer}>
                Cancel
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </ScrollView>
  );
};

export default ImportWalletComponent;

const styles = StyleSheet.create({
  root: {
    padding: 0,
  },
  bodyContainer: {
    borderTopWidth: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Dimensions.get('screen').height * 0.8,
  },
  caption: {
    color: '#EFEFE599',
    textAlign: 'center',
    margin: 10,
  },
  container: {
    padding: 1,
  },
  input: {
    borderColor: colors.neutral[800],
    borderWidth: 0,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 4,
    marginVertical: 10,
    color: '#EFEFE599',
    fontSize: 18,
    textAlign: 'center',
  },
  errorInput: {
    color: 'white',
  },
  errorText: {
    color: colors.red[600],
    marginTop: 0,
    padding: 10,
    marginBottom: 10,
    alignSelf: 'center',
    borderColor: colors.neutral[800],
    borderWidth: 1,
    borderRadius: 4,
  },
  copyButton: {
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.neutral[400],
    padding: 8,
  },
  importTouchableOpacityLabelStyle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  importButtonLabelStyle: {
    margin: 1,
    textTransform: 'uppercase',
  },
  button: {
    borderRadius: 2,
    margin: 1,
    backgroundColor: colors.neutral[1000],
  },
  walletInfo: {
    marginTop: 16,
  },
  confirmModal: {
    backgroundColor: colors.neutral[1000],
    borderRadius: 20,
    margin: 20,
  },
  confimModalContainer: {
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    padding: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
  },

  createWalletButtonContainer: {
    borderRadius: 8,
    margin: 1,
  },
  createWalletButton: {
    padding: 2,
    width: '100%',
    textTransform: 'uppercase',
  },
  cancelButtonContainer: {
    marginVertical: 10,
    borderRadius: 8,
    borderColor: colors.neutral[200],
    opacity: 0.5,
    borderStyle: 'dotted',
  },
  cancelButton: {
    width: '100%',
    textTransform: 'uppercase',
  },
  createWalletbutton: {
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 4,
  },
  walletNameInput: {
    borderColor: colors.neutral[800],
    borderBottomWidth: 1,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 4,
    marginVertical: 10,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  walletNameErrorInput: {
    color: 'white',
    borderColor: '#ef4444',
    borderWidth: 1,
    borderRadius: 4,
  },
  walletNameErrorText: {
    color: '#ef4444',
    marginTop: 0,
    marginBottom: 10,
    textAlign: 'center',
  },
});
