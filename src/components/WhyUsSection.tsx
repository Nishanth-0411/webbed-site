"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useMemo, useState } from "react";

const features = [
  { text: "Strategy + Execution", x: -246, y: -206, depth: 1.08 },
  { text: "Precision in Every Detail", x: -338, y: -10, depth: 0.92 },
  { text: "Built From Scratch", x: -170, y: 228, depth: 1.15 },
  { text: "Designed to Evolve", x: 246, y: -206, depth: 1.06 },
  { text: "Built to Scale", x: 338, y: -6, depth: 0.9 },
  { text: "Fast Without Compromise", x: 170, y: 228, depth: 1.1 },
];

const transitionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

type FeatureLabelProps = {
  text: string;
  index: number;
  baseX: number;
  baseY: number;
  depth: number;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  sceneShiftX: MotionValue<number>;
  sceneShiftY: MotionValue<number>;
};

function FeatureLabel({
  text,
  index,
  baseX,
  baseY,
  depth,
  hoveredIndex,
  setHoveredIndex,
  sceneShiftX,
  sceneShiftY,
}: FeatureLabelProps) {
  const isActive = hoveredIndex === index;
  const isMuted = hoveredIndex !== null && !isActive;

  const localX = useTransform(sceneShiftX, (value: number) => value * depth * 0.65);
  const localY = useTransform(sceneShiftY, (value: number) => value * depth * 0.65);
  const localZ = useTransform(sceneShiftX, (value: number) => Math.abs(value) * depth * 0.25);
  const localRotate = useTransform(sceneShiftX, (value: number) => value * depth * 0.12);

  return (
    <motion.div
      onHoverStart={() => setHoveredIndex(index)}
      onHoverEnd={() => setHoveredIndex(null)}
      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.6 }}
      transition={{ duration: 1, delay: 0.46 + index * 0.11, ease: transitionEase }}
      animate={{ y: [0, -3, 0, 2, 0] }}
      style={{
        x: localX,
        y: localY,
        z: localZ,
        rotateZ: localRotate,
        left: "calc(50% + var(--feature-x))",
        top: "calc(50% + var(--feature-y))",
        "--feature-x": `${baseX}px`,
        "--feature-y": `${baseY}px`,
      } as any}
      className={`group absolute -translate-x-1/2 -translate-y-1/2 will-change-transform feature-label feature-label-${index}`}
    >
      <motion.div
        animate={{
          scale: isActive ? 1.34 : 1,
          opacity: isActive ? 1 : isMuted ? 0.42 : 0.58,
          y: isActive ? -6 : 0,
        }}
        transition={{ type: "spring", stiffness: 170, damping: 22, mass: 0.9 }}
        className="feature-label-text w-[150px] sm:w-[180px] lg:w-[210px] text-center text-[16px] sm:text-[20px] lg:text-[22px] leading-[1.12] font-semibold tracking-[-0.01em] text-white [font-family:var(--font-heading)]"
      >
        {text}
      </motion.div>
      <motion.div
        aria-hidden
        animate={{
          opacity: isActive ? 0.9 : 0.24,
          scale: isActive ? 1.12 : 0.84,
        }}
        transition={{ type: "spring", stiffness: 160, damping: 24 }}
        className="pointer-events-none absolute inset-x-4 -bottom-3 h-8 rounded-full bg-[radial-gradient(circle_at_center,rgba(129,168,255,0.58),rgba(176,112,255,0.48),rgba(0,0,0,0)_72%)] blur-md"
      />
    </motion.div>
  );
}

export default function WhyUsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, { stiffness: 95, damping: 22, mass: 0.8 });
  const smoothY = useSpring(pointerY, { stiffness: 95, damping: 22, mass: 0.8 });

  const sceneRotateY = useTransform(smoothX, [-0.5, 0.5], [-11, 11]);
  const sceneRotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const sceneShiftX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const sceneShiftY = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);

  const sphereX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const sphereY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);
  const glowX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);

  const onPointerMove = useMemo(
    () => (event: React.PointerEvent<HTMLElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      pointerX.set(px);
      pointerY.set(py);
    },
    [pointerX, pointerY],
  );

  const onPointerLeave = useMemo(
    () => () => {
      pointerX.set(0);
      pointerY.set(0);
    },
    [pointerX, pointerY],
  );

  return (
    <section
      id="why-us"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative isolate overflow-hidden bg-black"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_50%,rgba(70,110,255,0.16),rgba(0,0,0,0)_34%),radial-gradient(circle_at_50%_44%,rgba(154,92,255,0.18),rgba(0,0,0,0)_42%),linear-gradient(180deg,#020203_0%,#030306_42%,#020204_100%)]" />
        <div className="absolute -top-48 left-1/2 h-[920px] w-[920px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(114,143,255,0.22),rgba(0,0,0,0)_60%)] blur-3xl opacity-55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.06),rgba(255,255,255,0)_55%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:py-32">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.h2
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.8 }}
            transition={{ duration: 1.15, ease: transitionEase }}
            className="max-w-[14ch] text-[clamp(2.4rem,1.7rem+3.8vw,5.5rem)] leading-[0.94] tracking-[-0.02em] font-semibold text-white [font-family:var(--font-heading)]"
          >
            Why Businesses Choose WEBBED
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.8 }}
            transition={{ duration: 1.05, delay: 0.2, ease: transitionEase }}
            className="justify-self-start lg:justify-self-end max-w-[46ch] text-sm sm:text-base lg:text-lg leading-relaxed text-white/72 [font-family:var(--font-body)]"
          >
            Technology should solve problems, not create them. We build software, AI systems, websites, and digital experiences designed to help businesses move faster, scale smarter, and stay ahead in a rapidly changing world.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 36 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1.25, delay: 0.18, ease: transitionEase }}
          className="relative mt-8 h-[560px] sm:mt-10 sm:h-[660px] lg:h-[760px]"
          style={{ perspective: 1200 }}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] sm:h-[320px] sm:w-[320px] md:h-[430px] md:w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(119,153,255,0.38),rgba(160,100,255,0.24)_36%,rgba(0,0,0,0)_72%)] blur-3xl"
            style={{ x: glowX, y: glowY }}
          />

          <motion.div
            className="absolute inset-0"
            style={{
              x: sceneShiftX,
              y: sceneShiftY,
              rotateX: sceneRotateX,
              rotateY: sceneRotateY,
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              animate={{ y: [0, -10, 0, 7, 0] }}
              transition={{ duration: 11.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 h-[260px] w-[260px] sm:h-[280px] sm:w-[280px] md:h-[350px] md:w-[350px] lg:h-[400px] lg:w-[400px] -translate-x-1/2 -translate-y-1/2"
              style={{ x: sphereX, y: sphereY }}
            >
              <motion.div
                animate={{ rotateZ: [0, 360] }}
                transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-white/18 bg-[conic-gradient(from_140deg_at_52%_50%,rgba(84,119,255,0.65),rgba(162,105,255,0.62),rgba(120,229,255,0.56),rgba(255,255,255,0.45),rgba(84,119,255,0.65))] shadow-[0_38px_120px_rgba(31,46,116,0.62)]"
              >
                <div className="absolute inset-[2%] rounded-full border border-white/26 bg-[radial-gradient(circle_at_34%_28%,rgba(255,255,255,0.86),rgba(220,230,255,0.24)_26%,rgba(124,152,255,0.24)_44%,rgba(184,122,255,0.34)_58%,rgba(17,23,53,0.58)_88%)] shadow-[inset_0_6px_14px_rgba(255,255,255,0.45),inset_0_-36px_58px_rgba(12,17,38,0.62)]" />
                <div className="absolute inset-[15%] rounded-full border border-white/18 bg-[radial-gradient(circle_at_35%_24%,rgba(255,255,255,0.6),rgba(255,255,255,0)_42%,rgba(147,175,255,0.28)_70%,rgba(7,11,29,0.42)_100%)]" />
                <div className="absolute left-[18%] top-[16%] h-[18%] w-[36%] -rotate-[16deg] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.95),rgba(255,255,255,0)_72%)] blur-[1.4px]" />
                <div className="absolute right-[16%] bottom-[20%] h-[10%] w-[22%] rotate-[10deg] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.84),rgba(255,255,255,0)_72%)] blur-[2px]" />
              </motion.div>
            </motion.div>

            {features.map((feature, index) => (
              <FeatureLabel
                key={feature.text}
                text={feature.text}
                index={index}
                baseX={feature.x}
                baseY={feature.y}
                depth={feature.depth}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                sceneShiftX={sceneShiftX}
                sceneShiftY={sceneShiftY}
              />
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
