import { Play, BarChart3, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import dashboardPreview from "@/assets/dashboard-preview.jpg";

const features = [
  {
    icon: Play,
    title: "Replay any mentor's verified trade safely",
    description: "Learn by watching simulated replays of successful trades without risking real funds."
  },
  {
    icon: BarChart3,
    title: "Get instant insights auto-generated",
    description: "AI-powered analysis breaks down every transaction with clear explanations."
  },
  {
    icon: Award,
    title: "Earn XP and badges as you learn",
    description: "Track your progress and unlock achievements as you master DeFi concepts."
  }
];

export const SolutionSection = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The <span className="text-gradient">ProofTrade</span> Solution
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn from real onchain activity in a safe, structured environment
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          <div className="order-2 lg:order-1">
            <img 
              src={dashboardPreview} 
              alt="ProofTrade dashboard preview showing trading interface" 
              className="rounded-2xl shadow-2xl glow"
            />
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="glass p-6 hover:translate-x-2 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};