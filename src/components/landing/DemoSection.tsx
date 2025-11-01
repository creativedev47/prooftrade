import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, Users, PlayCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    icon: Wallet,
    title: "Connect Wallet",
    description: "Read-only connection to safely view your portfolio"
  },
  {
    number: "02",
    icon: Users,
    title: "Choose Mentor",
    description: "See verified PnL + transaction feed from top traders"
  },
  {
    number: "03",
    icon: PlayCircle,
    title: "Replay Trade",
    description: "Watch simulated learning demo with outcome visualization"
  }
];

export const DemoSection = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            See It in <span className="text-gradient">Action</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple 3-step process to start learning from real onchain activity
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="glass p-8 relative overflow-hidden group hover:scale-105 transition-all duration-300"
            >
              <div className="absolute top-4 right-4 text-6xl font-bold text-primary/10 group-hover:scale-110 transition-transform">
                {step.number}
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 z-20">
                  <ArrowRight className="w-8 h-8 text-primary" />
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Link to="/dashboard">
            <Button variant="hero" size="lg">
              Try Demo
            </Button>
          </Link>
          <Button variant="glass" size="lg">
            Explore Mentors
          </Button>
        </div>
      </div>
    </section>
  );
};