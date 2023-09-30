import {ethers} from 'ethers';
import {setGenericPassword, getGenericPassword} from 'react-native-keychain';
import {getNetworkURL} from '../../hooks';

export async function generateWalletFromMnemonic(mnemonic, network) {
  const currentNetwork = network || 'BNB Smart Chain (BEP20)';
  const networkUrl = getNetworkURL(currentNetwork);
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);

  const address = wallet.address;
  const privateKey = wallet.privateKey;

  const provider = new ethers.providers.JsonRpcProvider(networkUrl);

  try {
    const [balance] = await Promise.all([provider.getBalance(address)]);

    const etherBalance = ethers.utils.formatEther(balance);

    const newWallet = {
      address,
      privateKey,
      mnemonic,
    };

    return {
      newWallet,
      ethBalance: etherBalance,
    };
  } catch (error) {
    console.error('Error fetching wallet info:', error);
    throw error;
  }
}

export const storeSeedPhrase = async (password, seedPhrase) => {
  try {
    const res = await setGenericPassword('seedPhrase', seedPhrase, {
      service: 'cgpt',
    });
    return res;
  } catch (e) {
    console.log(e, 'error in storing seed phrase');
    return null;
  }
};

export const retrieveSeedPhrase = async password => {
  try {
    const credentials = await getGenericPassword({service: 'cgpt'});
    return credentials ? credentials.password : null;
  } catch (error) {
    console.error('Error retrieving seed phrase', error);
    return null;
  }
};
