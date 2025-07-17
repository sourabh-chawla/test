import { LucideIcon } from 'lucide-react';
import { ContractFactory } from '../utils/contractFactory';

export type NetworkType = 'bscTestnet' | 'hederaTestnet';

export interface WalletInfoProps {
  address: string;
  network: NetworkType;
  networkName: string;
}

export interface TokenizationFormProps {
  network: NetworkType;
  walletAddress: string;
  contractFactory: ContractFactory | null;
}

export interface MarketplaceListingProps {
  network: NetworkType;
  walletAddress: string;
  contractFactory: ContractFactory | null;
}

export interface ProjectTrackerProps {
  network: NetworkType;
  walletAddress: string;
  contractFactory: ContractFactory | null;
}

export interface FormData {
  projectName: string;
  creditAmount: string;
  verificationDoc: File | null;
  description: string;
  pricePerCredit: string;
}

export interface Listing {
  id: number;
  projectName: string;
  price: number;
  available: number;
  location: string;
  verificationStatus: 'Verified' | 'Pending';
  rating: number;
  network: NetworkType;
}

export interface ProjectImpact {
  co2Offset?: number;
  treesPlanted?: number;
  areaProtected?: number;
  energyGenerated?: number;
  homesSupplied?: number;
}

export interface Project {
  id: number;
  name: string;
  type: string;
  creditsIssued: number;
  creditsAvailable: number;
  impact: ProjectImpact;
  status: 'Active' | 'Pending' | 'Completed';
  icon: LucideIcon;
}

export interface ConnectWalletProps {
  onConnect: () => Promise<void>;
  onNetworkChange: (network: NetworkType) => Promise<void>;
  selectedNetwork: NetworkType;
  isConnecting: boolean;
  error: string | null;
}