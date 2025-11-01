import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Play, 
  BookOpen, 
  Award,
  BarChart3
} from "lucide-react";
import { WalletConnect } from '@/components/wallet/WalletConnect';
import { WalletDashboard } from '@/components/wallet/WalletDashboard';
import { Sidebar } from '@/components/layout/Sidebar';

const mentorOfDay = {
  name: "CryptoWhale_78",
  verified: true,
  pnl7d: "+42.3%",
  pnl30d: "+127.8%",
  followers: 12453,
  trades: 89
};

const recentLessons = [
  {
    title: "DeFi Yield Farming Strategy",
    mentor: "DeFiMaster",
    xp: 150,
    time: "2h ago"
  },
  {
    title: "NFT Floor Price Analysis",
    mentor: "NFTTrader_99",
    xp: 120,
    time: "5h ago"
  },
  {
    title: "Liquidity Pool Optimization",
    mentor: "CryptoWhale_78",
    xp: 200,
    time: "1d ago"
  }
];

export default function Dashboard() {
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has a connected wallet in session
    const savedWallet = sessionStorage.getItem('connectedWallet');
    if (savedWallet) {
      setConnectedAddress(savedWallet);
    }
  }, []);

  const handleAddressSubmit = (address: string) => {
    setConnectedAddress(address);
    sessionStorage.setItem('connectedWallet', address);
  };

  const handleBack = () => {
    setConnectedAddress(null);
    sessionStorage.removeItem('connectedWallet');
  };

  // If analyzing a wallet, show the wallet dashboard
  if (connectedAddress) {
    return <WalletDashboard address={connectedAddress} onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
            <p className="text-muted-foreground">Continue your learning journey</p>
          </div>

          {/* Wallet Analysis Section */}
          <Card className="glass p-8 mb-8 border-l-4 border-l-primary">
            <h2 className="text-2xl font-bold mb-2">Analyze Any Wallet</h2>
            <p className="text-muted-foreground mb-6">
              Learn from real onchain data. Connect your wallet or paste any address to get insights.
            </p>
            <WalletConnect onAddressSubmit={handleAddressSubmit} />
          </Card>

          {/* Mentor of the Day */}
          <Card className="glass p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Badge variant="secondary" className="mb-2">Mentor of the Day</Badge>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  {mentorOfDay.name}
                  {mentorOfDay.verified && (
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-accent-foreground" />
                    </div>
                  )}
                </h2>
              </div>
              <Button variant="hero">
                <Play className="w-4 h-4 mr-2" />
                Replay Trade
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <div className="glass p-4 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">7d PnL</p>
                <p className="text-2xl font-bold text-accent">{mentorOfDay.pnl7d}</p>
              </div>
              <div className="glass p-4 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">30d PnL</p>
                <p className="text-2xl font-bold text-accent">{mentorOfDay.pnl30d}</p>
              </div>
              <div className="glass p-4 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">Followers</p>
                <p className="text-2xl font-bold">{mentorOfDay.followers.toLocaleString()}</p>
              </div>
              <div className="glass p-4 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">Total Trades</p>
                <p className="text-2xl font-bold">{mentorOfDay.trades}</p>
              </div>
            </div>
          </Card>

          {/* Lesson Feed */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold mb-4">Recent Lessons</h3>
              <div className="space-y-4">
                {recentLessons.map((lesson, index) => (
                  <Card key={index} className="glass p-6 hover:scale-[1.02] transition-all cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{lesson.title}</h4>
                        <p className="text-sm text-muted-foreground">by {lesson.mentor}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-1">+{lesson.xp} XP</Badge>
                        <p className="text-xs text-muted-foreground">{lesson.time}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Stats Sidebar */}
            <div>
              <h3 className="text-xl font-bold mb-4">Your Progress</h3>
              <Card className="glass p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <BarChart3 className="w-8 h-8 text-primary" />
                  <span className="text-2xl font-bold">Level 5</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-gradient-primary w-3/4" />
                </div>
                <p className="text-sm text-muted-foreground">750 / 1000 XP to Level 6</p>
              </Card>

              <Card className="glass p-6">
                <h4 className="font-semibold mb-4">Achievements</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">First Trade Replay</p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">DeFi Explorer</p>
                      <p className="text-xs text-muted-foreground">5/10 lessons</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* XP Progress Bar (Bottom) */}
          <Card className="glass p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Award className="w-6 h-6 text-accent" />
                <div>
                  <p className="text-sm font-semibold">Learning Streak</p>
                  <p className="text-xs text-muted-foreground">5 days in a row</p>
                </div>
              </div>
              <Button variant="accent" size="sm">
                View All Achievements
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}