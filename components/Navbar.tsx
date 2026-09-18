"use client";

import { useState, useEffect } from "react";
import { Terminal, Menu, X, ArrowUpRight, Sparkles, Code2 } from "lucide-react";
import { COLORS } from "@/const/colors";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Solutions", href: "#sequence" },
    { label: "Showcase", href: "#showcase" },
    { label: "Simamia ERP", href: "https://simamia.co.tz", isExternal: true },
    { label: "Tech Stack", href: "#stack" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0b0f1a]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="/"
          className="group flex items-center gap-3 text-decoration-none focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#131A2B] to-[#0B0F1A] border border-white/10 shadow-inner group-hover:border-[#4DD0E1]/40 transition-colors">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#4DD0E1]/10 to-[#FFB84D]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Terminal className="w-5 h-5 text-[#4DD0E1] transition-transform group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FFB84D] animate-pulse ring-2 ring-[#0b0f1a]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span
                className="font-bold text-lg tracking-tight text-[#F4F1EA] group-hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                Twile<span className="text-[#4DD0E1]">Tech</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-[#4DD0E1]/10 text-[#4DD0E1] border border-[#4DD0E1]/20">
                TZ
              </span>
            </div>
            <span
              className="text-[10px] tracking-widest uppercase text-[#7C8598] font-mono"
            >
              Solutions
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 bg-[#131A2B]/70 border border-white/[0.08] px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg shadow-black/20">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noopener noreferrer" : undefined}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#7C8598] hover:text-[#F4F1EA] hover:bg-white/[0.06] transition-all duration-200"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {link.label}
              {link.isExternal && (
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              )}
            </a>
          ))}
        </nav>

        {/* Action Button & Live Status */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Available for projects</span>
          </div>

          <a
            href="https://simamia.co.tz"
            className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full font-medium text-xs text-[#0B0F1A] bg-gradient-to-r from-[#FFB84D] to-[#ffa31a] hover:from-[#ffc366] hover:to-[#FFB84D] shadow-[0_0_20px_rgba(255,184,77,0.3)] hover:shadow-[0_0_25px_rgba(255,184,77,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="https://simamia.co.tz"
            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#FFB84D] text-[#0B0F1A]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Start Project
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg bg-[#131A2B] border border-white/10 text-[#F4F1EA] hover:text-[#4DD0E1] focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 mx-4 p-5 rounded-2xl bg-[#0b0f1a]/95 border border-white/10 backdrop-blur-2xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Q2/Q3 Projects</span>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-[#F4F1EA] hover:text-[#4DD0E1] hover:bg-white/[0.05] transition-colors"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                <span>{link.label}</span>
                {link.isExternal ? (
                  <ArrowUpRight className="w-4 h-4 text-[#7C8598]" />
                ) : (
                  <span className="text-xs font-mono text-[#7C8598]">→</span>
                )}
              </a>
            ))}

            <div className="pt-3 mt-2 border-t border-white/[0.08] flex flex-col gap-2">
              <a
                href="https://simamia.co.tz"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#FFB84D] to-[#ffa31a] text-[#0B0F1A] shadow-lg shadow-[#FFB84D]/20"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                <span>Start a Project with Us</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
