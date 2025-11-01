import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen,
  Award,
  Clock,
  CheckCircle2
} from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";

const lessons = [
  {
    title: "Introduction to DeFi Protocols",
    mentor: "DeFiMaster",
    xp: 150,
    duration: "20 min",
    difficulty: "Beginner",
    completed: true,
    topics: ["DeFi", "Protocols", "AMM"]
  },
  {
    title: "Understanding Liquidity Pools",
    mentor: "CryptoWhale_78",
    xp: 200,
    duration: "25 min",
    difficulty: "Intermediate",
    completed: false,
    topics: ["Liquidity", "DEX", "Trading"]
  },
  {
    title: "NFT Valuation Strategies",
    mentor: "NFTTrader_99",
    xp: 180,
    duration: "18 min",
    difficulty: "Intermediate",
    completed: true,
    topics: ["NFT", "Analysis", "Trading"]
  },
  {
    title: "Yield Farming Best Practices",
    mentor: "YieldHunter",
    xp: 220,
    duration: "30 min",
    difficulty: "Advanced",
    completed: false,
    topics: ["Yield", "Farming", "Strategy"]
  },
  {
    title: "Smart Contract Security Basics",
    mentor: "SmartContract_Pro",
    xp: 250,
    duration: "35 min",
    difficulty: "Advanced",
    completed: false,
    topics: ["Security", "Smart Contracts", "Auditing"]
  },
  {
    title: "Multi-Chain Portfolio Management",
    mentor: "Web3Builder",
    xp: 190,
    duration: "22 min",
    difficulty: "Intermediate",
    completed: false,
    topics: ["Multi-chain", "Portfolio", "Strategy"]
  }
];

export default function Lessons() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Learning Paths</h1>
            <p className="text-muted-foreground">Structured lessons from expert mentors</p>
          </div>

          {/* Progress Overview */}
          <Card className="glass p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">Your Learning Progress</h3>
                <p className="text-sm text-muted-foreground">2 of 6 lessons completed</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gradient">330 XP</p>
                <p className="text-xs text-muted-foreground">Total Earned</p>
              </div>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-primary w-1/3" />
            </div>
          </Card>

          {/* Lessons Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {lessons.map((lesson, index) => (
              <Card 
                key={index} 
                className={`glass p-6 hover:scale-[1.01] transition-all cursor-pointer ${
                  lesson.completed ? 'border-accent/50' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{lesson.difficulty}</Badge>
                      {lesson.completed && (
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                      )}
                    </div>
                    <h4 className="font-bold text-lg mb-1">{lesson.title}</h4>
                    <p className="text-sm text-muted-foreground">by {lesson.mentor}</p>
                  </div>
                  <Badge className="bg-accent/20 text-accent border-accent/30">
                    +{lesson.xp} XP
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {lesson.topics.map((topic, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{lesson.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>Lesson</span>
                  </div>
                </div>

                <Button 
                  variant={lesson.completed ? "glass" : "hero"} 
                  size="sm" 
                  className="w-full"
                >
                  {lesson.completed ? (
                    <>
                      <Award className="w-4 h-4 mr-2" />
                      Review Lesson
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Start Lesson
                    </>
                  )}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
