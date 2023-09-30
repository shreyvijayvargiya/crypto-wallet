import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {BellIcon} from '../../modules/Icons';
import colors from '../../utils/theme/colors';
import {HeadText, HeadingText} from '../../modules/UI/CustomText';
import {BottomTabNavigation} from '../../modules';

const LaunchPadScreen = () => {
  return (
    <View style={styles.root}>
      <View style={styles.navbar}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/screensLogo/dao-logo.png')}
            style={styles.logo}
          />
          <HeadText>CGPT DAO</HeadText>
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
      <BottomTabNavigation />
    </View>
  );
};

export default LaunchPadScreen;

export const styles = StyleSheet.create({
  root: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: colors.neutral[950],
    paddingTop: Platform.OS === 'ios' ? 50 : 0,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    position: 'relative',
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
    borderBottomColor: colors.neutral[800],
    borderTopColor: colors.neutral[800],
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
});
