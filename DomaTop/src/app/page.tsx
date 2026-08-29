import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeSection from "@/components/MarqueeSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import VisitBanner from "@/components/VisitBanner";
import ParticleCanvas from "@/components/ParticleCanvas";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <div className="noise-overlay" />
      <ParticleCanvas />
      <CustomCursor />
      <ScrollProgress />
      <SmoothScroll>
        <Navbar />
        <main>
          <HeroSection />
          <MarqueeSection />
          <AboutSection />
          <StatsSection />
          <ProjectsSection />
          <ServicesSection />
          <ProcessSection />
          <TestimonialsSection />
          <VisitBanner />
          <ContactSection />
        </main>
        <Footer />
      </SmoothScroll>
      <FloatingCTA />
    </>
  );
}
