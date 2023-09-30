import React, {useRef} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {HomeIcon, LaunchPadIcon, WalletIcon} from '../Icons';
import colors from '../../utils/theme/colors';
import BottomDrawer from '../UI/BottomDrawer';
import {NormalText} from '../UI/CustomText';
import ChatBotBottomDrawerModule from '../ChatBotBottomDrawer';

const BottomTabNavigation = () => {
  const chatBotBottomSheetRef = useRef();

  return (
    <View style={styles.root}>
      <TouchableOpacity
        style={styles.drawerTab}
        onPress={() => chatBotBottomSheetRef.current.open()}>
        <View style={styles.divider} />
        <View style={styles.flexContainer}>
          <Image
            style={styles.logo}
            source={require('../../assets/screensLogo/chat-bot-logo.png')}
          />
          <NormalText>CGPT Chat Bot</NormalText>
        </View>
      </TouchableOpacity>
      <View style={styles.body}>
        <TouchableOpacity>
          <HomeIcon />
        </TouchableOpacity>
        <TouchableOpacity>
          <LaunchPadIcon />
        </TouchableOpacity>
        <TouchableOpacity>
          <WalletIcon />
        </TouchableOpacity>
      </View>
      <BottomDrawer ref={chatBotBottomSheetRef} customHeight={650}>
        <ChatBotBottomDrawerModule />
      </BottomDrawer>
    </View>
  );
};
export default BottomTabNavigation;

export const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 30,
    borderTopWidth: 1,
    borderColor: colors.neutral[950],
  },
  drawerTab: {
    backgroundColor: colors.neutral[900],
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  divider: {
    width: 40,
    padding: 2,
    borderRadius: 100,
    backgroundColor: colors.neutral[700],
  },
});
