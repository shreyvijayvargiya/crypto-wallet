import {generateWalletFromMnemonic} from './src/packages/apis/web3';
import {getActiveNetworkTokenBalances} from './src/packages/apis/web3/walletApi';

const {
  checkTokenSwapAllowance,
  getKyberSwapApiTokenAllowance,
  performSwap,
  swapTokenViaKyberSwapApi,
} = require('./src/packages/apis/web3/swapTokenApi');
const {getNetworkDefaultTokens} = require('./src/packages/hooks');

const walletAddress = '0x9d733f2a7584D5E51956a990c1212537579ed145';
const network = 'BNB Smart Chain (BEP20)';
const ethNetwork = 'Ethereum';
const polygonNetwork = 'Polygon';
const senderAddress = '0x6131B5fae19EA4f9D964eAc0408E4408b66337b5';
const privateKey =
  '0x57eb218fcebead9c56b59533fe7b4636e19c9a99b3284b0942eee5cda24b364a';
const mnemonic =
  'brain weekend dawn language dolphin absurd episode quiz power mesh shrimp logic';
const TOKENS = getNetworkDefaultTokens(network);
const tokenA = TOKENS[0]; // USDT Token
const tokenB = TOKENS[1];
const tokenAddress = tokenA.contractAddress;

export const checkingTokenSwapAllowance = async () => {
  const allowance = await checkTokenSwapAllowance({
    walletAddress,
    tokenAddress,
    network,
    senderAddress,
  });
  console.log(`${tokenA.name} has ${allowance} allowance`);
};

export const invokingKyberGetApi = async () => {
  const res = await getKyberSwapApiTokenAllowance({
    src: tokenA.contractAddress,
    dst: tokenB.contractAddress,
    amount: '1',
    network,
  });
  console.log(res, 'response in invoking kyber GET API for swap');
  return res;
};

export const invokingKyberPostApi = async () => {
  let txnQuote = {
    data: null,
  };
  txnQuote.data = await invokingKyberGetApi();
  const {gasPrice} = txnQuote.data.routeSummary;
  const swapKyberTxnQuote = await swapTokenViaKyberSwapApi({
    sender: walletAddress,
    recipient: senderAddress,
    network,
    slippageTolerance: 1,
    routeSummary: txnQuote.data.routeSummary,
  });
  const res = await performSwap({
    walletAddress,
    network,
    txnQuote: swapKyberTxnQuote,
    privateKey,
    gasPrice,
  });
  console.log(res, 'response of Kyberswap POST API & Perform Swap');
};

export const fetchingAddressBalanceForDefaultTokens = async () => {
  const balance = await getActiveNetworkTokenBalances({
    walletAddress,
    network: network,
  });
  console.log(balance, 'balance');
};

export const getWalletFromSeedPhrase = async () => {
  const startTime = Date.now();
  const wallet = await generateWalletFromMnemonic(mnemonic, ethNetwork);
  const endTime = Date.now();
  console.log('Time Taken', (endTime - startTime) / 1000);
  console.log(wallet, 'wallet');
};
export const runTestApis = () => {
  // checkingTokenSwapAllowance();
  invokingKyberPostApi();
  // fetchingAddressBalanceForDefaultTokens();
  // getWalletFromSeedPhrase();
};
