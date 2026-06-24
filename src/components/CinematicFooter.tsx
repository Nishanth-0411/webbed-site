"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useMemo, useRef } from "react";

const transitionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2.5" y="4" width="19" height="16" rx="3" />
      <path d="M3 6.5 12 13l9-6.5" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6.5 9.2V20.5" />
      <circle cx="6.5" cy="5.5" r="1.4" fill="currentColor" stroke="none" />
      <path d="M11 20.5V9.2M11 12.8c0-2 1.5-3.8 4-3.8 2.5 0 4 1.8 4 4.8v6.7" />
    </svg>
  );
}

function IconX() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.654l-5.207-6.807-5.994 6.807H2.424l7.723-8.835L1.899 2.25h6.822l4.822 6.375 5.975-6.375zM17.002 20.331h1.829L6.822 4.156H4.885l12.117 16.175z" />
    </svg>
  );
}

function IconGithub() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.547 2.916 1.186.092-.923.349-1.548.635-1.905-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

export default function CinematicFooter() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  const letters = useMemo(() => [
    {
      char: "W",
      initial: { opacity: 0, x: 0, y: -300, scaleX: 0.7, scaleY: 1.4, rotate: 0 },
      animate: {
        opacity: 1,
        x: 0,
        y: [-300, 0, -45, 0, -15, 0],
        scaleX: [0.7, 1.4, 0.8, 1.15, 0.95, 1],
        scaleY: [1.4, 0.6, 1.25, 0.85, 1.05, 1],
        rotate: [0, -8, 5, -2, 0],
      },
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: 0.9,
      }
    },
    {
      char: "E",
      initial: { opacity: 0, x: -400, y: 0, scaleX: 1.3, scaleY: 0.7, rotate: -15 },
      animate: {
        opacity: 1,
        x: [-400, 25, -10, 5, 0],
        y: [0, -60, 0, -20, 0],
        scaleX: [1.3, 0.7, 1.25, 0.9, 1.05, 1],
        scaleY: [0.7, 1.3, 0.75, 1.1, 0.95, 1],
        rotate: [-15, 10, -5, 2, 0],
      },
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3,
      }
    },
    {
      char: "B",
      initial: { opacity: 0, x: 0, y: 0, scale: 0.3 },
      animate: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: [0.3, 1.35, 0.85, 1.05, 1]
      },
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.0,
      }
    },
    {
      char: "B",
      initial: { opacity: 0, x: 0, y: 0, scale: 0.3 },
      animate: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: [0.3, 1.35, 0.85, 1.05, 1]
      },
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.0,
      }
    },
    {
      char: "E",
      initial: { opacity: 0, x: 400, y: 0, scaleX: 1.3, scaleY: 0.7, rotate: 15 },
      animate: {
        opacity: 1,
        x: [400, -25, 10, -5, 0],
        y: [0, -60, 0, -20, 0],
        scaleX: [1.3, 0.7, 1.25, 0.9, 1.05, 1],
        scaleY: [0.7, 1.3, 0.75, 1.1, 0.95, 1],
        rotate: [15, -10, 5, -2, 0],
      },
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.6,
      }
    },
    {
      char: "D",
      initial: { opacity: 0, x: 0, y: 300, scaleX: 0.8, scaleY: 1.3, rotate: 0 },
      animate: {
        opacity: 1,
        x: 0,
        y: [300, -80, 20, -15, 5, 0],
        scaleX: [0.8, 1.3, 0.8, 1.15, 0.95, 1],
        scaleY: [1.3, 0.7, 1.25, 0.85, 1.05, 1],
        rotate: [0, 12, -6, 3, 0],
      },
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 1.2,
      }
    }
  ], []);

  return (
    <footer id="contact" className="relative isolate overflow-hidden bg-black text-white">
      {/* Top section transition blending gradient */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 z-20 h-[120px] section-fade-top-dark" aria-hidden />

      <div className="pointer-events-none absolute top-[-120px] right-[-120px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35),transparent_70%)] opacity-40 blur-3xl animate-glow-pulse z-10"></div>
      <div className="pointer-events-none absolute top-0 right-0 w-[250px] h-full bg-[linear-gradient(135deg,rgba(255,255,255,0.2),transparent)] opacity-30 blur-xl animate-beam-swing z-10"></div>

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-10 sm:pt-24 lg:pt-28">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: transitionEase }}
          className="text-center text-[clamp(2rem,1.5rem+1.8vw,3.1rem)] font-semibold tracking-[-0.03em] [font-family:var(--font-heading)]"
        >
          BUILT FOR WHAT'S NEXT
        </motion.h2>

        <p
          ref={containerRef}
          className="mt-8 pointer-events-none select-none text-center text-[clamp(4.5rem,16vw,15rem)] font-semibold leading-[0.9] tracking-[-0.03em] [font-family:var(--font-heading)]"
        >
          <span className="inline-flex justify-center space-x-1">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                initial={letter.initial}
                animate={isInView ? letter.animate : letter.initial}
                transition={letter.transition as any}
                style={{
                  display: "inline-block",
                  transformOrigin: "bottom center",
                  background: "linear-gradient(to bottom, #ffffff 20%, #8c8c8c 55%, transparent 95%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {letter.char}
              </motion.span>
            ))}
          </span>
        </p>

        <div className="relative mt-14 rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-8 backdrop-blur-lg sm:px-8 sm:py-10 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.55 }}
              transition={{ duration: 0.9, ease: transitionEase }}
              className="space-y-5"
            >
              <img src="/logo.png" alt="WEBBED Logo" className="h-14 w-auto object-contain" />
              <div className="flex items-center gap-4 text-white/80">
                <Link href="https://www.instagram.com/webbed_official" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full border border-white/15 p-2.5 transition hover:border-white/35 hover:bg-white/10 hover:text-white">
                  <IconInstagram />
                </Link>
                <Link href="https://www.linkedin.com/company/webbed-official/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-full border border-white/15 p-2.5 transition hover:border-white/35 hover:bg-white/10 hover:text-white">
                  <IconLinkedIn />
                </Link>
                <Link href="https://x.com/Webbed_Official" target="_blank" rel="noopener noreferrer" aria-label="X" className="rounded-full border border-white/15 p-2.5 transition hover:border-white/35 hover:bg-white/10 hover:text-white">
                  <IconX />
                </Link>
                <Link href="https://github.com/webbed-labs" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-full border border-white/15 p-2.5 transition hover:border-white/35 hover:bg-white/10 hover:text-white">
                  <IconGithub />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.55 }}
              transition={{ duration: 0.9, delay: 0.05, ease: transitionEase }}
              className="space-y-4"
            >
              <h3 className="text-base font-semibold uppercase tracking-[0.2em] text-white/65 [font-family:var(--font-ui)]">
                ECOSYSTEM
              </h3>
              <nav className="space-y-2.5 text-white/82 [font-family:var(--font-body)]">
                <Link href="/labs" className="block transition hover:text-white">WEBBED Labs</Link>
                <Link href="/solutions" className="block transition hover:text-white">WEBBED Solutions</Link>
                <Link href="/schools" className="block transition hover:text-white">WEBBED Schools</Link>
              </nav>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.55 }}
              transition={{ duration: 0.9, delay: 0.1, ease: transitionEase }}
              className="space-y-4"
            >
              <h3 className="text-base font-semibold uppercase tracking-[0.2em] text-white/65 [font-family:var(--font-ui)]">
                Company
              </h3>
              <nav className="space-y-2.5 text-white/82 [font-family:var(--font-body)]">
                <Link href="/about" className="block transition hover:text-white">About WEBBED</Link>
                <Link href="/about" className="block transition hover:text-white">Blogs</Link>
                <Link href="/#contact" className="block transition hover:text-white">Contact Us</Link>
              </nav>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.55 }}
              transition={{ duration: 0.9, delay: 0.15, ease: transitionEase }}
              className="space-y-4"
            >
              <h3 className="text-base font-semibold uppercase tracking-[0.2em] text-white/65 [font-family:var(--font-ui)]">
                STAY AHEAD OF WHAT'S NEXT
              </h3>
              <p className="text-sm text-white/55 [font-family:var(--font-body)]">
                Get updates on AI, software, innovation, and everything we're building at WEBBED.
              </p>
              <form className="flex overflow-hidden rounded-full border border-white/20 bg-black/55">
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="h-11 flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/35 outline-none"
                />
                <button
                  type="button"
                  className="h-11 min-w-24 rounded-full border border-white/35 bg-[linear-gradient(180deg,rgba(255,255,255,0.42),rgba(255,255,255,0.2))] px-5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_8px_20px_rgba(255,255,255,0.18)] backdrop-blur-xl transition hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.52),rgba(255,255,255,0.24))] [font-family:var(--font-ui)]"
                >
                  Join
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        <div className="relative mt-8 border-t border-white/12 pt-8">
          <div className="flex flex-col gap-5 text-white/86 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/55 [font-family:var(--font-body)]">
              © {new Date().getFullYear()} WEBBED. Built for what&apos;s next.
            </p>
            <div className="flex items-center gap-8 text-sm text-white/60 [font-family:var(--font-body)]">
              <Link href="#" className="transition hover:text-white">
                Privacy Policy
              </Link>
              <Link href="#" className="transition hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
