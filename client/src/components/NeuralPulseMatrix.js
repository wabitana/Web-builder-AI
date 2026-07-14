import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Monitor, Mic } from 'lucide-react';

export default function NeuralPulseMatrix() {
  return (
    <section className="relative py-32 overflow-hidden border-y border-white/5">
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
  );
}
