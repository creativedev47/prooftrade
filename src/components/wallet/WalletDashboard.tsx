import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  zerionApi, 
  type WalletPortfolio, 
  type WalletTransactions 
} from '@/services/zerionApi';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown,
  ExternalLink,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { Sidebar } from '@/components/layout/Sidebar';

interface WalletDashboardProps {
  address: string;
  onBack: () => void;
}

export function WalletDashboard({ address, onBack }: WalletDashboardProps) {
  const [portfolio, setPortfolio] = useState<WalletPortfolio | null>(null);
  const [transactions, setTransactions] = useState<WalletTransactions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWalletData();
  }, [address]);

  const loadWalletData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [portfolioData, transactionsData] = await Promise.all([
        zerionApi.getWalletPositions(address),
        zerionApi.getWalletTransactions(address)
      ]);

      setPortfolio(portfolioData);
      setTransactions(transactionsData);
    } catch (err: any) {
      console.error('Failed to load wallet data:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Failed to load wallet data';
      setError(errorMsg);
      toast.error('Failed to load wallet data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
              <p className="text-muted-foreground">Loading wallet data...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <Button variant="ghost" onClick={onBack} className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Card className="glass p-8">
              <div className="text-center space-y-4">
                <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
                <h3 className="text-xl font-bold">Failed to Load Wallet</h3>
                <p className="text-muted-foreground">{error}</p>
                <Button variant="accent" onClick={loadWalletData}>
                  Try Again
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  const totalValue = portfolio?.meta?.total_value || 0;
  const topPositions = portfolio?.data?.slice(0, 5) || [];
  const recentTxs = transactions?.data?.slice(0, 5) || [];

  // Generate AI-like summary based on wallet data
  const generateSummary = () => {
    if (!portfolio || !transactions) return "Analyzing wallet activity...";
    
    const positionCount = portfolio.data.length;
    const txCount = transactions.data.length;
    const hasDefi = transactions.data.some(tx => 
      tx.attributes.operation_type?.includes('swap') || 
      tx.attributes.operation_type?.includes('stake')
    );
    const hasNFT = transactions.data.some(tx => 
      tx.attributes.transfers?.some(t => t.nft_info)
    );

    let summary = `This wallet holds ${positionCount} different positions worth $${totalValue.toLocaleString()}. `;
    
    if (hasDefi) {
      summary += "The wallet shows active DeFi participation through swaps and liquidity provision. ";
    }
    
    if (hasNFT) {
      summary += "NFT transactions indicate interest in digital collectibles. ";
    }
    
    summary += `The wallet has ${txCount} recent transactions showing ${
      txCount > 50 ? 'high' : txCount > 20 ? 'moderate' : 'low'
    } activity.`;

    return summary;
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">Wallet Analysis</h2>
              <p className="text-muted-foreground font-mono text-sm">
                {address.slice(0, 6)}...{address.slice(-4)}
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a 
                href={`https://etherscan.io/address/${address}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View on Explorer
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>

        {/* AI Summary */}
        <Card className="glass p-6 mb-8 border-l-4 border-l-accent">
          <h3 className="text-sm font-semibold text-accent mb-2">🧠 AI Insight</h3>
          <p className="text-sm leading-relaxed">{generateSummary()}</p>
        </Card>

        {/* Portfolio Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="glass p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Portfolio Value</p>
            <p className="text-3xl font-bold text-gradient">
              ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
          </Card>
          <Card className="glass p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Positions</p>
            <p className="text-3xl font-bold">{portfolio?.data.length || 0}</p>
          </Card>
          <Card className="glass p-6">
            <p className="text-sm text-muted-foreground mb-2">Recent Transactions</p>
            <p className="text-3xl font-bold">{transactions?.data.length || 0}</p>
          </Card>
        </div>

        {/* Top Holdings */}
        <Card className="glass p-6 mb-8">
          <h3 className="text-xl font-bold mb-6">Top Holdings</h3>
          <div className="space-y-4">
            {topPositions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No positions found</p>
            ) : (
              topPositions.map((position) => (
                <div 
                  key={position.id} 
                  className="flex items-center justify-between p-4 glass rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-semibold">{position.attributes.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {position.attributes.quantity.float.toFixed(4)} {position.attributes.symbol}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${position.attributes.value?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
                    {position.attributes.changes?.percent_1d && (
                      <div className="flex items-center justify-end gap-1 text-sm">
                        {position.attributes.changes.percent_1d > 0 ? (
                          <>
                            <TrendingUp className="w-3 h-3 text-accent" />
                            <span className="text-accent">
                              +{position.attributes.changes.percent_1d.toFixed(2)}%
                            </span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="w-3 h-3 text-destructive" />
                            <span className="text-destructive">
                              {position.attributes.changes.percent_1d.toFixed(2)}%
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card className="glass p-6">
          <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentTxs.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No recent transactions</p>
            ) : (
              recentTxs.map((tx) => (
                <div 
                  key={tx.id} 
                  className="flex items-center justify-between p-4 glass rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <Badge variant="secondary" className="capitalize">
                        {tx.attributes.operation_type?.replace('_', ' ') || 'Transaction'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(tx.attributes.mined_at).toLocaleDateString()}
                      </span>
                    </div>
                    {tx.attributes.transfers && tx.attributes.transfers.length > 0 && (
                      <p className="text-sm">
                        {tx.attributes.transfers.map(t => 
                          t.fungible_info?.symbol || t.nft_info?.name || 'Unknown'
                        ).join(', ')}
                      </p>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a 
                      href={`https://etherscan.io/tx/${tx.attributes.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              ))
            )}
          </div>
        </Card>
        </div>
      </main>
    </div>
  );
}
