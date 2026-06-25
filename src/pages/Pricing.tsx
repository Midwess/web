import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { DivideX } from "@/components/landing/Divide";
import { Pricing as PricingSection } from "@/components/landing/Pricing";
import { SeoHead } from "@/lib/seo";

const Pricing = () => (
  <>
    <SeoHead
      title="Pricing"
      description="Midwess is MIT-licensed open source. We make money from sponsors and partners, not from a hosted control plane."
      path="/pricing"
    />
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
