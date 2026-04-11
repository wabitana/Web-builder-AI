import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Zap, Code, Layout, Smartphone, Globe, Shield, 
  Cpu, ArrowRight, CheckCircle2, Play, MousePointer2,
  Layers, MessageSquare, Rocket, Terminal, Menu, X, 
  Sparkles, Paperclip, Mic, Monitor, Users, 
  BarChart3, ShieldCheck, Palette, Infinity, 
  PenTool, Send // Swapped Figma for PenTool, Megaphone for Send
} from 'lucide-react';
export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const words = ["build themselves.", "evolve with users.", "deploy instantly.", "scale infinitely."];

  // Cycling text logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    // Removed overflow-x-hidden from here as it kills sticky positioning
<div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black">
      
      {/* 1. ANNOUNCEMENT BAR */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-2 text-center text-xs font-bold uppercase tracking-widest relative z-[60]">
        🚀 Wabiai v2.0 is now live — Experience the future of web design
      </div>

      {/* 2. NAVIGATION */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-white/10 bg-black/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Zap className="text-black w-5 h-5 fill-current" />
            </div>
            <span className="text-xl font-bold tracking-tighter">WABIAI</span>
          </div>
          
          <div className="hidden md:flex gap-10 text-sm font-medium text-gray-400">
            {['Features', 'Showcase', 'Workflow', 'Pricing'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-sm font-medium hover:text-gray-300">Log in</button>
            <button className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-all active:scale-95">
              Get Started
            </button>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* 3. HERO SECTION (UPDATED WITH ANIMATIONS) */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 -z-10">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600 blur-[120px] rounded-full" 
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 12, repeat: Infinity, delay: 1 }}
            className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600 blur-[120px] rounded-full" 
          />
        </div>
        
        <div className="max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium text-gray-300">AI Engine: Wabiai-5 Optimized</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8">
            Websites that <br />
            <span className="relative inline-block mt-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={textIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-purple-400"
                >
                  {words[textIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Stop coding from scratch. Describe your vision in plain English and let <span className="text-white">Wabiai</span> orchestrate the code, design, and deployment in seconds.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <button className="group bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20">
              Start Building Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl text-lg font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-all backdrop-blur-sm">
              <Play className="w-5 h-5 fill-current" /> Watch Demo
            </button>
          </div>
        </div>

        {/* 4. INTERACTIVE PROMPT MOCKUP */}
       {/* 4. MULTIMODAL COMMAND CENTER (UPDATED) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="mt-20 max-w-4xl mx-auto relative group px-4"
        >
          {/* Dynamic Peripheral Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-500 to-cyan-400 rounded-[32px] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
          
          <div className="relative bg-[#0A0A0A]/90 backdrop-blur-2xl border border-white/10 rounded-[32px] p-2 shadow-3xl">
            <div className="bg-[#111] rounded-[26px] overflow-hidden">
              
              {/* Primary Input Area */}
              <div className="p-6 pb-2">
                <div className="flex gap-4">
                  <div className="mt-1">
                    <Sparkles className="w-6 h-6 text-blue-400 animate-pulse" />
                  </div>
                  <textarea 
                    className="bg-transparent outline-none text-white w-full text-lg md:text-xl placeholder:text-gray-600 resize-none min-h-[80px]"
                    placeholder="Describe your vision, upload a sketch, or record a brief..."
                  />
                </div>
              </div>

              {/* Multimodal Action Bar */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-3 bg-black/40 border-t border-white/5">
                <div className="flex items-center gap-1 w-full md:w-auto">
                  {/* File Upload Trigger */}
                  <button className="flex-1 md:flex-none flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all group/btn">
                    <Paperclip className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-wider">File</span>
                  </button>

                  {/* Audio/Voice Trigger */}
                  <button className="flex-1 md:flex-none flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-red-400 transition-all group/btn">
                    <Mic className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-wider">Voice</span>
                  </button>

                  {/* Visual Reference Trigger */}
                  <button className="flex-1 md:flex-none flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-purple-400 transition-all group/btn">
                    <Monitor className="w-5 h-5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-wider">Reference</span>
                  </button>
                </div>

                {/* Main Action Button */}
                <button className="w-full md:w-auto group/gen relative overflow-hidden bg-white text-black pl-8 pr-6 py-4 rounded-2xl font-black transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent opacity-0 group-hover/gen:opacity-100 transition-opacity" />
                  <span className="relative z-10 text-sm uppercase tracking-tighter">Orchestrate Engine</span>
                  <div className="relative z-10 p-1.5 bg-black rounded-lg group-hover/gen:rotate-12 transition-transform">
                    <Zap className="w-4 h-4 fill-white text-white" />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Start Suggestions */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {['Minimal SaaS Dashboard', 'Glassmorphic Crypto App', 'AI Portfolio v2'].map((tag) => (
              <button key={tag} className="px-4 py-2 rounded-full border border-white/5 bg-white/5 text-[10px] font-bold text-gray-500 hover:text-white hover:border-white/20 transition-all uppercase tracking-widest">
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </section>







{/* 5. MICROSOFT-INSPIRED FLUENT HUB (FULL CODE WITH BORDER RADIUS) */}
<section className="relative py-24 bg-slate-50/50 overflow-hidden px-4 md:px-10">
  
  {/* THE MAIN FLOATING CONTAINER */}
  <div className="max-w-[1440px] mx-auto bg-white rounded-[48px] border border-slate-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden relative py-20 md:py-32">
    
    {/* INTERNAL FLUENT MESH BACKGROUND */}
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div 
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] left-[10%] w-[800px] h-[800px] bg-blue-100 blur-[160px] rounded-full"
      />
      <motion.div 
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-[10%] right-[10%] w-[600px] h-[600px] bg-purple-100 blur-[160px] rounded-full"
      />
    </div>

    <div className="max-w-7xl mx-auto px-6">
      {/* HEADER AREA */}
      <div className="text-center mb-24 max-w-2xl mx-auto">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-blue-600 font-black text-xs tracking-[0.3em] uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100"
        >
          Fluent Design System
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-5xl md:text-7xl font-black text-slate-950 tracking-tighter mt-6 leading-[0.9]"
        >
          Enterprise Power. <br /> <span className="font-extralight text-slate-800">Designer Speed.</span>
        </motion.h2>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* CARD 1: LARGE "LIVE BUILD" DEMO (Interactive AI Canvas) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-8 h-[450px] bg-white border border-slate-100 rounded-[40px] p-8 shadow-sm hover:shadow-2xl hover:border-slate-200 transition-all duration-500 overflow-hidden group"
        >
          <div className="flex justify-between items-start mb-10">
             <div>
                <h3 className="text-2xl font-black text-slate-950 tracking-tight">AI Co-Orchestration</h3>
                <p className="text-slate-500 text-sm mt-1 max-w-sm leading-relaxed">Describe your vision and watch the engine construct sections in real-time.</p>
             </div>
             <Zap className="w-10 h-10 text-blue-100 fill-blue-100" />
          </div>

          {/* LIVE GENERATION CANVAS */}
          <div className="relative bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl h-60 p-6 flex flex-col gap-4">
             <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-inner">
                <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                <div className="text-slate-400 text-xs font-medium">Create a clean hero section for a crypto trading app...</div>
             </div>
             
             {/* FLOATING PREVIEWS */}
             <div className="grid grid-cols-4 gap-3 flex-1">
                {[
                  { icon: <Layout/>, label: "Hero" },
                  { icon: <BarChart3/>, label: "Trends" },
                  { icon: <MessageSquare/>, label: "Feed" },
                  { icon: <CheckCircle2/>, label: "Success" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    animate={{ 
                      y: [0, -10, 0],
                      opacity: [0, 1, 0] 
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.8 }}
                    className="bg-white rounded-xl p-3 flex flex-col items-center justify-center gap-2 border border-slate-100 shadow-sm"
                  >
                     <div className="text-blue-600 scale-75">{item.icon}</div>
                     <span className="text-[10px] font-bold text-slate-500 uppercase">{item.label}</span>
                  </motion.div>
                ))}
             </div>

             {/* ANIMATED MOUSE CURSOR */}
             <motion.div 
                animate={{ 
                  x: [0, 240, 80, 0], 
                  y: [0, 80, -20, 0] 
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/4 pointer-events-none z-20"
             >
                <MousePointer2 className="w-6 h-6 text-blue-600 fill-blue-600 drop-shadow-[0_2px_4px_rgba(37,99,235,0.4)]" />
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-4 h-4 bg-blue-400/30 rounded-full absolute -top-1 -left-1"
                />
             </motion.div>
          </div>
        </motion.div>

        {/* SIDE GRID SECTION */}
        <div className="lg:col-span-4 grid grid-rows-2 gap-6">
          
          {/* CARD 2: ANALYTICS HUB */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-slate-50 border border-slate-100 rounded-[36px] p-8 group overflow-hidden"
          >
            <div className="flex justify-between items-start mb-6">
               <div>
                  <h3 className="text-xl font-bold text-slate-900">Velocity Insights</h3>
                  <p className="text-slate-500 text-[10px] mt-1 uppercase tracking-widest font-black">Performance v2.1</p>
               </div>
               <div className="p-2 bg-blue-50 rounded-xl group-hover:rotate-12 transition-transform">
                <BarChart3 className="w-5 h-5 text-blue-600" />
               </div>
            </div>
            
            {/* Visual Chart Animation */}
            <div className="flex items-end gap-1.5 h-16 mt-6">
                {[60, 90, 45, 100, 65, 80, 55, 95].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ delay: i * 0.1, duration: 1, type: "spring" }}
                    className="flex-1 bg-blue-100 rounded-t-md group-hover:bg-blue-600 transition-colors"
                  />
                ))}
            </div>
          </motion.div>

          {/* CARD 3: INTEGRATIONS (Dark Contrast) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-slate-900 rounded-[36px] p-8 relative overflow-hidden group shadow-2xl shadow-blue-500/10"
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Universal Export</h3>
                    <p className="text-blue-300 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Connect Stack</p>
                </div>
                <Code className="w-6 h-6 text-white/40 group-hover:text-white transition-colors" />
              </div>
              
              <div className="flex gap-4 mt-6">
                 {['React', 'Next.js', 'Vercel'].map(logo => (
                   <span key={logo} className="text-[10px] font-black italic tracking-tighter text-white/30 group-hover:text-white/60 transition-colors uppercase">{logo}</span>
                 ))}
              </div>
            </div>
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity blur-[80px]" />
          </motion.div>
        </div>
      </div>
    </div>
  </div>
</section>


{/* 6. STACKING WORKFLOW CARDS SECTION */}
<section className="relative py-32 px-4">
  <div className="max-w-7xl mx-auto text-center mb-32">
    <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.8]">
      The <br/> <span className="text-blue-600">Protocol</span>
    </h2>
  </div>

<div className="max-w-4xl mx-auto px-4 pb-[30vh]">
  {[
    { step: '01', title: 'Ingestion', desc: 'Analyzing benchmarks and design intent.', icon: <PenTool size={48}/>, color: 'bg-[#FF1493]' }, // Deep Pink
    { step: '02', title: 'Blueprint', desc: 'Optimizing spacing and neural wireframes.', icon: <Layers size={48}/>, color: 'bg-[#32CD32]' }, // Lime Green
    { step: '03', title: 'Styling', desc: 'Applying brand DNA and fluid systems.', icon: <Palette size={48}/>, color: 'bg-[#7000FF]' }, // Electric Purple
    { step: '04', title: 'Code', desc: 'Generating production-ready React components.', icon: <Code size={48}/>, color: 'bg-[#00D4FF]' }, // Vivid Cyan
    { step: '05', title: 'Deploy', desc: 'Global CDN push in under a second.', icon: <Send size={48}/>, color: 'bg-[#FF4500]' }, // Orange Red
  ].map((card, i) => (
    <StackingCard key={i} card={card} index={i} />
  ))}
</div>

  {/* This spacer provides the 'scroll room' for the stacking to be visible */}
  <div className="h-[40vh]" />
</section>

















      {/* 5. LOGO CLOUD */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02]">
        <p className="text-center text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-8">Powering the next generation of startups</p>
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-12 opacity-30 grayscale brightness-200">
          {['Stripe', 'Vercel', 'Linear', 'Airbnb', 'OpenAI'].map(logo => (
            <span key={logo} className="text-2xl font-bold italic tracking-tighter">{logo}</span>
          ))}
        </div>
      </section>

      {/* 6. STATS GRID */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Sites Created', val: '2.5M+' },
            { label: 'Generation Speed', val: '0.4s' },
            { label: 'Uptime', val: '99.9%' },
            { label: 'Dev Hours Saved', val: '12M+' },
          ].map((stat, i) => (
            <motion.div 
              whileHover={{ y: -5 }}
              key={i} 
              className="text-center p-6 rounded-3xl border border-white/5 bg-white/[0.01]"
            >
              <h4 className="text-4xl font-black mb-1 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">{stat.val}</h4>
              <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>


{/* 4.5 NEURAL PULSE MATRIX */}
      <section className="relative py-32 overflow-hidden border-y border-white/5">
        {/* THE LIQUID COMBO BACKGROUND */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[#050505]" />
          <motion.div 
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 45, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] bg-blue-600/20 blur-[150px] rounded-full mix-blend-screen"
          />
          <motion.div 
            animate={{
              scale: [1.5, 1, 1.5],
              rotate: [0, -45, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute -bottom-[20%] -right-[10%] w-[80%] h-[80%] bg-purple-600/20 blur-[150px] rounded-full mix-blend-screen"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
            >
              Neural Sync Active
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-6 italic">
              Real-time <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-purple-400">
                Cognition.
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* LARGE VISUALIZER CARD */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="lg:col-span-8 h-[400px] relative bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[40px] p-8 overflow-hidden group"
            >
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h3 className="text-2xl font-bold">Inference Engine</h3>
                  <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">v4.0 Liquid Architecture</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(4)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ height: [10, 30, 10] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1.5 bg-blue-500 rounded-full"
                    />
                  ))}
                </div>
              </div>

              {/* THE WAVEFORM COMPONENT */}
              <div className="absolute bottom-0 left-0 right-0 h-48 flex items-end justify-center gap-1 px-8 pb-12">
                {[...Array(40)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      height: [
                        Math.random() * 40 + 20, 
                        Math.random() * 120 + 40, 
                        Math.random() * 40 + 20
                      ] 
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
                    className="flex-1 bg-gradient-to-t from-blue-600/40 via-purple-500/20 to-transparent rounded-t-full"
                  />
                ))}
              </div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <Zap className="w-12 h-12 text-white fill-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
              </div>
            </motion.div>

            {/* SIDE BENTO CARDS */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex-1 bg-gradient-to-br from-blue-600 to-purple-700 rounded-[40px] p-8 relative overflow-hidden group shadow-2xl shadow-blue-500/20"
              >
                <div className="relative z-10">
                  <Monitor className="w-10 h-10 text-white mb-6" />
                  <h3 className="text-xl font-black leading-tight uppercase tracking-tighter">Instant <br/>Preview</h3>
                  <p className="text-blue-100/60 text-xs mt-2 font-bold uppercase tracking-widest">Latent Zero 0.1ms</p>
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex-1 bg-[#0A0A0A] border border-white/10 rounded-[40px] p-8 relative overflow-hidden"
              >
                <div className="flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                    <Mic className="w-8 h-8 text-purple-500" />
                    <span className="text-[10px] font-black text-purple-500 uppercase py-1 px-3 bg-purple-500/10 rounded-full border border-purple-500/20">Listening</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Voice-to-JSON</h3>
                    <p className="text-gray-500 text-xs mt-1">Direct structure mapping from spoken intent.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>











      

      {/* 7. CORE FEATURES (BENTO GRID) */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4">Intelligence in every pixel</h2>
          <p className="text-gray-400 text-lg">Everything you need to go from idea to IPO.</p>
        </div>
        
        <div className="grid md:grid-cols-6 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          <div className="md:col-span-3 md:row-span-2 bg-[#0A0A0A] border border-white/10 rounded-3xl p-10 hover:border-blue-500/50 transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl -z-10" />
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Neural Design Engine</h3>
            <p className="text-gray-400 leading-relaxed">Our proprietary AI doesn't just copy templates. It understands hierarchy, spacing, and accessibility to build unique layouts every time.</p>
            <div className="mt-8 bg-black/50 rounded-xl p-4 border border-white/5 font-mono text-xs text-blue-400">
              <span className="opacity-50">01</span> {`// AI optimizing layout...`} <br/>
              <span className="opacity-50">02</span> {`const UI = NeuralEngine.predict({ `}<br/>
              <span className="opacity-50">03</span> {`  context: "fintech",`}<br/>
              <span className="opacity-50">04</span> {`  vibe: "brutalist"`}<br/>
              <span className="opacity-50">05</span> {`});`}
            </div>
          </div>
          
          <div className="md:col-span-3 bg-[#0A0A0A] border border-white/10 rounded-3xl p-10 flex flex-col justify-center hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center shrink-0">
                <Code className="text-purple-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Production-Ready Code</h3>
                <p className="text-gray-400 text-sm mt-1">Export clean Tailwind, React, or Next.js code instantly.</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 bg-[#0A0A0A] border border-white/10 rounded-3xl p-10 flex flex-col justify-center hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center shrink-0">
                <Smartphone className="text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Responsive by Default</h3>
                <p className="text-gray-400 text-sm mt-1">Mobile, tablet, and desktop views are auto-optimized.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WORKFLOW STEPS */}
      <section id="workflow" className="py-24 bg-white text-black rounded-[60px]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
                Ship in minutes, <br/>not months.
              </h2>
              <div className="space-y-10">
                {[
                  { step: '01', title: 'Describe your vision', desc: 'Type what you want in simple words. No prompt engineering needed.' },
                  { step: '02', title: 'Iterate with AI', desc: 'Refine sections by chatting with the AI assistant in real-time.' },
                  { step: '03', title: 'Connect & Launch', desc: 'Hook up your domain and go live with one click on our global edge.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <span className="text-sm font-black text-blue-600 border-b-2 border-blue-600 h-fit leading-none">{item.step}</span>
                    <div>
                      <h4 className="text-2xl font-bold mb-1 group-hover:translate-x-1 transition-transform">{item.title}</h4>
                      <p className="text-gray-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-100 rounded-[40px] aspect-square flex items-center justify-center p-8 border-[12px] border-black shadow-2xl relative">
                <div className="absolute inset-0 bg-blue-600/5 animate-pulse rounded-3xl"></div>
                <div className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col relative z-10">
                  <div className="h-10 bg-gray-200 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col gap-6">
                    <div className="h-4 w-3/4 bg-gray-100 rounded-full" />
                    <div className="h-32 w-full bg-blue-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-blue-200">
                      <Sparkles className="text-blue-400 w-10 h-10" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-20 bg-gray-50 rounded-xl" />
                      <div className="h-20 bg-gray-50 rounded-xl" />
                      <div className="h-20 bg-gray-50 rounded-xl" />
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS (MARQUEE) */}
      <section className="py-24 px-6 overflow-hidden bg-[#050505]">
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="min-w-[400px] bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl inline-block">
              <div className="flex gap-1 text-blue-500 mb-4">
                {[...Array(5)].map((_, j) => <Zap key={j} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-lg text-gray-300 italic whitespace-normal">"Wabiai changed how we prototype. We went from Figma to a live React landing page in under 5 minutes."</p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600" />
                <div className="text-left">
                  <p className="font-bold">Sarah Chen</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">CTO @ NexaGen</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. PRICING TABLE */}
      <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4">Simple, transparent pricing</h2>
          <p className="text-gray-400 text-lg">No credit card required to start.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Starter */}
          <div className="p-10 border border-white/10 rounded-[32px] bg-[#0A0A0A] flex flex-col hover:border-white/20 transition-all">
            <h3 className="text-xl font-bold uppercase tracking-widest text-gray-400">Starter</h3>
            <p className="text-5xl font-black mt-4">$0<span className="text-lg font-normal text-gray-600">/mo</span></p>
            <ul className="mt-8 space-y-4 flex-1">
              {['3 AI generations/mo', 'Wabiai Subdomain', 'Community Support'].map(f => (
                <li key={f} className="flex items-center gap-3 text-gray-400 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-gray-600" /> {f}</li>
              ))}
            </ul>
            <button className="mt-10 w-full py-4 rounded-2xl border border-white/10 font-bold hover:bg-white text-white hover:text-black transition-all">Start Free</button>
          </div>

          {/* Pro */}
          <div className="p-10 border-2 border-blue-600 rounded-[40px] bg-blue-600/5 relative flex flex-col scale-105 z-10 shadow-2xl shadow-blue-500/10">
            <div className="absolute top-0 right-10 -translate-y-1/2 bg-blue-600 text-[10px] uppercase tracking-[0.2em] font-black px-4 py-1.5 rounded-full">Most Popular</div>
            <h3 className="text-xl font-bold uppercase tracking-widest">Pro</h3>
            <p className="text-5xl font-black mt-4">$29<span className="text-lg font-normal text-blue-300/60">/mo</span></p>
            <ul className="mt-8 space-y-4 flex-1">
              {['Unlimited AI builds', 'Custom Domains', 'No Branding', 'Priority Support', 'Full Code Export'].map(f => (
                <li key={f} className="flex items-center gap-3 text-sm font-bold text-white"><CheckCircle2 className="w-4 h-4 text-blue-500" /> {f}</li>
              ))}
            </ul>
            <button className="mt-10 w-full py-5 rounded-2xl bg-white text-black font-black text-lg hover:bg-gray-200 transition-all shadow-xl shadow-white/10">Upgrade Now</button>
          </div>

          {/* Enterprise */}
          <div className="p-10 border border-white/10 rounded-[32px] bg-[#0A0A0A] flex flex-col hover:border-white/20 transition-all">
            <h3 className="text-xl font-bold uppercase tracking-widest text-gray-400">Enterprise</h3>
            <p className="text-5xl font-black mt-4">Custom</p>
            <ul className="mt-8 space-y-4 flex-1">
              {['Custom AI Training', 'SLA Guarantee', 'Dedicated Manager', 'On-premise option'].map(f => (
                <li key={f} className="flex items-center gap-3 text-gray-400 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-gray-600" /> {f}</li>
              ))}
            </ul>
            <button className="mt-10 w-full py-4 rounded-2xl border border-white/10 font-bold hover:bg-white text-white hover:text-black transition-all">Contact Sales</button>
          </div>
        </div>
      </section>

      {/* 11. FAQ SECTION */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <h2 className="text-4xl font-black mb-12 text-center tracking-tighter">Everything else</h2>
        <div className="space-y-4">
          {[
            { q: "Is the code really production-ready?", a: "Yes. We use standard React patterns and Tailwind CSS. The output is indistinguishable from code written by a senior engineer." },
            { q: "Can I host the sites myself?", a: "Absolutely. With a Pro account, you can export the full source code and deploy it anywhere from Vercel to AWS." },
            { q: "Who owns the copyright?", a: "You do. We provide the tools, but you own 100% of the assets, code, and design created by the AI." }
          ].map((item, i) => (
            <div key={i} className="border border-white/10 p-6 rounded-2xl bg-[#0A0A0A] hover:bg-white/[0.02] transition-colors group cursor-pointer">
              <h4 className="flex justify-between items-center font-bold text-lg group-hover:text-blue-400">
                {item.q} <span className="text-gray-600 group-hover:rotate-45 transition-transform">+</span>
              </h4>
              <p className="text-gray-500 mt-4 text-sm leading-relaxed max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 12. CTA BOX */}
      <section className="py-20 bg-blue-600 mx-6 rounded-[50px] mb-24 overflow-hidden relative shadow-3xl shadow-blue-500/20">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-none">Ready to automate your workflow?</h2>
          <p className="text-blue-100 text-xl mb-10 font-medium">Join 50,000+ developers building the future today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all">
              Build My Website
            </button>
            <button className="bg-white/20 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-white/30 transition-all">
              Get a Demo
            </button>
          </div>
        </div>
      </section>

      {/* 14. FOOTER */}
      <footer className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-12 border-t border-white/10">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-6 h-6 fill-white" />
            <span className="text-2xl font-black tracking-tighter">WABIAI</span>
          </div>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed font-medium">
            Revolutionizing the web through generative intelligence. Built in San Francisco for the world's best creators.
          </p>
        </div>
        {[
          { title: 'Product', links: ['Features', 'Integrations', 'Pricing', 'Changelog'] },
          { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Contact'] },
          { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'GDPR'] }
        ].map((col) => (
          <div key={col.title}>
            <h5 className="font-bold mb-6 uppercase text-xs tracking-widest text-gray-400">{col.title}</h5>
            <ul className="space-y-4 text-sm text-gray-500 font-bold">
              {col.links.map(link => <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>)}
            </ul>
          </div>
        ))}
      </footer>

      <div className="text-center text-[10px] text-gray-600 py-10 uppercase tracking-[0.4em] font-black border-t border-white/5">
        © 2026 Wabiai Labs Inc. • Handcrafted by Intelligence.
      </div>
    </div>
  );
}

const StackingCard = ({ card, index }) => {
  return (
    <div 
      className="sticky w-full mb-[12vh]" 
      style={{ 
        // Each card stops 40px lower than the last one to show the "deck"
        top: `${140 + (index * 40)}px`, 
        zIndex: index 
      }}
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        // 1. We are using the translucent pastel background (`${card.color}/90`)
        // 2. backdrop-blur-3xl gives it that expensive, hazy look
        // 3. selection:bg-black/80 for contrast on highlight
        className={`relative w-full h-[400px] md:h-[480px] ${card.color}/90 backdrop-blur-3xl border border-white/30 rounded-[48px] p-8 md:p-12 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] overflow-hidden ${card.text} selection:bg-black/80 selection:text-white`}
      >
        <div className="grid md:grid-cols-12 items-center h-full gap-8">
          <div className="md:col-span-7">
            <div className="flex items-center gap-4 mb-6">
               <span className={`text-sm font-black border-b-2 border-current pb-1`}>
                 {card.step}
               </span>
               {/* Note the use of "text-current" to take the specific dark color of the card */}
               <h3 className="text-3xl md:text-5xl font-black text-current tracking-tighter uppercase leading-none">
                 {card.title}
               </h3>
            </div>
            {/* description is slightly less opaque current color */}
            <p className="opacity-80 text-lg md:text-xl leading-relaxed max-w-md">
              {card.desc}
            </p>
          </div>
          
          <div className="md:col-span-5 flex items-center justify-center relative">
              {/* Internal shadow instead of glow for the light mode feel */}
              <div className="relative z-10 p-10 bg-black/5 rounded-[40px] border border-black/5 text-current scale-110">
                 {card.icon}
              </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};