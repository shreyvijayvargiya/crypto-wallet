import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-community/async-storage';
import {TOKENS, BNB_TOKENS, POLYGON_TOKENS} from '../../constants/allTokens';
import {EvmChain} from '@moralisweb3/common-evm-utils';

export const saveCredentialInKeyChain = async credentials => {
  await Keychain.setGenericPassword(credentials.key, credentials.value);
};

export const getCredentialsFromKeyChain = async () => {
  return await Keychain.getGenericPassword();
};
export const storeDataInKeyChain = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('Error storing data:', error);
  }
};

export const retrieveData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log('Retrieved data:', value);
    } else {
      console.log('Data not found.');
    }
  } catch (error) {
    console.log('Error retrieving data:', error);
  }
};

export const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Data removed successfully.');
  } catch (error) {
    console.log('Error removing data:', error);
  }
};

export const getNetworkURL = name => {
  if (name === 'Ethereum') {
    return 'https://mainnet.infura.io/v3/d4f656f996564514bf8ac47a678f893e';
  } else if (name === 'GANACHE') {
    return 'HTTP://127.0.0.1:7545';
  } else if (
    name === 'BNB Smart Chain (BEP20)' ||
    name === 'BNB Smart Chain (BEP 20)'
  ) {
    return 'https://bsc-dataseed.binance.org';
  } else if (name === 'Polygon') {
    return 'https://rpc-mainnet.maticvigil.com/';
  }
};
export const getNetworkAbrv = name => {
  if (name === 'Ethereum') {
    return 'ethereum';
  } else if (
    name === 'BNB Smart Chain (BEP20)' ||
    name === 'BNB Smart Chain (BEP 20)'
  ) {
    return 'bsc';
  } else if (name === 'Polygon') {
    return 'polygon';
  } else {
    return 'ethereum';
  }
};
export const getNetworkHexString = name => {
  if (name === 'Ethereum') {
    return '0x1';
  } else if (
    name === 'BNB Smart Chain (BEP20)' ||
    name === 'BNB Smart Chain (BEP 20)'
  ) {
    return '0x38';
  } else {
    return '0x1';
  }
};
export const getNetworkDefaultTokens = name => {
  if (name === 'Ethereum') {
    return TOKENS;
  } else if (
    name === 'BNB Smart Chain (BEP20)' ||
    name === 'BNB Smart Chain (BEP 20)'
  ) {
    return BNB_TOKENS;
  } else if (name === 'Polygon') {
    return POLYGON_TOKENS;
  } else {
    return TOKENS;
  }
};

export const getNetworkChainId = name => {
  if (name === 'Ethereum') {
    return 1;
  } else if (name === 'GANACHE') {
    return 1337;
  } else if (
    name === 'BNB Smart Chain (BEP20)' ||
    name === 'BNB Smart Chain (BEP 20)'
  ) {
    return 56;
  } else if (name === 'Polygon') {
    return 137;
  } else if (name === 'Avalanche') {
    return 43114;
  } else if (name === 'Arbitrum') {
    return 42161;
  } else {
    return 1;
  }
};

export const getNetworkChainName = id => {
  if (id === 1) {
    return 'Ethereum';
  } else if (id === 'GANACHE') {
    return 1337;
  } else if (id === 56) {
    return 'BNB Smart Chain (BEP20)';
  } else if (id === 137) {
    return 'Polygon';
  } else if (id === 43114) {
    return 'Avalanche';
  } else if (id === 42161) {
    return 'Arbitrum';
  } else {
    return 'Ethereum';
  }
};

export const getNetworkDefaultTokenDetails = name => {
  if (name === 'Ethereum') {
    return {
      tokenName: 'ETH',
      tokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    };
  } else if (
    name === 'BNB Smart Chain (BEP20)' ||
    name === 'BNB Smart Chain (BEP 20)'
  ) {
    return {
      tokenName: 'BNB',
      tokenAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    };
  } else if (name === 'Polygon') {
    return {
      tokenName: 'MATIC',
      tokenAddress: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
    };
  } else {
    return {
      tokenName: 'ETH',
      tokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    };
  }
};

export const getNetworkChainMoralis = network => {
  if (network === 'BNB Smart Chain (BEP20)') {
    return EvmChain.BSC;
  } else if (network === 'Ethereum Mainnet') {
    return EvmChain.ETHEREUM;
  } else if (network === 'Polygon') {
    return EvmChain.POLYGON;
  } else {
    return EvmChain.ETHEREUM;
  }
};

export const getBuyTokensProviderNetworkName = network => {
  if (network === 'BNB Smart Chain (BEP20)') {
    return 'binance';
  } else if (network === 'Ethereum Mainnet') {
    return 'ethereum';
  } else if (network === 'Polygon') {
    return 'polygon';
  } else {
    return 'ethereum';
  }
};
