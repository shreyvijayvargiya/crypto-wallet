import Web3 from 'web3';
import customAxios from '../..';
import {getNetworkAbrv, getNetworkChainId, getNetworkURL} from '../../hooks';
import TOKEN_ABI from '../../../abis/erc20.json';
import {store} from '../../../redux/store';

export const checkTokenSwapAllowance = async ({
  walletAddress,
  tokenAddress,
  network,
  senderAddress,
}) => {
  try {
    const networkUrl = getNetworkURL(network);
    const web3 = new Web3(new Web3.providers.HttpProvider(networkUrl));
    const tokenContract = new web3.eth.Contract(TOKEN_ABI, tokenAddress);
    const res = await tokenContract.methods
      .allowance(walletAddress, senderAddress)
      .call();
    return res;
  } catch (e) {
    console.log(e, 'error in checking token allowance');
    return 0;
  }
};

export const approveTokenForSwap = async ({
  tokenAddress,
  walletAddress,
  network,
  allowanceAmount,
  senderAddress,
  privateKey,
}) => {
  try {
    const networkUrl = getNetworkURL(network);
    const web3 = new Web3(new Web3.providers.HttpProvider(networkUrl));
    const tokenContract = new web3.eth.Contract(TOKEN_ABI, tokenAddress);
    const txnObject = await tokenContract.methods.approve(
      senderAddress,
      allowanceAmount,
    );
    const dataStr = txnObject.encodeABI();
    const gas = await txnObject.estimateGas({from: walletAddress});
    const estimateGas = await txnObject.estimateGas({from: walletAddress});
    const signedTx = await web3.eth.accounts.signTransaction(
      {
        from: walletAddress,
        to: tokenAddress,
        data: dataStr,
        gasLimit: web3.utils.toHex(estimateGas),
        gas,
      },
      privateKey,
    );

    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
    );
    return receipt.transactionHash;
  } catch (e) {
    console.log(e, 'error in giving token approve');
    return null;
  }
};

export const approveTokenForSwapViaWalletConnect = async ({
  tokenAddress,
  walletAddress,
  network,
  allowanceAmount,
  senderAddress,
  provider,
}) => {
  try {
    const web3 = new Web3(provider);
    const tokenContract = new web3.eth.Contract(TOKEN_ABI, tokenAddress);
    const txnObject = await tokenContract.methods.approve(
      senderAddress,
      allowanceAmount,
    );
    const dataStr = txnObject.encodeABI();
    const gas = await txnObject.estimateGas({from: walletAddress});
    const estimateGas = await txnObject.estimateGas({from: walletAddress});

    const txn = {
      from: walletAddress,
      to: tokenAddress,
      data: dataStr,
      gasLimit: web3.utils.toHex(estimateGas),
      gas,
      chain: getNetworkChainId(network),
    };

    const receipt = await web3.eth.sendTransaction(txn);
    return {data: receipt, status: true};
  } catch (e) {
    console.log(e, 'error in giving token approve');
    return {data: undefined, status: false};
  }
};

export const getKyberSwapApiTokenAllowance = async ({
  src,
  dst,
  amount,
  network,
}) => {
  try {
    const chain = getNetworkAbrv(network);
    let formatAmount = amount.toString();
    if (amount === undefined || Number(amount) === 0) {
      formatAmount = '1';
    }
    const amountIn = Web3.utils.toWei(formatAmount, 'ether');
    const apiBaseUrl =
      `https://aggregator-api.kyberswap.com/${chain}/api/v1/routes?` +
      `tokenIn=${src}&tokenOut=${dst}&amountIn=${amountIn}`;
    let config = {
      method: 'get',
      url: apiBaseUrl,
      headers: {
        'x-client-id': 'chainGPT',
      },
    };
    const res = await customAxios.request(config);
    const routeSummary = res.data.data.routeSummary;
    const routerAddress = res.data.data.routerAddress;
    return {routeSummary, routerAddress};
  } catch (e) {
    console.log(e, 'error in kyber swap GET token api');
    return {routerAddress: null, routeSummary: null};
  }
};

export const swapTokenViaKyberSwapApi = async ({
  sender,
  recipient,
  network,
  routeSummary,
  slippageTolerance,
}) => {
  try {
    const chain = getNetworkAbrv(network);
    const slippage = slippageTolerance > 0.5 ? slippageTolerance : null;
    const apiBaseUrl = `https://aggregator-api.kyberswap.com/${chain}/api/v1/route/build?`;
    let config = {
      method: 'post',
      url: apiBaseUrl,
      headers: {
        'x-client-id': 'chainGPT',
      },
      data: {
        routeSummary,
        sender,
        recipient,
        slippageTolerance: slippage,
      },
    };
    const res = await customAxios.request(config);
    return res.data;
  } catch (e) {
    console.log(e, 'error in kyber swap POST token api');
    return null;
  }
};

const estimateGasForSwapToken = async (
  gas,
  network,
  walletAddress,
  routerAddress,
  data,
) => {
  const networkUrl = getNetworkURL(network);
  const web3 = new Web3(new Web3.providers.HttpProvider(networkUrl));
  const gasPrice = await web3.eth.getGasPrice();
  const gasInToken = web3.utils.fromWei((gas * gasPrice).toString(), 'ether');
  const estimateGas = await web3.eth.estimateGas({
    from: walletAddress,
    to: routerAddress,
    data,
  });
  return {gasInToken, estimateGas};
};

export const performSwap = async ({
  walletAddress,
  privateKey,
  network,
  txnQuote,
  gasPrice,
}) => {
  try {
    const networkUrl = getNetworkURL(network);
    const {routerAddress, amountIn, gas, data} = txnQuote.data;

    const web3 = new Web3(new Web3.providers.HttpProvider(networkUrl));
    const senderAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
    web3.eth.accounts.wallet.add(senderAccount);

    web3.eth.defaultAccount = walletAddress;

    const estimateGas = await web3.eth.estimateGas({
      from: walletAddress,
      to: routerAddress,
      data,
    });

    const nonce = await web3.eth.getTransactionCount(walletAddress);

    const txnOptions = {
      from: walletAddress,
      to: routerAddress,
      value: amountIn,
      data,
      gasPrice,
      gasLimit: estimateGas,
      nonce: nonce,
    };

    const txSigned = await web3.eth.accounts.signTransaction(
      txnOptions,
      privateKey,
    );
    const res = await web3.eth.sendSignedTransaction(txSigned.rawTransaction);
    const receipt = await web3.eth.getTransactionReceipt(
      txSigned.transactionHash,
    );

    return {data: res, status: res.status};
  } catch (e) {
    console.log(e.message, 'error in performing swap api');
    return {status: false, data: e.message};
  }
};

export const getSwapTokenSendTransactionStatus = async transactionHash => {
  const network = store.getState().reducer.activeWallet.network;
  const networkUrl = getNetworkURL(network);
  const web3 = new Web3(new Web3.providers.HttpProvider(networkUrl));
  const details = await web3.eth.getTransaction(transactionHash);
  return details;
};

async function checkSufficientFunds({txnQuote, network, walletAddress}) {
  try {
    const networkUrl = getNetworkURL(network);
    const {routerAddress, amountIn, gas, data} = txnQuote.data;

    const web3 = new Web3(new Web3.providers.HttpProvider(networkUrl));
    const userAddress = walletAddress;
    const gasLimit = await web3.eth.estimateGas({
      to: routerAddress,
      value: amountIn,
    });
    const gasPrice = await web3.eth.getGasPrice();
    const totalGasCost = gasLimit * gasPrice;

    const bnbBalanceWei = await web3.eth.getBalance(userAddress);
    const bnbBalanceEther = web3.utils.fromWei(bnbBalanceWei, 'ether');
    if (
      bnbBalanceEther >= web3.utils.fromWei(totalGasCost.toString(), 'ether')
    ) {
      console.log('User has sufficient BNB tokens for gas.');
    } else {
      console.log('User does not have sufficient BNB tokens for gas.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

export const performSwapViaWalletConnect = async ({
  walletAddress,
  provider,
  network,
  txnQuote,
  gasPrice,
}) => {
  try {
    const {routerAddress, amountIn, data} = txnQuote.data;

    const web3 = new Web3(provider);
    const estimateGas = await web3.eth.estimateGas({
      from: walletAddress,
      to: routerAddress,
      data,
    });

    const nonce = await web3.eth.getTransactionCount(walletAddress);

    const txnOptions = {
      from: walletAddress,
      to: routerAddress,
      value: Web3.utils.toHex(amountIn),
      data,
      gasPrice,
      gasLimit: estimateGas,
      nonce: nonce,
      chain: getNetworkChainId(network),
    };
    const hash = await web3.eth.sendTransaction(txnOptions);
    return {data: hash, status: true};
  } catch (e) {
    console.log(e.message, 'error in performing swap api');
    return {status: false, data: e.message};
  }
};
