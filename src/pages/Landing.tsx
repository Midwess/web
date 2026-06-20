import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { DivideX } from "@/components/landing/Divide";
import { Hero } from "@/components/landing/Hero";
import { Metrics } from "@/components/landing/Metrics";
import { Projects } from "@/components/landing/Projects";
import { WhyRust } from "@/components/landing/WhyRust";
import { Proof } from "@/components/landing/Proof";
import { Writing } from "@/components/landing/Writing";
import { Shipping } from "@/components/landing/Shipping";

const Landing = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <DivideX />
      <Metrics />
      <DivideX />
      <Projects />
      <DivideX />
      <WhyRust />
      <DivideX />
      <Proof />
      <DivideX />
      <Writing />
      <DivideX />
      <Shipping />
      <DivideX />
    </main>
    <Footer />
  </>
);

export default Landing;
