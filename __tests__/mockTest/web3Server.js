// server for mocking web3 apis
// import {checkTokenSwapAllowance} from '../../src/packages/apis/web3/swapTokenApi';
// import {getNetworkDefaultTokens} from '../../src/packages/hooks';

describe('checking sender address', async () => {
  const walletAddress = '';
  const network = 'BNB Smart Chain (BEP20)';
  const senderAddress = '0x6131B5fae19EA4f9D964eAc0408E4408b66337b5';
  // const TOKENS = getNetworkDefaultTokens(network);
  // const token = TOKENS[0];
  // const tokenAddress = token.contractAddress;

  // const allowance = await checkTokenSwapAllowance({
  //   walletAddress,
  //   tokenAddress,
  //   network,
  //   senderAddress,
  // });
  // console.log(`${token.name} has ${allowance} allowance`);
  // expect(allowance).toBe(Number);
  it('get sender address', () => {
    expect(senderAddress).toBe('0x6131B5fae19EA4f9D964eAc0408E4408b66337b5');
  });
});
