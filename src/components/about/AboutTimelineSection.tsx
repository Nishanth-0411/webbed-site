"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const X_INPUT = [0, 1];
const X_OUTPUT = ["0vw", "-300vw"];
const DOT_INPUT = [0, 0.33, 0.66, 1];
const DOT_OUTPUT = ["58%", "7%", "57%", "7%"];
const TIMELINE_VISIBILITY_INPUT = [0, 0.24, 0.26, 1];
const TIMELINE_VISIBILITY_OUTPUT = [0, 0, 1, 1];

export default function AboutTimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 24,
    mass: 0.25,
  });

  const x = useTransform(smoothProgress, X_INPUT, X_OUTPUT);
  const dotLeft = useTransform(smoothProgress, DOT_INPUT, DOT_OUTPUT);
  const timelineOpacity = useTransform(
    smoothProgress,
    TIMELINE_VISIBILITY_INPUT,
    TIMELINE_VISIBILITY_OUTPUT,
  );

  const slides = [
    {
      id: "intro",
      title: (
        <>
          We make{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-pink-500 bg-clip-text text-transparent">
            technology
          </span>
          <br />
          that the World
          <br />
          Isn&apos;t Prepared
          <br />
          for,{" "}
          <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-orange-500 bg-clip-text text-transparent font-black">
            YET
          </span>
        </>
      ),
      description:
        "At WEBBED, we do not just create digital products. We build systems, experiences, and ideas designed for where technology is heading next. From AI tools to scalable software platforms, everything we build is made to evolve with the future.",
      imageSrc: "/blast_img.jpg",
      imageAlt: "Exploding futuristic crystal sphere",
      imageSide: "left",
      isCircle: false,
    },
    {
      id: "visionary",
      title: "Vision",
      description:
        "Technology moves fast. Most businesses struggle to keep up. We started WEBBED to close the gap between ambitious ideas and real-world execution through software, AI, automation, and digital experiences that actually make an impact.",
      imageSrc: "/about/vision.jpg",
      imageAlt: "Visionary — future-ready product design",
      imageSide: "left",
      isCircle: false,
    },
    {
      id: "passion",
      title: "Passion",
      description:
        "Every project at WEBBED is built from scratch with intention, performance, and scalability in mind. No recycled templates. No shortcuts. Just thoughtful technology built to solve real problems and create lasting value.",
      imageSrc: "/about/passion.jpg",
      imageAlt: "Passion — craft and obsessive detail",
      imageSide: "left",
      isCircle: false,
    },
    {
      id: "impact",
      title: "Impact",
      description:
        "The best technology should feel effortless. Our goal is simple: help everyone grow faster, work smarter and build a stronger digital presence through software that delivers real results.",
      imageSrc: "/about/impact.jpg",
      imageAlt: "Impact — products built for legacy",
      imageSide: "left",
      isCircle: true,
    },
  ];

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        <motion.div
          style={{ opacity: timelineOpacity }}
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-white/70 z-0 pointer-events-none"
        />
        <motion.div
          style={{ left: dotLeft, opacity: timelineOpacity }}
          className="absolute top-1/2 z-20 pointer-events-none"
        >
          <div className="-translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-[3px] border-black shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
        </motion.div>

        <motion.div
          style={{ x }}
          className="relative z-10 flex w-[400vw] h-full will-change-transform"
        >
          {slides.map((slide) => {
            const isImageLeft = slide.imageSide === "left";
            return (
              <div
                key={slide.id}
                className="w-screen h-full flex-shrink-0 flex items-center justify-center px-4 sm:px-8 md:px-20"
              >
                {/* ── Card grid ── */}
                <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center">

                  {/* Left column */}
                  {isImageLeft ? (
                    /* image */
                    <div className="flex justify-start">
                      <div className="aspect-[3/4] w-full max-w-[280px] sm:max-w-sm md:max-w-none h-[35vh] sm:h-[45vh] md:h-[52vh] lg:h-[60vh] overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-950 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
                        <img src={slide.imageSrc} alt={slide.imageAlt} className="h-full w-full object-cover" />
                      </div>
                    </div>
                  ) : (
                    /* text */
                    <div className="relative flex flex-col h-auto min-h-[30vh] sm:min-h-[40vh] md:h-[56vh]">
                      <div className="flex-shrink-0 flex items-end pb-3 md:pb-6">
                        <h2
                          className={`font-extrabold tracking-tight text-white [font-family:var(--font-heading)] leading-none ${slide.id === "intro"
                              ? "text-[clamp(1.5rem,3.6vw,4.2rem)] sm:text-[clamp(2.2rem,3.6vw,4.2rem)] normal-case"
                              : "text-3xl sm:text-5xl md:text-7xl uppercase"
                            }`}
                        >
                          {slide.title}
                        </h2>
                      </div>

                      <div className="h-[3px] shrink-0" />

                      <div className="flex-1 flex items-start pt-3 md:pt-6">
                        <p className="text-xs sm:text-sm md:text-base leading-relaxed text-white/50 font-light [font-family:var(--font-body)] max-w-lg">
                          &ldquo;{slide.description}&rdquo;
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Right column */}
                  {isImageLeft ? (
                    /* text */
                    <div className="relative flex flex-col h-auto min-h-[30vh] sm:min-h-[40vh] md:h-[56vh]">
                      <div className="flex-shrink-0 flex items-end pb-3 md:pb-6">
                        <h2
                          className={`font-extrabold tracking-tight text-white [font-family:var(--font-heading)] leading-none ${slide.id === "intro"
                              ? "text-[clamp(1.5rem,3.6vw,4.2rem)] sm:text-[clamp(2.2rem,3.6vw,4.2rem)] normal-case"
                              : "text-3xl sm:text-5xl md:text-7xl uppercase"
                            }`}
                        >
                          {slide.title}
                        </h2>
                      </div>

                      <div className="h-[3px] shrink-0" />

                      <div className="flex-1 flex items-start pt-3 md:pt-6">
                        <p className="text-xs sm:text-sm md:text-base leading-relaxed text-white/50 font-light [font-family:var(--font-body)] max-w-lg">
                          &ldquo;{slide.description}&rdquo;
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* image */
                    <div className="flex justify-end">
                      <div
                        className={`overflow-hidden border border-white/10 bg-zinc-950 shadow-[0_10px_40px_rgba(0,0,0,0.8)] ${slide.isCircle
                            ? "rounded-full aspect-square h-[46vh] md:h-[52vh] w-[46vh] md:w-[52vh]"
                            : "rounded-3xl aspect-[3/4] h-[52vh] md:h-[60vh]"
                          }`}
                      >
                        <img src={slide.imageSrc} alt={slide.imageAlt} className="h-full w-full object-cover" />
                      </div>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
      {/* Bottom edge gradient blend (black to white) */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-[200px]"
        style={{ background: "linear-gradient(to bottom, transparent, white)" }}
        aria-hidden
      />
    </section>
  );
}
