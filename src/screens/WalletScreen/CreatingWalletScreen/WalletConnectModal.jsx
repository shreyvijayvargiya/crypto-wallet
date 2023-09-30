/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import {NormalText, TitleText} from '../../../modules/UI/CustomText';
import {Button, Modal, Portal} from 'react-native-paper';
import colors from '../../../utils/theme/colors';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {batch, useDispatch} from 'react-redux';
import {
  addActiveNetwork,
  addActiveWallet,
  toggleWalletConnectConnectedState,
  toggleWalletConnectStatus,
} from '../../../redux/slice';
import {
  WalletConnectModal,
  useWalletConnectModal,
} from '@walletconnect/modal-react-native';
import {WALLET_CONNECT_PROJECT_ID, providerMetadata} from '../../../constants';

const WalletConnectModalComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [walletName, setWalletName] = useState('');
  const {isConnected, provider, address, isOpen} = useWalletConnectModal();
  const [showModal, setShowModal] = useState(
    isConnected && address ? true : false,
  );

  const moveToUserWalletScreen = async () => {
    if (isConnected && address) {
      batch(() => {
        dispatch(
          addActiveWallet({
            walletAddress: address,
            balance: 0,
            walletName,
            privateKey: false,
            network: 'Ethereum',
          }),
        );
        dispatch(addActiveNetwork('Ethereum'));
        dispatch(toggleWalletConnectStatus(true));
      });
      setShowModal(false);
      navigation.navigate('UserWalletHomeScreen');
    }
  };

  const changeGlobalAppWalletConnectionState = async () => {
    if (isConnected && provider) {
      setShowModal(true);
      dispatch(toggleWalletConnectStatus(true));
    }
  };
  React.useEffect(() => {
    changeGlobalAppWalletConnectionState;
  }, [isConnected, provider]);

  React.useEffect(() => {
    if (!isConnected && showModal) {
      setShowModal(false);
    } else if (isConnected) {
      batch(() => {
        dispatch(
          addActiveWallet({
            walletAddress: address,
            balance: 0,
            walletName: null,
            privateKey: false,
            network: 'Ethereum',
          }),
        );
        dispatch(addActiveNetwork('Ethereum'));
      });
    } else if (!isOpen && isConnected) {
      setShowModal(true);
    }
  }, [isConnected, showModal]);

  return (
    <View style={styles.root}>
      <Modal
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        contentContainerStyle={styles.confirmModal}
        style={styles.confimModalContainer}>
        <View style={styles.confirmModal}>
          <Image
            source={require('../../../assets/screensLogo/chat-bot-logo.png')}
            width={200}
            height={200}
            style={{
              alignSelf: 'center',
              marginVertical: 20,
            }}
          />
          <TitleText isCenter>Name your wallet</TitleText>
          {isConnected && address && (
            <View
              style={{
                padding: 10,
                backgroundColor: colors.neutral[800],
                borderRadius: 10,
                alignSelf: 'center',
                marginVertical: 10,
              }}>
              <NormalText isCenter>{address}</NormalText>
            </View>
          )}
          <TextInput
            name="walletName"
            placeholder="Enter your wallet name"
            placeholderTextColor={colors.neutral[400]}
            color="white"
            style={styles.input}
            onChangeText={setWalletName}
          />
          <View style={styles.buttonContainer}>
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
              style={{margin: 1, borderRadius: 8}}>
              <Button
                mode="contained"
                textColor="white"
                buttonColor={colors.neutral[1000]}
                style={styles.createWalletButtonContainer}
                labelStyle={styles.createWalletButton}
                onPress={moveToUserWalletScreen}>
                Import Wallet
              </Button>
            </LinearGradient>
            <Button
              mode="outlined"
              textColor="white"
              buttonColor="transparent"
              onPress={() => setShowModal(false)}
              labelStyle={styles.importWalletButton}
              style={styles.importWalletButtonContainer}>
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WalletConnectModalComponent;

export const styles = StyleSheet.create({
  root: {
    backgroundColor: 'transparent',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    zIndex: 1,
    position: 'absolute',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  draggableIcon: {
    width: 100,
    height: 2,
    borderRadius: 100,
    backgroundColor: colors.neutral[600],
    marginBottom: 20,
    alignSelf: 'center',
  },
  confirmModal: {
    paddingHorizontal: 10,
    backgroundColor: colors.neutral[1000],
    borderRadius: 40,
    margin: 10,
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
  walletsButtonContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 10,
    right: 20,
    left: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
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
  importWalletButtonContainer: {
    marginVertical: 10,
    borderRadius: 8,
    borderColor: colors.neutral[500],
  },
  importWalletButton: {
    width: '100%',
    textTransform: 'uppercase',
    color: colors.neutral[400],
    opacity: 0.7,
  },
  button: {
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 4,
  },
  input: {
    borderColor: colors.neutral[800],
    borderBottomWidth: 1,
    padding: 10,
    borderRadius: 4,
    marginVertical: 40,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  errorInput: {
    color: 'white',
    borderColor: '#ef4444',
    borderWidth: 1,
    borderRadius: 4,
  },
  errorText: {
    color: '#ef4444',
    marginTop: 0,
    marginBottom: 10,
    textAlign: 'center',
  },
});
