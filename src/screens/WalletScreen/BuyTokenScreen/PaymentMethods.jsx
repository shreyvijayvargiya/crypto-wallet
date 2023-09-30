import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {View} from 'react-native';
import colors from '../../../utils/theme/colors';
import {NormalText} from '../../../modules/UI/CustomText';

const PaymentMethod = () => {
  return <View style={styles.root}></View>;
};

export default PaymentMethod;

const styles = StyleSheet.create({
  root: {
    padding: 0,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
});
