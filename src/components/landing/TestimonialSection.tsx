import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "ProofTrade changed how I understand DeFi. The replay feature made complex trades crystal clear.",
    author: "@CryptoNewbie",
    role: "First-time DeFi User"
  },
  {
    quote: "The replay mode made me confident before my first trade. I could see exactly what would happen.",
    author: "@DeFiLearner",
    role: "Active Trader"
  },
  {
    quote: "As a mentor, sharing my strategy has never been easier. My trades speak for themselves.",
    author: "@TradeWisely",
    role: "Verified Mentor"
  }
];

export const TestimonialSection = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by <span className="text-gradient">Learners</span> Worldwide
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="glass p-8 hover:translate-y-[-8px] transition-all duration-300"
            >
              <Quote className="w-10 h-10 text-primary/30 mb-4" />
              <p className="text-lg mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-primary">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};