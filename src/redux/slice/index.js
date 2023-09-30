import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  wallets: [],
  totalBalance: 0,
  activeWallet: {
    walletAddress: null,
    balance: null,
    network: null,
    privateKey: null,
    walletName: null,
  },
  tokensPrices: null,
  favouriteTokens: [],
  activeWalletTokens: [],
  allTokens: [],
  userImportedTokens: [],
  activeNetwork: 'Ethereum',
  isWalletConnectConnected: false,
  showWalletConnectProvider: false,
  allTokensMetadata: [],
};
const walletSlice = createSlice({
  name: 'userWallet',
  initialState,
  reducers: {
    addWallet: (state, action) => ({...state, wallets: action.payload}),
    addTotalBalance: (state, action) => {
      return {
        ...state,
        totalBalance: action.payload,
      };
    },
    addActiveWallet: (state, action) => {
      return {...state, activeWallet: action.payload};
    },
    addTokenPrices: (state, action) => ({
      ...state,
      tokensPrices: action.payload.data,
    }),
    addFavouriteToken: (state, action) => ({
      ...state,
      favouriteTokens: action.payload,
    }),
    addActiveWalletTokens: (state, action) => ({
      ...state,
      activeWalletTokens: action.payload,
    }),
    addActiveNetwork: (state, action) => ({
      ...state,
      activeNetwork: action.payload,
    }),
    addImportedTokens: (state, action) => {
      return {...state, importedTokens: action.payload};
    },
    addAllTokens: (state, action) => ({...state, allTokens: action.payload}),
    addAllTokensMetadata: (state, action) => ({
      ...state,
      allTokensMetadata: action.payload,
    }),
    toggleWalletConnectStatus: (state, action) => ({
      ...state,
      isWalletConnectConnected: action.payload,
    }),
    toggleWalletConnectProviderState: (state, action) => ({
      ...state,
      showWalletConnectProvider: action.payload,
    }),
  },
});
export const {
  addWallet,
  addTotalBalance,
  addActiveWallet,
  addTokenPrices,
  addFavouriteToken,
  addActiveWalletTokens,
  addImportedTokens,
  addAllTokens,
  addAllTokensMetadata,
  addActiveNetwork,
  toggleWalletConnectStatus,
  toggleWalletConnectProviderState,
} = walletSlice.actions;
export const reducer = walletSlice.reducer;
