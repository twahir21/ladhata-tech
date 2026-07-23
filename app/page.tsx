import Hero from "@/home/page";
import { SmoothScrollProvider } from "@/components/Scroll";
import LadhataHero from "@/components/tech";

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <main>
        <Hero />
        {/* rest of the landing page continues below the pinned sequence */}
        <LadhataHero />
      </main>
    </SmoothScrollProvider>
  );
}