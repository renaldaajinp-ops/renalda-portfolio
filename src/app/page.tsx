import { About } from "@/components/About";
import { Cta } from "@/components/Cta";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Game } from "@/components/Game";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <About />
        <Services />
        <Process />
        <Portfolio />
        <Testimonials />
        <Faq />
        <Cta />
        <Game />
      </main>
      <Footer />
    </>
  );
}
