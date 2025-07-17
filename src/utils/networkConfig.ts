

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const NETWORK_SETTINGS = {
  bscMainnet: {
    chainId: '0x38', // 56 in decimal
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18
    },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com/'],
    contractAddress: process.env.REACT_APP_BSC_MAINNET_CONTRACT
  },
  bscTestnet: {
    chainId: '0x61', // 97 in decimal
    chainName: 'Binance Smart Chain Testnet',
    nativeCurrency: {
      name: 'tBNB',
      symbol: 'tBNB',
      decimals: 18
    },
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    blockExplorerUrls: ['https://testnet.bscscan.com/'],
    contractAddress: process.env.REACT_APP_BSC_TESTNET_CONTRACT
  },
  hederaTestnet: {
    chainId: '0x128', // 296 in decimal
    chainName: 'Hedera Testnet',
    nativeCurrency: {
      name: 'HBAR',
      symbol: 'HBAR',
      decimals: 8
    },
    rpcUrls: ['https://testnet.hashio.io/api'],
    blockExplorerUrls: ['https://hashscan.io/testnet/'],
    contractAddress: process.env.REACT_APP_HEDERA_TESTNET_CONTRACT
  }
} as const;

export const addNetwork = async (networkName: keyof typeof NETWORK_SETTINGS) => {
  if (!window.ethereum) {
    throw new Error('No Web3 provider detected');
  }

  const settings = NETWORK_SETTINGS[networkName];
  
  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: settings.chainId,
          chainName: settings.chainName,
          nativeCurrency: settings.nativeCurrency,
          rpcUrls: settings.rpcUrls,
          blockExplorerUrls: settings.blockExplorerUrls
        }
      ]
    });
    return true;
  } catch (error) {
    console.error('Error adding network:', error);
    return false;
  }
};

export const switchNetwork = async (networkName: keyof typeof NETWORK_SETTINGS): Promise<boolean> => {
  if (!window.ethereum) {
    throw new Error('No Web3 provider detected');
  }

  const settings = NETWORK_SETTINGS[networkName];
  
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: settings.chainId }]
    });
    return true;
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 4902) {
      return addNetwork(networkName);
    }
    console.error('Error switching network:', error);
    return false;
  }
};