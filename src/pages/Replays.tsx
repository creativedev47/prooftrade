import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play,
  TrendingUp,
  Clock,
  Award
} from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";

const replays = [
  {
    title: "Uniswap V3 Liquidity Strategy",
    mentor: "CryptoWhale_78",
    outcome: "+42.3%",
    duration: "15 min",
    difficulty: "Advanced",
    participants: 1243
  },
  {
    title: "NFT Floor Sweep Analysis",
    mentor: "NFTTrader_99",
    outcome: "+28.7%",
    duration: "12 min",
    difficulty: "Intermediate",
    participants: 892
  },
  {
    title: "Yield Farm Optimization",
    mentor: "DeFiMaster",
    outcome: "+35.1%",
    duration: "18 min",
    difficulty: "Advanced",
    participants: 1567
  },
  {
    title: "Safe Multi-Chain Bridging",
    mentor: "Web3Builder",
    outcome: "+12.4%",
    duration: "10 min",
    difficulty: "Beginner",
    participants: 2341
  },
  {
    title: "Curve Pool Strategy Deep Dive",
    mentor: "YieldHunter",
    outcome: "+51.2%",
    duration: "22 min",
    difficulty: "Advanced",
    participants: 678
  },
  {
    title: "Token Launch Sniper Strategy",
    mentor: "SmartContract_Pro",
    outcome: "+89.5%",
    duration: "8 min",
    difficulty: "Expert",
    participants: 456
  }
];

export default function Replays() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Trade Replays</h1>
            <p className="text-muted-foreground">Learn by watching successful trades in action</p>
          </div>

          {/* Featured Replay */}
          <Card className="glass p-8 mb-8 border-l-4 border-l-accent">
            <Badge variant="secondary" className="mb-3">Featured Replay</Badge>
            <h2 className="text-2xl font-bold mb-2">{replays[0].title}</h2>
            <p className="text-muted-foreground mb-6">by {replays[0].mentor}</p>
            
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                <span className="font-semibold text-accent">{replays[0].outcome}</span>
                <span className="text-sm text-muted-foreground">Return</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <span>{replays[0].duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-muted-foreground" />
                <span>{replays[0].participants.toLocaleString()} learners</span>
              </div>
            </div>

            <Button variant="hero" size="lg">
              <Play className="w-5 h-5 mr-2" />
              Start Replay
            </Button>
          </Card>

          {/* All Replays */}
          <h3 className="text-xl font-bold mb-4">All Replays</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {replays.map((replay, index) => (
              <Card key={index} className="glass p-6 hover:scale-[1.02] transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="secondary">{replay.difficulty}</Badge>
                  <span className="text-sm text-accent font-semibold">{replay.outcome}</span>
                </div>

                <h4 className="font-bold mb-2">{replay.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">by {replay.mentor}</p>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span>{replay.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Learners</span>
                    <span>{replay.participants.toLocaleString()}</span>
                  </div>
                </div>

                <Button variant="glass" size="sm" className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Replay
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
