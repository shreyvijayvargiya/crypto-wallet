/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import colors from '../../utils/theme/colors';
import {HistoryIcon, SettingsIcon, WalletIcon} from '../Icons';
import {useNavigation} from '@react-navigation/native';

const WalletBottomTabNavigation = () => {
  const navigation = useNavigation();
  const routes = navigation.getState();

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('UserWalletHomeScreen');
          }}>
          <View
            style={[
              {alignSelf: 'center', paddingVertical: 10, paddingHorizontal: 20},
              routes.index === 0 ? styles.activeRouteStyles : '',
            ]}>
            <WalletIcon style={{alignSelf: 'center'}} />
          </View>
          <Text style={{textAlign: 'center', color: 'white', margin: 4}}>
            Wallet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('WalletHistoryScreen');
          }}>
          <View
            style={[
              {alignSelf: 'center', paddingVertical: 10, paddingHorizontal: 20},
              routes.index === 1 ? styles.activeRouteStyles : '',
            ]}>
            <HistoryIcon style={{alignSelf: 'center'}} />
          </View>
          <Text style={{textAlign: 'center', color: 'white', margin: 4}}>
            History
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('WalletSettingScreen');
          }}>
          <View
            style={[
              {alignSelf: 'center', paddingVertical: 10, paddingHorizontal: 20},
              routes.index === 2 ? styles.activeRouteStyles : '',
            ]}>
            <SettingsIcon style={{alignSelf: 'center'}} />
          </View>
          <Text style={{textAlign: 'center', color: 'white', margin: 4}}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default WalletBottomTabNavigation;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderColor: colors.neutral[800],
    padding: 10,
    height: 100,
    backgroundColor: colors.neutral[1000],
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  activeRouteStyles: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.neutral[800],
    borderRadius: 10,
  },
});
