import { Card } from "@/components/ui/card";
import { TrendingUp, BookOpen, DollarSign } from "lucide-react";

const mentorFeatures = [
  {
    icon: TrendingUp,
    title: "Verified PnL Dashboard",
    description: "Showcase your real trading performance with data powered by Zerion"
  },
  {
    icon: BookOpen,
    title: "Create Lessons Automatically",
    description: "Your trade history becomes educational content automatically"
  },
  {
    icon: DollarSign,
    title: "Earn from Learners",
    description: "Monetize your expertise through paid mentorship or community recognition"
  }
];

export const MentorSection = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            For <span className="text-gradient">Mentors</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your strategy. Teach through your trades.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {mentorFeatures.map((feature, index) => (
            <Card 
              key={index}
              className="glass p-8 hover:scale-105 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                <feature.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};