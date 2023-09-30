import Web3 from 'web3';
import TOKEN_ABI from '../../../abis/erc20.json';
import {getAddressBalances} from 'eth-balance-checker/lib/web3';
import {
  getNetworkChainId,
  getNetworkChainMoralis,
  getNetworkDefaultTokenDetails,
  getNetworkDefaultTokens,
  getNetworkURL,
} from '../../hooks';
import Moralis from 'moralis';
import {store} from '../../../redux/store';
import {addActiveWalletTokens} from '../../../redux/slice';
import {ethers} from 'ethers';
import {fetchCoinPrice} from '../rest';

export const getActiveNetworkTokenBalances = async ({
  walletAddress,
  network,
}) => {
  const tokens = getNetworkDefaultTokens(network);
  const networkUrl = getNetworkURL(network);
  try {
    const web3 = new Web3(networkUrl);
    if (network === 'BNB Smart Chain (BEP20)' || network === 'Polygon') {
      const response = tokens.map(async item => {
        const balance = await getBNBTokenBalance(
          walletAddress,
          item.contractAddress,
          network,
        );
        const {price: usdCurrentPrice} = await fetchCoinPrice(item.symbol);
        const usdBalance = balance * usdCurrentPrice;
        return {...item, balance, usdBalance};
      });
      store.dispatch(addActiveWalletTokens(await Promise.all(response)));
      return await Promise.all(response);
    } else {
      const tokenAddresses = [];
      tokens.forEach(item => tokenAddresses.push(item.contractAddress));
      const data = await getAddressBalances(
        web3,
        walletAddress,
        tokenAddresses,
      );
      const response = tokens.map(token => {
        token.balance = data[token.contractAddress];
        return token;
      });
      store.dispatch(addActiveWalletTokens(await response));
      return response;
    }
  } catch (e) {
    console.log(e, 'error in fetching tokens balances');
    return 0;
  }
};
export const getWalletBalance = async (walletAddress, network) => {
  try {
    const networkUrl = getNetworkURL(network);
    const web3 = new Web3(networkUrl);
    const {tokenName, tokenAddress} = getNetworkDefaultTokenDetails(network);

    const balance = await web3.eth.getBalance(walletAddress);
    const balanceFormatted = web3.utils.fromWei(balance, 'ether');
    return {balance: balanceFormatted, tokenName, tokenAddress};
  } catch (e) {
    console.log(e, 'error in wallet balance');
    return 0;
  }
};
export const getSingleTokenBalance = async (
  tokenAddress,
  network,
  walletAddress,
) => {
  try {
    const networkUrl = getNetworkURL(network);
    const web3 = new Web3(networkUrl);
    if (network === 'BNB Smart Chain (BEP20)') {
      const balance = await getBNBTokenBalance(
        walletAddress,
        tokenAddress,
        network,
      );
      return balance;
    } else if (network === 'Polygon') {
      const balance = await web3.eth.getBalance();
      const balanceFormatted = web3.utils.fromWei(balance, 'ether');
      return balanceFormatted;
    } else {
      const balance = await getAddressBalances(
        web3,
        walletAddress,
        tokenAddress,
      );
      return balance;
    }
  } catch (e) {
    console.log(e, 'single token balance api');
    return 0;
  }
};

export async function getBNBTokenBalance(walletAddress, tokenAddress, network) {
  const networkUrl = getNetworkURL(network);
  const web3 = new Web3(new Web3.providers.HttpProvider(networkUrl));

  const tokenContract = new web3.eth.Contract(TOKEN_ABI, tokenAddress);

  const balance = await tokenContract.methods.balanceOf(walletAddress).call();

  const balanceFormatted = web3.utils.fromWei(balance, 'ether');
  return balanceFormatted;
}

export const sendTokenTransactionDetails = async ({
  walletAddress,
  tokenAddress,
  recipientAddress,
  amount,
  network,
  privateKey,
}) => {
  const networkUrl = getNetworkURL(network);
  const web3 = new Web3(new Web3.providers.HttpProvider(networkUrl));
  const senderAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(senderAccount);

  // Set the default account
  web3.eth.defaultAccount = walletAddress;
  const contract = new web3.eth.Contract(TOKEN_ABI, tokenAddress);
  try {
    let tokenAmount;
    if (web3.utils.isBN(amount)) {
      tokenAmount = amount.toString();
    } else if (typeof amount === 'string') {
      tokenAmount = web3.utils.toWei(amount);
    } else {
      throw new Error(
        'Invalid amount format. Please provide the amount as a string or BN object.',
      );
    }
    const gasLimit = await contract.methods
      .transfer(recipientAddress, tokenAmount)
      .estimateGas({from: walletAddress});

    const gasPrice = await web3.eth.getGasPrice();

    const transactionFee = web3.utils
      .toBN(gasLimit)
      .mul(web3.utils.toBN(gasPrice));

    const readableAmount = web3.utils.fromWei(tokenAmount);

    return {
      readableAmount,
      gasLimit,
      gasPrice: web3.utils.fromWei(gasPrice, 'gwei'),
      transactionFee,
    };
  } catch (e) {
    console.error('Error in sendTokenTransactionDetails:', e);
    throw e;
  }
};

export const sendTokensApi = async (
  walletAddress,
  tokenAddress,
  recipientAddress,
  amount,
  network,
  privateKey,
) => {
  const networkUrl = getNetworkURL(network);
  const web3 = new Web3(new Web3.providers.HttpProvider(networkUrl));
  const senderAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(senderAccount);

  web3.eth.defaultAccount = walletAddress;
  const contract = new web3.eth.Contract(TOKEN_ABI, tokenAddress);
  try {
    let tokenAmount = '';
    const isBinary = web3.utils.isBN(amount);
    if (!isBinary && typeof amount === 'string') {
      tokenAmount = web3.utils.toWei(amount);
    }
    const tx = contract.methods.transfer(recipientAddress, tokenAmount);
    const gas = await tx.estimateGas({from: walletAddress});
    const data = tx.encodeABI();
    const signedTx = await web3.eth.accounts.signTransaction(
      {
        from: walletAddress,
        to: tokenAddress,
        gas,
        data,
      },
      privateKey,
    );

    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
    );
    console.log('Transaction receipt:', receipt);
    return receipt;
  } catch (e) {
    console.log(e, 'error in confirm sending token method');
    return e;
  }
};

export const getAddressTransactions = async ({
  walletAddress,
  network,
  limit,
}) => {
  const chain = getNetworkChainMoralis(network);
  try {
    const transactions = await Moralis.EvmApi.token.getWalletTokenTransfers({
      address: walletAddress,
      limit: limit,
      chain: chain,
    });
    const unSpammedTxns = transactions.result.filter(
      item => !item.possibleSpam,
    );
    return unSpammedTxns;
  } catch (e) {
    console.log(e, 'error in fetching address transaction API');
    return undefined;
  }
};

export const sendTokenViaWalletConnectApi = async ({
  provider,
  walletAddress,
  amount,
  recipientAddress,
  tokenAddress,
  network,
}) => {
  if (![provider]) {
    throw new Error('web3Provider not connected');
  }
  try {
    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(TOKEN_ABI, tokenAddress);
    let tokenAmount = '';
    const isBinary = web3.utils.isBN(amount);
    if (!isBinary && typeof amount === 'string') {
      tokenAmount = web3.utils.toWei(amount);
    }
    const tx = contract.methods.transfer(recipientAddress, tokenAmount);
    const gas = await tx.estimateGas({from: walletAddress});
    const data = tx.encodeABI();
    const txn = {
      from: walletAddress,
      to: tokenAddress,
      gas,
      data,
      gasPrice: await web3.eth.getGasPrice(),
      chain: getNetworkChainId(network),
    };
    const receipt = await web3.eth.sendTransaction(txn);
    return receipt;
  } catch (error) {
    console.error('Error sending token transaction:', error);
  }
};

export const getSendTokenEstimateGas = async ({
  tokenAddress,
  provider,
  walletAddress,
  recipientAddress,
  amount,
}) => {
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(TOKEN_ABI, tokenAddress);
  try {
    const gasLimit = await contract.methods
      .transfer(recipientAddress, amount)
      .estimateGas({from: walletAddress});
    const gasPrice = await web3.eth.getGasPrice();

    const transactionFee = web3.utils
      .toBN(gasLimit)
      .mul(Web3.utils.toBN(gasPrice));
    const readableAmount = Web3.utils.fromWei(amount);
    return {
      data: {
        readableAmount,
        transactionFee,
        gas: gasLimit,
        gasLimit,
      },
      status: true,
    };
  } catch (e) {
    console.log(e, 'error in estimate gas for sending token via WC');
    return {
      data: {
        readableAmount: 0,
        transactionFee: 0,
        gas: 0,
        gasLimit: '',
      },
      status: false,
    };
  }
};
