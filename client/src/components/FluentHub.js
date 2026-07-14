import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Layout, BarChart3, MessageSquare, CheckCircle2, MousePointer2, Code, Sparkles } from 'lucide-react';

export default function FluentHub() {
  return (
    <section className="relative py-24 bg-slate-50/50 overflow-hidden px-4 md:px-10">
      <div className="max-w-[1440px] mx-auto bg-white rounded-[48px] border border-slate-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden relative py-20 md:py-32">
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

              <div className="relative bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl h-60 p-6 flex flex-col gap-4">
                 <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-inner">
                    <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                    <div className="text-slate-400 text-xs font-medium">Create a clean hero section for a crypto trading app...</div>
                 </div>
                 
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

            <div className="lg:col-span-4 grid grid-rows-2 gap-6">
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
                <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity blur-[80px]" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
