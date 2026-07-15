import React, { Suspense, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Hero3DScene from './Hero3DScene';

const ROTATING_TEXTS = [
  "At Speed of Thought",
  "With Zero Effort",
  "In Under 60 Seconds",
  "Without Writing Code",
  "Like Never Before",
  "Powered by AI Magic",
];

export default function HeroSection() {
  const navigate = useNavigate();
  const { user, loginWithGoogle } = useAuth();
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % ROTATING_TEXTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCTA = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      loginWithGoogle();
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '90vh', overflow: 'hidden', background: '#050505' }}>
      
      {/* 3D Neural Nodes Background — z-index 1 */}
      <Suspense fallback={null}>
        <Hero3DScene />
      </Suspense>

      {/* Gradient overlay for text readability — z-index 2 */}
      <div 
        style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}
        className="bg-gradient-to-b from-[#050505]/30 via-transparent to-[#050505]/80"
      />
      
      {/* Content — z-index 3 */}
      <div style={{ position: 'relative', zIndex: 3 }} className="flex items-center justify-center min-h-[90vh] pt-24 pb-12 px-6">
        <div className="text-center max-w-5xl mx-auto flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-blue-400 mb-10 backdrop-blur-md shadow-lg shadow-blue-900/20"
          >
            <Sparkles className="w-4 h-4" />
            <span className="tracking-wide uppercase text-xs font-bold">Wabiai Agent 2.0 is now live</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-[5.5rem] font-black tracking-tight leading-[1.05] mb-8 text-white drop-shadow-2xl"
          >
            Generate Software
            <br />
            <span className="inline-block h-[1.15em] overflow-hidden align-bottom">
              <AnimatePresence mode="wait">
                <motion.span
                  key={textIndex}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400"
                >
                  {ROTATING_TEXTS[textIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-400 mb-12 max-w-3xl font-light leading-relaxed drop-shadow-md"
          >
            Describe your vision, and our LangGraph-powered AI agent will design, code, and deploy your production-ready web application in seconds.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
          >
            <button 
              onClick={handleCTA}
              className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-full text-lg font-black tracking-wide flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] group"
            >
              Start Building Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="w-full sm:w-auto px-10 py-5 rounded-full text-lg font-bold tracking-wide text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm">
              View Gallery
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
