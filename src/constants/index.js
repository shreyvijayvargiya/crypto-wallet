export const WALLET_CONNECT_PROJECT_ID = 'de78d65cd54a4a8f7a5b3d250a7217c9';
export const providerMetadata = {
  name: 'CGPT',
  description:
    'ChainGPT offers the fastest growing AI technology for all Crypto and Blockchain related topics. Access unlimited solutions and use-cases using our advanced AI model: Blockchain analytics, AI NFT Generator, AI trading, smart-contract development, AI auditing, risk management, source of crypto news, and much more. Visit ChainGPT.org today. Chain GPT Crypto AI Tools.',
  url: 'https://www.chaingpt.org/',
  icons: [
    'https://assets-global.website-files.com/64354b8ce4872ad8cd1c7b04/648329053d5c25f54cbb89c2_chaingpt-logoLight-Neon-2.svg',
  ],
  redirect: {
    native: 'https://',
    universal: 'https://www.chaingpt.org',
  },
};

export const sessionParams = {
  namespaces: {
    eip155: {
      methods: ['eth_sendTransaction', 'eth_signTransaction', 'eth_sign'],
      chains: ['eip155:1', 'eip155:56', 'eip155:137'],
      events: [
        'chainChanged',
        'accountsChanged',
        'message',
        'disconnect',
        'connect',
      ],
      rpcMap: {},
    },
  },
};
