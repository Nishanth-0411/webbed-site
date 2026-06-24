"use client";

import Navbar from "@/components/Navbar";
import CinematicFooter from "@/components/CinematicFooter";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

function SocialIcon({
  children,
  href,
  label,
}: {
  children: React.ReactNode;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex items-center justify-center text-white/60 hover:text-white transition-colors"
    >
      {children}
    </a>
  );
}

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend wired in this task; keep UX snappy and non-blocking.
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Contact page hero (100vh, left-anchored copy + right-side ring) */}
      <section className="relative h-[100vh] overflow-hidden bg-black">
        {/* Canvas / base */}
        <div className="absolute inset-0 bg-black" />

        {/* Right-side abstract wireframe ring */}
        <div className="absolute right-[-140px] top-1/2 -translate-y-1/2 w-[760px] h-[760px] pointer-events-none hidden sm:block">
          <svg
            viewBox="0 0 600 600"
            width="600"
            height="600"
            className="absolute right-0 top-1/2 -translate-y-1/2"
            aria-hidden="true"
          >
            {/* Outer faint torus-like wireframe ring */}
            <g style={{ transformOrigin: "300px 300px" }}>
              <circle
                cx="300"
                cy="300"
                r="240"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              <circle
                cx="300"
                cy="300"
                r="236"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
              <circle
                cx="300"
                cy="300"
                r="244"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
            </g>

            {/* Travelling highlight dot */}
            <g>
              {/* We rotate the dot group. */}
              <g className="contact-hero-ring-rotate">
                <circle cx="540" cy="300" r="4" fill="rgba(255,255,255,0.35)" />
                <circle cx="540" cy="300" r="8" fill="rgba(255,255,255,0.12)" />
              </g>
            </g>
          </svg>

          {/* Extremely subtle glow vignette on the right third */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_55%)] opacity-[0.55]" />
        </div>

        {/* Left content */}
        <div className="relative z-10 h-full px-6 sm:px-10">
          <div className="h-full max-w-7xl mx-auto flex items-center">
            <div className="w-full max-w-[540px]">
              <p className="type-eyebrow text-[11px] tracking-[0.22em] text-white/40 mb-5">
                START A PROJECT
              </p>

              <h1
                className="text-[clamp(2.5rem,8vw,72px)] font-bold leading-[0.95] [font-family:var(--font-heading)] tracking-[-0.02em] text-white"
              >
                Let&apos;s build what&apos;s
                <br />
                next.
              </h1>

              <p className="mt-6 text-[16px] text-white/55 max-w-[420px] leading-[1.8]">
                Tell us what you're building. We respond within 24 hours and we don't do unnecessary calls.
              </p>

              <Link
                href="/#contact"
                className="mt-8 inline-flex items-center justify-between w-[190px] h-[48px] rounded-full bg-white text-black font-ui font-semibold transition-all duration-200 ease-out hover:bg-[rgba(240,240,240,1)] px-[24px] group"
                aria-label="Get in Touch"
              >
                <span className="inline-flex items-center gap-3">
                  <span
                    className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-[4px]"
                  >
                    Get in Touch
                  </span>

                  <span className="contact-hero-arrow inline-flex items-center opacity-0 -translate-x-[6px] transition-all duration-200 ease-out group-hover:opacity-100 group-hover:translate-x-0">
                    <span aria-hidden="true">→</span>
                  </span>
                </span>
              </Link>

              <div className="mt-8 flex items-center gap-4 text-[12px] text-white/35">
                <span>Response within 24 hours</span>
                <span aria-hidden="true" className="w-[5px] h-[5px] rounded-full bg-white/35" />
                <span>NDA available on request</span>
              </div>
            </div>
          </div>
        </div>

        {/* Local animation styles (keeps change isolated to this file) */}
        <style jsx>{`
          @keyframes contactHeroRingRotate {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          .contact-hero-ring-rotate {
            transform-origin: 300px 300px;
            animation: contactHeroRingRotate 20s linear infinite;
          }
        `}</style>
      </section>

      {/* Contact section below hero */}
      <section className="relative z-10 px-6 sm:px-10 pb-20 pt-16" id="contact">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-0 md:gap-0">
            {/* Left column */}
            <div className="px-0 md:pr-14">
              <p className="type-eyebrow text-white/70 tracking-[0.32em] text-[0.72rem] leading-none mb-6">
                GET IN TOUCH
              </p>

              <h2 className="text-[clamp(1.75rem,7vw,40px)] font-bold [font-family:var(--font-heading)] leading-[1.05]">
                We respond within 24 hours.
              </h2>

              <div className="mt-10 border-t border-white/10">
                <div className="py-5 border-b border-white/10 flex items-center justify-between gap-6">
                  <span className="text-[14px] text-white/45">Email</span>
                  <span className="text-[14px] text-white text-right">
                    hello@webbed.studio
                  </span>
                </div>

                <div className="py-5 border-b border-white/10 flex items-center justify-between gap-6">
                  <span className="text-[14px] text-white/45">Based in</span>
                  <span className="text-[14px] text-white text-right">
                    Worldwide
                  </span>
                </div>

                <div className="py-5 flex items-center justify-between gap-6">
                  <span className="text-[14px] text-white/45">Response</span>
                  <span className="text-[14px] text-white text-right">
                    Within 24 hours
                  </span>
                </div>
              </div>

              <div className="mt-10 flex items-center gap-5">
                <SocialIcon href="#" label="Twitter / X">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 3H21L14.6 10.4L22 21H16.2L11.6 14.7L6.1 21H2.6L9.4 13.1L2.3 3H8.2L12.4 8.6L17.5 3Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                  </svg>
                </SocialIcon>

                <SocialIcon href="#" label="LinkedIn">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.5 10.5V19"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6.5 7.3V7.2"
                      stroke="currentColor"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M11 19V10.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M11 13.2C11.3 11.8 12.3 10.5 14.2 10.5C16.6 10.5 17 12.3 17 14.4V19"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </SocialIcon>

                <SocialIcon href="#" label="GitHub">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 19c-4 1.5-4-2-5-2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 22v-3.1c0-.9.3-1.5.8-2c-2.7-.3-5.5-1.4-5.5-6.1c0-1.4.5-2.5 1.3-3.4c-.1-.3-.6-1.7.1-3.5c0 0 1-.3 3.4 1.3c1-.3 2-.4 3.1-.4c1.1 0 2.1.1 3.1.4c2.4-1.6 3.4-1.3 3.4-1.3c.7 1.8.2 3.2.1 3.5c.8.9 1.3 2 1.3 3.4c0 4.7-2.8 5.8-5.5 6.1c.5.5.9 1.3.9 2.6V22"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </SocialIcon>
              </div>
            </div>

            {/* Vertical divider */}
            <div className="hidden md:block border-l border-white/8" />

            {/* Right column */}
            <div className="mt-14 md:mt-0 md:pl-14">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Name */}
                  <div className="relative w-full">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder=" "
                      className="peer w-full bg-transparent text-white placeholder-transparent outline-none pb-3 pt-6 border-b border-white/20 focus:border-white transition-colors"
                      type="text"
                      id="contact-name"
                      required
                    />
                    <label
                      htmlFor="contact-name"
                      className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none text-[14px] text-white/55 transition-all duration-200
                                 peer-focus:top-0 peer-focus:left-0 peer-focus:-translate-y-0
                                 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:left-0 peer-not-placeholder-shown:-translate-y-0"
                    >
                      Name
                    </label>
                  </div>

                  {/* Email */}
                  <div className="relative w-full">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder=" "
                      className="peer w-full bg-transparent text-white placeholder-transparent outline-none pb-3 pt-6 border-b border-white/20 focus:border-white transition-colors"
                      type="email"
                      id="contact-email"
                      required
                    />
                    <label
                      htmlFor="contact-email"
                      className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none text-[14px] text-white/55 transition-all duration-200
                                 peer-focus:top-0 peer-focus:left-0 peer-focus:-translate-y-0
                                 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:left-0 peer-not-placeholder-shown:-translate-y-0"
                    >
                      Email
                    </label>
                  </div>

                  {/* Company (optional) */}
                  <div className="relative w-full sm:col-span-2">
                    <input
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder=" "
                      className="peer w-full bg-transparent text-white placeholder-transparent outline-none pb-3 pt-6 border-b border-white/20 focus:border-white transition-colors"
                      type="text"
                      id="contact-company"
                    />
                    <label
                      htmlFor="contact-company"
                      className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none text-[14px] text-white/55 transition-all duration-200
                                 peer-focus:top-0 peer-focus:left-0 peer-focus:-translate-y-0
                                 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:left-0 peer-not-placeholder-shown:-translate-y-0"
                    >
                      Company (optional)
                    </label>
                  </div>
                </div>

                {/* Message textarea */}
                <div className="relative w-full mt-10">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder=" "
                    className="peer w-full bg-transparent text-white placeholder-transparent outline-none pb-3 pt-8 border-b border-white/20 focus:border-white transition-colors min-h-[120px] resize-none"
                    id="contact-message"
                    required
                  />
                  <label
                    htmlFor="contact-message"
                    className="absolute left-0 top-3 pointer-events-none text-[14px] text-white/55 transition-all duration-200
                               peer-focus:top-0 peer-focus:left-0 peer-focus:-translate-y-0
                               peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:left-0 peer-not-placeholder-shown:-translate-y-0"
                  >
                    Message
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="mt-12 w-full h-[52px] bg-white text-black font-ui font-semibold transition-all duration-200 ease-out hover:bg-[rgba(255,255,255,0.9)]"
                >
                  <span className="inline-flex items-center justify-center gap-3 h-full w-full group">
                    <span className="transition-transform duration-200 ease-out group-hover:translate-x-[4px]">
                      Send Message
                    </span>
                    <span className="opacity-0 translate-x-[-2px] transition-all duration-200 ease-out group-hover:opacity-100 group-hover:translate-x-0">
                      <span aria-hidden="true">→</span>
                    </span>
                  </span>
                </button>
              </form>

              {/* Trust row (full width) */}
              <div className="mt-14 w-full bg-black">
                <div className="mx-auto max-w-7xl px-6 sm:px-10">
                  <div className="flex flex-col sm:flex-row items-stretch text-center">
                    {[
                      { value: "48hr", label: "Average response time" },
                      { value: "100%", label: "Projects delivered on time" },
                      { value: "NDA", label: "Available on request" },
                      { value: "Global", label: "Clients across 3 continents" },
                    ].map((it, idx) => (
                      <motion.div
                        key={it.value}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className={[
                          "flex-1 py-8",
                          idx < 3 ? "border-r border-white/8" : "",
                        ].join(" ")}
                      >
                        <div className="text-[30px] font-bold text-white leading-none">
                          {it.value}
                        </div>
                        <div className="mt-3 text-[14px] text-white/50">
                          {it.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Graceful exit / closing section */}
      <section className="relative w-full bg-[linear-gradient(180deg,#000_0%,#020617_100%)] py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 text-center">
          <h2 className="text-[40px] font-bold text-white [font-family:var(--font-heading)] leading-[1.1]">
            Not ready to reach out yet?
          </h2>

          <p className="mt-6 text-[16px] text-white/55 max-w-2xl mx-auto">
            Explore what we build and come back when the time is right.
          </p>

          <div className="mt-10 flex items-center justify-center gap-8">
            <Link
              href="/solutions"
              className="inline-flex items-center text-white/85 hover:text-white transition-colors border-b border-white/15 hover:border-white/70 pb-1"
            >
              Explore Solutions
            </Link>
            <span className="text-white/20">•</span>
            <Link
              href="/labs"
              className="inline-flex items-center text-white/85 hover:text-white transition-colors border-b border-white/15 hover:border-white/70 pb-1"
            >
              Visit Webbed Labs
            </Link>
          </div>
        </div>
      </section>

      <CinematicFooter />
    </div>
  );
}
