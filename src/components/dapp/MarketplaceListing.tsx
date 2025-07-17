import React, { useState } from 'react';
import { ShoppingCart, Info, Loader2 } from 'lucide-react';
import type { NetworkType, Listing } from '../../types/dapp';
import { ContractFactory } from '../../utils/contractFactory';
import { ethers } from 'ethers';
// import abis from '../abi/CarbonCreditToken.json';



interface MarketplaceListingProps {
  network: NetworkType;
  walletAddress: string;
  contractFactory: ContractFactory | null;
}

interface PurchaseState {
  listingId: number | null;
  amount: number;
  isProcessing: boolean;
}

// Placeholder listings that will always be shown
const PLACEHOLDER_LISTINGS: Listing[] = [
  {
    id: 9999,
    projectName: 'Amazon Rainforest Conservation',
    price: 25,
    available: 5000,
    location: 'Brazil',
    verificationStatus: 'Verified',
    rating: 4.8,
    network: 'bscTestnet'
  },
  {
    id: 9998,
    projectName: 'Solar Farm Initiative',
    price: 18,
    available: 3000,
    location: 'India',
    verificationStatus: 'Verified',
    rating: 4.5,
    network: 'bscTestnet'
  },
  {
    id: 9997,
    projectName: 'Wind Energy Project',
    price: 22,
    available: 2500,
    location: 'Germany',
    verificationStatus: 'Pending',
    rating: 4.2,
    network: 'bscTestnet'
  }
];

const MarketplaceListing: React.FC<MarketplaceListingProps> = ({
  network,
  walletAddress,
  contractFactory
}) => {
  const [listings, setListings] = useState<Listing[]>(PLACEHOLDER_LISTINGS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [purchaseState, setPurchaseState] = useState<PurchaseState>({
    listingId: null,
    amount: 1,
    isProcessing: false
  });
  const [txHash, setTxHash] = useState<string | null>(null);

  const loadListings = async () => {
    if (!contractFactory) return;

    try {
      setLoading(true);
      setError(null);

      const contract = await contractFactory.getContract();
      const projectCount = await contract.nextProjectId();
      
      const fetchedListings: Listing[] = [];

      for (let i = 1; i < projectCount; i++) {
        try {
          const project = await contract.projects(i);
          if (project.isActive) {
            const available = await contract.balanceOf(project.creator, i);
            
            fetchedListings.push({
              id: i,
              projectName: project.name,
              price: parseFloat(ethers.formatEther(project.price)),
              available: Number(available),
              location: project.metadata?.location || 'Various',
              verificationStatus: project.verificationHash ? 'Verified' : 'Pending',
              rating: project.metadata?.rating || 4.5,
              network: network
            });
          }
        } catch (err) {
          console.warn(`Failed to load project ${i}:`, err);
          // Continue loading other projects
          continue;
        }
      }

      // Merge placeholder listings with fetched listings
      // Replace placeholder listings of the current network with fetched ones
      const otherNetworkPlaceholders = PLACEHOLDER_LISTINGS.filter(
        listing => listing.network !== network
      );
      
      setListings([...otherNetworkPlaceholders, ...fetchedListings]);
    } catch (err) {
      console.error('Error loading listings:', err);
      setError(err instanceof Error ? err.message : 'Failed to load listings');
      // Keep placeholder listings on error
      setListings(PLACEHOLDER_LISTINGS);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (listingId: number) => {
    if (!contractFactory) return;

    setPurchaseState(prev => ({ ...prev, listingId, isProcessing: true }));
    setError(null);
    setTxHash(null);

    try {
      const listing = listings.find(l => l.id === listingId);
      if (!listing) throw new Error('Listing not found');

      // Check if it's a placeholder listing
      if (listing.id >= 9997) {
        throw new Error('This is a demonstration listing and cannot be purchased.');
      }

      const contract = await contractFactory.getContract();
      
      const tx = await contract.purchaseCredits(
        listingId,
        purchaseState.amount,
        {
          value: ethers.parseEther((listing.price * purchaseState.amount).toString())
        }
      );

      const receipt = await tx.wait();
      setTxHash(receipt.hash);

      // Reload listings after successful purchase
      await loadListings();
    } catch (err) {
      console.error('Error purchasing credits:', err);
      setError(err instanceof Error ? err.message : 'Failed to purchase credits');
    } finally {
      setPurchaseState(prev => ({ ...prev, listingId: null, isProcessing: false }));
    }
  };

  const ListingCard: React.FC<{ listing: Listing }> = ({ listing }) => (
    <div className="bg-gray-700 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-white font-semibold">{listing.projectName}</h4>
          <div className="flex items-center space-x-4 mt-2">
            <span className="text-gray-400 text-sm">
              {listing.price} {listing.network === 'hederaTestnet' ? 'HBAR' : 'BNB'} per credit
            </span>
            <span className="text-gray-400 text-sm">
              {listing.available.toLocaleString()} available
            </span>
            <span className={`text-sm ${
              listing.verificationStatus === 'Verified'
                ? 'text-green-400'
                : 'text-yellow-400'
            }`}>
              {listing.verificationStatus}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {listing.id < 9997 && (
            <div className="flex items-center space-x-2">
              <label className="text-gray-400 text-sm">Amount:</label>
              <input
                type="number"
                min="1"
                max={listing.available}
                value={listing.id === purchaseState.listingId ? purchaseState.amount : 1}
                onChange={(e) => setPurchaseState(prev => ({
                  ...prev,
                  amount: Math.min(Math.max(1, parseInt(e.target.value) || 1), listing.available)
                }))}
                className="w-20 bg-gray-600 text-white rounded px-2 py-1 text-sm"
                disabled={purchaseState.isProcessing}
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <button
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title="View Details"
              disabled={purchaseState.isProcessing}
            >
              <Info size={20} />
            </button>
            <button
              onClick={() => handlePurchase(listing.id)}
              disabled={purchaseState.isProcessing || !contractFactory || listing.id >= 9997}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 
                text-white rounded-lg flex items-center space-x-2 transition-colors min-w-[120px] justify-center"
            >
              {purchaseState.isProcessing && purchaseState.listingId === listing.id ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Buying...</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={20} />
                  <span>{listing.id >= 9997 ? 'Invest' : 'Buy'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="text-gray-400 text-sm">
        Location: {listing.location} • Rating: {listing.rating}/5
      </div>

      {listing.id === purchaseState.listingId && !purchaseState.isProcessing && (
        <div className="mt-2 text-sm text-gray-400">
          Total Cost: {(listing.price * purchaseState.amount).toFixed(6)} 
          {listing.network === 'hederaTestnet' ? ' HBAR' : ' BNB'}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Carbon Credit Marketplace</h3>
        <span className="text-sm text-gray-400">
          Network: {network === 'hederaTestnet' ? 'Hedera Testnet' : 'BSC Testnet'}
        </span>
      </div>

      {error && (
        <div className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {txHash && (
        <div className="bg-green-500/20 text-green-400 p-3 rounded-lg mb-4">
          Purchase successful! View on explorer:{' '}
          <a
            href={contractFactory?.getExplorerUrl(txHash)}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {txHash.slice(0, 6)}...{txHash.slice(-4)}
          </a>
        </div>
      )}

      <div className="space-y-4">
        {listings.map((listing) => (
          <ListingCard key={`${listing.network}-${listing.id}`} listing={listing} />
        ))}

        {loading && (
          <div className="text-center py-4 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
            Loading more listings...
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceListing;