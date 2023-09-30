/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {ArrowUpTiltIcon} from '../../../modules/Icons';
import colors from '../../../utils/theme/colors';
import {CardLayout, HorizontalDividerComponent} from '../../../modules';
import {
  HeadingText,
  NormalText,
  TitleText,
} from '../../../modules/UI/CustomText';
import {useNavigation} from '@react-navigation/native';
import {
  WalletConnectModal,
  useWalletConnectModal,
} from '@walletconnect/modal-react-native';
import WalletConnectModalComponent from './WalletConnectModal';
import {WALLET_CONNECT_PROJECT_ID, providerMetadata} from '../../../constants';

const CreatingWalletScreenComponent = () => {
  const {open, isConnected, provider, address, isOpen} =
    useWalletConnectModal();
  const [click, setClick] = useState(false);

  const handleWalletConnect = async () => {
    if ((!isConnected, !isOpen)) {
      open();
    } else if (isConnected) {
      provider?.disconnect();
    }
  };
  React.useEffect(() => {
    if (isConnected && !isOpen && address) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [isConnected]);

  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <View style={{alignSelf: 'center'}}>
        <View style={styles.draggableIcon} />
        <HeadingText isCenter style={{marginVertical: 10}}>
          Add your first wallet
        </HeadingText>
        <Text>Import your own wallet or watch someone else’s</Text>
      </View>
      <View style={{marginVertical: 20}}>
        <CardLayout
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../assets/icons/wallet-connect-icon.png')}
            style={{marginRight: 10}}
            width={30}
            height={30}
          />
          <HorizontalDividerComponent />
        </CardLayout>
        <CardLayout>
          <TouchableOpacity onPress={handleWalletConnect}>
            <TitleText style={{marginBottom: 10}}>Wallet connect</TitleText>
            <NormalText style={{color: colors.neutral[400]}}>
              Instead of creating new accounts and passwords on every website,
              just connect your wallet.
            </NormalText>
            <ArrowUpTiltIcon
              color={colors.neutral[600]}
              style={{alignSelf: 'flex-end', transform: [{rotate: '30deg'}]}}
            />
          </TouchableOpacity>
        </CardLayout>
        <CardLayout
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../assets/icons/lock-icon.png')}
            style={{marginRight: 10}}
            width={30}
            height={30}
          />
          <HorizontalDividerComponent />
        </CardLayout>
        <CardLayout>
          <TouchableOpacity
            onPress={() => navigation.navigate('RestoreWalletScreen')}>
            <TitleText style={{marginBottom: 10}}>
              Restore with a recovery phrase or private key
            </TitleText>
            <NormalText style={{color: colors.neutral[400]}}>
              Use your recovery phrase from ChaiGPT Wallet or another crypto
              wallet.
            </NormalText>
            <ArrowUpTiltIcon
              color={colors.neutral[600]}
              style={{alignSelf: 'flex-end', transform: [{rotate: '30deg'}]}}
            />
          </TouchableOpacity>
        </CardLayout>
      </View>
      {!isConnected && (
        <WalletConnectModal
          projectId={WALLET_CONNECT_PROJECT_ID}
          providerMetadata={providerMetadata}
          themeMode="dark"
        />
      )}
      {click && <WalletConnectModalComponent />}
    </View>
  );
};

const CreatingWalletScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.neutral[950],
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
      }}>
      <CreatingWalletScreenComponent />
    </View>
  );
};

export default CreatingWalletScreen;

export const styles = StyleSheet.create({
  root: {
    padding: 20,
    marginTop: 40,
    backgroundColor: colors.neutral[1000],
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
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
});
