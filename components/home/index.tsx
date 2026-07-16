'use client';

import dynamic from "next/dynamic";

// The R3F scene touches window/canvas APIs, so it must never run during SSR.
const LadhataHeroScene = dynamic(
  () => import("@/components/home/hero"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#09090B] overflow-hidden">
      {/* B. Three.js background layer, -z-10, fixed behind everything */}
      <LadhataHeroScene />

      {/* A. HTML overlay layer, z-10 */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-5xl font-sans text-5xl font-bold tracking-tighter text-white md:text-7xl">
          We Build the Digital Engines for East African Enterprises.
        </h1>

        <p className="mt-6 max-w-xl text-base text-zinc-400 md:text-lg">
          Ladhata Tech Solutions designs, ships, and scales the software
          infrastructure behind the region&apos;s fastest-growing companies.
        </p>

        <button
          type="button"
          className="mt-10 rounded-full bg-linear-to-r from-[#6366F1] to-[#0D9488] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-transform duration-200 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B] focus-visible:ring-teal-400 md:text-base"
        >
          Start Your Project
        </button>
      </section>
    </main>
  );
}