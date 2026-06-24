"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, useVelocity, useSpring, useMotionValue } from "framer-motion";

function ScrollRevealText({
  text,
  scrollYProgress,
  start,
  end,
  active,
  revealed = false,
}: {
  text: string;
  scrollYProgress: any;
  start: number;
  end: number;
  active: boolean;
  revealed?: boolean;
}) {
  const words = text.split(" ");
  return (
    <span style={{ color: "#ffffff" }}>
      {words.map((word, i) => {
        const step = (end - start) / words.length;
        const wordStart = start + i * step;
        const wordEnd = wordStart + step;
        const opacityTransform = useTransform(scrollYProgress, [wordStart, wordEnd], [0, 1], { clamp: true });
        const opacity = revealed ? 1 : (active ? opacityTransform : 0);
        return (
          <motion.span key={i} style={{ opacity }} className="inline">
            {word}{i !== words.length - 1 ? " " : ""}
          </motion.span>
        );
      })}
    </span>
  );
}

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutGapSection() {
  const gridGlowLeftBottomRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const progressMV = useMotionValue(0);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const cooldownRef = useRef(false);

  // Monitor scroll to trigger locking when entering the section
  useEffect(() => {
    if (hasRevealed || isLocked) return;

    const handleScroll = () => {
      if (cooldownRef.current) return;
      if (gridGlowLeftBottomRef.current) {
        const rect = gridGlowLeftBottomRef.current.getBoundingClientRect();
        
        // If the user is already below this section, mark it as revealed
        if (rect.bottom < 50) {
          setHasRevealed(true);
          return;
        }

        // Trigger lock when section top hits/crosses the viewport top
        if (rect.top <= 15 && rect.bottom >= window.innerHeight - 100) {
          setIsLocked(true);
          // Snap scroll position to top of section
          window.scrollTo(0, window.scrollY + rect.top);
        }
      }
    };

    // Run once on mount to handle initial scroll position (e.g. if loaded at the bottom of the page)
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasRevealed, isLocked]);

  // Enforce absolute scroll position lock to prevent layout creep of other sections
  useEffect(() => {
    if (!isLocked) return;

    const lockedScrollY = window.scrollY;

    const handleScrollLock = () => {
      if (window.scrollY !== lockedScrollY) {
        window.scrollTo(0, lockedScrollY);
      }
    };

    window.addEventListener("scroll", handleScrollLock, { passive: false });
    return () => window.removeEventListener("scroll", handleScrollLock);
  }, [isLocked]);

  // Lock mouse wheel, swipe, and key inputs when isLocked is active
  useEffect(() => {
    if (!isLocked) return;

    let touchStart = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStart = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touchEnd = e.touches[0].clientY;
      const deltaY = touchStart - touchEnd;
      touchStart = touchEnd;

      const current = progressMV.get();
      const next = Math.max(0, Math.min(1, current + deltaY * 0.0035));
      progressMV.set(next);

      if (next >= 1) {
        setIsLocked(false);
        setHasRevealed(true);
      } else if (next <= 0 && deltaY < 0) {
        setIsLocked(false);
        cooldownRef.current = true;
        setTimeout(() => {
          cooldownRef.current = false;
        }, 1200);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const current = progressMV.get();
      const next = Math.max(0, Math.min(1, current + e.deltaY * 0.0018));
      progressMV.set(next);

      if (next >= 1) {
        setIsLocked(false);
        setHasRevealed(true);
      } else if (next <= 0 && e.deltaY < 0) {
        setIsLocked(false);
        cooldownRef.current = true;
        setTimeout(() => {
          cooldownRef.current = false;
        }, 1200);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "Space", "PageUp", "PageDown"].includes(e.code)) {
        e.preventDefault();
        
        let delta = 0;
        if (e.code === "ArrowDown" || e.code === "Space" || e.code === "PageDown") {
          delta = 0.15;
        } else if (e.code === "ArrowUp" || e.code === "PageUp") {
          delta = -0.15;
        }

        const current = progressMV.get();
        const next = Math.max(0, Math.min(1, current + delta));
        progressMV.set(next);

        if (next >= 1) {
          setIsLocked(false);
          setHasRevealed(true);
        } else if (next <= 0 && delta < 0) {
          setIsLocked(false);
          cooldownRef.current = true;
          setTimeout(() => {
            cooldownRef.current = false;
          }, 1200);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLocked, progressMV, hasRevealed]);
  
  const scrollVelocity = useVelocity(scrollY);
  
  // Map scroll velocity to catapult stretch offset and skew angle
  const catapultYRaw = useTransform(scrollVelocity, [-3000, 3000], [-60, 60]);
  const catapultSkewRaw = useTransform(scrollVelocity, [-3000, 3000], [-8, 8]);
  
  // Spring settings for snap-back bounce release
  const catapultY = useSpring(catapultYRaw, { stiffness: 160, damping: 15 });
  const catapultSkew = useSpring(catapultSkewRaw, { stiffness: 160, damping: 15 });

  return (
    <section
      ref={gridGlowLeftBottomRef}
      className="relative w-full text-white py-24 lg:py-32 flex items-center min-h-screen"
      style={{
        background: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(2,0,24,1) 65%, rgba(6,16,60,1) 85%, rgba(12,32,100,0.6) 100%)",
      }}
    >
      <div className="relative w-full flex items-center overflow-hidden">
        <div className="relative mx-auto w-full px-4 sm:px-6" style={{ maxWidth: 1400, marginLeft: "clamp(1rem, 5vw, 80px)", marginRight: "0" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-16 items-start">
            <div className="lg:sticky lg:top-[18vh] self-start">
              <motion.h2
                className="font-bold [font-family:var(--font-heading)]"
                style={{
                  fontSize: "clamp(2.25rem, 10vw, 72px)",
                  lineHeight: 1.05,
                  margin: 0,
                  letterSpacing: "-0.02em",
                  y: catapultY,
                  skewY: catapultSkew,
                  transformOrigin: "left center",
                }}
              >
                <span className="floating-text-line-1" style={{ display: "block", color: "rgba(255,255,255,1)" }}>Technology moves fast.</span>
                <span className="floating-text-line-2" style={{ display: "block", color: "rgba(255,255,255,0.45)" }}>Most businesses don't.</span>
              </motion.h2>
            </div>

            {/* Right column */}
            <div className="space-y-16" aria-label="Technology gap messaging">
              <FadeUp delay={0} className="text-[18px] leading-[1.85] font-light [font-family:var(--font-body)]">
                <ScrollRevealText
                  text="Technology is evolving faster than at any point in history. AI, automation, cloud infrastructure, and intelligent software are creating new opportunities every single day. But most businesses are still operating on outdated systems, disconnected tools, and digital foundations that were never built to scale."
                  scrollYProgress={progressMV}
                  start={0.15}
                  end={0.45}
                  active={true}
                  revealed={hasRevealed}
                />
              </FadeUp>

              <FadeUp delay={0.1} className="text-[18px] leading-[1.85] font-light [font-family:var(--font-body)]">
                <ScrollRevealText
                  text="The result is a growing gap between what technology can do and what most businesses are actually able to access, use, and benefit from."
                  scrollYProgress={progressMV}
                  start={0.45}
                  end={0.65}
                  active={true}
                  revealed={hasRevealed}
                />
              </FadeUp>

              <FadeUp delay={0.2} className="border-l-[3px] border-white/50 pl-4 py-2">
                <p
                  style={{
                    fontSize: "22px",
                    margin: 0,
                    paddingLeft: "16px",
                    lineHeight: 1.45,
                    fontWeight: 500,
                  }}
                >
                  <ScrollRevealText
                    text="WEBBED was built to close that gap."
                    scrollYProgress={progressMV}
                    start={0.65}
                    end={0.75}
                    active={true}
                    revealed={hasRevealed}
                  />
                </p>
              </FadeUp>

            <FadeUp delay={0.3} className="text-[18px] leading-[1.85] font-light [font-family:var(--font-body)]">
              <ScrollRevealText
                text="By combining custom software development, AI integration, web application design, and digital strategy, WEBBED helps businesses move faster, operate smarter, and build the kind of digital infrastructure that creates lasting competitive advantage."
                scrollYProgress={progressMV}
                start={0.75}
                end={0.85}
                active={true}
                revealed={hasRevealed}
              />
            </FadeUp>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatLine1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes floatLine2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .floating-text-line-1 {
          animation: floatLine1 7s ease-in-out infinite;
        }
        .floating-text-line-2 {
          animation: floatLine2 9s ease-in-out infinite 0.7s;
        }
      `}</style>
    </section>
  );
}
