import React from 'react';
import {View, Platform, StyleSheet, Dimensions} from 'react-native';
import colors from '../../utils/theme/colors';

const HeaderComponent = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

export default HeaderComponent;

export const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: colors.neutral[950],
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 0,
    left: 0,
    right: 0,
  },
});
