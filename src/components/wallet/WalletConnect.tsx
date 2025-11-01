import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { validateAddress } from '@/services/zerionApi';
import { WalletIcon3D } from './WalletIcon3D';
import { Wallet, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface WalletConnectProps {
  onAddressSubmit: (address: string) => void;
}

export function WalletConnect({ onAddressSubmit }: WalletConnectProps) {
  const [manualAddress, setManualAddress] = useState('');
  const [error, setError] = useState('');

  const handleManualSubmit = () => {
    const validation = validateAddress(manualAddress);
    
    if (!validation.valid) {
      setError('Invalid wallet address. Please enter a valid Ethereum or Solana address.');
      toast.error('Invalid wallet address');
      return;
    }

    setError('');
    onAddressSubmit(manualAddress);
    toast.success(`Connected to ${validation.type} wallet`);
  };

  const handleConnectMetaMask = async () => {
    try {
      if (typeof (window as any).ethereum === 'undefined') {
        toast.error('MetaMask is not installed. Please install MetaMask to continue.');
        return;
      }

      const accounts = await (window as any).ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts && accounts.length > 0) {
        onAddressSubmit(accounts[0]);
        toast.success('Connected to MetaMask');
      }
    } catch (err: any) {
      console.error('MetaMask connection error:', err);
      toast.error('Failed to connect MetaMask');
    }
  };

  return (
    <div className="space-y-4">
      {/* Wallet Connect Buttons */}
      <div className="grid md:grid-cols-2 gap-3">
        <Button 
          variant="hero" 
          size="default" 
          className="w-full"
          onClick={handleConnectMetaMask}
        >
          <Wallet className="w-4 h-4 mr-2" />
          Connect MetaMask
        </Button>
        <Button 
          variant="glass" 
          size="default" 
          className="w-full"
          onClick={() => toast.info('Phantom wallet support coming soon')}
        >
          <Wallet className="w-4 h-4 mr-2" />
          Connect Phantom
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-px bg-border flex-1" />
        <span className="text-xs text-muted-foreground">or paste address</span>
        <div className="h-px bg-border flex-1" />
      </div>

      {/* Manual Address Input */}
      <div className="space-y-3">
        <div className="space-y-2">
          <Input
            placeholder="Enter Ethereum or Solana wallet address"
            value={manualAddress}
            onChange={(e) => {
              setManualAddress(e.target.value);
              setError('');
            }}
          />
          {error && (
            <div className="flex items-start gap-2 text-xs text-destructive">
              <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
        <Button 
          variant="accent" 
          size="default" 
          className="w-full"
          onClick={handleManualSubmit}
          disabled={!manualAddress}
        >
          Analyze Wallet
        </Button>
      </div>

      {/* Example Address */}
      <div className="pt-2 border-t border-border/50">
        <p className="text-xs text-muted-foreground mb-2">Try an example:</p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const exampleAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
            setManualAddress(exampleAddress);
          }}
        >
          Vitalik.eth
        </Button>
      </div>
    </div>
  );
}
