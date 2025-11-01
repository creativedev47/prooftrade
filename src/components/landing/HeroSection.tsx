import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-sphere.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">Powered by Zerion API</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Learn Crypto from{" "}
              <span className="text-gradient">Real Onchain Actions</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl">
              Discover, replay, and learn from verified traders and DeFi mentors — all powered by Zerion.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/auth">
                <Button variant="hero" size="lg" className="group">
                  Start Learning
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="glass" size="lg">
                  Become a Mentor
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - 3D Sphere */}
          <div className="relative">
            <div className="relative animate-float">
              <img 
                src={heroImage} 
                alt="ProofTrade - Learning sphere with crypto elements orbiting" 
                className="w-full h-auto rounded-3xl shadow-2xl glow"
              />
              {/* Orbiting Icons */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-accent/20 glass rounded-full flex items-center justify-center animate-pulse-slow">
                <span className="text-2xl">₿</span>
              </div>
              <div className="absolute bottom-10 left-10 w-16 h-16 bg-primary/20 glass rounded-full flex items-center justify-center animate-pulse-slow" style={{ animationDelay: '1s' }}>
                <span className="text-2xl">Ξ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};