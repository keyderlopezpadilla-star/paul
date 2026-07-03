import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Experience } from "@/components/sections/experience";
import { Courses } from "@/components/sections/courses";
import { Process } from "@/components/sections/process";
import { Benefits } from "@/components/sections/benefits";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Experience />
      <Courses />
      <Process />
      <Stats />
      <Benefits />
      <Testimonials />
      <CTA />
    </>
  );
}
