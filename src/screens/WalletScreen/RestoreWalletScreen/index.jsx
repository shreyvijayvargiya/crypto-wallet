import React from 'react';
import ImportWalletComponent from './ImportWalletComponent';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import colors from '../../../utils/theme/colors';

const RestoreWalletComponent = () => {
  return (
    <View style={styles.root}>
      <View style={styles.draggableIcon} />
      <ImportWalletComponent />
    </View>
  );
};

const RestoreWalletScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.black,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        zIndex: 0,
      }}>
      <RestoreWalletComponent />
    </View>
  );
};
export default RestoreWalletScreen;

export const styles = StyleSheet.create({
  root: {
    padding: 20,
    marginTop: 50,
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
    width: 50,
    height: 2,
    borderRadius: 100,
    backgroundColor: colors.neutral[400],
    marginBottom: 10,
    alignSelf: 'center',
  },
  confirmModal: {
    padding: 20,
    backgroundColor: colors.neutral[1000],
    borderRadius: 40,
    margin: 20,
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
    padding: 6,
    width: '100%',
    textTransform: 'uppercase',
  },
  importWalletButtonContainer: {
    marginVertical: 10,
    borderRadius: 8,
    borderColor: colors.neutral[200],
  },
  importWalletButton: {
    width: '100%',
    textTransform: 'uppercase',
  },
  button: {
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 4,
  },
  input: {
    borderColor: colors.neutral[800],
    borderBottomWidth: 1,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 4,
    marginVertical: 10,
    fontSize: 18,
    color: 'white',
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
