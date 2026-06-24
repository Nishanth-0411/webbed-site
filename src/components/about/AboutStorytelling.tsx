// AboutStorytelling.tsx – Premium 2×2 glassmorphic pillar showcase
"use client";

import React, { useEffect, useRef, useState } from "react";

export default function AboutStorytelling() {
  const gridItems = [
    { subject: "Websites", subtext: "High‑performance digital experiences designed to attract, engage, and convert." },
    { subject: "Software", subtext: "Custom systems engineered to streamline operations and accelerate growth." },
    { subject: "AI", subtext: "Intelligent automation and AI solutions that transform ideas into execution." },
    { subject: "Education", subtext: "Learning ecosystems that connect knowledge with innovation." },
  ] as const;

  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // IntersectionObserver – trigger once when section scrolls into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-50px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="about-storytelling-section"
      style={{ backgroundColor: "#050508", paddingTop: "100px", paddingBottom: "110px" }}
    >
      {/* Heading block */}
      <div className="section-header" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 60px" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)", margin: 0, marginBottom: "20px" }}>
          FOUR PILLARS • ONE DIGITAL FOUNDATION
        </p>
        <h2
          style={{
            fontSize: "clamp(48px,5.5vw,72px)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "#fff",
            margin: 0,
            marginBottom: "20px",
          }}
        >
          Four Pillars. One Digital Foundation.
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "rgba(255,255,255,0.55)",
            maxWidth: "580px",
            lineHeight: 1.75,
            margin: 0,
            marginBottom: "48px",
          }}
        >
          Every solution we build is designed to help businesses connect, scale, automate, and grow.
        </p>
      </div>

      {/* 2×2 glassmorphic grid */}
      <div className={`about-storytelling-grid ${inView ? "in-view" : ""}`} style={{ maxWidth: 1100, margin: "0 auto", padding: "0 60px" }}>
        {gridItems.map((item, i) => (
          <div key={item.subject} className="about-storytelling-card card" data-index={i}>
            <p className="about-storytelling-card__title">{item.subject}</p>
            <p className="about-storytelling-card__subtext">
              {item.subtext.split(" ").map((word, idx) => (
                <span
                  key={idx}
                  className="subheading-word"
                  style={{
                    transitionDelay: idx === 0 ? "0ms" : `${40 + idx * 80}ms`
                  }}
                >
                  {word}&nbsp;
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Roboto:wght@500;700&display=swap');

        .about-storytelling-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }
        .card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 160px;
          padding: 24px;
          background: rgba(255, 255, 255, 0.18);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          overflow: hidden;
          cursor: default;
          transition: transform 0.08s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.08s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.08s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.08s cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0;
          transform: translateY(30px);
        }
        .in-view .card {
          opacity: 1;
          transform: translateY(0);
        }
        .card[data-index='0'] { transition-delay: 0.1s; }
        .card[data-index='1'] { transition-delay: 0.2s; }
        .card[data-index='2'] { transition-delay: 0.3s; }
        .card[data-index='3'] { transition-delay: 0.4s; }
        
        .about-storytelling-card:hover {
          transform: translateY(-12px);
          border-color: rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.22);
        }
        .about-storytelling-grid:hover .about-storytelling-card:not(:hover) {
          opacity: 0.6;
        }
        .about-storytelling-card__title {
          margin: 0;
          font-size: clamp(1.75rem, 6vw, 48px);
          font-weight: 700;
          font-family: 'Roboto', sans-serif;
          color: #f5f5f5;
          text-align: center;
          transition: color 0.25s ease, transform 0.25s ease;
        }
        .about-storytelling-card:hover .about-storytelling-card__title {
          color: #fff;
        }
        .about-storytelling-card__subtext {
          margin: 0;
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.65);
          text-align: center;
          font-family: 'Inter', sans-serif;
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          pointer-events: none;
          transition: max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.2s ease,
                      margin-top 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        .about-storytelling-card:hover .about-storytelling-card__subtext {
          max-height: 120px;
          opacity: 1;
          margin-top: 16px;
        }
        .subheading-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-storytelling-card:hover .subheading-word {
          opacity: 1;
          transform: translateY(0);
        }
        .about-storytelling-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 114, 255, 0.12), rgba(255, 0, 127, 0.12));
          opacity: 0;
          transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-storytelling-card:hover::before {
          opacity: 0.6;
        }
      `}</style>
    </section>
  );
}
