"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

/* ──────────────────── Product Data ──────────────────── */

const products = [
  {
    id: 1,
    name: "Webbed AI",
    category: "AI TOOL",
    description:
      "Advanced neural networks designed to bridge the gap between human intuition and machine precision.",
    gradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    accent: "rgba(99,102,241,0.6)",
    glowColor: "rgba(99,102,241,0.25)",
    visual: "ai",
  },
  {
    id: 2,
    name: "Project Atlas",
    category: "WEB PLATFORM",
    description:
      "A decentralized mapping system for complex data architectures and interconnected systems.",
    gradient: "linear-gradient(135deg, #059669 0%, #0d9488 100%)",
    accent: "rgba(16,185,129,0.6)",
    glowColor: "rgba(16,185,129,0.25)",
    visual: "atlas",
  },
  {
    id: 3,
    name: "Lumina Studio",
    category: "DESIGN ENGINE",
    description:
      "Generative lighting and atmosphere engine for high-end cinematic web experiences.",
    gradient: "linear-gradient(135deg, #e11d48 0%, #ea580c 100%)",
    accent: "rgba(244,63,94,0.6)",
    glowColor: "rgba(244,63,94,0.25)",
    visual: "lumina",
  },
  {
    id: 4,
    name: "Nexus Core",
    category: "INFRASTRUCTURE",
    description:
      "The backbone of the modern web. High-performance protocols for seamless data connectivity.",
    gradient: "linear-gradient(135deg, #2563eb 0%, #0891b2 100%)",
    accent: "rgba(59,130,246,0.6)",
    glowColor: "rgba(59,130,246,0.25)",
    visual: "nexus",
  },
  {
    id: 5,
    name: "Prism UI",
    category: "INTERFACE",
    description:
      "A modular design system focused on light refraction and depth in digital interfaces.",
    gradient: "linear-gradient(135deg, #d97706 0%, #ca8a04 100%)",
    accent: "rgba(245,158,11,0.6)",
    glowColor: "rgba(245,158,11,0.25)",
    visual: "prism",
  },
];

/* ──────────────────── Visual Renderer ──────────────────── */

// ── Stable particle positions per visual type ──
const particleConfigs: Record<
  string,
  { x: number; y: number; duration: number; delay: number; yRange: number }[]
> = {};

function getParticles(visual: string) {
  if (!particleConfigs[visual]) {
    particleConfigs[visual] = Array.from({ length: 6 }, () => ({
      x: 15 + Math.random() * 70,
      y: 15 + Math.random() * 70,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 2,
      yRange: 8 + Math.random() * 8,
    }));
  }
  return particleConfigs[visual];
}

function ProductVisual({
  visual,
  gradient,
}: {
  visual: string;
  gradient: string;
}) {
  const particles = useMemo(() => getParticles(visual), [visual]);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ background: gradient }}
    >
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-15 z-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Subtle diagonal lines */}
      <div
        className="absolute inset-0 opacity-[0.06] z-20 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.5) 20px, rgba(255,255,255,0.5) 21px)",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 z-20 pointer-events-none" />

      {/* Central icons */}
      <div className="relative z-10 flex items-center justify-center">
        {visual === "atlas" && <AtlasVisual />}
        {visual === "lumina" && <LuminaVisual />}
        {visual === "nexus" && <NexusVisual />}
        {visual === "prism" && <PrismVisual />}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/30"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, -p.yRange, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}


function AtlasVisual() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <motion.circle
        cx="26"
        cy="26"
        r="20"
        stroke="white"
        strokeOpacity="0.8"
        strokeWidth="1.5"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "26px 26px" }}
      />
      <ellipse cx="26" cy="26" rx="20" ry="8" stroke="white" strokeOpacity="0.5" strokeWidth="1" />
      <line x1="6" y1="26" x2="46" y2="26" stroke="white" strokeOpacity="0.6" strokeWidth="1" />
      <line x1="26" y1="6" x2="26" y2="46" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
      <circle cx="26" cy="26" r="4" fill="white" fillOpacity="0.8" />
    </svg>
  );
}

function LuminaVisual() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "28px 28px" }}
      >
        <path
          d="M28 6 L30 24 L28 22 L26 24 Z"
          fill="white"
          fillOpacity="0.9"
        />
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <g key={angle} transform={`rotate(${angle}, 28, 28)`}>
            <line
              x1="28"
              y1="10"
              x2="28"
              y2="18"
              stroke="white"
              strokeOpacity="0.5"
              strokeWidth="1"
            />
          </g>
        ))}
      </motion.g>
      <motion.circle
        cx="28"
        cy="28"
        r="8"
        fill="white"
        fillOpacity="0.15"
        animate={{ r: [8, 10, 8], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx="28" cy="28" r="3" fill="white" fillOpacity="0.9" />
    </svg>
  );
}

function NexusVisual() {
  return (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "27px 27px" }}
      >
        <circle cx="27" cy="27" r="22" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
        <circle cx="27" cy="27" r="14" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
        <circle cx="27" cy="27" r="6" stroke="white" strokeOpacity="0.7" strokeWidth="2" />
      </motion.g>
      {[0, 72, 144, 216, 288].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = 27 + 22 * Math.cos(rad);
        const y = 27 + 22 * Math.sin(rad);
        return (
          <motion.circle
            key={angle}
            cx={x}
            cy={y}
            r="2.5"
            fill="white"
            fillOpacity="0.8"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: angle * 0.01 }}
          />
        );
      })}
    </svg>
  );
}

function PrismVisual() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "26px 26px" }}
      >
        {/* Diamond */}
        <polygon points="26,4 48,26 26,48 4,26" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" fill="none" />
        <polygon points="26,12 40,26 26,40 12,26" stroke="white" strokeOpacity="0.4" strokeWidth="1" fill="none" />
        <polygon points="26,18 34,26 26,34 18,26" stroke="white" strokeOpacity="0.5" strokeWidth="1" fill="none" />
        {/* Refraction lines */}
        <line x1="26" y1="4" x2="26" y2="48" stroke="white" strokeOpacity="0.15" strokeWidth="1" />
        <line x1="4" y1="26" x2="48" y2="26" stroke="white" strokeOpacity="0.15" strokeWidth="1" />
      </motion.g>
      <circle cx="26" cy="26" r="3" fill="white" fillOpacity="0.8" />
    </svg>
  );
}

/* ──────────────────── 3D Tilt Card ──────────────────── */

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 250,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 250,
    damping: 25,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────── Main Component ──────────────────── */

export default function LabsProductsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Track viewport width for responsive coverflow offsets
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % products.length);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
  }, []);

  const getCardOffset = (idx: number) => {
    let diff = idx - activeIndex;
    if (diff < -Math.floor(products.length / 2)) diff += products.length;
    if (diff > Math.floor(products.length / 2)) diff -= products.length;
    return diff;
  };

  const activeProduct = products[activeIndex];

  return (
    <section className="relative w-full bg-black pt-32 pb-28 lg:pt-40 lg:pb-36 overflow-hidden">
      {/* ── Ambient Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle base glow */}
        <div
          className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[1200px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(99,102,241,0.03) 0%, transparent 65%)",
            filter: "blur(120px)",
          }}
        />
        {/* Active product ambient glow */}
        <motion.div
          key={`ambient-${activeIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute top-[35%] left-[50%] -translate-x-1/2 w-[700px] h-[500px] rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${activeProduct.glowColor} 0%, transparent 70%)`,
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-16 lg:gap-20 items-start">
          {/* ── Left Column: Static Header ── */}
          <div className="lg:sticky lg:top-48 pt-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-[10px] tracking-[0.3em] uppercase font-bold mb-4"
              style={{
                color: "rgba(255,255,255,0.35)",
                fontFamily: "var(--font-heading)",
              }}
            >
              LATEST FROM THE LAB
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-4xl md:text-[56px] font-bold text-white leading-tight"
              style={{
                fontFamily: "var(--font-heading)",
                letterSpacing: "-0.03em",
              }}
            >
              What we&apos;re
              <br />
              building.
            </motion.h2>
          </div>

          {/* ── Right Column: Coverflow Carousel ── */}
          <div className="w-full flex flex-col items-center">
            {/* ── Product Header + Nav (above card) ── */}
            <div className="w-full max-w-[580px] mb-8 px-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full"
                >
                  {/* Product Name */}
                  <h3
                    className="text-2xl sm:text-[28px] font-bold text-white text-center mb-5 leading-tight"
                    style={{
                      fontFamily: "var(--font-heading)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {activeProduct.name}
                  </h3>

                  {/* Navigation + Dots (centered) */}
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={prev}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center
                        bg-white/[0.04] backdrop-blur-md border border-white/[0.08] text-white/40
                        hover:bg-white/[0.10] hover:border-white/[0.2] hover:text-white
                        active:scale-90 transition-all duration-300"
                      aria-label="Previous product"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      {products.map((_, idx) => {
                        const isDotActive = idx === activeIndex;
                        return (
                          <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className="rounded-full transition-all duration-500"
                            style={{
                              width: isDotActive ? 20 : 5,
                              height: 5,
                              background: isDotActive
                                ? activeProduct.accent
                                : "rgba(255,255,255,0.15)",
                            }}
                            aria-label={`Go to product ${idx + 1}`}
                          />
                        );
                      })}
                    </div>

                    <button
                      onClick={next}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center
                        bg-white/[0.04] backdrop-blur-md border border-white/[0.08] text-white/40
                        hover:bg-white/[0.10] hover:border-white/[0.2] hover:text-white
                        active:scale-90 transition-all duration-300"
                      aria-label="Next product"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Container */}              <div
              className="relative w-full flex items-center justify-center overflow-hidden"
              style={{ perspective: "1400px" }}
            >
              {/* Carousel Track Wrapper */}
              <div className="relative w-full max-w-[90vw] sm:max-w-[560px] mx-auto">
                {/* ── Card Track ── */}
                <div
                  className="relative aspect-[1.65] w-full"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {products.map((card, idx) => {
                    const offset = getCardOffset(idx);
                    const isActive = offset === 0;
                    let x = 0;
                    let z = 0;
                    let rotateY = 0;
                    let scale = 0.75;
                    let opacity = 0;
                    let zIndex = 5;
                    const blurAmount =
                      Math.abs(offset) >= 2
                        ? "4px"
                        : Math.abs(offset) === 1
                          ? "1.5px"
                          : "0px";

                    // Use smaller offsets on mobile for the coverflow effect
                    const offsetScale = isMobile ? 0.5 : 1;

                    if (offset === 0) {
                      x = 0;
                      z = 100;
                      rotateY = 0;
                      scale = 1;
                      opacity = 1;
                      zIndex = 30;
                    } else if (offset === -1) {
                      x = -210 * offsetScale;
                      z = -140;
                      rotateY = isMobile ? 35 : 55;
                      scale = isMobile ? 0.65 : 0.78;
                      opacity = isMobile ? 0.5 : 0.75;
                      zIndex = 20;
                    } else if (offset === 1) {
                      x = 210 * offsetScale;
                      z = -140;
                      rotateY = isMobile ? -35 : -55;
                      scale = isMobile ? 0.65 : 0.78;
                      opacity = isMobile ? 0.5 : 0.75;
                      zIndex = 20;
                    } else if (offset === -2) {
                      x = -380 * offsetScale;
                      z = -300;
                      rotateY = isMobile ? 45 : 65;
                      scale = isMobile ? 0.4 : 0.55;
                      opacity = isMobile ? 0.08 : 0.12;
                      zIndex = 10;
                    } else if (offset === 2) {
                      x = 380 * offsetScale;
                      z = -300;
                      rotateY = isMobile ? -45 : -65;
                      scale = isMobile ? 0.4 : 0.55;
                      opacity = isMobile ? 0.08 : 0.12;
                      zIndex = 10;
                    } else {
                      // Hidden cards
                      x = offset < 0 ? -520 * offsetScale : 520 * offsetScale;
                      z = -400;
                      rotateY = offset < 0 ? 75 : -75;
                      scale = 0.4;
                      opacity = 0;
                      zIndex = 0;
                    }

                    return (
                      <motion.div
                        key={card.id}
                        style={{
                          position: "absolute",
                          inset: 0,
                          transformStyle: "preserve-3d",
                          cursor: offset !== 0 ? "pointer" : "default",
                          filter: isActive ? "none" : `blur(${blurAmount})`,
                        }}
                        animate={{
                          x,
                          z,
                          rotateY,
                          scale,
                          opacity,
                          zIndex,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 26,
                          mass: 0.8,
                        }}
                        onClick={() => {
                          if (offset !== 0) {
                            setActiveIndex(idx);
                          }
                        }}
                      >
                        {isActive ? (
                          <TiltCard className="w-full h-full">
                            <ProductCard
                              card={card}
                              isActive
                            />
                          </TiltCard>
                        ) : (
                          <div
                            style={{
                              pointerEvents: "none",
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            <ProductCard
                              card={card}
                              isActive={false}
                            />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Explore CTA (below card) ── */}
            <motion.a
              href="/labs"
              className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-[11px] font-semibold tracking-[0.12em] uppercase
                bg-white/[0.04] backdrop-blur-md border border-white/[0.1] text-white/80
                hover:bg-white/[0.10] hover:border-white/[0.2] hover:text-white
                active:scale-95 transition-all duration-300 mt-7"
              style={{ fontFamily: "var(--font-heading)" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────── Product Card ──────────────────── */

function ProductCard({
  card,
  isActive,
}: {
  card: (typeof products)[number];
  isActive: boolean;
}) {
  const cardStyle = {
    border: `1px solid ${
      isActive
        ? "rgba(255,255,255,0.12)"
        : "rgba(255,255,255,0.05)"
    }`,
    boxShadow: isActive
      ? "0 30px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.06), 0 0 60px rgba(99,102,241,0.06)"
      : "0 15px 40px rgba(0,0,0,0.5)",
    background: isActive ? "#111111" : "#0a0a0a",
    transform: "translateZ(0)",
  } as React.CSSProperties;

  // ── AI card: full-bleed image, no text inside ──
  if (card.visual === "ai") {
    return (
      <motion.div
        className="relative w-full h-full rounded-[20px] overflow-hidden select-none"
        style={cardStyle}
        animate={
          isActive
            ? {
                y: [0, -5, 0],
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }
            : { y: 0 }
        }
      >
        {/* Full-bleed image */}
        <img
          src="/insynk.jpg"
          alt="Webbed AI"
          className="absolute inset-0 w-full h-full object-cover rounded-[20px]"
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 z-20 pointer-events-none opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 z-20 pointer-events-none" />

        {/* Glass shine */}
        <div
          className="absolute inset-0 pointer-events-none z-10 rounded-[20px]"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)",
          }}
        />
      </motion.div>
    );
  }

  // ── Other cards: full gradient card with centered logo + "Coming soon..." ──
  return (
    <motion.div
      className="relative w-full h-full rounded-[20px] overflow-hidden select-none"
      style={cardStyle}
      animate={
        isActive
          ? {
              y: [0, -5, 0],
              transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }
          : { y: 0 }
      }
    >
      {/* Full-bleed gradient + logo visual */}
      <div className="absolute inset-0">
        <ProductVisual visual={card.visual} gradient={card.gradient} />
      </div>

      {/* Glass shine overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 rounded-[20px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)",
        }}
      />

      {/* ── "Coming soon..." overlaid at bottom ── */}
      <div className="absolute inset-x-0 bottom-4 z-30 flex justify-center">
        <span
          className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-medium text-center"
          style={{
            color: "rgba(255,255,255,0.45)",
            fontFamily: "var(--font-heading)",
          }}
        >
          Coming soon...
        </span>
      </div>
    </motion.div>
  );
}
