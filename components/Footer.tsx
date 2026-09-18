"use client";

import {
  Terminal,
  ArrowUpRight,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Zap,
  Globe,
  MessageCircle,
} from "lucide-react";
import { COLORS } from "@/const/colors";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative bg-[#070A12] text-[#F4F1EA] overflow-hidden border-t border-white/[0.08]">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#4DD0E1]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-y-1/2 w-96 h-96 bg-[#FFB84D]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* CTA Pre-Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#131A2B] to-[#0B0F1A] border border-white/[0.12] p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          {/* Subtle grid pattern background */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB84D]/10 border border-[#FFB84D]/25 text-[#FFB84D] text-xs font-mono mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ready to scale your enterprise?</span>
              </div>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                Let&apos;s build your digital powerhouse together.
              </h2>
              <p
                className="mt-4 text-base sm:text-lg text-[#7C8598] leading-relaxed"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                From custom ERPs and offline-capable mobile apps to cloud APIs and fintech integrations across East Africa.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
              <a
                href="https://simamia.co.tz"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-[#FFB84D] to-[#ffa31a] text-[#0B0F1A] hover:shadow-[0_0_30px_rgba(255,184,77,0.4)] transition-all transform hover:-translate-y-0.5"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                <span>Explore Simamia ERP</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@twile.co.tz"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 hover:border-white/20 transition-all"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                <Mail className="w-4 h-4 text-[#4DD0E1]" />
                <span>Talk to Engineering</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mt-20 pb-16 border-b border-white/[0.08]">
          {/* Brand Column (2 cols wide on LG) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <a href="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#131A2B] border border-[#4DD0E1]/30">
                <Terminal className="w-5 h-5 text-[#4DD0E1]" />
              </div>
              <div className="flex flex-col">
                <span
                  className="font-bold text-xl tracking-tight text-white"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  Twile<span className="text-[#4DD0E1]">Tech</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#7C8598] font-mono">
                  Solutions Tanzania
                </span>
              </div>
            </a>

            <p
              className="text-sm text-[#7C8598] leading-relaxed max-w-sm"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Tunatengeneza mifumo thabiti ya kidijitali na program tumizi za kisasa kwa biashara na mashirika ya Tanzania na Afrika Mashariki.
            </p>

            <div className="flex flex-col gap-2.5 text-xs text-[#7C8598] font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FFB84D]" />
                <span>Dar es Salaam &amp; Arusha, Tanzania 🇹🇿</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#4DD0E1]" />
                <span>High-performance offline-first infrastructure</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TwileTech GitHub"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-[#7C8598] hover:text-white transition-colors"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TwileTech Twitter / X"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-[#7C8598] hover:text-[#4DD0E1] transition-colors"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TwileTech LinkedIn"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-[#7C8598] hover:text-[#4DD0E1] transition-colors"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@twile.co.tz"
                aria-label="Email Us"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-[#7C8598] hover:text-[#FFB84D] transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="flex flex-col gap-4">
            <h3
              className="text-xs font-mono font-semibold uppercase tracking-wider text-[#FFB84D]"
            >
              Solutions
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-[#7C8598]">
              <li>
                <a
                  href="https://simamia.co.tz"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>Simamia POS &amp; ERP</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#FFB84D]" />
                </a>
              </li>
              <li>
                <a href="#sequence" className="hover:text-white transition-colors">
                  VICOBA Financial Ledger
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-white transition-colors">
                  Inventory &amp; Supply Chain
                </a>
              </li>
              <li>
                <a href="#sequence" className="hover:text-white transition-colors">
                  Mobile Business Apps
                </a>
              </li>
              <li>
                <a href="#sequence" className="hover:text-white transition-colors">
                  Payment Gateway (M-Pesa)
                </a>
              </li>
            </ul>
          </div>

          {/* Technology Column */}
          <div className="flex flex-col gap-4">
            <h3
              className="text-xs font-mono font-semibold uppercase tracking-wider text-[#4DD0E1]"
            >
              Tech Stack
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-[#7C8598]">
              <li className="hover:text-white transition-colors">Next.js &amp; React 19</li>
              <li className="hover:text-white transition-colors">Bun &amp; Go Backends</li>
              <li className="hover:text-white transition-colors">Supabase &amp; Postgres</li>
              <li className="hover:text-white transition-colors">Offline-Sync Architecture</li>
              <li className="hover:text-white transition-colors">Cloud &amp; DevOps Deploy</li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col gap-4">
            <h3
              className="text-xs font-mono font-semibold uppercase tracking-wider text-white"
            >
              Contact &amp; Support
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-[#7C8598]">
              <li>
                <a
                  href="mailto:info@twile.co.tz"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-[#4DD0E1]" />
                  <span>info@twile.co.tz</span>
                </a>
              </li>
              <li>
                <a
                  href="https://simamia.co.tz"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Globe className="w-3.5 h-3.5 text-[#FFB84D]" />
                  <span>simamia.co.tz</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md w-fit mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Active Deployment Region: TZ</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Attribution & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7C8598]">
          <div className="flex items-center gap-2">
            <span>&copy; {currentYear} Twile Tech Solutions. All rights reserved.</span>
          </div>

          {/* Styled Developer Attribution in Footer */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131A2B]/80 border border-white/[0.08] text-xs font-mono shadow-sm">
            <span className="text-[#7C8598]">Crafted by</span>
            <span className="font-semibold text-[#4DD0E1] hover:underline cursor-default">BlackCoder</span>
            <span className="text-[#FFB84D] font-bold">&times;</span>
            <span className="font-semibold text-[#818cf8] hover:underline cursor-default">BlueHacker</span>
            <span className="ml-1 text-[11px]">🇹🇿</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
