import React from 'react';
import AnnouncementBar from '../components/AnnouncementBar';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import TechStackMarquee from '../components/TechStackMarquee';
import FluentHub from '../components/FluentHub';
import ProtocolSection from '../components/ProtocolSection';
import Interactive3DShowcase from '../components/Interactive3DShowcase';
import CodePreview from '../components/CodePreview';
import BentoGridFeatures from '../components/BentoGridFeatures';
import ComparisonTable from '../components/ComparisonTable';
import LogoCloud from '../components/LogoCloud';
import StatsGrid from '../components/StatsGrid';
import NeuralPulseMatrix from '../components/NeuralPulseMatrix';
import CoreFeatures from '../components/CoreFeatures';
import FeatureShowcase from '../components/FeatureShowcase';
import WorkflowSteps from '../components/WorkflowSteps';
import DynamicCTA from '../components/DynamicCTA';
import Testimonials from '../components/Testimonials';
import PricingTable from '../components/PricingTable';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import ChatbotWidget from '../components/ChatbotWidget';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-white font-sans selection:bg-slate-900 selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300">
      <AnnouncementBar />
      <Navbar />
      <HeroSection />
      <TechStackMarquee />
      <FluentHub />
      <ProtocolSection />
      <Interactive3DShowcase />
      <BentoGridFeatures />
      <CodePreview />
      <ComparisonTable />
      <LogoCloud />
      <StatsGrid />
      <NeuralPulseMatrix />
      <CoreFeatures />
      <FeatureShowcase />
      <WorkflowSteps />
      <DynamicCTA />
      <Testimonials />
      <PricingTable />
      <FAQSection />
      <CTASection />
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
