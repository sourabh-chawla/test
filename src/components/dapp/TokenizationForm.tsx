import React, { useState, ChangeEvent, FormEvent } from 'react';
import { PlusCircle, Loader2 } from 'lucide-react';
import type { NetworkType } from '../../types/dapp';
import { ContractFactory } from '../../utils/contractFactory';
import { uploadToIPFS } from '../../utils/ipfs';
// import abis from '../abi/CarbonCreditToken.json';

// const abi = abis.abi;


interface TokenizationFormProps {
  network: NetworkType;
  walletAddress: string;
  contractFactory: ContractFactory | null;
}

interface FormState {
  projectName: string;
  creditAmount: string;
  verificationDoc: File | null;
  description: string;
  pricePerCredit: string;
}

const initialFormState: FormState = {
  projectName: '',
  creditAmount: '',
  verificationDoc: null,
  description: '',
  pricePerCredit: ''
};

const TokenizationForm: React.FC<TokenizationFormProps> = ({
  network,
  walletAddress,
  contractFactory
}) => {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contractFactory) return;

    setIsSubmitting(true);
    setError(null);
    setTxHash(null);

    try {
      // Upload verification document to IPFS if provided
      let verificationHash = '';
      if (formData.verificationDoc) {
        verificationHash = await uploadToIPFS(formData.verificationDoc);
      }

      // Create metadata
      const metadata = {
        name: formData.projectName,
        description: formData.description,
        verificationHash,
        creator: walletAddress,
        timestamp: new Date().toISOString()
      };

      // Upload metadata to IPFS
      const contract = await contractFactory.getContract();
      
      const tx = await contract.createProject(
        formData.projectName,
        formData.description,
        BigInt(parseFloat(formData.creditAmount)),
        BigInt(parseFloat(formData.pricePerCredit) * 1e18),
        verificationHash
      );

      const receipt = await tx.wait();
      setTxHash(receipt.hash);
      
      // Reset form
      setFormData(initialFormState);
    } catch (err) {
      console.error('Error creating token:', err);
      setError(err instanceof Error ? err.message : 'Failed to create token');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        verificationDoc: e.target.files![0]
      }));
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Tokenize Carbon Credits</h3>
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
          Transaction successful! View on explorer:{' '}
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Project Name</label>
          <input
            type="text"
            value={formData.projectName}
            onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
            className="w-full bg-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-green-400"
            placeholder="Sustainable Forest Initiative"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Credit Amount</label>
          <input
            type="number"
            value={formData.creditAmount}
            onChange={(e) => setFormData(prev => ({ ...prev, creditAmount: e.target.value }))}
            className="w-full bg-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-green-400"
            placeholder="1000"
            required
            min="1"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Price per Credit (in {network === 'hederaTestnet' ? 'HBAR' : 'BNB'})</label>
          <input
            type="number"
            step="0.000001"
            value={formData.pricePerCredit}
            onChange={(e) => setFormData(prev => ({ ...prev, pricePerCredit: e.target.value }))}
            className="w-full bg-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-green-400"
            placeholder="0.001"
            required
            min="0.000001"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Verification Document</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full bg-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-green-400"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Project Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full bg-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-green-400"
            rows={4}
            placeholder="Describe your environmental project..."
            required
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !contractFactory}
          className="w-full py-3 bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 
            text-white rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Creating Token...</span>
            </>
          ) : (
            <>
              <PlusCircle size={20} />
              <span>Create Token</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default TokenizationForm;