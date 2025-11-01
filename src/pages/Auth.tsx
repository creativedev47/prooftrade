import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { WalletIcon3D } from '@/components/wallet/WalletIcon3D';
import { Wallet } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectMetaMask = async () => {
    try {
      setIsConnecting(true);
      if (typeof (window as any).ethereum === 'undefined') {
        toast.error('MetaMask is not installed. Please install MetaMask to continue.');
        return;
      }

      const accounts = await (window as any).ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts && accounts.length > 0) {
        toast.success('Connected to MetaMask');
        // Store the connected wallet in sessionStorage
        sessionStorage.setItem('connectedWallet', accounts[0]);
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error('MetaMask connection error:', err);
      toast.error('Failed to connect MetaMask');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleConnectPhantom = () => {
    toast.info('Phantom wallet support coming soon');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <WalletIcon3D />
          </div>
          <h1 className="text-4xl font-bold mb-3 text-gradient">
            Connect Your Wallet
          </h1>
          <p className="text-muted-foreground">
            Choose your wallet to get started with ProofTrade
          </p>
        </div>

        <Card className="glass p-8">
          <div className="space-y-4">
            <Button 
              variant="hero" 
              size="lg" 
              className="w-full"
              onClick={handleConnectMetaMask}
              disabled={isConnecting}
            >
              <Wallet className="w-5 h-5 mr-2" />
              {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
            </Button>
            
            <Button 
              variant="glass" 
              size="lg" 
              className="w-full"
              onClick={handleConnectPhantom}
            >
              <Wallet className="w-5 h-5 mr-2" />
              Connect Phantom
            </Button>

            <div className="flex items-center gap-4 py-4">
              <div className="h-px bg-border flex-1" />
              <span className="text-sm text-muted-foreground">Secure & Non-Custodial</span>
              <div className="h-px bg-border flex-1" />
            </div>

            <p className="text-xs text-muted-foreground text-center">
              We never store your private keys. Your wallet remains fully under your control.
            </p>
          </div>
        </Card>

        <div className="text-center mt-6">
          <Button variant="ghost" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
