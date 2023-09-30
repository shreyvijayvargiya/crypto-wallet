import moralis from 'moralis';
import {EvmChain} from '@moralisweb3/common-evm-utils';

export const getEthWalletTransactions = async walletAddress => {
  try {
    const data = await moralis.EvmApi.transaction.getWalletTransactions({
      address: walletAddress,
      chain: EvmChain.ETHEREUM,
    });
    return data.result;
  } catch (e) {
    console.log(e, 'error in fetching eth transactions api');
  }
};

export const getBinanceWalletTransactions = async walletAddress => {
  try {
    const data = await moralis.EvmApi.transaction.getWalletTransactions({
      address: walletAddress,
      chain: EvmChain.BSC,
    });
    return data.result;
  } catch (e) {
    console.log(e, 'error in fetching binanace transactions');
    return null;
  }
};

export const getPolygonTransactions = async walletAddress => {
  try {
    const data = await moralis.EvmApi.transaction.getWalletTransactions({
      address: walletAddress,
      chain: EvmChain.POLYGON,
    });
    return data.result;
  } catch (e) {
    console.log(e, 'error in fetching binanace transactions');
    return null;
  }
};

export const getAllTransactions = async ({walletAddress}) => {
  try {
    const data = [
      ...(await getEthWalletTransactions(walletAddress)),
      ...(await getBinanceWalletTransactions(walletAddress)),
      ...(await getPolygonTransactions(walletAddress)),
    ];
    return data;
  } catch (e) {
    console.log(e, 'error');
  }
};
