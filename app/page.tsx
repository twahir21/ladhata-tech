import Hero from "@/home/page";
import { SmoothScrollProvider } from "@/components/Scroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <main>
        <Hero />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}