import React from 'react';
import { Copy } from 'lucide-react';
import { WalletInfoProps } from '../../types/dapp';

const WalletInfo: React.FC<WalletInfoProps> = ({ address }) => {
  const shortenAddress = (addr: string): string => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyAddress = (): void => {
    navigator.clipboard.writeText(address);
  };

  return (
    <div className="absolute top-24 right-4 bg-gray-800 rounded-lg p-3 flex items-center space-x-2">
      <span className="text-green-400">{shortenAddress(address)}</span>
      <button
        onClick={copyAddress}
        className="text-gray-400 hover:text-white transition-colors"
      >
        <Copy size={16} />
      </button>
    </div>
  );
};

export default WalletInfo;