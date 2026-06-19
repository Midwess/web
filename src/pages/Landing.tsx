import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { DivideX } from "@/components/landing/Divide";
import { Hero } from "@/components/landing/Hero";
import { Projects } from "@/components/landing/Projects";
import { Writing } from "@/components/landing/Writing";
import { Shipping } from "@/components/landing/Shipping";

const Landing = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <DivideX />
      <Projects />
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
