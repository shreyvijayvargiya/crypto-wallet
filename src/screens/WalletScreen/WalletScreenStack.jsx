/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import WalletHistoryScreen from './WalletHistoryScreen';
import WalletSettingScreen from './WalletSettingScreen';
import WalletScreen from '.';
import CreatingWalletScreen from './CreatingWalletScreen';
import SendTokenScreen from './SendTokenScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ReceiveTokenScreen from './ReceiveTokenScreen';
import RestoreWalletScreen from './RestoreWalletScreen';
import UserWalletHomeScreen from './UserWalletHomeScreen';
import SelectSendToken from './SendTokenScreen/SelectSendToken';
import {useSelector} from 'react-redux';
import {
  BrowserIcon,
  HistoryIcon,
  SettingsIcon,
  WalletIcon,
} from '../../modules/Icons';
import {StyleSheet, View} from 'react-native';
import colors from '../../utils/theme/colors';
import SwapTokenScreen from './SwapTokenScreen';
import SwapTokenTransactionCompleteScreen from './TransactionCompleteScreen/SwapTokenTransactionScreen';
import WalletBrowserScreen from './WalletBrowserScreen';
import BuyTokenScreen from './BuyTokenScreen';
import WalletConnectModalScreen from './CreatingWalletScreen/WalletConnectModal';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const UserWalletTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={UserWalletHomeScreen}
        options={options => {
          const isActive = options.navigation.isFocused();
          return {
            headerShown: false,
            tabBarStyle: {
              backgroundColor: colors.neutral[950],
            },
            tabBarLabelStyle: {
              color: isActive ? 'white' : colors.neutral[400],
            },
            tabBarIcon: () => (
              <View
                style={[
                  {
                    padding: 4,
                  },
                  isActive ? styles.activeRouteStyles : '',
                ]}>
                <WalletIcon
                  style={{alignSelf: 'center'}}
                  color={isActive ? 'white' : colors.neutral[500]}
                />
              </View>
            ),
          };
        }}
      />
      <Tab.Screen
        name="WalletHistoryScreen"
        component={WalletHistoryScreen}
        options={options => {
          const isActive = options.navigation.isFocused();
          return {
            headerShown: false,
            tabBarStyle: {
              backgroundColor: colors.neutral[1000],
            },
            tabBarLabelStyle: {
              color: isActive ? 'white' : colors.neutral[400],
            },
            tabBarIcon: () => (
              <View
                style={[
                  {
                    alignSelf: 'center',
                    padding: 4,
                  },
                  isActive ? styles.activeRouteStyles : '',
                ]}>
                <HistoryIcon
                  style={{
                    alignSelf: 'center',
                  }}
                  color={isActive ? 'white' : colors.neutral[500]}
                />
              </View>
            ),
          };
        }}
      />
      <Tab.Screen
        name="Browser"
        component={WalletBrowserScreen}
        options={options => {
          const isActive = options.navigation.isFocused();
          return {
            headerShown: false,
            tabBarStyle: {
              backgroundColor: colors.neutral[1000],
            },
            tabBarLabelStyle: {
              color: isActive ? 'white' : colors.neutral[400],
            },
            tabBarIcon: () => (
              <View
                style={[
                  {
                    alignSelf: 'center',
                    padding: 4,
                  },
                  isActive ? styles.activeRouteStyles : '',
                ]}>
                <BrowserIcon
                  style={{
                    alignSelf: 'center',
                  }}
                  color={isActive ? 'white' : colors.neutral[500]}
                />
              </View>
            ),
          };
        }}
      />
      <Tab.Screen
        name="Setting"
        component={WalletSettingScreen}
        options={options => {
          const isActive = options.navigation.isFocused();
          return {
            headerShown: false,
            tabBarStyle: {
              backgroundColor: colors.neutral[950],
            },
            tabBarLabelStyle: {
              color: isActive ? 'white' : colors.neutral[400],
            },
            tabBarIcon: () => (
              <View
                style={[
                  {
                    alignSelf: 'center',
                    padding: 4,
                  },
                  isActive ? styles.activeRouteStyles : '',
                ]}>
                <SettingsIcon
                  style={{alignSelf: 'center'}}
                  color={isActive ? 'white' : colors.neutral[500]}
                />
              </View>
            ),
          };
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeRouteStyles: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: colors.neutral[800],
    borderRadius: 4,
  },
});
const WalletScreenStack = () => {
  const appStore = useSelector(state => state.reducer);
  return (
    <Stack.Navigator
      initialRouteName={
        appStore.activeWallet.privateKey || appStore.isWalletConnectConnected
          ? 'UserWalletHomeScreen'
          : 'WalletHomeScreen'
      }>
      <Stack.Screen
        name="WalletHomeScreen"
        component={WalletScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserWalletHomeScreen"
        component={UserWalletTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreatingWalletScreen"
        component={CreatingWalletScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WalletConnectModalScreen"
        component={WalletConnectModalScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RestoreWalletScreen"
        component={RestoreWalletScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SelectSendTokenScreen"
        component={SelectSendToken}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SendTokenScreen"
        component={SendTokenScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ReceiveTokenScreen"
        component={ReceiveTokenScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BuyTokenScreen"
        component={BuyTokenScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SwapTokenScreen"
        component={SwapTokenScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SwapTokenTransactionCompleteScreen"
        component={SwapTokenTransactionCompleteScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default WalletScreenStack;
