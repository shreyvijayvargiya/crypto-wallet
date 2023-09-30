import React from 'react';
import {StyleSheet} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {NormalText} from './CustomText';

const Toast = ({visible, setVisible, label}) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={() => setVisible(false)}
      style={styles.root}>
      <NormalText isCenter>{label}</NormalText>
    </Snackbar>
  );
};
export default Toast;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 50,
    width: '98%',
    alignSelf: 'center',
    left: 10,
    right: 10,
    zIndex: 100,
    textAlign: 'center',
  },
});
