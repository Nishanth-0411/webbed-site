"use client";

import Navbar from "@/components/Navbar";
import CinematicFooter from "@/components/CinematicFooter";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import AboutStorytelling from "@/components/about/AboutStorytelling";
import AboutGapSection from "@/components/about/AboutGapSection";
import AboutManifestoSection from "@/components/about/AboutManifestoSection";
import ServicesShowcase from "@/components/ServicesShowcase";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="relative">
        {/* Cinematic Hero Section */}
        <AboutHeroSection />

        {/* Premium Storytelling Section */}
        <AboutStorytelling />

        {/* Move “THREE DIVISIONS. ONE VISION.” right below “Everything is connected.” */}
        <ServicesShowcase />

        {/* Other sections */}
        <AboutGapSection />
        <AboutManifestoSection />

      </main>

      <CinematicFooter />
    </div>
  );
}
