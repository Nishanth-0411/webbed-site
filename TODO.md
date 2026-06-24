# WEBBED Hero Premium Digital Core - TODO

- [ ] Update `src/components/Hero.tsx` SVG network:
  - [ ] Replace existing line/circle coordinates with a new “digital core” topology:
    - [ ] 1 dominant core node + 5–7 surrounding nodes
    - [ ] Core positioned slightly further right (~78% viewport width) and centered vertically (~50% viewport height) using the existing `viewBox="0 0 1440 900"`.
    - [ ] Add a subtle halo behind the core.
    - [ ] Make connection lines extremely low opacity and thin.
    - [ ] Keep core as primary focal point.
    - [ ] Use subtle blue + crimson accents consistent with current hero ambient glow palette.
- [ ] Update CSS animations in `src/components/Hero.tsx`:
  - [ ] Replace noticeable drift with very subtle breathing/pulse effect.
  - [ ] Add minimal node drift only if needed; otherwise keep pulse only.
  - [ ] Ensure reduced motion disables all pulse/drift.
- [ ] Preserve all existing GSAP ScrollTrigger/pinning, navbar reveal, logo transition, and hero sequencing logic.
- [ ] Verify visually that:
  - [ ] SVG appears only after hero intro reveal step (existing `.to([ambient, finalLight, network]...)` logic unchanged)
  - [ ] Composition stays premium/enterprise-grade and doesn’t compete with hero copy.
