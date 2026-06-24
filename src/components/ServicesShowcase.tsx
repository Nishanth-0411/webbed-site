"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type ServiceCardProps = {
  title: string;
  description: string;
  featured?: boolean;
  variant: "schools" | "services" | "labs";
};

function ServiceCard({ title, description, featured, variant }: ServiceCardProps) {
  const base =
    "relative overflow-hidden rounded-[2.75rem] bg-black text-white shadow-[0_40px_120px_rgba(0,0,0,0.22)]";

  const size = featured
    ? "min-h-[520px] sm:min-h-[560px] lg:min-h-[620px]"
    : "min-h-[460px] sm:min-h-[500px] lg:min-h-[560px]";

  const frame = "ring-1 ring-white/10";
  const commonClasses = [
    base,
    size,
    frame,
    "group will-change-transform flex flex-col h-full",
    "hover:shadow-[0_50px_150px_rgba(0,0,0,0.28)]"
  ].join(" ");

  if (variant === "schools") {
    return (
      <Link href="/schools" className="block h-full cursor-pointer">
        <motion.div
          className={commonClasses}
          whileHover={{ y: -12, scale: 1.02, transition: { type: "spring", stiffness: 520, damping: 26, mass: 0.55 } }}
          transition={{ type: "spring", stiffness: 520, damping: 30, mass: 0.55 }}
        >
          <div className="absolute inset-x-0 top-0 h-[55%] overflow-hidden">
            <img src="/schools-bg.png" alt="Schools" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
          </div>
          <div className="relative z-10 flex h-full flex-col px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12 flex-1 justify-end items-end text-right">
            <p className="mb-4 sm:mb-6 text-white/60 leading-relaxed [font-family:var(--font-body)] text-[14px] sm:text-[15px] max-w-[28ch]">
              "{description}"
            </p>
            <h3 className="text-[22px] sm:text-[26px] md:text-[28px] font-semibold tracking-[-0.02em] [font-family:var(--font-heading)] mb-4 sm:mb-6">
              {`Webbed ${title}`}
            </h3>
            <div className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-2 text-sm text-white/90 ring-1 ring-white/15 [font-family:var(--font-ui)] transition duration-200 hover:bg-white/20 hover:text-white cursor-pointer select-none">
              Explore
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  if (variant === "services") {
    return (
      <Link href="/solutions" className="block h-full cursor-pointer">
        <motion.div
          className={commonClasses}
          whileHover={{ y: -12, scale: 1.02, transition: { type: "spring", stiffness: 520, damping: 26, mass: 0.55 } }}
          transition={{ type: "spring", stiffness: 520, damping: 30, mass: 0.55 }}
        >
          <div className="absolute inset-x-0 bottom-0 h-[50%] overflow-hidden">
            <img src="/services-bg.jpg" alt="Services" className="absolute inset-0 h-full w-full object-cover object-bottom transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/40 to-black" />
          </div>
          <div className="relative z-10 flex h-full flex-col px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12 flex-1 items-center text-center">
            <h3 className="text-[22px] sm:text-[26px] md:text-[28px] font-semibold tracking-[-0.02em] [font-family:var(--font-heading)]">
              {`Webbed ${title}`}
            </h3>
            <p className="mt-6 sm:mt-8 mb-8 sm:mb-10 text-white/60 leading-relaxed [font-family:var(--font-body)] text-[14px] sm:text-[15px] max-w-[28ch]">
              "{description}"
            </p>
            <div className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-2 text-sm text-white/90 ring-1 ring-white/15 [font-family:var(--font-ui)] transition duration-200 hover:bg-white/20 hover:text-white cursor-pointer select-none">
              Explore
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  if (variant === "labs") {
    return (
      <Link href="/labs" className="block h-full cursor-pointer">
        <motion.div
          className={commonClasses}
          whileHover={{ y: -12, scale: 1.02, transition: { type: "spring", stiffness: 520, damping: 26, mass: 0.55 } }}
          transition={{ type: "spring", stiffness: 520, damping: 30, mass: 0.55 }}
        >
          <div className="absolute -bottom-8 -right-8 h-[65%] w-[85%] overflow-hidden">
            <img src="/labs-bg.jpg" alt="Labs" className="absolute inset-0 h-full w-full object-cover object-bottom transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/40 to-black" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent" />
          </div>
          <div className="relative z-10 flex h-full flex-col px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12 flex-1 justify-start items-start text-left">
            <h3 className="text-[22px] sm:text-[26px] md:text-[28px] font-semibold tracking-[-0.02em] [font-family:var(--font-heading)]">
              {`Webbed ${title}`}
            </h3>
            <p className="mt-6 sm:mt-8 mb-8 sm:mb-10 text-white/60 leading-relaxed [font-family:var(--font-body)] text-[14px] sm:text-[15px] max-w-[28ch]">
              "{description}"
            </p>
            <div className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-2 text-sm text-white/90 ring-1 ring-white/15 [font-family:var(--font-ui)] transition duration-200 hover:bg-white/20 hover:text-white cursor-pointer select-none">
              Explore
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  return null;
}

export default function ServicesShowcase() {
  const cardsContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const transitionEase = [0.22, 1, 0.36, 1] as const;

  const cardAnim = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: transitionEase,
      },
    },
  };

  const loremText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white text-black"
    >
      {/* Top and Bottom Section Blending Gradients */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 z-20 h-[120px] section-fade-top-white" aria-hidden />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-[160px]"
        style={{ background: "linear-gradient(to bottom, transparent, black)" }}
        aria-hidden
      />

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,1),rgba(245,245,245,0.98)_42%,rgba(232,232,232,0.96)_78%)]" />
        <div className="absolute -top-64 left-1/2 h-[980px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.08),rgba(0,0,0,0)_62%)] blur-3xl opacity-45" />
        <div className="absolute -bottom-72 right-1/3 h-[1040px] w-[1040px] translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.07),rgba(0,0,0,0)_62%)] blur-3xl opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.92),rgba(255,255,255,0)_55%)] opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_55%,rgba(255,255,255,0.90),rgba(255,255,255,0)_58%)] opacity-65" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32 animate-fade-in">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: transitionEase }}
            className="relative mx-auto max-w-2xl text-center text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.03em] [font-family:var(--font-heading)]"
          >
            THREE DIVISIONS. ONE VISION.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: transitionEase }}
            className="relative mx-auto mt-7 max-w-2xl text-center text-base sm:text-lg text-black/60 leading-relaxed [font-family:var(--font-body)]"
          >
            From software and AI systems to education and product innovation, WEBBED operates across three focused divisions built to shape the future of technology
          </motion.p>

          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2">
            <div className="mx-auto h-[520px] max-w-6xl rounded-[3.75rem] bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.10),rgba(0,0,0,0)_62%)] blur-3xl opacity-70" />
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            variants={cardsContainer}
            className="relative mt-16 sm:mt-20 grid gap-4 sm:gap-7 lg:grid-cols-3 lg:gap-10 items-stretch"
          >
            <div className="lg:pb-8 lg:translate-y-6 flex flex-col h-full">
              <motion.div variants={cardAnim} className="h-full">
                <ServiceCard
                  title="Schools"
                  description="Learn software development, AI, automation, web technologies, and digital systems through practical, industry-focused education."
                  variant="schools"
                />
              </motion.div>
            </div>

            <div className="lg:pb-0 lg:-translate-y-8 flex flex-col h-full">
              <motion.div variants={cardAnim} className="h-full">
                <ServiceCard
                  title="Solutions"
                  description="Custom websites, AI systems, automations, apps, and scalable software solutions built for businesses ready to grow faster and operate smarter."
                  featured
                  variant="services"
                />
              </motion.div>
            </div>

            <div className="lg:pb-8 lg:translate-y-6 flex flex-col h-full">
              <motion.div variants={cardAnim} className="h-full">
                <ServiceCard
                  title="Labs"
                  description="Where ideas too ambitious for convention become products the world has not seen yet."
                  variant="labs"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
