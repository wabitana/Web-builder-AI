import React from 'react';
import AnnouncementBar from '../components/AnnouncementBar';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FluentHub from '../components/FluentHub';
import ProtocolSection from '../components/ProtocolSection';
import LogoCloud from '../components/LogoCloud';
import StatsGrid from '../components/StatsGrid';
import NeuralPulseMatrix from '../components/NeuralPulseMatrix';
import CoreFeatures from '../components/CoreFeatures';
import FeatureShowcase from '../components/FeatureShowcase';
import WorkflowSteps from '../components/WorkflowSteps';
import Testimonials from '../components/Testimonials';
import PricingTable from '../components/PricingTable';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black">
      <AnnouncementBar />
      <Navbar />
      <HeroSection />
      <FluentHub />
      <ProtocolSection />
      <LogoCloud />
      <StatsGrid />
      <NeuralPulseMatrix />
      <CoreFeatures />
      <FeatureShowcase />
      <WorkflowSteps />
      <Testimonials />
      <PricingTable />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
