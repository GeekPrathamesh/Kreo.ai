import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { DemoCarousel } from "@/components/DemoCarousel";
import { PricingSection } from "@/components/PricingSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { FeaturesSection } from "@/components/Features";
import { FeaturesSlider } from "@/components/Featuresslider";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <DemoCarousel />
        <FeaturesSection/>
        <FeaturesSlider/>
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
