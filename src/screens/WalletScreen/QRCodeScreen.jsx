import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../../utils/theme/colors';
import QRCode from 'react-native-custom-qr-codes';

const QRCodeComponent = () => {
  return (
    <View style={styles.root}>
      <View style={styles.closeIcon}>
        <QRCode logo={require('../../assets/cgpt-logo.png')} />
      </View>
    </View>
  );
};

export default QRCodeComponent;

const styles = StyleSheet.create({
  root: {
    padding: 20,
    backgroundColor: colors.neutral[950],
  },
  closeIcon: {
    width: 50,
    height: 2,
    borderRadius: 100,
    backgroundColor: colors.neutral[400],
    marginBottom: 40,
    alignSelf: 'center',
  },
});
