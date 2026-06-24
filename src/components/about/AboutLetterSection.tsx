"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

const paragraphs = [
  {
    text: "If you're building a business, launching a product, exploring a new idea, or chasing something ambitious, you're exactly why WEBBED exists.",
    className: "text-[1.12rem] sm:text-[1.2rem] text-neutral-300 font-light leading-[1.8]",
  },
  {
    text: "We believe progress belongs to the builders. The people willing to take risks, challenge assumptions, and create something that did not exist before.",
    className: "text-[1.12rem] sm:text-[1.2rem] text-neutral-300 font-light leading-[1.8]",
  },
  {
    text: "Technology should not be a barrier to those ideas.",
    className: "text-[1.15rem] sm:text-[1.25rem] text-white font-normal leading-relaxed",
  },
  {
    text: "It should be the thing that helps bring them to life.",
    className: "text-[1.15rem] sm:text-[1.25rem] text-white font-normal leading-relaxed",
  },
];

export default function AboutLetterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Aurora blobs drift with scroll
  const auroraY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const auroraX = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  // 3D tilt tracking variables relative to the card center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xCoords = (e.clientX - rect.left) / width - 0.5;
    const yCoords = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(xCoords);
    mouseY.set(yCoords);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <>
      <style>{`
        @keyframes aurora-drift-1 {
          0%,100% { transform: translate(0%,0%) scale(1);    opacity: 0.50; }
          33%      { transform: translate(4%,-5%) scale(1.06); opacity: 0.65; }
          66%      { transform: translate(-3%,4%) scale(0.97); opacity: 0.50; }
        }
        @keyframes aurora-drift-2 {
          0%,100% { transform: translate(0%,0%) scale(1);    opacity: 0.40; }
          33%      { transform: translate(-5%,4%) scale(1.09); opacity: 0.58; }
          66%      { transform: translate(4%,-3%) scale(0.95); opacity: 0.40; }
        }
        @keyframes aurora-drift-3 {
          0%,100% { transform: translate(0%,0%) scale(1.02); opacity: 0.34; }
          50%      { transform: translate(3%,-6%) scale(0.94); opacity: 0.50; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative min-h-[95vh] flex items-center justify-center bg-black text-white py-36 sm:py-48 overflow-hidden"
      >
        {/* Aurora background blobs */}
        <motion.div
          style={{ y: auroraY, x: auroraX }}
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        >
          <div
            className="absolute top-[12%] left-[18%] w-[58vw] h-[58vw] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%)",
              filter: "blur(90px)",
              animation: "aurora-drift-1 20s ease-in-out infinite",
            }}
          />
          <div
            className="absolute top-[28%] right-[12%] w-[48vw] h-[48vw] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)",
              filter: "blur(85px)",
              animation: "aurora-drift-2 24s ease-in-out infinite",
            }}
          />
          <div
            className="absolute bottom-[18%] left-[32%] w-[38vw] h-[38vw] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(59,130,246,0.055) 0%, transparent 70%)",
              filter: "blur(70px)",
              animation: "aurora-drift-3 17s ease-in-out infinite",
            }}
          />
        </motion.div>

        {/* Vignette edges */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black to-transparent pointer-events-none z-[2]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent pointer-events-none z-[2]" />

        {/* Editorial glass card container with 3D tilt interaction */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative z-10 max-w-4xl mx-auto px-6 sm:px-12 py-16 sm:py-20 rounded-[2.5rem] border border-white/[0.07] bg-white/[0.015] backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.08)] transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.025]"
        >
          {/* Subtle inside glow accent */}
          <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_70%)]" />

          {/* Header block */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ transform: "translateZ(30px)" }}
          >
            <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-9 font-medium">
              A Letter To Builders
            </p>

            <h2
              className="font-bold tracking-[-0.03em] leading-[1.1] mb-12 text-white"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.25rem)" }}
            >
              For the people creating<br />what&apos;s next.
            </h2>

            {/* Decorative rule */}
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-12" />
          </motion.div>

          {/* Staggered letter body */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.24 } },
            }}
            className="space-y-7"
            style={{ transform: "translateZ(15px)" }}
          >
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 1.25,
                      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                    },
                  },
                }}
                className={`${p.className} max-w-2xl mx-auto text-center`}
              >
                {p.text}
              </motion.p>
            ))}

            {/* Closing statement + signature */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 22 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 1.4,
                    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                  },
                },
              }}
              className="pt-10 mt-2 border-t border-white/[0.08]"
              style={{ transform: "translateZ(20px)" }}
            >
              <p className="text-[1.2rem] sm:text-[1.4rem] text-white font-medium tracking-[-0.01em] leading-snug max-w-lg mx-auto text-center">
                Whether you&apos;re taking your first step or your hundredth, we&apos;re here to help build what comes next.
              </p>
              
              <p className="text-[0.72rem] text-neutral-300 mt-8 tracking-[0.18em] font-medium uppercase text-center">
                — The WEBBED Team
              </p>
            </motion.div>
          </motion.div>

        </motion.div>
      </section>
    </>
  );
}
