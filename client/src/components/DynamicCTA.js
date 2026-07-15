import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function DynamicCTA() {
  const navigate = useNavigate();
  const { user, loginWithGoogle } = useAuth();

  const handleAction = () => {
    if (user) navigate('/dashboard');
    else loginWithGoogle();
  };

  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative overflow-hidden">
      <div className="relative rounded-[2rem] overflow-hidden bg-[#0A0A0A] border border-white/10 p-10 md:p-24 text-center isolate shadow-2xl shadow-blue-900/20">
        
        {/* Animated Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-indigo-600/20 blur-[100px] -z-10 rounded-full animate-pulse pointer-events-none" />
        
        {/* Floating elements */}
        <motion.div 
          animate={{ y: [-15, 15, -15], rotate: [0, 10, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-12 left-12 text-blue-500/40 hidden md:block"
        >
          <Sparkles className="w-16 h-16" />
        </motion.div>
        <motion.div 
          animate={{ y: [15, -15, 15], rotate: [0, -10, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 right-12 text-purple-500/40 hidden md:block"
        >
          <Zap className="w-16 h-16" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tight leading-[1.1]">
            Stop coding. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Start building.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join the elite developers who ship production-ready web apps in 60 seconds. Why spend weeks configuring everything when WabiAI does it instantly?
          </p>

          <button 
            onClick={handleAction}
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black rounded-full font-black text-lg md:text-xl hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] overflow-hidden"
          >
            {/* Button Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <span className="relative z-10">Generate Your App Now</span>
            <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
          
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500 font-bold tracking-wide uppercase">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            No credit card required
          </div>
        </motion.div>
      </div>
    </section>
  );
}
