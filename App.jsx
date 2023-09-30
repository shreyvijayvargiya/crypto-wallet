import React from 'react';
import {StatusBar, Text} from 'react-native';
import {
  CoinDetailScreen,
  LandingScreen,
  AINewsScreen,
  PromptMarketScreen,
  LaunchPadScreen,
  DAOScreen,
  StakingScreen,
} from './src/screens';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import colors from './src/utils/theme/colors';
import WalletScreenStack from './src/screens/WalletScreen/WalletScreenStack';
import RootProvider from './RootProvider';
const Stack = createNativeStackNavigator();

Text.defaultProps = {
  ...Text.defaultProps,
  style: {color: 'white'},
};

const App = () => {
  return (
    <RootProvider>
      <NavigationContainer>
        <StatusBar
          backgroundColor={colors.neutral[950]}
          barStyle="light-content"
        />
        <Stack.Navigator initialRouteName="LandingScreen">
          <Stack.Screen
            name="LandingScreen"
            component={LandingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WalletScreenStack"
            component={WalletScreenStack}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CoinDetailsScreen"
            component={CoinDetailScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="StakingScreen"
            component={StakingScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AINewsScreen"
            component={AINewsScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PromptMarketScreen"
            component={PromptMarketScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="LaunchPadScreen"
            component={LaunchPadScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DAOScreen"
            component={DAOScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RootProvider>
  );
};

export default App;
