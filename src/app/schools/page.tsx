"use client";

import Navbar from "@/components/Navbar";
import CinematicFooter from "@/components/CinematicFooter";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const transitionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const WordReveal = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const words = text.split(" ");
  return (
    <span className="inline-flex flex-wrap">
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden mr-[0.25em] py-[0.1em]"
        >
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.04,
              ease: transitionEase,
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default function SchoolsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    document.title = "EDUCATION | WEBBED";
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="relative h-screen overflow-hidden bg-black">
        {/* Warm education glow (lower-right quadrant) */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: transitionEase }}
            className="absolute -right-[15%] -bottom-[18%] w-[62vw] h-[62vw] rounded-full opacity-[0.2] bg-[radial-gradient(circle_at_center,rgba(245,158,11,1)_0%,rgba(245,158,11,0.5)_25%,transparent_70%)] blur-[90px]"
          />
        </div>

        <div className="relative z-10 mx-auto h-full w-full max-w-[1400px] px-6 sm:px-10 lg:px-20 flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
            {/* LEFT: content anchored left */}
            <div className="flex flex-col items-start">
              {/* Eyebrow pill */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: transitionEase }}
                className="mb-8"
              >
                <div className="rounded-full border border-white/40 px-5 py-2">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-white/85 font-medium">
                    WEBBED SCHOOLS
                  </span>
                </div>
              </motion.div>

              {/* Heading (max two lines) */}
              <h1 className="text-[clamp(2rem,10vw,68px)] leading-[1.02] font-bold [font-family:var(--font-heading)] max-w-[720px]">
                <span>
                  <WordReveal text="Learn the skills that build the" delay={0.15} />
                </span>
                <br />
                <span className="inline-block">
                  <WordReveal text="future." delay={0.45} />
                </span>
              </h1>

              {/* Subline */}
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.05, ease: transitionEase, delay: 0.75 }}
                className="mt-8 text-[18px] leading-relaxed text-white/55 max-w-[500px]"
              >
                Practical education in software development, AI, web technologies, and digital systems. Built
                for the next generation of builders.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.05, ease: transitionEase, delay: 1 }}
                className="mt-10 flex flex-col sm:flex-row gap-4 items-start"
              >
                <button className="rounded-full bg-white text-black font-semibold text-sm px-8 py-4 transition-all duration-200 hover:brightness-95 active:scale-[0.99]">
                  Explore Courses
                </button>
                <button className="rounded-full border border-white/50 bg-transparent text-white font-semibold text-sm px-8 py-4 transition-all duration-200 hover:bg-white/5 active:scale-[0.99]">
                  Learn More
                </button>
              </motion.div>

              {/* Bottom trust indicators */}
              <div className="absolute left-6 sm:left-10 lg:left-20 bottom-8 z-10">
                <p className="text-[11px] tracking-[0.22em] uppercase text-white/45 font-semibold">
                  BEGINNER FRIENDLY &middot; INDUSTRY FOCUSED &middot; BUILT BY PRACTITIONERS
                </p>
              </div>
            </div>

            {/* RIGHT: rotated dark mock UI/panel */}
            <div className="hidden lg:flex justify-center items-center relative">
              <motion.div
                initial={{ opacity: 0, y: 26, rotate: 0 }}
                animate={
                  mounted
                    ? { opacity: 1, y: 0, rotate: 0 }
                    : { opacity: 0, y: 26, rotate: 0 }
                }
                transition={{ duration: 1.1, ease: transitionEase, delay: 0.2 }}
                className="transform"
              >
                <div className="relative -rotate-[15deg]">
                  <div className="w-[420px] bg-[#0a0a0a] border border-white/10 rounded-[20px] shadow-[0_25px_90px_rgba(0,0,0,0.6)] p-7">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <p className="text-white/60 text-[11px] tracking-[0.25em] uppercase font-semibold">
                          Currently Enrolling
                        </p>
                        <h3 className="mt-3 text-[22px] font-bold text-white leading-tight [font-family:var(--font-heading)]">
                          Webbed Foundations
                        </h3>
                      </div>

                      <div className="h-[10px] w-[10px] rounded-full bg-white/20" />
                    </div>

                    <div className="mt-6">
                      <div className="h-[8px] w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "64%" }}
                          transition={{ duration: 1.2, delay: 0.45, ease: transitionEase }}
                          className="h-full bg-white/20 rounded-full"
                        />
                      </div>
                      <div className="mt-2 flex justify-between text-[11px] text-white/45">
                        <span>0%</span>
                        <span>64%</span>
                      </div>
                    </div>

                    <div className="mt-7 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full border border-white/10 text-white/70 text-[11px] tracking-[0.06em] font-semibold">
                        Lesson: Layout Systems
                      </span>
                      <span className="px-3 py-1 rounded-full border border-white/10 text-white/70 text-[11px] tracking-[0.06em] font-semibold">
                        Lesson: UI Patterns
                      </span>
                      <span className="px-3 py-1 rounded-full border border-white/10 text-white/70 text-[11px] tracking-[0.06em] font-semibold">
                        Project: Launch Page
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Webbed Schools About Section (split layout) ───────────────────── */}
      <section className="relative w-full bg-black py-32 lg:py-48 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-20">
          <div className="flex flex-col lg:flex-row items-start relative">
            {/* LEFT COLUMN (45%) */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: transitionEase }}
              className="w-full lg:w-[45%] pr-0 lg:pr-20 mb-16 lg:mb-0"
            >
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-semibold mb-8">
                WHY WE TEACH
              </p>

              <h2 className="text-[clamp(2rem,7vw,48px)] font-bold text-white mb-12 [font-family:var(--font-heading)] leading-tight">
                Education that actually prepares you.
              </h2>

              <div className="h-px w-full bg-white/10" />
            </motion.div>

            {/* VERTICAL DIVIDER */}
            <div className="hidden lg:block absolute left-[45%] top-0 bottom-0 w-px bg-white/10" />

            {/* RIGHT COLUMN (55%) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: transitionEase, delay: 0.15 }}
              className="w-full lg:w-[55%] lg:pl-20 space-y-10"
            >
              <p className="text-[17px] text-white/65 font-light leading-[1.8] [font-family:var(--font-body)]">
                Most education teaches theory. We teach what the industry actually uses.
              </p>
              <p className="text-[17px] text-white/65 font-light leading-[1.8] [font-family:var(--font-body)]">
                Every course at Webbed Schools is built around real tools, real workflows, and real outcomes. Not textbooks.
              </p>
              <p className="text-[17px] text-white/65 font-light leading-[1.8] [font-family:var(--font-body)]">
                We built the school we wished existed.
              </p>

              {/* Stats row */}
              <div className="mt-10 flex items-stretch">
                <div className="w-1/3 pr-6">
                  <div className="text-white font-bold [font-family:var(--font-heading)]">
                    100% Practical
                  </div>
                  <div className="mt-2 text-white/45 text-[12px] leading-relaxed [font-family:var(--font-body)]">
                    Skills you apply immediately
                  </div>
                </div>

                <div className="w-px bg-white/10" />

                <div className="w-1/3 px-6">
                  <div className="text-white font-bold [font-family:var(--font-heading)]">
                    Industry Tools
                  </div>
                  <div className="mt-2 text-white/45 text-[12px] leading-relaxed [font-family:var(--font-body)]">
                    Built on real-world stacks
                  </div>
                </div>

                <div className="w-px bg-white/10" />

                <div className="w-1/3 pl-6">
                  <div className="text-white font-bold [font-family:var(--font-heading)]">
                    Built by Builders
                  </div>
                  <div className="mt-2 text-white/45 text-[12px] leading-relaxed [font-family:var(--font-body)]">
                    Taught by practitioners
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CinematicFooter />
    </div>
  );
}
