import axios from 'axios';

const ZERION_API_BASE = 'https://api.zerion.io';

export interface Position {
  id: string;
  type: string;
  attributes: {
    name: string;
    symbol: string;
    quantity: {
      float: number;
    };
    value: number;
    price: number;
    changes?: {
      percent_1d?: number;
    };
  };
}

export interface Transaction {
  id: string;
  type: string;
  attributes: {
    operation_type: string;
    hash: string;
    mined_at: string;
    sent_from: string;
    sent_to: string;
    status: string;
    transfers?: Array<{
      fungible_info?: {
        name: string;
        symbol: string;
        icon?: {
          url: string;
        };
      };
      nft_info?: {
        name: string;
        content?: {
          preview?: {
            url: string;
          };
        };
      };
      quantity: {
        float: number;
      };
      value?: number;
    }>;
  };
}

export interface WalletPortfolio {
  data: Position[];
  meta: {
    total_value: number;
  };
}

export interface WalletTransactions {
  data: Transaction[];
}

export const zerionApi = {
  async getWalletPositions(address: string): Promise<WalletPortfolio> {
    const apiKey = import.meta.env.VITE_ZERION_API_KEY;
    if (!apiKey) {
      throw new Error('Zerion API key not configured');
    }

    const response = await axios.get(
      `${ZERION_API_BASE}/v1/wallets/${address}/positions/`,
      {
        headers: {
          'Authorization': `Basic ${btoa(apiKey + ':')}`,
          'Content-Type': 'application/json',
        },
        params: {
          'filter[positions]': 'only_simple',
          'currency': 'usd',
          'sort': 'value',
        }
      }
    );
    return response.data;
  },

  async getWalletTransactions(address: string): Promise<WalletTransactions> {
    const apiKey = import.meta.env.VITE_ZERION_API_KEY;
    if (!apiKey) {
      throw new Error('Zerion API key not configured');
    }

    const response = await axios.get(
      `${ZERION_API_BASE}/v1/wallets/${address}/transactions/`,
      {
        headers: {
          'Authorization': `Basic ${btoa(apiKey + ':')}`,
          'Content-Type': 'application/json',
        },
        params: {
          'currency': 'usd',
          'page[size]': 10,
        }
      }
    );
    return response.data;
  },
};

export const validateAddress = (address: string): { valid: boolean; type?: 'ethereum' | 'solana' } => {
  // Ethereum address validation
  const ethRegex = /^0x[a-fA-F0-9]{40}$/;
  if (ethRegex.test(address)) {
    return { valid: true, type: 'ethereum' };
  }

  // Solana address validation (base58, 32-44 chars)
  const solanaRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
  if (solanaRegex.test(address)) {
    return { valid: true, type: 'solana' };
  }

  return { valid: false };
};
