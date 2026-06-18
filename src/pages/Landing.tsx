import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { DivideX } from "@/components/landing/Divide";
import { Hero } from "@/components/landing/Hero";
import { Projects } from "@/components/landing/Projects";
import { Values } from "@/components/landing/Values";
import { Shipping } from "@/components/landing/Shipping";
import { Connect } from "@/components/landing/Connect";

const Landing = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <DivideX />
      <Projects />
      <DivideX />
      <Values />
      <DivideX />
      <Shipping />
      <DivideX />
      <Connect />
      <DivideX />
    </main>
    <Footer />
  </>
);

export default Landing;
