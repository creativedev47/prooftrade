import { AlertCircle, TrendingDown, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

const problems = [
  {
    icon: AlertCircle,
    title: "Too much theory, not enough experience",
    description: "Traditional crypto education focuses on concepts without real-world application."
  },
  {
    icon: TrendingDown,
    title: "Risky to learn with real money",
    description: "Beginners risk losing funds while trying to understand DeFi and trading."
  },
  {
    icon: Shield,
    title: "No way to see what real experts actually do",
    description: "Can't verify claims or learn from actual successful trading strategies."
  }
];

export const ProblemSection = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Crypto Learning is <span className="text-gradient">Broken</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The current approach to crypto education leaves learners unprepared and at risk
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <Card 
              key={index}
              className="glass p-8 hover:scale-105 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-16 h-16 bg-destructive/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <problem.icon className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{problem.title}</h3>
              <p className="text-muted-foreground">{problem.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};