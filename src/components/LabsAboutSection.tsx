"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ──────────────────── Manifesto Data ──────────────────── */

const MANIFESTO = [
  {
    number: "01",
    title: "BUILDING",
    description: "Products that redefine workflows",
  },
  {
    number: "02",
    title: "EXPLORING",
    description: "Ideas others ignore",
  },
  {
    number: "03",
    title: "EXPERIMENTING",
    description: "Rapid validation and fearless iteration",
  },
  {
    number: "04",
    title: "SCALING",
    description: "Technology built for long-term impact",
  },
];

/* ──────────────────── Component ──────────────────── */

export default function LabsAboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black py-28 lg:py-40 overflow-hidden"
    >
      {/* ── Ambient Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[25%] w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle at center, rgba(99,102,241,0.07) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <motion.div
          animate={{ x: [0, -30, 25, 0], y: [0, 20, -15, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle at center, rgba(244,63,94,0.05) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        {/* Top fade for hero transition */}
        <div
          className="absolute top-0 left-0 w-full h-40"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 100%)" }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">

          {/* ── LEFT COLUMN: Heading + Context ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[38%] relative"
          >
            {/* Giant background word */}
            <div
              className="absolute -top-8 -left-4 pointer-events-none select-none"
              style={{
                fontSize: "clamp(80px, 10vw, 140px)",
                fontWeight: 900,
                lineHeight: 1,
                color: "rgba(255,255,255,0.025)",
                fontFamily: "var(--font-heading)",
                letterSpacing: "-0.04em",
              }}
            >
              LABS
            </div>

            <p
              className="text-[10px] tracking-[0.3em] uppercase font-semibold mb-6 relative z-10"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              WHAT WE DO
            </p>

            <h2
              className="text-4xl md:text-5xl lg:text-[3.2rem] font-bold text-white leading-[1.08] tracking-tight mb-6 relative z-10"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Not a service.
              <br />
              A studio.
            </h2>

            <p
              className="text-[15px] font-light leading-[1.8] mb-8 relative z-10 max-w-[380px]"
              style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.45)" }}
            >
              An independent product studio inside WEBBED. We build what others
              won&apos;t — tools, platforms, and intelligence systems for the future.
            </p>

            {/* CTA Link */}
            <motion.a
              href="/labs"
              className="group inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.12em] uppercase relative z-10"
              style={{
                fontFamily: "var(--font-heading)",
                color: "rgba(99,102,241,0.8)",
                transition: "color 0.3s ease",
              }}
              whileHover={{ x: 4 }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(99,102,241,1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(99,102,241,0.8)"; }}
            >
              Explore Our Products
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </motion.a>

            <div
              className="mt-10 h-px w-full"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />
          </motion.div>

          {/* ── RIGHT COLUMN: 2x2 Manifesto Grid ── */}
          <div className="w-full lg:w-[62%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {MANIFESTO.map((item, idx) => (
                <ManifestoCard
                  key={item.number}
                  item={item}
                  index={idx}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────── Manifesto Card ──────────────────── */

function ManifestoCard({
  item,
  index,
  isInView,
}: {
  item: { number: string; title: string; description: string };
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2 + index * 0.1,
      }}
      className="group relative overflow-hidden rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.06)",
        padding: "28px 32px",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
      }}
      whileHover={{
        y: -3,
        transition: { type: "spring", stiffness: 300, damping: 22 },
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(99,102,241,0.18)";
        e.currentTarget.style.boxShadow = "0 8px 40px rgba(99,102,241,0.08), 0 0 80px rgba(99,102,241,0.04)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Oversized background number */}
      <div
        className="absolute -top-2 -right-1 pointer-events-none select-none"
        style={{
          fontSize: "clamp(72px, 9vw, 110px)",
          fontWeight: 900,
          lineHeight: 1,
          color: "rgba(255,255,255,0.025)",
          fontFamily: "var(--font-heading)",
          letterSpacing: "-0.04em",
        }}
      >
        {item.number}
      </div>

      {/* Card content */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-[10px] font-semibold tracking-[0.2em] font-mono"
            style={{ color: "rgba(99,102,241,0.6)" }}
          >
            {item.number}
          </span>
          <div
            className="h-px flex-1 max-w-[40px]"
            style={{ background: "rgba(99,102,241,0.2)" }}
          />
        </div>

        <h3
          className="text-[14px] font-bold tracking-[0.18em] uppercase mb-2"
          style={{ fontFamily: "var(--font-heading)", color: "rgba(255,255,255,0.92)" }}
        >
          {item.title}
        </h3>

        <p
          className="text-[14px] font-light leading-relaxed"
          style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.4)" }}
        >
          {item.description}
        </p>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
        style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.06) 0%, transparent 60%)" }}
      />
    </motion.div>
  );
}
