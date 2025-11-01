import { useState } from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { DemoSection } from "@/components/landing/DemoSection";
import { MentorSection } from "@/components/landing/MentorSection";
import { TestimonialSection } from "@/components/landing/TestimonialSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { WalletConnect } from "@/components/wallet/WalletConnect";
import { WalletDashboard } from "@/components/wallet/WalletDashboard";

const Index = () => {
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);

  const handleAddressSubmit = (address: string) => {
    setConnectedAddress(address);
  };

  const handleBack = () => {
    setConnectedAddress(null);
  };

  if (connectedAddress) {
    return <WalletDashboard address={connectedAddress} onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      {/* <WalletConnect onAddressSubmit={handleAddressSubmit} /> */}
      <DemoSection />
      <MentorSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;