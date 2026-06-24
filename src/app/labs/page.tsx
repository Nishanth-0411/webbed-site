"use client";

import Navbar from "@/components/Navbar";
import CinematicFooter from "@/components/CinematicFooter";
import LabsHero from "@/components/LabsHero";
import LabsAboutSection from "@/components/LabsAboutSection";
import LabsProductsSlider from "@/components/LabsProductsSlider";
import LabsTimeline from "@/components/LabsTimeline";
import { useEffect, useState, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export default function LabsPage() {
  useEffect(() => {
    document.title = "PRODUCT | WEBBED";
  }, []);

  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(-1);

  // ── Scroll-driven node activation ──
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map scroll progress through the section to active timeline index.
    // At scrollYProgress = 0.50, the section is centered in the viewport.
    // All 4 nodes must be active by then, so node 3 activates at 45%.
    //
    // 0–12%  → nothing
    // 12–23% → node 0
    // 23–34% → node 1
    // 34–45% → node 2
    // 45%+   → all 4 active by center (0.50)
    if (latest < 0.12) {
      setActiveTimelineIndex(-1);
    } else if (latest < 0.23) {
      setActiveTimelineIndex(0);
    } else if (latest < 0.34) {
      setActiveTimelineIndex(1);
    } else if (latest < 0.45) {
      setActiveTimelineIndex(2);
    } else {
      setActiveTimelineIndex(3);
    }
  });

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      <main className="relative">
        {/* Webbed Labs Hero */}
        <LabsHero />

        {/* Labs About Section */}
        <LabsAboutSection />

        {/* Labs Products Slider */}
        <LabsProductsSlider />

        {/* Rebuilt Labs Closing Section */}
        <section
          ref={sectionRef}
          className="relative w-full overflow-hidden"
          style={{ backgroundColor: "#050508", paddingTop: 140, paddingBottom: 160 }}
        >
          {/* ── LABS Watermark ── */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
            style={{
              fontSize: "clamp(140px, 18vw, 300px)",
              fontWeight: 900,
              lineHeight: 1,
              color: "rgba(255,255,255,0.035)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.04em",
              whiteSpace: "nowrap",
            }}
          >
            LABS
          </div>

          {/* ── Ambient Glows ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute top-[15%] right-[30%] w-[400px] h-[400px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(99,102,241,0.06) 0%, transparent 65%)",
                filter: "blur(100px)",
                opacity: activeTimelineIndex >= 0 ? 1 : 0,
                transition: "opacity 0.8s ease",
              }}
            />
            <div
              className="absolute top-[40%] right-[25%] w-[350px] h-[350px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(168,85,247,0.05) 0%, transparent 65%)",
                filter: "blur(100px)",
                opacity: activeTimelineIndex >= 1 ? 1 : 0,
                transition: "opacity 0.8s ease",
              }}
            />
            <div
              className="absolute top-[65%] right-[30%] w-[400px] h-[400px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(99,102,241,0.06) 0%, transparent 65%)",
                filter: "blur(100px)",
                opacity: activeTimelineIndex >= 2 ? 1 : 0,
                transition: "opacity 0.8s ease",
              }}
            />
          </div>

          <div style={{ marginLeft: "clamp(1rem, 5vw, 80px)", marginRight: "clamp(0.75rem, 3vw, 24px)" }}>
            {/* Part one */}
            <div className="w-full">
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.35)",
                  fontWeight: 400,
                  margin: 0,
                  marginBottom: 24,
                }}
              >
                WEBBED LABS
              </p>

              <div
                className="labs-closing-grid"
                style={{
                  display: "grid",
                  columnGap: 0,
                  width: "100%",
                }}
              >
                {/* Left */}
                <div>
                  <h2
                    style={{
                      fontSize: "clamp(32px, 4vw, 48px)",
                      fontWeight: 800,
                      color: "#fff",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.15,
                      margin: 0,
                      marginBottom: 32,
                      maxWidth: 480,
                    }}
                  >
                    An independent product studio. Built to create what the world has not seen yet.
                  </h2>

                  <p
                    style={{
                      fontSize: 16,
                      color: "rgba(255,255,255,0.55)",
                      maxWidth: 440,
                      lineHeight: 1.8,
                      margin: 0,
                    }}
                  >
                    Webbed Labs is where we build our own products, on our own terms, for the world. Every product
                    starts with one question: what does the future need that does not exist yet?
                  </p>
                </div>

                {/* Right: Timeline */}
                <div className="relative pl-8 lg:pl-12">
                  <LabsTimeline activeIndex={activeTimelineIndex} />
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal rule separating part one and two */}
          <div style={{ marginTop: 80, marginBottom: 80, width: "100%", backgroundColor: "rgba(255,255,255,0.08)", height: 1 }} />

          {/* Part two */}
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{ width: "100%", maxWidth: 720, paddingLeft: 24, paddingRight: 24, textAlign: "center" }}>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.35)",
                  fontWeight: 400,
                  margin: 0,
                  marginBottom: 20,
                }}
              >
                FOLLOW THE BUILD
              </p>

              <h2
                style={{
                  fontSize: "clamp(1.75rem, 8vw, 52px)",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                  margin: 0,
                  marginBottom: 16,
                }}
              >
                Be first to see what&apos;s next.
              </h2>

              <p
                style={{
                  fontSize: 16,
                  color: "rgba(255,255,255,0.5)",
                  margin: 0,
                  marginBottom: 40,
                }}
              >
                New products. Early access. Behind the scenes from the lab.
              </p>

              <div style={{ display: "flex", justifyContent: "center", gap: 12, maxWidth: 480, margin: "0 auto" }} className="flex-col sm:flex-row">
                <input
                  placeholder="Enter your email"
                  style={{
                    width: "100%",
                    height: 52,
                    borderRadius: 8,
                    padding: "0 20px",
                    fontSize: 15,
                    color: "#fff",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    outline: "none",
                    transition: "border-color 200ms ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  }}
                />
                <button
                  type="button"
                  style={{
                    height: 52,
                    padding: "0 28px",
                    borderRadius: 8,
                    border: "none",
                    background: "#fff",
                    color: "#000",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "background-color 200ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(240,240,240,1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fff";
                  }}
                >
                  Stay Ahead
                </button>
              </div>

              <div style={{ marginTop: 20, fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
                NO NOISE. JUST PROGRESS.
              </div>
            </div>
          </div>
        </section>
      </main>

      <CinematicFooter />
    </div>
  );
}
