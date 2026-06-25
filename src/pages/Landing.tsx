import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { DivideX } from "@/components/landing/Divide";
import { Hero } from "@/components/landing/Hero";
import { Metrics } from "@/components/landing/Metrics";
import { Projects } from "@/components/landing/Projects";
import { Proof } from "@/components/landing/Proof";
import { Writing } from "@/components/landing/Writing";
import { Shipping } from "@/components/landing/Shipping";
import { SeoHead, webSiteLd, organizationLd } from "@/lib/seo";

const Landing = () => (
  <>
    <SeoHead
      title="Durable infrastructure for stateful workloads"
      description="Midwess builds pglite-rs (embedded Postgres in Rust), worldant (durable Vercel Workflow runtime on SQLite), and pgpaw (Postgres change-data cache) — open source under MIT."
      path="/"
      jsonLd={[webSiteLd(), organizationLd()]}
    />
    <Navbar />
    <main>
      <Hero />
      <DivideX />
      <Metrics />
      <DivideX />
      <Projects />
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
