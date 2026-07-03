import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { CustomCursor } from "@/components/interaction/custom-cursor";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";

/**
 * Layout for the public marketing site: smooth scroll, custom cursor,
 * navbar, footer and global structured data.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd />
      <SmoothScrollProvider>
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </SmoothScrollProvider>
    </>
  );
}
