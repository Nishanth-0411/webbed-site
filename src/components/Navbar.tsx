"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";


type NavItem = { label: string; href: string };

export default function Navbar() {
  const pathname = usePathname();
  const startsInsideHeroIntro = pathname === "/";
  const navItems = useMemo<NavItem[]>(
    () => [
      { label: "About", href: "/about" },
      { label: "Product", href: "/labs" },
      { label: "Solutions", href: "/solutions" },
      { label: "Education", href: "/schools" },
    ],
    [],
  );

  const contactHref = "/contact";

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);

  const isLinkActive = (href: string) => {
    if (href === "/#hero") {
      return pathname === "/";
    }
    return pathname === href;
  };

  const activeIndex = useMemo(() => {
    if (pathname === "/") return 0;
    if (pathname === "/about") return 1;
    if (pathname === "/labs") return 2;
    if (pathname === "/solutions") return 3;
    if (pathname === "/schools") return 4;
    return -1;
  }, [pathname]);

  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    function updateIndicator() {
      const activeEl = navRefs.current[activeIndex];
      if (activeIndex !== -1 && activeIndex !== 0 && activeEl) {
        const w = activeEl.offsetWidth * 0.5;
        const l = activeEl.offsetLeft + (activeEl.offsetWidth - w) / 2;
        setIndicatorStyle({
          left: l,
          width: w,
          opacity: 1,
        });
      } else {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    }

    updateIndicator();
    const timer = setTimeout(updateIndicator, 100);

    window.addEventListener("resize", updateIndicator);
    return () => {
      window.removeEventListener("resize", updateIndicator);
      clearTimeout(timer);
    };
  }, [activeIndex]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const [isIntroUnlocked, setIsIntroUnlocked] = useState(!startsInsideHeroIntro);
  const [isVisible, setIsVisible] = useState(!startsInsideHeroIntro);
  const lastScrollYRef = useRef<number>(0);

  useEffect(() => {
    if (!startsInsideHeroIntro) {
      setIsIntroUnlocked(true);
      setIsVisible(true);
      return;
    }

    function onHeroNav(event: Event) {
      const visible = Boolean((event as CustomEvent<{ visible: boolean }>).detail?.visible);
      setIsIntroUnlocked(visible);
      setIsVisible(visible);
    }

    window.addEventListener("webbed:hero-nav", onHeroNav);
    return () => window.removeEventListener("webbed:hero-nav", onHeroNav);
  }, [startsInsideHeroIntro]);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    setIsScrolled(window.scrollY > 20);
    const threshold = 20;

    function onScroll() {
      setIsScrolled(window.scrollY > 20);

      if (startsInsideHeroIntro && !isIntroUnlocked) {
        setIsVisible(false);
        lastScrollYRef.current = window.scrollY;
        return;
      }

      const currentScrollY = window.scrollY;
      const hero = document.getElementById("hero");
      const heroProgress = hero ? Number(hero.dataset.heroProgress ?? 0) : 1;

      if (startsInsideHeroIntro && hero && heroProgress < 0.995) {
        setIsVisible(isIntroUnlocked);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      const heroScrollEnd = hero ? hero.offsetHeight - window.innerHeight + 40 : threshold;

      if (currentScrollY < threshold || currentScrollY <= heroScrollEnd) {
        setIsVisible(true);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollYRef.current) {
        // scrolling down
        setIsVisible(false);
      } else if (currentScrollY < lastScrollYRef.current) {
        // scrolling up
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isIntroUnlocked, startsInsideHeroIntro]);
  return (
    <header
      className={[
        "fixed left-0 right-0 top-0 z-60 transition-transform duration-300 will-change-transform",
        "transition-opacity",
        "filter drop-shadow-[0_-3px_10px_rgba(255,255,255,0.35)] drop-shadow-[0_4px_18px_rgba(255,255,255,0.20)]",
        isVisible && isIntroUnlocked ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none",
      ].join(" ")}
    >
      <nav className="mx-auto max-w-7xl px-3 md:px-6">
        <div 
          className="hidden md:flex items-center justify-between w-full rounded-full px-4 py-1 transition-all duration-300 ease-in-out"
          style={{
            background: isScrolled
              ? "linear-gradient(rgba(10, 10, 10, 0.82), rgba(10, 10, 10, 0.82)) padding-box, linear-gradient(135deg, rgba(90, 128, 230, 0.18) 0%, rgba(220, 70, 120, 0.18) 100%) border-box"
              : "linear-gradient(rgba(8, 8, 8, 0.68), rgba(8, 8, 8, 0.68)) padding-box, linear-gradient(135deg, rgba(90, 128, 230, 0.12) 0%, rgba(220, 70, 120, 0.12) 100%) border-box",
            border: "1px solid transparent",
            boxShadow: isScrolled
              ? "0 8px 30px rgba(0, 0, 0, 0.55), 0 0 16px rgba(90, 128, 230, 0.04), 0 0 16px rgba(220, 70, 120, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.08)"
              : "0 6px 20px rgba(0, 0, 0, 0.4), 0 0 12px rgba(90, 128, 230, 0.03), 0 0 12px rgba(220, 70, 120, 0.03), inset 0 1px 1px rgba(255, 255, 255, 0.06)",
            backdropFilter: isScrolled ? "blur(14px)" : "blur(10px)",
            WebkitBackdropFilter: isScrolled ? "blur(14px)" : "blur(10px)",
          }}
        >
          <div className="flex items-center mr-1 py-0.5">
            <Link
              href="/#hero"
              className="flex items-center rounded-full px-1 transition-transform duration-300 hover:scale-105"
              aria-label="WEBBED home"
              onClick={() => setIsOpen(false)}
            >
              <img
                src="/logo.png"
                alt="WEBBED Logo"
                className="h-[25px] w-auto object-contain filter drop-shadow-[0_0_6px_rgba(255,255,255,0.12)]"
              />
            </Link>
            <span className="h-3.5 w-px bg-white/10 mx-3 self-center" />
          </div>

          <div className="relative flex items-center gap-7 drop-shadow-[0_4px_18px_rgba(0,0,0,0.6)] py-0.5">
            {/* Sliding Underline Indicator */}
            <span 
              className="absolute bottom-0 h-[1.5px] bg-gradient-to-r from-[#5a80e6] to-[#dc4678] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                opacity: indicatorStyle.opacity,
              }}
            />

            <Link
              ref={(node) => {
                navRefs.current[0] = node;
              }}
              href="/#hero"
              className={[
                "type-nav-link group relative text-[0.92rem] py-1 transition-all duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                isLinkActive("/#hero")
                  ? "text-white font-medium"
                  : "text-white/65 hover:text-white"
              ].join(" ")}
              onClick={() => setIsOpen(false)}
            >
              <span className="relative z-10">Home</span>
              <span className="absolute bottom-0 left-1/2 h-[1.5px] w-0 -translate-x-1/2 bg-white/30 transition-all duration-[250ms] ease-out group-hover:w-full" />
            </Link>
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                ref={(node) => {
                  navRefs.current[index + 1] = node;
                }}
                href={item.href}
                className={[
                  "type-nav-link group relative text-[0.92rem] py-1 transition-all duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isLinkActive(item.href)
                    ? "text-white font-medium"
                    : "text-white/65 hover:text-white"
                ].join(" ")}
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute bottom-0 left-1/2 h-[1.5px] w-0 -translate-x-1/2 bg-white/30 transition-all duration-[250ms] ease-out group-hover:w-full" />
              </Link>
            ))}

            <Link href={contactHref} aria-label="Contact">
              <button
                className="inline-flex items-center justify-center rounded-full transition-all duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                type="button"
                onMouseEnter={() => setIsContactHovered(true)}
                onMouseLeave={() => setIsContactHovered(false)}
                style={{
                  background: isContactHovered 
                    ? "linear-gradient(rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12)) padding-box, linear-gradient(135deg, rgba(90, 128, 230, 0.45) 0%, rgba(220, 70, 120, 0.45) 100%) border-box"
                    : "linear-gradient(rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.01)) padding-box, linear-gradient(135deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.05) 100%) border-box",
                  border: "1px solid transparent",
                  boxShadow: isContactHovered 
                    ? "0 6px 20px rgba(0, 0, 0, 0.4), 0 0 12px rgba(90, 128, 230, 0.18), 0 0 12px rgba(220, 70, 120, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.12)"
                    : "inset 0 1px 0 rgba(255, 255, 255, 0.03)",
                  transform: isContactHovered ? "translateY(-1.5px)" : "translateY(0)",
                  paddingTop: "0.35rem",
                  paddingBottom: "0.35rem",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                  color: isContactHovered ? "#ffffff" : "rgba(255, 255, 255, 0.65)",
                }}
              >
                <span>Contact</span>
              </button>
            </Link>
          </div>
        </div>

        {/* ── MOBILE BAR: ultra-compact header pill ── */}
        <div
          className="mt-3 flex min-h-[52px] w-full items-center justify-between rounded-[22px] px-3 pr-2.5 transition-all duration-300 ease-in-out md:hidden"
          style={{
            background: isScrolled
              ? "linear-gradient(rgba(10, 10, 10, 0.84), rgba(10, 10, 10, 0.84)) padding-box, linear-gradient(135deg, rgba(90, 128, 230, 0.18) 0%, rgba(220, 70, 120, 0.18) 100%) border-box"
              : "linear-gradient(rgba(8, 8, 8, 0.74), rgba(8, 8, 8, 0.74)) padding-box, linear-gradient(135deg, rgba(90, 128, 230, 0.12) 0%, rgba(220, 70, 120, 0.12) 100%) border-box",
            border: "1px solid transparent",
            boxShadow: isScrolled
              ? "0 10px 28px rgba(0, 0, 0, 0.52), 0 0 18px rgba(90, 128, 230, 0.04), 0 0 18px rgba(220, 70, 120, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.08)"
              : "0 8px 22px rgba(0, 0, 0, 0.42), 0 0 14px rgba(90, 128, 230, 0.03), 0 0 14px rgba(220, 70, 120, 0.03), inset 0 1px 1px rgba(255, 255, 255, 0.06)",
            backdropFilter: isScrolled ? "blur(16px)" : "blur(12px)",
            WebkitBackdropFilter: isScrolled ? "blur(16px)" : "blur(12px)",
          }}
        >
          <Link
            href="/#hero"
            className="flex h-9 items-center rounded-full px-1.5 transition-transform duration-300 hover:scale-[1.03]"
            aria-label="WEBBED home"
            onClick={() => setIsOpen(false)}
          >
            <img
              src="/logo.png"
              alt="WEBBED Logo"
              className="h-[17px] w-auto object-contain filter drop-shadow-[0_0_6px_rgba(255,255,255,0.12)]"
            />
          </Link>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
          >
            <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
            <div className="relative h-3 w-[18px]">
              <span
                className={[
                  "absolute left-0 top-0 h-[1.5px] w-[18px] rounded-full bg-current transition-all duration-300 ease-out",
                  isOpen ? "top-[5px] rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 top-[5px] h-[1.5px] w-[18px] rounded-full bg-current transition-all duration-300 ease-out",
                  isOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 top-[10px] h-[1.5px] w-[18px] rounded-full bg-current transition-all duration-300 ease-out",
                  isOpen ? "top-[5px] -rotate-45" : "",
                ].join(" ")}
              />
            </div>
          </button>
        </div>

        {/* ── BACKDROP OVERLAY (mobile only) ── */}
        <div
          className={[
            "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-all duration-300 md:hidden",
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
          ].join(" ")}
          style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />

        {/* ── PREMIUM SLIDE-DOWN PANEL (mobile only) ── */}
        <div
          className={[
            "fixed left-3 right-3 top-[4.75rem] z-50 origin-top transition-all duration-300 md:hidden",
            isOpen ? "translate-y-0 scale-100 opacity-100 pointer-events-auto" : "-translate-y-3 scale-[0.98] opacity-0 pointer-events-none",
          ].join(" ")}
          style={{
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            background: "linear-gradient(180deg, rgba(8,8,12,0.96) 0%, rgba(10,10,18,0.94) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.58), inset 0 1px 0 rgba(255,255,255,0.05)",
            backdropFilter: "blur(28px) saturate(1.18)",
            WebkitBackdropFilter: "blur(28px) saturate(1.18)",
          }}
          role="dialog"
          aria-modal={isOpen}
          aria-label="Navigation menu"
        >
          <div className="absolute left-5 right-5 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

          <nav className="flex max-h-[calc(100vh-6rem)] flex-col gap-2 overflow-y-auto p-3">
            <Link
              href="/#hero"
              onClick={() => setIsOpen(false)}
              className="group relative flex min-h-[48px] items-center justify-between rounded-2xl px-4 py-3 text-white/72 transition-all duration-200 hover:bg-white/[0.06] hover:text-white"
              style={{
                transitionDelay: isOpen ? '40ms' : '0ms',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(-8px)',
                transition: `opacity 0.28s ease ${isOpen ? '0.06s' : '0s'}, transform 0.28s ease ${isOpen ? '0.06s' : '0s'}, color 0.2s ease, background-color 0.2s ease`,
                background: isLinkActive("/#hero") ? "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)" : undefined,
              }}
            >
              <span className="text-[14px] font-medium tracking-[0.02em]">Home</span>
              {isLinkActive("/#hero") && (
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#5a80e6] to-[#dc4678] shadow-[0_0_6px_rgba(90,128,230,0.6)]" />
              )}
            </Link>

            {navItems.map((item, index) => {
              const isActive = isLinkActive(item.href);
              const delay = 0.1 + index * 0.04;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="group relative flex min-h-[48px] items-center justify-between rounded-2xl px-4 py-3 text-white/72 transition-all duration-200 hover:bg-white/[0.06] hover:text-white"
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateY(0)' : 'translateY(-8px)',
                    transition: `opacity 0.28s ease ${isOpen ? `${delay}s` : '0s'}, transform 0.28s ease ${isOpen ? `${delay}s` : '0s'}, color 0.2s ease, background-color 0.2s ease`,
                    background: isActive ? "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)" : undefined,
                  }}
                >
                  <span className="text-[14px] font-medium tracking-[0.02em]">{item.label}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#5a80e6] to-[#dc4678] shadow-[0_0_6px_rgba(90,128,230,0.6)]" />
                  )}
                </Link>
              );
            })}

            <div className="my-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <Link
              href={contactHref}
              onClick={() => setIsOpen(false)}
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(-8px)',
                transition: `opacity 0.28s ease ${isOpen ? '0.26s' : '0s'}, transform 0.28s ease ${isOpen ? '0.26s' : '0s'}`,
              }}
            >
              <button
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl px-4 py-3 text-[13px] font-semibold transition-all duration-200"
                type="button"
                style={{
                  background: "linear-gradient(135deg, rgba(90,128,230,0.22) 0%, rgba(220,70,120,0.18) 100%)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.9)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                Contact
              </button>
            </Link>
          </nav>

          <div className="absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        </div>
      </nav>
    </header>
  );
}
