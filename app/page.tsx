import Hero from "@/home/page";
import { SmoothScrollProvider } from "@/components/Scroll";

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <main>
        <Hero />
        {/* rest of the landing page continues below the pinned sequence */}
      </main>
    </SmoothScrollProvider>
  );
}