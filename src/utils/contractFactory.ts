import { ethers, ContractTransactionResponse, Provider, Signer, JsonRpcProvider, BrowserProvider, Contract } from 'ethers';
import { NetworkType } from '../types/dapp';
import abis from '../components/abi/CarbonCreditToken.json';

const CarbonCreditTokenABI = abis.abi;;

declare global {
  interface Window {
    ethereum?: any;
  }
}

export interface NetworkConfig {
  rpcUrl: string;
  chainId: number;
  name: string;
  contractAddress?: string;
  symbol: string;
  explorer: string;
}

export const NETWORK_CONFIGS: Record<NetworkType, NetworkConfig> = {
  bscTestnet: {
    name: 'BSC Testnet',
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    chainId: 97,
    contractAddress: import.meta.env.VITE_BSC_TESTNET_CONTRACT || '0x04CA166F3E38EE18deD480BaA6Bb3fC9c98a59c6',
    symbol: 'tBNB',
    explorer: 'https://testnet.bscscan.com'
  },
  hederaTestnet: {
    name: 'Hedera Testnet',
    rpcUrl: 'https://testnet.hashio.io/api',
    chainId: 296,
    contractAddress: import.meta.env.VITE_HEDERA_TESTNET_CONTRACT || '0xcE48924fE33B1dCD0c4CFbB3Cc99149a18CA439E',
    symbol: 'HBAR',
    explorer: 'https://hashscan.io/testnet'
  }
};

export class ContractFactory {
  private provider: Provider;
  private signer: Signer | null = null;
  private network: NetworkConfig;
  private contract: Contract | null = null;

  constructor(networkType: NetworkType) {
    this.network = NETWORK_CONFIGS[networkType];
    
    if (window.ethereum) {
      this.provider = new BrowserProvider(window.ethereum);
    } else {
      this.provider = new JsonRpcProvider(this.network.rpcUrl);
    }
  }

  async connect(): Promise<string> {
    if (!window.ethereum) {
      throw new Error('No Web3 provider detected');
    }

    // Request account access
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Switch to the correct network
    await this.switchNetwork();

    // Get the signer
    this.signer = await (this.provider as BrowserProvider).getSigner();
    return await this.signer.getAddress();
  }

  private async switchNetwork(): Promise<void> {
    if (!window.ethereum) return;

    const chainIdHex = `0x${this.network.chainId.toString(16)}`;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        await this.addNetwork();
      } else {
        throw error;
      }
    }
  }

  private async addNetwork(): Promise<void> {
    if (!window.ethereum) return;

    const chainIdHex = `0x${this.network.chainId.toString(16)}`;

    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: chainIdHex,
        chainName: this.network.name,
        nativeCurrency: {
          name: this.network.symbol,
          symbol: this.network.symbol,
          decimals: 18,
        },
        rpcUrls: [this.network.rpcUrl],
        blockExplorerUrls: [this.network.explorer],
      }],
    });
  }

  async getContract(): Promise<Contract> {
    if (!this.network.contractAddress) {
      throw new Error('Contract address not configured for this network');
    }

    if (!this.signer) {
      throw new Error('Signer not initialized. Please connect wallet first.');
    }

    if (!this.contract) {
      this.contract = new Contract(
        this.network.contractAddress,
        CarbonCreditTokenABI,
        this.signer
      );
    }

    return this.contract;
  }

  getExplorerUrl(txHash: string): string {
    return `${this.network.explorer}/tx/${txHash}`;
  }

  async estimateGas(tx: any): Promise<bigint> {
    if (!this.signer) {
      throw new Error('Signer not initialized');
    }
    return await this.signer.estimateGas(tx);
  }

  async waitForTransaction(tx: ContractTransactionResponse): Promise<boolean> {
    const receipt = await tx.wait();
    return receipt !== null;
  }
}

export const getNetworkConfig = (networkType: NetworkType): NetworkConfig => {
  return NETWORK_CONFIGS[networkType];
};