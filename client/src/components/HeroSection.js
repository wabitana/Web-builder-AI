import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const navigate = useNavigate();
  const { user, loginWithGoogle } = useAuth();

  const handleCTA = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      loginWithGoogle();
    }
  };

  return (
    <div className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-blue-400 mb-8 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4" />
          <span>Wabiai Agent 2.0 is now live</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8"
        >
          Generate Apps
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-glow">
            At Speed of Thought
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl"
        >
          Describe your vision, and our LangGraph-powered AI agent will design, code, and deploy your production-ready web application in seconds.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button 
            onClick={handleCTA}
            className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-full text-lg font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all active:scale-95 group"
          >
            Start Building Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 rounded-full text-lg font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            View Gallery
          </button>
        </motion.div>
      </div>
    </div>
  );
}
