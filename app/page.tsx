import HeroSection from "./_components/HeroSection";
import AboutSection from "./_components/AboutSection";
import ServicesGrid from "./_components/ServicesGrid";
import Projects from "./_components/Projects";
import ContactSection from "./_components/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <Projects />
      <AboutSection />
      <ContactSection />
    </>
  );
}
