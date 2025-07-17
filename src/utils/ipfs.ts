
const PINATA_API_KEY = import.meta.env.PINATA_API_KEY || '21a10388defc5da67527';
const PINATA_SECRET_KEY = import.meta.env.PINATA_SECRET_KEY || 'b0b3f94e5ad0869da9ffeef4d45de0e86897c54362a572999534e1eb9e94fc48';
const PINATA_API_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

export const uploadToIPFS = async (file: File): Promise<string> => {
  if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
    throw new Error('Pinata API keys not configured');
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(PINATA_API_URL, {
      method: 'POST',
      headers: new Headers({
        'pinata_api_key': PINATA_API_KEY || '',
        'pinata_secret_api_key': PINATA_SECRET_KEY || '',
      }),
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload to IPFS');
    }

    const result = await response.json();
    return result.IpfsHash;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw new Error('Failed to upload to IPFS');
  }
};

export const getIPFSUrl = (hash: string): string => {
  return `https://gateway.pinata.cloud/ipfs/${hash}`;
};

export const uploadJSONToIPFS = async (data: any): Promise<string> => {
  if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
    throw new Error('Pinata API keys not configured');
  }

  try {
    const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'pinata_api_key': PINATA_API_KEY || '',
        'pinata_secret_api_key': PINATA_SECRET_KEY || '',
      }),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to upload JSON to IPFS');
    }

    const result = await response.json();
    return result.IpfsHash;
  } catch (error) {
    console.error('Error uploading JSON to IPFS:', error);
    throw new Error('Failed to upload JSON to IPFS');
  }
};