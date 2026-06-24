"use client";

import Navbar from "@/components/Navbar";
import CinematicFooter from "@/components/CinematicFooter";
import WhyUsSection from "@/components/WhyUsSection";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import ServiceCardVisuals, { SERVICE_VISUALS } from "@/components/solutions/ServiceCardVisuals";

// ── Magnetic Button ──────────────────────────────────────────────────────────
function MagneticButton({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 190, damping: 18 });
  const springY = useSpring(my, { stiffness: 190, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.36);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.36);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.div style={{ x: springX, y: springY }}>
        <Link
          href={href}
          className={[
            "inline-flex items-center justify-center rounded-full px-10 py-4.5",
            "text-[0.9rem] tracking-[0.08em] font-semibold uppercase transition-all duration-300 select-none",
            primary
              ? "bg-white text-black hover:bg-neutral-100 shadow-[0_10px_35px_rgba(255,255,255,0.18)] hover:scale-105 active:scale-95"
              : "text-white border border-white/25 bg-white/[0.04] hover:bg-white/[0.12] hover:border-white/50 hover:scale-105 active:scale-95 backdrop-blur-md",
          ].join(" ")}
        >
          {children}
        </Link>
      </motion.div>
    </div>
  );
}

const transitionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function SolutionsPage() {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [hoveredServiceIdx, setHoveredServiceIdx] = useState<number | null>(null);
  const [rowVisible] = useState<boolean[]>(Array(7).fill(false));
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const heroRevealed = true;

  const testimonials = useMemo(
    () => [
      {
        company: "Kaggle",
        quote:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        name: "Daniel Henderson",
        title: "Engineering Manager",
        theme: "light" as const,
      },
      {
        company: "Slack",
        quote:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        name: "Anderson Lima",
        title: "Product Manager",
        theme: "dark" as const,
      },
      {
        company: "Nike",
        quote:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        name: "Jane Dodson",
        title: "Marketing Director",
        theme: "light" as const,
      },
      {
        company: "Atlassian",
        quote:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        name: "Johnathan Rodriguez",
        title: "UX Research",
        theme: "dark" as const,
      },
      {
        company: "Dribbble",
        quote:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
        name: "Phil Heath",
        title: "Staff Engineer",
        theme: "light" as const,
      },
    ],
    [],
  );

  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    document.title = "SOLUTIONS | WEBBED";

    const interval = window.setInterval(() => {
      setTestimonialIdx((i) => (i + 1) % 5);
    }, 5500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="relative overflow-hidden pt-28 pb-10">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute -right-32 top-10 h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)] blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-20 h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.06),transparent_70%)] blur-3xl" />

        {/* Tailored AI Systems / Enterprise Solutions (hero) */}
        <section
          className="relative w-full min-h-[100vh] overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 70% 15%, rgba(26,26,26,1) 0%, #050505 42%, #050505 100%)",
          }}
        >
          {/* Top bleed gradient to soften nav -> hero transition */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 w-full"
            style={{
              height: 80,
              background:
                "linear-gradient(to bottom, #000000 0%, rgba(5,5,5,0) 100%)",
            }}
          />

          {/* Electric indigo atmosphere */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 top-10 h-[520px] w-[520px] rounded-full"
            style={{
              background: "radial-gradient(circle at center, rgba(99,102,241,0.18), rgba(99,102,241,0) 65%)",
              filter: "blur(24px)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 bottom-10 h-[380px] w-[380px] rounded-full"
            style={{
              background: "radial-gradient(circle at center, rgba(255,255,255,0.05), rgba(255,255,255,0) 68%)",
              filter: "blur(28px)",
            }}
          />

          {/* Noise overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')",
              opacity: 0.08,
              mixBlendMode: "overlay",
            }}
          />

          {/* Barely-there technical grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(148,163,184,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.025) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
              maskImage: "radial-gradient(ellipse 78% 68% at 58% 42%, black 8%, transparent 78%)",
              WebkitMaskImage: "radial-gradient(ellipse 78% 68% at 58% 42%, black 8%, transparent 78%)",
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[24%] z-0 -translate-x-1/2 whitespace-nowrap text-[clamp(8.5rem,20vw,19rem)] font-bold uppercase leading-none text-white/[0.045] [font-family:var(--font-heading)]"
            style={{
              letterSpacing: "0.055em",
              maskImage: "linear-gradient(90deg, transparent 0%, black 11%, black 89%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 11%, black 89%, transparent 100%)",
            }}
          >
            Solutions
          </div>

          <div className="relative mx-auto max-w-[1440px] px-6 py-24 sm:px-10 sm:py-[120px] lg:px-16 xl:px-20">
            {/* Balanced asymmetrical composition */}
            <div className="relative flex flex-col items-start gap-14 lg:min-h-[500px] lg:flex-row lg:items-center lg:gap-0">
              {/* Directional signal path from intelligence to system */}
              <motion.svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
                viewBox="0 0 1200 500"
                preserveAspectRatio="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: heroRevealed ? 1 : 0 }}
                transition={{ duration: 1.2, delay: 0.65 }}
              >
                <defs>
                  <linearGradient id="heroSignalTrail" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#93c5fd" stopOpacity="0" />
                    <stop offset="48%" stopColor="#93c5fd" stopOpacity="0.06" />
                    <stop offset="82%" stopColor="#a78bfa" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
                  </linearGradient>
                  <filter id="heroSignalBlur" x="-20%" y="-100%" width="140%" height="300%">
                    <feGaussianBlur stdDeviation="4" />
                  </filter>
                </defs>
                <path d="M 410 260 C 570 260 650 228 820 236 C 900 240 948 226 1018 196" fill="none" stroke="url(#heroSignalTrail)" strokeWidth="6" filter="url(#heroSignalBlur)" />
                <motion.path
                  d="M 410 260 C 570 260 650 228 820 236 C 900 240 948 226 1018 196"
                  fill="none"
                  stroke="url(#heroSignalTrail)"
                  strokeWidth="0.45"
                  strokeDasharray="2 14"
                  animate={{ strokeDashoffset: [0, -64], opacity: [0.1, 0.28, 0.1] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
              </motion.svg>

              {/* Left */}
              <motion.div
                className="relative z-10 w-full lg:w-[56%]"
                initial={{ opacity: 0, x: -44 }}
                animate={heroRevealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -44 }}
                transition={{ duration: 0.95, ease: transitionEase }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-40 top-[48%] -z-10 h-[560px] w-[820px] -translate-y-1/2"
                  style={{
                    background:
                      "radial-gradient(ellipse 58% 54% at 40% 46%, rgba(96,165,250,0.085), rgba(99,102,241,0.038) 46%, transparent 76%), radial-gradient(ellipse 48% 44% at 58% 58%, rgba(139,92,246,0.032), transparent 72%)",
                    filter: "blur(58px)",
                    opacity: 0.86,
                  }}
                />
                <motion.p
                  className="mb-6 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/40"
                  initial={{ opacity: 0, x: -24 }}
                  animate={heroRevealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
                  transition={{ duration: 0.75, ease: transitionEase, delay: 0.02 }}
                >
                  ENTERPRISE SOLUTIONS
                </motion.p>

                <h1
                  className="text-[clamp(2.5rem,8vw,48px)] sm:text-[clamp(3rem,8vw,64px)] lg:text-[72px] font-bold leading-[1.0] [font-family:var(--font-heading)]"
                  style={{
                    letterSpacing: "-0.04em",
                  }}
                >
                  {["AI systems built for", "the complexity of", "real business."].map((line, index) => (
                    <motion.span
                      key={line}
                      className="block text-transparent will-change-transform"
                      initial={{ opacity: 0, y: 20 }}
                      animate={heroRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{
                        duration: 0.9,
                        ease: transitionEase,
                        delay: index * 0.15,
                      }}
                      style={{
                        backgroundImage:
                          "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(200,200,200,0.95) 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                      }}
                    >
                      {line}
                    </motion.span>
                  ))}
                </h1>

                <motion.div
                  className="mt-[40px] max-w-[580px]"
                  initial={{ opacity: 0, x: -24 }}
                  animate={heroRevealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
                  transition={{ duration: 0.8, ease: transitionEase, delay: 0.38 }}
                >
                  <p className="text-[16px] text-white/75 leading-[1.7]">
                    We design and embed end-to-end AI intelligence layers inside your most complex business pipelines.
                  </p>

                  <div className="mt-[12px]">
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={heroRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                      transition={{ duration: 0.45, ease: transitionEase, delay: 0.5 }}
                      className="text-[14px] text-white/40 leading-[1.7]"
                    >
                      Fast. Reliable. Built to scale with your business.
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right: hyper-realistic-ish obsidian glass sphere */}
              <motion.div
                className="relative z-10 flex w-full justify-center lg:w-[44%] lg:justify-start"
                initial={{ opacity: 0, x: 72, scale: 0.92, filter: "blur(10px)" }}
                animate={
                  heroRevealed
                    ? { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }
                    : { opacity: 0, x: 72, scale: 0.92, filter: "blur(10px)" }
                }
                transition={{ duration: 1.1, ease: transitionEase, delay: 0.1 }}
              >
                <div className="relative pt-[22px] lg:translate-x-20 lg:translate-y-7 xl:translate-x-28 2xl:translate-x-32">
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-24 translate-x-10 rounded-full"
                    style={{
                      background: "radial-gradient(circle at 46% 50%, rgba(99,102,241,0.16), rgba(59,130,246,0.055) 42%, transparent 72%)",
                      filter: "blur(30px)",
                    }}
                    animate={{ opacity: [0.52, 0.82, 0.52], scale: [0.96, 1.035, 0.96] }}
                    transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="relative h-[min(84vw,390px)] w-[min(84vw,390px)] xl:h-[420px] xl:w-[420px]">
                    <motion.svg
                      aria-hidden="true"
                      className="absolute inset-0 z-10 h-full w-full"
                      viewBox="0 0 360 360"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={heroRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
                      transition={{ duration: 1, ease: transitionEase, delay: 0.55 }}
                    >
                      <defs>
                        <linearGradient id="solutionsHeroLine" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.05" />
                          <stop offset="52%" stopColor="#bfdbfe" stopOpacity="0.58" />
                          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.08" />
                        </linearGradient>
                        <filter id="solutionsHeroGlow" x="-60%" y="-60%" width="220%" height="220%">
                          <feGaussianBlur stdDeviation="2.4" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                      <motion.g
                        style={{ transformOrigin: "180px 180px" }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 36, ease: "linear", repeat: Infinity }}
                      >
                        <ellipse cx="180" cy="180" rx="120" ry="88" fill="none" stroke="url(#solutionsHeroLine)" strokeWidth="0.8" />
                        <ellipse cx="180" cy="180" rx="108" ry="126" fill="none" stroke="url(#solutionsHeroLine)" strokeWidth="0.55" transform="rotate(62 180 180)" />
                        <path d="M 86 182 C 132 122 222 116 274 178 C 226 242 132 244 86 182 Z" fill="none" stroke="url(#solutionsHeroLine)" strokeWidth="0.55" />
                      </motion.g>
                      {[
                        { cx: 92, cy: 182, delay: 0 },
                        { cx: 148, cy: 118, delay: 0.7 },
                        { cx: 242, cy: 134, delay: 1.35 },
                        { cx: 276, cy: 184, delay: 2.05 },
                        { cx: 190, cy: 270, delay: 2.7 },
                      ].map((node) => (
                        <motion.circle
                          key={`${node.cx}-${node.cy}`}
                          cx={node.cx}
                          cy={node.cy}
                          r="1.8"
                          fill="#dbeafe"
                          filter="url(#solutionsHeroGlow)"
                          animate={{ opacity: [0.24, 0.8, 0.24], scale: [0.9, 1.15, 0.9] }}
                          transition={{ duration: 4.2, delay: node.delay, repeat: Infinity, ease: "easeInOut" }}
                        />
                      ))}
                      <motion.path
                        d="M 88 180 C 138 116 228 122 278 184"
                        fill="none"
                        stroke="#bfdbfe"
                        strokeLinecap="round"
                        strokeWidth="0.8"
                        filter="url(#solutionsHeroGlow)"
                        animate={{ pathLength: [0, 0.42, 1], opacity: [0, 0.5, 0] }}
                        transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </motion.svg>

                    {/* Back glow */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), rgba(255,255,255,0) 40%), radial-gradient(circle at 65% 70%, rgba(99,102,241,0.20), rgba(99,102,241,0) 55%)",
                        filter: "blur(8px)",
                      }}
                    />

                    {/* Sphere */}
                    <div
                      aria-hidden="true"
                      className="absolute left-1/2 top-1/2 h-[77.8%] w-[77.8%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.20), rgba(255,255,255,0.04) 22%, rgba(0,0,0,0.85) 58%, rgba(99,102,241,0.08) 100%)",
                        boxShadow:
                          "inset 0 0 0 1px rgba(255,255,255,0.08), 0 24px 80px rgba(0,0,0,0.65)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      {/* Caustic-like internal neural fibers */}
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle at 25% 30%, rgba(99,102,241,0.65), rgba(99,102,241,0) 45%), repeating-linear-gradient(115deg, rgba(255,255,255,0.10) 0 2px, rgba(0,0,0,0) 2px 10px), repeating-linear-gradient(45deg, rgba(99,102,241,0.22) 0 2px, rgba(0,0,0,0) 2px 10px)",
                          mixBlendMode: "screen",
                          opacity: 0.65,
                          filter: "blur(0.2px)",
                        }}
                      />

                      {/* Moving highlight */}
                      <div
                        aria-hidden="true"
                        className="absolute -left-10 top-8 h-24 w-44 rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 48%, rgba(255,255,255,0) 100%)",
                          transform: "rotate(18deg)",
                          animation: "glassHighlight 10s ease-in-out infinite",
                        }}
                      />
                      <style jsx>{`
                        @keyframes glassHighlight {
                          0%, 12% { transform: translateX(-58px) rotate(18deg); opacity: 0; }
                          24% { opacity: 0.28; }
                          48% { transform: translateX(72px) rotate(18deg); opacity: 0.14; }
                          62%, 100% { transform: translateX(86px) rotate(18deg); opacity: 0; }
                        }
                      `}</style>

                      {/* Rim light */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full"
                        style={{
                          boxShadow:
                            "inset 0 0 0 2px rgba(255,255,255,0.06), inset 0 0 24px rgba(99,102,241,0.16)",
                          opacity: 1,
                        }}
                      />
                    </div>

                    {/* Front caustic */}
                    <div
                      aria-hidden="true"
                      className="absolute left-1/2 top-1/2 h-[72.2%] w-[72.2%] -translate-x-1/2 -translate-y-1/2"
                      style={{
                        borderRadius: 9999,
                        background:
                          "conic-gradient(from 210deg, rgba(255,255,255,0.0) 0deg, rgba(255,255,255,0.14) 40deg, rgba(99,102,241,0.10) 95deg, rgba(255,255,255,0.0) 160deg, rgba(255,255,255,0.12) 230deg, rgba(255,255,255,0.0) 360deg)",
                        filter: "blur(10px)",
                        opacity: 0.55,
                      }}
                    />
                  </div>

                </div>
              </motion.div>
            </div>

            {/* Bento Box grid */}
            <div className="mt-[72px] h-px w-full bg-gradient-to-r from-transparent via-white/[0.09] to-transparent" />

            <div className="mt-0 grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
              {[
                {
                  n: "01",
                  name: "Instant Integration",
                  desc: "Deploy production-ready AI agents and neural networks into existing infrastructure in days, not months.",
                },
                {
                  n: "02",
                  name: "Zero-Trust Security",
                  desc: "Enterprise-grade compliance and security architecture built for critical operations and regulated industries.",
                },
                {
                  n: "03",
                  name: "Scalable Infrastructure",
                  desc: "AI inference systems that scale dynamically with your usage, your growth, and your industry demands.",
                },
              ].map((row) => (
                <div
                  key={row.n}
                  className="group relative overflow-hidden rounded-[18px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] backdrop-blur-[10px] px-6 py-6"
                  style={{
                    boxShadow:
                      "inset 0 0 0 1px rgba(255,255,255,0.06), 0 18px 60px rgba(0,0,0,0.35)",
                  }}
                >
                  {/* Inner glow border */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[18px]"
                    style={{
                      boxShadow:
                        "inset 0 0 0 1px rgba(255,255,255,0.06), 0 0 0 1px rgba(99,102,241,0.06)",
                      opacity: 0.9,
                    }}
                  />

                  {/* Minimal noise */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(to bottom, rgba(255,255,255,0.02), rgba(255,255,255,0))",
                      opacity: 0.6,
                    }}
                  />

                  <div className="relative z-10 flex items-start justify-between">
                    <div className="flex flex-col">
                      <span className="text-[12px] text-white/35 tracking-[0.04em] font-semibold">
                        {row.n}
                      </span>
                      <div className="mt-4 flex items-center gap-3">
                        <span className="text-[22px] font-bold text-white transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[6px]">
                          {row.name}
                        </span>
                      </div>
                      <p className="mt-3 text-[14px] text-white/50 leading-[1.6]">
                        {row.desc}
                      </p>
                    </div>

                    {/* Line-art icon with subtle outer glow */}
                    <span
                      className="shrink-0 inline-flex items-center justify-center rounded-full w-10 h-10 border border-white/10 bg-[rgba(255,255,255,0.02)] text-white/35 group-hover:text-white/70 transition-colors duration-300"
                      style={{
                        boxShadow: "0 0 22px rgba(99,102,241,0.12)",
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M5 12h14"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M13 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Businesses Choose WEBBED (moved directly below hero) */}
        <div className="relative mt-8">
          <WhyUsSection />
        </div>

        {/* Interactive service gallery */}
        <section id="wb-services" className="relative mt-8 w-full overflow-hidden bg-black py-24 sm:py-28 lg:py-36">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 42% 34% at 50% 46%, rgba(99,102,241,0.055), transparent 76%)" }}
          />

          <div className="relative mx-auto max-w-[1320px] px-6 sm:px-10 lg:px-16">
            <div className="mb-14 flex items-end justify-between gap-8 sm:mb-20">
              <div>
                <p className="text-[11px] font-semibold uppercase text-white/35" style={{ letterSpacing: "0.22em" }}>What we build</p>
                <h2 className="mt-4 text-[clamp(2.25rem,4vw,4rem)] font-bold leading-none [font-family:var(--font-heading)]">
                  Technology, made useful.
                </h2>
              </div>
              <p className="hidden text-[11px] font-semibold uppercase text-white/30 sm:block" style={{ letterSpacing: "0.22em" }}>07 services</p>
            </div>

            <div className="grid grid-cols-1 gap-7 md:grid-cols-3 md:gap-6 xl:gap-10">
              {(
                [
                  { n: "01", name: "Websites", desc: "Distinctive, conversion-focused websites engineered for clarity, speed, and sustainable growth.", detail: "Strategy · Design · Development" },
                  { n: "02", name: "Web Applications", desc: "Scalable digital products shaped around real workflows, complex data, and demanding users.", detail: "Product · Platforms · Portals" },
                  { n: "03", name: "AI Solutions", desc: "Practical AI systems and intelligent agents embedded directly into business operations.", detail: "Agents · Automation · Intelligence" },
                  { n: "04", name: "Custom Software", desc: "Purpose-built software engineered precisely around your organization and its ambitions.", detail: "Architecture · Engineering · Scale" },
                  { n: "05", name: "SEO Optimization", desc: "Technical and content systems designed to compound visibility, authority, and qualified demand.", detail: "Technical · Content · Performance" },
                  { n: "06", name: "UI/UX Design", desc: "Elegant product experiences that turn complex interactions into intuitive, considered journeys.", detail: "Research · Systems · Experience" },
                  { n: "07", name: "Digital Marketing", desc: "Focused digital campaigns connecting strong creative direction with measurable commercial outcomes.", detail: "Creative · Campaigns · Growth" },
                ] as const
              ).map((service, idx) => {
                const isHovered = hoveredServiceIdx === idx;
                const isExpanded = expandedIdx === idx;
                const showContent = isHovered || isExpanded;
                const visuals = SERVICE_VISUALS[idx];

                return (
                  <motion.div
                    key={service.n}
                    className={idx === 6 ? "md:col-start-2" : ""}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55, delay: (idx % 3) * 0.08, ease: transitionEase }}
                  >
                    <div>
                      <motion.button
                        type="button"
                        aria-expanded={showContent}
                        onMouseEnter={() => setHoveredServiceIdx(idx)}
                        onMouseLeave={() => setHoveredServiceIdx(null)}
                        onClick={() => setExpandedIdx((current) => (current === idx ? null : idx))}
                        className="group relative block min-h-[220px] w-full overflow-hidden rounded-[6px] border border-white/[0.14] bg-white/[0.025] px-6 py-6 text-left backdrop-blur-xl transition-colors duration-300 hover:border-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/60 sm:min-h-[240px]"
                        style={{
                          boxShadow: showContent
                            ? "0 28px 80px rgba(79,70,229,0.14), inset 0 1px 0 rgba(255,255,255,0.08)"
                            : "0 20px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.055)",
                        }}
                        whileHover={{ y: -6, scale: 1.04, boxShadow: "0 32px 90px rgba(79,70,229,0.2), inset 0 1px 0 rgba(255,255,255,0.1)" }}
                        whileTap={{ scale: 0.985 }}
                        transition={{ type: "spring", stiffness: 280, damping: 20, mass: 0.8 }}
                      >
                        {/* Background image illustration and abbreviation */}
                        {visuals && (
                          <ServiceCardVisuals
                            imageUrl={visuals.imageUrl}
                            abbreviation={visuals.abbreviation}
                            opacity={visuals.opacity}
                          />
                        )}

                        {/* Ambient blue-purple glow on hover */}
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 50% 20%, rgba(99,102,241,0.16), transparent 66%)" }} />

                        {/* Corner brackets */}
                        {["left-[-1px] top-[-1px] border-l border-t", "right-[-1px] top-[-1px] border-r border-t", "bottom-[-1px] left-[-1px] border-b border-l", "bottom-[-1px] right-[-1px] border-b border-r"].map((position) => (
                          <span key={position} aria-hidden="true" className={`pointer-events-none absolute h-5 w-5 border-white/60 ${position}`} />
                        ))}

                        <div className="relative flex min-h-[164px] flex-col sm:min-h-[184px] z-10">
                          {/* Number + expand icon */}
                          <div className="flex items-center justify-between text-[10px] font-semibold text-white/30" style={{ letterSpacing: "0.16em" }}>
                            <span>{service.n}</span>
                            <motion.span
                              animate={{ rotate: showContent ? 45 : 0 }}
                              transition={{ duration: 0.35, ease: transitionEase }}
                              className="text-base font-light text-white/45"
                            >
                              +
                            </motion.span>
                          </div>

                          {/* Service name */}
                          <div className="flex flex-1 items-center justify-center">
                            <h3 className="text-center text-[clamp(1.35rem,2vw,1.8rem)] font-bold leading-tight text-white [font-family:var(--font-heading)]">{service.name}</h3>
                          </div>

                          {/* Description — slides up on hover, expands fully on click */}
                          <AnimatePresence initial={false}>
                            {showContent && (
                              <motion.div
                                key="details"
                                initial={{ height: 0, opacity: 0, y: 12 }}
                                animate={{ height: "auto", opacity: 1, y: 0 }}
                                exit={{ height: 0, opacity: 0, y: 8 }}
                                transition={{ duration: 0.42, ease: transitionEase }}
                                className="overflow-hidden"
                              >
                                <div className="border-t border-white/[0.08] pt-3 text-center">
                                  <p className="text-[13px] leading-[1.6] text-white/62">{service.desc}</p>
                                  {isExpanded && (
                                    <p className="mt-2 text-[9px] font-semibold uppercase text-indigo-200/45" style={{ letterSpacing: "0.14em" }}>{service.detail}</p>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Legacy service rows retained off-canvas during gallery migration. */}
        <section
          aria-hidden="true"
          className="hidden"
          style={{ backgroundColor: "#050507" }}
        >
            {/* faint continuity strip at top */}
            <div
              aria-hidden="true"
              className="h-[1px] w-full"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)",
              }}
            />

            {/* Header row */}
            <div className="flex items-start justify-between gap-10 px-6 sm:px-0 pt-6">
              <p
                className="text-[11px] uppercase"
                style={{
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                WHAT WE BUILD
              </p>

              <p
                className="text-[11px] uppercase text-right"
                style={{
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                07 SERVICES
              </p>
            </div>

            <div
              className="h-[1px]"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                marginTop: 14,
              }}
            />

            {/* Rows */}
            <div
              className="w-full"
              style={{
                maxWidth: 1200,
                marginInline: "auto",
                paddingInline: "5vw",
              }}
            >
              {(
                [
                  { n: "01", name: "Websites", desc: "Custom-built websites designed to grow your business and rank.", tag: "WEB" },
                  { n: "02", name: "Web Applications", desc: "Scalable web apps built for real workflows and real users.", tag: "APP" },
                  { n: "03", name: "AI Solutions", desc: "Custom AI systems and intelligent agents built into operations.", tag: "AI" },
                  { n: "04", name: "Custom Software", desc: "Bespoke software engineered around your exact requirements.", tag: "DEV" },
                  { n: "05", name: "SEO Optimization", desc: "Technical and content SEO strategies engineered for visibility.", tag: "SEO" },
                  { n: "06", name: "Native Apps", desc: "High-performance iOS and Android apps built for speed and retention.", tag: "MOBILE" },
                  { n: "07", name: "Systems", desc: "Integrations that unify tools, platforms, and data into one ecosystem.", tag: "SYS" },
                ] as const
              ).map((s, idx) => {
                const isHovered = hoverIdx === idx;
                const isExpanded = expandedIdx === idx;

                return (
                  <div
                    key={s.n}
                    data-row-idx={idx}
                    onMouseEnter={() => setHoverIdx(idx)}
                    onMouseLeave={() => setHoverIdx(null)}
                    className="group relative w-full cursor-pointer"
                    onClick={() => setExpandedIdx((cur) => (cur === idx ? null : idx))}
                    style={{
                      opacity: rowVisible[idx] ? 1 : 0,
                      transform: rowVisible[idx] ? "translateY(0px)" : "translateY(20px)",
                      transition: "opacity 600ms ease-out, transform 600ms ease-out",
                      transitionDelay: rowVisible[idx] ? `${idx * 80}ms` : "0ms",
                      borderTop: "0.5px solid #222",
                    }}
                    aria-expanded={isExpanded}
                  >
                    {/* hover glass + cursor glow */}
                    <div
                      className="relative"
                      style={{
                        paddingTop: 48,
                        paddingBottom: 48,
                        background: isHovered
                          ? "rgba(255,255,255,0.02)"
                          : "transparent",
                        backdropFilter: isHovered ? "blur(20px)" : "blur(0px)",
                        transition: "background-color 350ms ease, backdrop-filter 350ms ease",
                      }}
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            isHovered
                              ? "radial-gradient(600px circle at var(--mx, 50%) var(--my, 30%), rgba(99,102,241,0.18), transparent 60%)"
                              : "transparent",
                          transition: "background 350ms ease",
                        }}
                      />

                      <div className="relative grid grid-cols-[auto_1fr_auto] items-center gap-6">
                        {/* Left: status indicator + title */}
                        <div className="flex items-center gap-10">
                          <div className="flex items-center justify-center w-[22px]">
                            <span
                              aria-hidden="true"
                              style={{
                                width: 8,
                                height: 8,
                                borderRadius: 9999,
                                background: "rgba(99,102,241,0.9)",
                                boxShadow:
                                  "0 0 0 1px rgba(99,102,241,0.35), 0 0 22px rgba(99,102,241,0.35)",
                                animation: "statusPulse 2.6s ease-in-out infinite",
                                display: "inline-block",
                                opacity: isHovered ? 1 : 0.65,
                              }}
                            />
                          </div>

                          <div className="min-w-0">
                            <div
                              style={{
                                fontFamily:
                                  'ui-sans-serif, system-ui, -apple-system, "SF Pro Display", "Geist Mono", "SF Pro Text", Segoe UI, sans-serif',
                                fontWeight: 700,
                                fontSize: 20,
                                letterSpacing: "-0.01em",
                                color: "rgba(255,255,255,1)",
                                transform: isHovered ? "translateX(10px)" : "translateX(0px)",
                                transition: "transform 200ms cubic-bezier(0.16,1,0.3,1)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {s.name}
                            </div>
                          </div>
                        </div>

                        {/* Right side: tag micro-badge */}
                        <div className="flex justify-end">
                          <span
                            style={{
                              fontSize: 10,
                              letterSpacing: "0.15em",
                              textTransform: "uppercase",
                              padding: "7px 12px",
                              border: "1px solid rgba(255,255,255,0.18)",
                              borderRadius: 9999,
                              color: "rgba(255,255,255,0.8)",
                              backgroundColor: "rgba(255,255,255,0.05)",
                              boxShadow: isHovered ? "0 0 0 1px rgba(255,255,255,0.06), 0 18px 60px rgba(99,102,241,0.08)" : "none",
                              transition: "box-shadow 250ms ease, transform 250ms ease, border-color 250ms ease",
                              transform: isHovered ? "translateY(-1px)" : "translateY(0px)",
                            }}
                          >
                            {s.tag}
                          </span>
                        </div>
                      </div>

                      {/* Expandable right content area: description only */}
                      <div
                        style={{
                          marginTop: 16,
                          maxHeight: isExpanded ? 160 : 0,
                          opacity: isExpanded ? 1 : 0,
                          overflow: "hidden",
                          transition: "max-height 400ms cubic-bezier(0.16,1,0.3,1), opacity 250ms ease",
                        }}
                      >
                        <p
                          style={{
                            fontSize: 16,
                            lineHeight: 1.6,
                            color: "rgba(255,255,255,0.6)",
                          }}
                        >
                          {s.desc}
                        </p>
                      </div>

                      {/* Cursor tracking */}
                      <div
                        className="sr-only"
                        style={{ position: "absolute", inset: 0 }}
                      />
                    </div>

                    <style jsx>{`
                      @keyframes statusPulse {
                        0% { transform: scale(1); opacity: 0.7; }
                        50% { transform: scale(1.25); opacity: 1; }
                        100% { transform: scale(1); opacity: 0.7; }
                      }
                    `}</style>

                    {/* pointer glow vars */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      onMouseMove={(e) => {
                        const rect = (e.currentTarget.parentElement as HTMLElement)?.getBoundingClientRect();
                        if (!rect) return;
                        const x = ((e.clientX - rect.left) / rect.width) * 100;
                        const y = ((e.clientY - rect.top) / rect.height) * 100;
                        (e.currentTarget as HTMLElement).style.setProperty("--mx", `${x}%`);
                        (e.currentTarget as HTMLElement).style.setProperty("--my", `${y}%`);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </section>

        {/* Testimonials Section (directly below WHAT WE BUILD) */}
        <section className="w-full bg-white text-black mt-10">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-20 py-16 sm:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              {/* Left: static */}
              <div className="flex flex-col h-full">
                <h2
                  className="text-[clamp(1.75rem,8vw,44px)] sm:text-[clamp(2rem,8vw,52px)] font-bold leading-[1.05]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  What our customers think
                </h2>

                <p className="mt-6 text-[15px] sm:text-[16px] text-black/55 leading-relaxed max-w-[48ch]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                </p>

                {/* Carousel indicator */}
                <div className="mt-10 flex items-center gap-3">
                  {testimonials.map((_, i) => {
                    const active = i === testimonialIdx;
                    return (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Go to testimonial ${i + 1}`}
                        onClick={() => setTestimonialIdx(i)}
                        className="h-[10px] w-[40px] rounded-full transition-all"
                        style={{
                          background: active ? "#111827" : "#E5E7EB",
                          border: active ? "1px solid #111827" : "1px solid #E5E7EB",
                          transform: active ? "scaleY(1.15)" : "scaleY(1)",
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Right: dynamic carousel */}
              <div className="relative overflow-hidden rounded-[20px] border border-black/10">
                <div
                  className="absolute inset-0 transition-colors duration-500"
                  style={{
                    backgroundColor: testimonials[testimonialIdx]?.theme === "dark" ? "#000000" : "#ffffff",
                  }}
                />

                <div className="relative p-8 sm:p-12 min-h-[360px] flex items-center">
                  <div className="w-full">
                    <motion.div
                      key={testimonialIdx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      {/* Logo */}
                      <div
                        className="flex items-center justify-end"
                        style={{ color: testimonials[testimonialIdx]?.theme === "dark" ? "#fff" : "#000" }}
                      >
                        <div
                          className="text-[12px] font-semibold tracking-[0.12em] uppercase rounded-full px-4 py-2 border"
                          style={{
                            borderColor: testimonials[testimonialIdx]?.theme === "dark" ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.18)",
                            background: testimonials[testimonialIdx]?.theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)",
                          }}
                        >
                          {testimonials[testimonialIdx]?.company}
                        </div>
                      </div>

                      {/* Quote */}
                      <p
                        className="mt-8 text-[26px] sm:text-[30px] leading-[1.35] italic"
                        style={{ color: testimonials[testimonialIdx]?.theme === "dark" ? "#ffffff" : "#111827" }}
                      >
                        “{testimonials[testimonialIdx]?.quote}”
                      </p>

                      {/* Author */}
                      <div className="mt-10">
                        <p
                          className="font-bold text-[16px]"
                          style={{ color: testimonials[testimonialIdx]?.theme === "dark" ? "#ffffff" : "#111827" }}
                        >
                          {testimonials[testimonialIdx]?.name}
                        </p>
                        <p
                          className="text-[14px]"
                          style={{ color: testimonials[testimonialIdx]?.theme === "dark" ? "rgba(255,255,255,0.70)" : "rgba(0,0,0,0.60)" }}
                        >
                          {testimonials[testimonialIdx]?.title}{" "}
                          <span className="font-medium">{testimonials[testimonialIdx]?.company}</span>
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Let's build what's next CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.2, ease: transitionEase }}
          className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 w-full mt-20"
        >
          <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0a0a0a] backdrop-blur-3xl px-6 sm:px-[72px] py-[60px] sm:py-[80px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div className="relative z-10">
              {/* Eyebrow */}
              <p className="text-[12px] tracking-[0.32em] uppercase text-white/60 font-bold">
                READY WHEN YOU ARE
              </p>

              {/* Heading (left-aligned, 64px) */}
              <h2 className="mt-6 text-[clamp(2.25rem,10vw,64px)] leading-[1] font-bold text-white [font-family:var(--font-heading)]">
                Let&apos;s build what&apos;s next.
              </h2>

              {/* Body */}
              <p className="mt-6 text-[18px] text-white/90 font-normal leading-[1.8] max-w-[56ch]">
                Whether you&apos;re launching a startup, scaling a business, exploring AI,
                or bringing a new idea to life, we&apos;re here to help turn ambition into reality.
              </p>

              {/* Buttons (left-aligned) */}
              <div className="mt-10 flex flex-col sm:flex-row gap-5 items-start">
                <MagneticButton href="/#contact" primary>
                  Start a Project
                </MagneticButton>
                <MagneticButton href="/solutions">
                  Explore Solutions
                </MagneticButton>
              </div>

              {/* Bottom rule + tiny caps line */}
              <div className="mt-14 border-t border-white/10" />
              <p className="mt-4 text-[11px] tracking-[0.22em] text-white/55 uppercase [font-family:var(--font-ui)] font-semibold">
                NO COMMITMENT NEEDED &middot; JUST A CONVERSATION
              </p>
            </div>
          </div>
        </motion.div>

      </main>

      <CinematicFooter />
    </div>
  );
}
