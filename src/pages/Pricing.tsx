import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { DivideX } from "@/components/landing/Divide";
import { Pricing as PricingSection } from "@/components/landing/Pricing";

const Pricing = () => (
  <>
    <Navbar />
    <main>
      <DivideX />
      <PricingSection />
      <DivideX />
    </main>
    <Footer />
  </>
);

export default Pricing;
