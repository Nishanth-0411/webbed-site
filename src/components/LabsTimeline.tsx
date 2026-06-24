"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/* ──────────────────── Timeline Data ──────────────────── */

const timelineItems = [
  { value: "05+", label: "Products in Development" },
  { value: "03", label: "Industries We're Entering" },
  { value: "01", label: "Studio. One Vision." },
  { value: "∞", label: "Problems Left To Solve" },
];

/* ──────────────────── Component ──────────────────── */

export default function LabsTimeline({
  activeIndex,
}: {
  activeIndex: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Line draw progress
  const lineProgress = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* ── Timeline Track ── */}
      <div className="flex flex-col gap-0 relative pl-10 sm:pl-14 md:pl-16">
        {/* ── Vertical Line (SVG) ── */}
        <svg
          className="absolute left-[15px] sm:left-[19px] md:left-[23px] top-0"
          width="2"
          height="100%"
          style={{ height: "calc(100% - 40px)" }}
          aria-hidden="true"
        >
          {/* Background faint line */}
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="100%"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1.5"
          />
          {/* Animated glowing line */}
          <motion.line
            x1="1"
            y1="0"
            x2="1"
            y2="100%"
            stroke="url(#timelineGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ pathLength: lineProgress }}
          />
          <defs>
            <linearGradient id="timelineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>
        </svg>

        {/* ── Light Particle (follows active node) ── */}
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full z-10 labs-timeline-particle"
          style={{
            left: "14px",
            background: "#a78bfa",
            boxShadow: "0 0 8px rgba(168,85,247,0.6), 0 0 20px rgba(168,85,247,0.3)",
          }}
          animate={{
            top: activeIndex >= 0 ? `${8 + activeIndex * 25}%` : "4%",
            opacity: activeIndex >= 0 ? 1 : 0,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* ── Timeline Nodes ── */}
        {timelineItems.map((item, idx) => (
          <TimelineNode
            key={item.label}
            item={item}
            index={idx}
            isActive={activeIndex >= idx}
            isInView={isInView}
          />
        ))}
      </div>
    </div>
  );
}

/* ──────────────────── Timeline Node ──────────────────── */

function TimelineNode({
  item,
  index,
  isActive,
  isInView,
}: {
  item: (typeof timelineItems)[number];
  index: number;
  isActive: boolean;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -25 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.15 + index * 0.18,
      }}
      className="relative pb-14 last:pb-0"
    >
      {/* ── Glowing Orb ── */}
      <motion.div
        className="absolute left-[-24px] sm:left-[-32px] md:left-[-34px] top-1.5 z-20"
        style={{ transform: "translateX(-50%)" }}
        animate={
          isActive
            ? {
                scale: [1, 1.3, 1],
                boxShadow: [
                  "0 0 0px rgba(129,140,248,0)",
                  "0 0 20px rgba(129,140,248,0.4), 0 0 40px rgba(168,85,247,0.15)",
                  "0 0 0px rgba(129,140,248,0)",
                ],
              }
            : { scale: 0.5, boxShadow: "0 0 0px rgba(129,140,248,0)" }
        }
        transition={{
          duration: 2.5,
          repeat: isActive ? Infinity : 0,
          ease: "easeInOut",
          delay: index * 0.08,
        }}
      >
        <div
          className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full relative"
          style={{
            background: isActive
              ? "linear-gradient(135deg, #818cf8, #a78bfa)"
              : "rgba(255,255,255,0.08)",
            border: isActive
              ? "2px solid rgba(129,140,248,0.4)"
              : "2px solid rgba(255,255,255,0.05)",
            transition: "background 0.5s ease, border-color 0.5s ease",
          }}
        >
          {/* Inner glow pulse */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={
              isActive
                ? {
                    boxShadow: [
                      "inset 0 0 4px rgba(168,85,247,0.3)",
                      "inset 0 0 10px rgba(168,85,247,0.5)",
                      "inset 0 0 4px rgba(168,85,247,0.3)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* ── Content Row ── */}
      <div className="flex items-start gap-4 md:gap-6">
        {/* Large Number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.05,
          }}
          className="shrink-0 w-[52px] md:w-[72px] text-right"
        >
          <span
            className="block text-[38px] md:text-[52px] font-extrabold leading-none tracking-tight"
            style={{
              fontFamily: "var(--font-heading)",
              background: isActive
                ? "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.85) 100%)"
                : "none",
              WebkitBackgroundClip: isActive ? "text" : "unset",
              WebkitTextFillColor: isActive ? "transparent" : "unset",
              color: isActive ? "transparent" : "rgba(255,255,255,0.12)",
              transition: "color 0.6s ease",
            }}
          >
            {item.value}
          </span>
        </motion.div>          {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={isActive ? { opacity: 1, x: 0 } : {}}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.15,
          }}
          className="pt-1.5"
        >
          <span
            className="block text-[13px] md:text-[15px] font-bold tracking-tight"
            style={{
              fontFamily: "var(--font-heading)",
              color: isActive ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.12)",
              transition: "color 0.5s ease",
            }}
          >
            {item.label}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
