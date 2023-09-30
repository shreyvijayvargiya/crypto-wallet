import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import {BellIcon} from '../../modules/Icons';
import colors from '../../utils/theme/colors';
import {HeadingText} from '../../modules/UI/CustomText';
import {BottomTabNavigation, HeaderComponent} from '../../modules';
import {useNavigation} from '@react-navigation/native';

const StakingScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <HeaderComponent>
        <View style={styles.navbar}>
          <TouchableOpacity
            style={styles.logoContainer}
            onPress={() => navigation.navigate('LandingScreen')}>
            <Image
              source={require('../../assets/screensLogo/prompt-market-logo.png')}
              style={styles.logo}
            />
            <Text>Staking</Text>
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
      </HeaderComponent>
      <BottomTabNavigation />
    </View>
  );
};

export default StakingScreen;

export const styles = StyleSheet.create({
  root: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: colors.neutral[950],
    paddingTop: Platform.OS === 'ios' ? 50 : 0,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  userAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userProfile: {
    width: 30,
    height: 30,
    marginLeft: 10,
    borderRadius: 4,
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
    // borderTopWidth: 1,
    borderBottomColor: colors.neutral[800],
    borderTopColor: colors.neutral[800],
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 10,
    objectFit: 'contain',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
