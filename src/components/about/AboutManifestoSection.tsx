"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function AboutManifestoSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const progressMV = useMotionValue(0);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const cooldownRef = useRef(false);

  const motionLeftY = useTransform(progressMV, [0, 1], [500, 0]);
  const motionRightY = useTransform(progressMV, [0, 1], [-500, 0]);

  const leftY = hasRevealed ? 0 : motionLeftY;
  const rightY = hasRevealed ? 0 : motionRightY;

  // Monitor scroll to trigger locking when entering the section
  useEffect(() => {
    if (hasRevealed || isLocked) return;

    const handleScroll = () => {
      if (cooldownRef.current) return;
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        
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

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden text-white flex items-center min-h-screen"
      style={{
        background: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(15,2,24,1) 65%, rgba(35,6,60,1) 85%, rgba(65,12,100,0.45) 100%)",
      }}
    >
      <style>{`
        @media (max-width: 900px) {
          .manifesto-grid {
            flex-direction: column !important;
            justify-content: center !important;
            gap: 40px;
            padding-left: 32px !important;
            padding-right: 32px !important;
          }
          .manifesto-left {
            max-width: 100% !important;
            padding-right: 0 !important;
          }
          .manifesto-left h2 {
            text-align: left !important;
            font-size: clamp(36px, 8vw, 56px) !important;
          }
          .manifesto-right {
            max-width: 100% !important;
            margin-left: 0 !important;
            padding-left: 0 !important;
            padding-top: 40px !important;
            padding-bottom: 40px !important;
          }
        }
      `}</style>

      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-44 left-1/4 h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),rgba(255,255,255,0)_62%)] blur-3xl" />
        <div className="absolute -bottom-56 right-1/3 h-[760px] w-[760px] translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),rgba(255,255,255,0)_60%)] blur-3xl" />
      </div>

      <div
        className="manifesto-grid relative z-10 mx-auto w-full flex items-center overflow-hidden"
        style={{ paddingInline: "5vw", height: "100%", maxWidth: 1400 }}
      >
        {/* Left column: heading centered */}
        <motion.div
          ref={leftColRef}
          className="manifesto-left flex-1 flex items-center justify-center h-full"
          style={{ paddingRight: 80, y: leftY }}
        >
          <h2
            style={{
              fontSize: "clamp(42px, 6vw, 80px)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              margin: 0,
              textAlign: "center",
            }}
          >
            <span style={{ display: "block", color: "#ffffff" }}>The future is</span>
            <span style={{ display: "block", color: "rgba(255,255,255,0.8)" }}>built,</span>
            <span style={{ display: "block", color: "rgba(255,255,255,0.5)" }}>not predicted.</span>
          </h2>
        </motion.div>

        <motion.div
          ref={rightColRef}
          className="manifesto-right flex-1 flex flex-col justify-start space-y-12 h-full py-20"
          style={{ maxWidth: 680, paddingLeft: 40, y: rightY }}
        >
          {/* Body paragraph */}
          <p
            style={{
              textAlign: "left",
              fontSize: 18,
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.85,
            }}
          >
            At WEBBED, we do not build technology for today and hope it survives tomorrow. Every software system, AI
            solution, web application, and digital product we create is engineered with longevity, scalability, and
            adaptability as core requirements. Not afterthoughts.
          </p>

          {/* Statements */}
          <div className="space-y-6">
            <div
              style={{
                borderLeft: "2px solid rgba(255,255,255,0.4)",
                paddingLeft: 20,
                fontSize: 16,
                color: "rgba(255,255,255,0.75)",
              }}
            >
              Technology will continue to evolve.
            </div>

            <div
              style={{
                borderLeft: "2px solid rgba(255,255,255,0.4)",
                paddingLeft: 20,
                fontSize: 16,
                color: "rgba(255,255,255,0.75)",
              }}
            >
              Businesses will continue to change.
            </div>

            <div
              style={{
                borderLeft: "2px solid rgba(255,255,255,0.4)",
                paddingLeft: 20,
                fontSize: 18,
                color: "#ffffff",
              }}
            >
              The systems that succeed will be the ones built to evolve with both.
            </div>
          </div>

          {/* Signature line */}
          <p
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.2,
            }}
          >
            That is what we build at WEBBED.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
