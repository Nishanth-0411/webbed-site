import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutTimelineSection from "@/components/about/AboutTimelineSection";
import ServicesShowcase from "@/components/ServicesShowcase";
import CinematicFooter from "@/components/CinematicFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HOME | WEBBED",
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutTimelineSection />

      <ServicesShowcase />
      <CinematicFooter />
    </div>
  );
}
