
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { InteractiveServicesSection } from "@/components/home/InteractiveServicesSection";
import { Footer } from "@/components/home/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <HeroSection />
        <ServicesSection />
        <InteractiveServicesSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
