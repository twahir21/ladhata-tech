"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Cpu, Globe, ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function LadhataHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const svgSignalRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Intro Timeline (Text Reveals & Fade-Ins)
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

      tl.fromTo(
        badgeRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
        .fromTo(
          ".title-word",
          { y: 60, opacity: 0, rotateX: -45 },
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.15 },
          "-=0.4"
        )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          cardRef.current,
          { scale: 0.9, opacity: 0, y: 50 },
          { scale: 1, opacity: 1, y: 0, duration: 1.2 },
          "-=1"
        );

      // 2. Continuous SVG Signal Pulse Animation
      gsap.to(".signal-pulse", {
        strokeDashoffset: 0,
        duration: 2.5,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".node-glow", {
        scale: 1.4,
        opacity: 0.8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
        ease: "sine.inOut",
        transformOrigin: "center",
      });

      // 3. Scroll-Driven Parallax & Image Transformations
      gsap.to(".hero-bg-glow", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 150,
        scale: 1.2,
      });

      gsap.to(cardRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
        y: -100,
        rotateY: 8,
        rotateX: -5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
      <section
        ref={containerRef}
        className="relative min-h-screen w-full overflow-hidden bg-[#0B0F1A] text-white flex flex-col justify-between pt-24 pb-12 px-6 md:px-16"
      >
        {/* Ambient Gradient Glows (Indigo & Signal Cyan) */}
        <div className="hero-bg-glow pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-[#4DD0E1]/10 blur-[140px]" />
        <div className="hero-bg-glow pointer-events-none absolute top-1/2 -right-32 h-[600px] w-[600px] rounded-full bg-[#FFB84D]/10 blur-[160px]" />

        {/* Navigation Bar Header */}
        <header className="absolute top-0 left-0 w-full flex items-center justify-between px-6 md:px-16 py-6 z-20 border-b border-white/5 backdrop-blur-md bg-[#0B0F1A]/60">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#4DD0E1] to-[#FFB84D] flex items-center justify-center font-bold text-[#0B0F1A]">
              L
            </div>
            <span className="font-bold tracking-wider text-xl">
              LADHATA <span className="text-[#4DD0E1] font-light">TECH</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-400 font-medium">
            <a href="#solutions" className="hover:text-[#4DD0E1] transition-colors">Solutions</a>
            <a href="#about" className="hover:text-[#4DD0E1] transition-colors">About Us</a>
            <a href="#tanzania" className="hover:text-[#4DD0E1] transition-colors">East Africa Hub</a>
          </nav>

          <a
            href="#contact"
            className="text-xs md:text-sm font-semibold px-5 py-2.5 rounded-full border border-[#4DD0E1]/30 text-[#4DD0E1] hover:bg-[#4DD0E1] hover:text-[#0B0F1A] transition-all duration-300"
          >
            Get in Touch
          </a>
        </header>

        {/* Hero Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto z-10 max-w-7xl mx-auto w-full pt-12">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Location & Status Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit mb-6"
            >
              <span className="h-2 w-2 rounded-full bg-[#FFB84D] animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-[#FFB84D] font-mono">
                Tanzania & Extended East Africa
              </span>
            </div>

            {/* Main Animated Title */}
            <h1
              ref={titleRef}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
            >
              <span className="inline-block title-word">Architecting</span>{" "}
              <span className="inline-block title-word text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#4DD0E1]">
                Digital Futures
              </span>{" "}
              <span className="inline-block title-word">for Africa.</span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-base sm:text-lg text-gray-400 max-w-xl mb-8 leading-relaxed font-light"
            >
              Ladhata delivers enterprise software architectures, cloud transformations, 
              and bespoke fintech solutions tailored to power businesses across Dar es Salaam 
              and beyond.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
              <button className="group relative px-7 py-3.5 rounded-xl bg-[#FFB84D] text-[#0B0F1A] font-bold text-sm overflow-hidden shadow-lg shadow-[#FFB84D]/10 hover:shadow-[#FFB84D]/25 transition-all duration-300 flex items-center gap-2">
                <span>Explore Solutions</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button className="px-7 py-3.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 text-white font-medium text-sm transition-all duration-300 backdrop-blur-sm">
                Our Tech Stack
              </button>
            </div>
          </div>

          {/* Right Column: Animated Interactive 3D/SVG Visual Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              ref={cardRef}
              className="relative w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.02] p-6 backdrop-blur-xl shadow-2xl overflow-hidden group"
            >
              {/* Card Header Info */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#4DD0E1]/10 text-[#4DD0E1]">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Digital Pulse Node</h3>
                    <p className="text-xs text-gray-400">Core Systems Active</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#FFB84D] px-2 py-1 bg-[#FFB84D]/10 rounded border border-[#FFB84D]/20">
                  99.9% Uptime
                </span>
              </div>

              {/* Animated SVG Network Layer */}
              <div className="relative h-64 w-full flex items-center justify-center">
                <svg
                  ref={svgSignalRef}
                  viewBox="0 0 300 200"
                  className="w-full h-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background Grid Lines */}
                  <path d="M 0,100 L 300,100" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <path d="M 150,0 L 150,200" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

                  {/* Dynamic Connecting Paths */}
                  <path
                    d="M 30,150 Q 80,40 150,100 T 270,50"
                    stroke="rgba(77,208,225,0.2)"
                    strokeWidth="2"
                    fill="none"
                  />
                  
                  {/* Animated Overlay Pulse Path */}
                  <path
                    d="M 30,150 Q 80,40 150,100 T 270,50"
                    stroke="#4DD0E1"
                    strokeWidth="3"
                    strokeDasharray="40 160"
                    strokeDashoffset="200"
                    className="signal-pulse"
                    fill="none"
                  />

                  {/* Secondary Signal Path (Amber) */}
                  <path
                    d="M 30,50 Q 120,180 270,140"
                    stroke="#FFB84D"
                    strokeWidth="2"
                    strokeDasharray="30 120"
                    strokeDashoffset="150"
                    className="signal-pulse"
                    fill="none"
                  />

                  {/* Interactive Glowing Nodes */}
                  <circle cx="30" cy="150" r="5" fill="#4DD0E1" className="node-glow" />
                  <circle cx="150" cy="100" r="6" fill="#FFB84D" className="node-glow" />
                  <circle cx="270" cy="50" r="5" fill="#4DD0E1" className="node-glow" />
                  <circle cx="270" cy="140" r="4" fill="#FFB84D" className="node-glow" />
                </svg>

                {/* Floating Metric Pill */}
                <div className="absolute bottom-2 left-2 bg-[#0B0F1A]/80 border border-white/10 p-2.5 rounded-lg flex items-center gap-3 backdrop-blur-md">
                  <Globe className="w-4 h-4 text-[#4DD0E1]" />
                  <span className="text-xs text-gray-300 font-mono">Tanzania Regional Core</span>
                </div>
              </div>

              {/* Bottom Feature Micro-Grid */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#FFB84D]" />
                  <span className="text-xs text-gray-300">Enterprise Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#4DD0E1]" />
                  <span className="text-xs text-gray-300">Custom Cloud Ops</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Metrics Indicator */}
        <div className="w-full max-w-7xl mx-auto border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Ladhata Tech Solutions Ltd. All rights reserved.</p>
          <div className="flex gap-8 font-mono">
            <span>FINTECH</span>
            <span>ENTERPRISE CLOUD</span>
            <span>CUSTOM SOFTWARE</span>
          </div>
        </div>
      </section>
  );
}