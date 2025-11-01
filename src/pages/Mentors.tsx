import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Award,
  TrendingUp,
  Search,
  Filter
} from "lucide-react";
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";

const mentors = [
  {
    name: "CryptoWhale_78",
    verified: true,
    pnl7d: "+42.3%",
    pnl30d: "+127.8%",
    followers: 12453,
    trades: 89,
    specialty: "DeFi & Yield Farming"
  },
  {
    name: "DeFiMaster",
    verified: true,
    pnl7d: "+28.1%",
    pnl30d: "+89.5%",
    followers: 8234,
    trades: 156,
    specialty: "Liquidity Pools"
  },
  {
    name: "NFTTrader_99",
    verified: true,
    pnl7d: "+15.7%",
    pnl30d: "+62.3%",
    followers: 5892,
    trades: 234,
    specialty: "NFT Trading"
  },
  {
    name: "YieldHunter",
    verified: false,
    pnl7d: "+31.2%",
    pnl30d: "+95.7%",
    followers: 3456,
    trades: 67,
    specialty: "Staking Strategies"
  },
  {
    name: "Web3Builder",
    verified: true,
    pnl7d: "+19.8%",
    pnl30d: "+71.4%",
    followers: 9821,
    trades: 123,
    specialty: "Protocol Analysis"
  },
  {
    name: "SmartContract_Pro",
    verified: true,
    pnl7d: "+25.6%",
    pnl30d: "+83.2%",
    followers: 6754,
    trades: 98,
    specialty: "Smart Contract Auditing"
  }
];

export default function Mentors() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Discover Mentors</h1>
            <p className="text-muted-foreground">Learn from verified traders and DeFi experts</p>
          </div>

          {/* Search & Filter */}
          <div className="flex gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search mentors by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="glass">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Mentors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors
              .filter(mentor => 
                mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                mentor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((mentor, index) => (
                <Card key={index} className="glass p-6 hover:scale-[1.02] transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg flex items-center gap-2 mb-1">
                        {mentor.name}
                        {mentor.verified && (
                          <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                            <Award className="w-3 h-3 text-accent-foreground" />
                          </div>
                        )}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {mentor.specialty}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">7d PnL</span>
                      <span className="font-semibold text-accent">{mentor.pnl7d}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">30d PnL</span>
                      <span className="font-semibold text-accent">{mentor.pnl30d}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Followers</span>
                      <span className="font-semibold">{mentor.followers.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Trades</span>
                      <span className="font-semibold">{mentor.trades}</span>
                    </div>
                  </div>

                  <Button variant="hero" size="sm" className="w-full">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Profile
                  </Button>
                </Card>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
