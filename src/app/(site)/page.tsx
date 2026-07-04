import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Experience } from "@/components/sections/experience";
import { Gallery } from "@/components/sections/gallery";
import { Courses } from "@/components/sections/courses";
import { Process } from "@/components/sections/process";
import { Benefits } from "@/components/sections/benefits";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";
import {
  getServices,
  getCourses,
  getTestimonials,
  getPartners,
} from "@/lib/data";

export default async function HomePage() {
  const [services, courses, testimonials, partners] = await Promise.all([
    getServices(),
    getCourses(),
    getTestimonials(),
    getPartners(),
  ]);

  return (
    <>
      <Hero />
      <Marquee partners={partners} />
      <About />
      <Services services={services} />
      <Experience />
      <Gallery />
      <Courses courses={courses} />
      <Process />
      <Stats />
      <Benefits />
      <Testimonials testimonials={testimonials} />
      <CTA />
    </>
  );
}
