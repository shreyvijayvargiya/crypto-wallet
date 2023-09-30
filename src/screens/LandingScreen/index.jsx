import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import colors from '../../utils/theme/colors';
import {
  BellIcon,
  EyeIcon,
  HelpIcon,
  InfoIcon,
  SettingsIcon,
} from '../../modules/Icons';
import {useNavigation} from '@react-navigation/native';
import {CustomText, HeadingText, NormalText} from '../../modules/UI/CustomText';
import BitCoinPrice from './BitcoinsPriceComponent';
import {useSelector} from 'react-redux';

export const navigationsRoutes = [
  {
    name: 'ChainGPT Pad',
    img: require('../../assets/screensLogo/launchpad-logo.png'),
    routeName: 'LaunchPadScreen',
    routeLink: 'https://pad.chaingpt.org/',
  },
  {
    name: 'Wallet',
    img: require('../../assets/screensLogo/wallet-logo.png'),
    routeName: 'WalletScreenStack',
  },
  {
    name: 'Prompt Market',
    img: require('../../assets/screensLogo/prompt-market-logo.png'),
    routeName: 'PromptMarketScreen',
  },
  {
    name: 'Staking',
    img: require('../../assets/screensLogo/staking-logo.png'),
    routeName: 'StakingScreen',
  },
  {
    name: 'DAO',
    img: require('../../assets/screensLogo/dao-logo.png'),
    routeName: 'DAOScreen',
  },
  {
    name: 'AI News',
    img: require('../../assets/screensLogo/ai-logo.png'),
    routeName: 'AIScreen',
  },
];

export const aiRoutes = [
  {
    name: 'ChainGPT Chat Bot',
    img: require('../../assets/screensLogo/chat-bot-logo.png'),
  },
  {
    name: 'AI NFT generator',
    img: require('../../assets/screensLogo/ai-generator-logo.png'),
  },
  {
    name: 'Smart-Contract Generator',
    img: require('../../assets/screensLogo/smart-contract-generator-logo.png'),
  },
  {
    name: 'Smart-Contract Auditor',
    img: require('../../assets/screensLogo/smart-contract-auditor-logo.png'),
  },
  {
    name: 'Ask Crypto People',
    img: require('../../assets/screensLogo/ask-crypto-people-logo.png'),
  },
  {
    name: 'AI Trading Assistant',
    img: require('../../assets/screensLogo/ai-assistant-logo.png'),
  },
];

const LandingScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <View style={styles.navbar}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            width={20}
            height={20}
          />
        </TouchableOpacity>
        <View style={styles.userAvatar}>
          <TouchableOpacity>
            <BellIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../assets/photo-mask.png')}
              style={styles.userProfile}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.body}>
        {/* <TaperedBorder /> */}
        <BitCoinPrice />
        <View style={styles.usercgptbalanceContainer}>
          <View style={styles.flexContainer}>
            <HeadingText>500 CGPT</HeadingText>
            <TouchableOpacity>
              <EyeIcon />
            </TouchableOpacity>
          </View>
          <CustomText>Staked CGPT Balance ~ 500 CGPT</CustomText>
          <CustomText>Rewards from Staking ~ 0.94 CGPT</CustomText>
          <CustomText>Staked CGPT Value ~ 0.94 CGPT</CustomText>
        </View>
        <NormalText
          style={{
            fontSize: 18,
            marginHorizontal: 10,
            textTransform: 'uppercase',
            color: colors.neutral[400],
            marginVertical: 10,
          }}>
          Navigation
        </NormalText>
        <View style={styles.navigationRoutesContainer}>
          {navigationsRoutes.map(item => (
            <TouchableOpacity
              key={item.name}
              style={styles.routeCard}
              onPress={() => navigation.navigate(item.routeName)}>
              <Image source={item.img} style={styles.routesImg} />
              <Text style={styles.routeNameText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <NormalText
          style={{
            fontSize: 18,
            marginHorizontal: 10,
            textTransform: 'uppercase',
            color: colors.neutral[400],
            marginVertical: 10,
          }}>
          Solutions
        </NormalText>
        <View style={styles.aiToolsContainer}>
          {aiRoutes.map(item => (
            <TouchableOpacity key={item.name} style={styles.toolsCard}>
              <Image source={item.img} style={styles.routesImg} />
              <Text style={styles.aiToolsNameText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.flexSettingsContainer}>
          <TouchableOpacity style={styles.flexCard}>
            <SettingsIcon />
            <Text>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flexCard}>
            <HelpIcon />
            <Text>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flexCard}>
            <InfoIcon />
            <Text>Info</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default LandingScreen;

export const styles = StyleSheet.create({
  root: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: colors.neutral[950],
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    backgroundColor: colors.dark,
    borderBottomColor: colors.neutral[800],
    borderTopColor: colors.neutral[800],
    paddingVertical: 16,
  },
  userAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginHorizontal: 10,
  },
  userProfile: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  body: {
    marginHorizontal: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.neutral[800],
  },
  usercgptbalanceContainer: {
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.neutral[800],
  },
  routesImg: {
    alignSelf: 'center',
    margin: 10,
  },
  navigationRoutesContainer: {
    flexWrap: 'wrap',
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
  },
  routeCard: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: colors.dark,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderColor: colors.neutral[800],
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  routeNameText: {
    color: colors.neutral[200],
    textAlign: 'center',
  },
  aiToolsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: colors.neutral[800],
    borderTopWidth: 0,
    borderRightWidth: 0,
    marginVertical: 10,
  },
  toolsCard: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.neutral[800],
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    width: '50%',
  },
  aiToolsNameText: {
    color: colors.neutral[200],
    textAlign: 'center',
    fontSize: 12,
  },
  flexSettingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.neutral[800],
    borderTopWidth: 0,
  },
  flexCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.neutral[800],
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
});
