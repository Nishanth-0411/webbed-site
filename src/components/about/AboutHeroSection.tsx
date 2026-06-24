  "use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import FluidBackground from "@/components/FluidBackground";

export default function AboutHeroSection() {
  const transitionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const heroRef = useRef<HTMLElement | null>(null);

  const servicesCopy =
    "WEBBED is a technology ecosystem built for the future. We design and build software, AI systems, web applications, and digital experiences that help ambitious businesses grow faster, operate smarter, and stay ahead in a rapidly changing world.";

  return (
    <section ref={(n) => { heroRef.current = n; }} className="relative h-[100vh] overflow-hidden bg-black">
      {/* Premium WebGL Liquid Energy Background */}
      <FluidBackground />

      <div className="relative z-10 h-full w-full px-6 sm:px-10">
        {/* Layout: eyebrow -> wordmark -> rule -> body + buttons */}
        <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col items-start">
          {/* Eyebrow pill (left-aligned) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: transitionEase }}
            className="about-hero-eyebrow mt-24"
          >
            <div className="rounded-full border border-white/15 px-5 py-[10px]">
              <span className="tracking-[0.32em] text-[10px] font-semibold uppercase text-white/80">
                THE STORY BEHIND WEBBED
              </span>
            </div>
          </motion.div>

          {/* Wordmark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: transitionEase }}
            className="mt-10 w-full"
          >
            <h1 className="select-none w-full text-left font-black [font-family:var(--font-heading)] leading-none tracking-[-0.05em] text-[clamp(48px,12vw,140px)] sm:text-[clamp(56px,12vw,180px)] md:text-[clamp(64px,14vw,220px)]">
              <span className="relative block bg-clip-text text-transparent" aria-hidden>
                {/* Metallic gradient with explicit stops */}
                <span
                  className="bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(220,220,225,0.9)_52%,rgba(160,160,168,0.6)_100%)]"
                  style={{
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  WEBBED
                </span>

                {/* Subtle inner highlight along top edge */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 block w-full"
                  style={{
                    height: "22%",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.0) 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  WEBBED
                </span>
              </span>
            </h1>
          </motion.div>

          {/* Rule (full-width) */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.0, ease: transitionEase, delay: 0.2 }}
            className="mt-8 h-px w-full bg-white/5"
          />

          {/* Body copy + buttons (left aligned) */}
          <div className="mt-10 w-full">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: transitionEase, delay: 0.15 }}
              className="max-w-[540px] text-[17px] leading-[1.75] text-white/70"
            >
              {servicesCopy}
            </motion.p>

            <div className="mt-9 flex items-center gap-6">
              <Link
                href="/#contact"
                className="inline-flex h-[44px] items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-black transition-all duration-200 hover:opacity-95 active:scale-[0.99]"
              >
                Start a Project
              </Link>

              <Link
                href="/solutions"
                className="inline-flex h-[44px] items-center justify-center rounded-full border border-white/40 bg-transparent px-7 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/[0.04] hover:border-white/70 active:scale-[0.99]"
              >
                Explore Solutions
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.9 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/30">
            Scroll
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
