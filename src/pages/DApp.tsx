import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Wallet, Loader2 } from 'lucide-react';
import WalletInfo from '../components/dapp/WalletInfo';
import TokenizationForm from '../components/dapp/TokenizationForm';
import MarketplaceListing from '../components/dapp/MarketplaceListing';
import ProjectTracker from '../components/dapp/ProjectTracker';
import { ContractFactory, NETWORK_CONFIGS } from '../utils/contractFactory';
import type { 
  NetworkType, 
  ConnectWalletProps,
  TokenizationFormProps,
  MarketplaceListingProps,
  ProjectTrackerProps
} from '../types/dapp';

const DApp: React.FC = () => {
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>('bscTestnet');
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [contractFactory, setContractFactory] = useState<ContractFactory | null>(null);

  useEffect(() => {
    const factory = new ContractFactory(selectedNetwork);
    setContractFactory(factory);
  }, [selectedNetwork]);

  const connectWallet = async () => {
    if (!contractFactory) return;
    
    setIsConnecting(true);
    setError(null);

    try {
      const address = await contractFactory.connect();
      setWalletAddress(address);
      setIsWalletConnected(true);
    } catch (err) {
      console.error('Failed to connect wallet:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleNetworkChange = async (network: NetworkType) => {
    setSelectedNetwork(network);
    setIsWalletConnected(false);
    setWalletAddress('');
    setError(null);
    
    const factory = new ContractFactory(network);
    setContractFactory(factory);
  };

  const tokenizationProps: TokenizationFormProps = {
    network: selectedNetwork,
    walletAddress,
    contractFactory
  };

  const marketplaceProps: MarketplaceListingProps = {
    network: selectedNetwork,
    walletAddress,
    contractFactory
  };

  const projectTrackerProps: ProjectTrackerProps = {
    network: selectedNetwork,
    walletAddress,
    contractFactory
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      {isWalletConnected && (
        <WalletInfo 
          address={walletAddress}
          network={selectedNetwork}
          networkName={NETWORK_CONFIGS[selectedNetwork].name}
        />
      )}
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {!isWalletConnected ? (
            <ConnectWallet 
              onConnect={connectWallet}
              onNetworkChange={handleNetworkChange}
              selectedNetwork={selectedNetwork}
              isConnecting={isConnecting}
              error={error}
            />
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <TokenizationForm {...tokenizationProps} />
                <MarketplaceListing {...marketplaceProps} />
              </div>
              <ProjectTracker {...projectTrackerProps} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

const ConnectWallet: React.FC<ConnectWalletProps> = ({
  onConnect,
  onNetworkChange,
  selectedNetwork,
  isConnecting,
  error
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 p-8 rounded-xl text-center max-w-md w-full"
      >
        <Wallet className="w-16 h-16 text-green-400 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Select Network</label>
          <select
            value={selectedNetwork}
            onChange={(e) => onNetworkChange(e.target.value as NetworkType)}
            className="w-full bg-gray-700 text-white rounded-lg p-3 mb-6"
            disabled={isConnecting}
          >
            <option value="bscTestnet">BSC Testnet</option>
            <option value="hederaTestnet">Hedera Testnet</option>
          </select>
        </div>

        <p className="text-gray-300 mb-8">
          Connect your wallet to start trading carbon credits on the GreenToken Hub
          platform.
        </p>
        
        <button
          onClick={onConnect}
          disabled={isConnecting}
          className="w-full py-3 bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 
            text-white rounded-full font-semibold transition-colors flex items-center justify-center space-x-2"
        >
          {isConnecting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <Wallet className="w-5 h-5" />
              <span>
                Connect {selectedNetwork === 'hederaTestnet' ? 'Hedera' : 'BSC'} Wallet
              </span>
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
};

export default DApp;