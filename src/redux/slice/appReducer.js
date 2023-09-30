import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  wallets: [],
  activeWallet: {
    walletAddress: null,
    balance: null,
    network: null,
  },
  userWallets: [{walletAddress: null, balance: null}],
  allTokens: null,
  tokensPrices: null,
  favouriteTokens: [],
  activeWalletTokens: [],
  userImportedTokens: [],
};
const walletSlice = createSlice({
  name: 'userWallet',
  initialState,
  reducers: {
    addUserWallets: (state, action) => ({...state, userWallets: action.payload}),
    addActiveWallet: (state, action) => ({...state, activeWallet: action.payload}),
    addUserImportedTokens: (state, action) => ({...state, userImportedTokens: action.payload}),
    addAllTokens: (state, action) => ({...state, allTokens: action.payload}),
  },
});
export const {
  addWallet,
  addActiveWallet,
  addTokenPrices,
  addFavouriteToken,
  addActiveWalletTokens,
  addImportedTokens,
  addAllTokens,
} = walletSlice.actions;
export const reducer = walletSlice.reducer;
