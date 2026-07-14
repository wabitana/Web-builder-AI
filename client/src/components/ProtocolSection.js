import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, Layers, Palette, Code, Send } from 'lucide-react';

const StackingCard = ({ card, index }) => {
  return (
    <div 
      className="sticky w-full mb-[12vh]" 
      style={{ 
        top: `${140 + (index * 40)}px`, 
        zIndex: index 
      }}
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        className={`relative w-full h-[400px] md:h-[480px] ${card.color}/90 backdrop-blur-3xl border border-white/30 rounded-[48px] p-8 md:p-12 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] overflow-hidden ${card.text} selection:bg-black/80 selection:text-white`}
      >
        <div className="grid md:grid-cols-12 items-center h-full gap-8">
          <div className="md:col-span-7">
            <div className="flex items-center gap-4 mb-6">
               <span className={`text-sm font-black border-b-2 border-current pb-1`}>
                 {card.step}
               </span>
               <h3 className="text-3xl md:text-5xl font-black text-current tracking-tighter uppercase leading-none">
                 {card.title}
               </h3>
            </div>
            <p className="opacity-80 text-lg md:text-xl leading-relaxed max-w-md">
              {card.desc}
            </p>
          </div>
          
          <div className="md:col-span-5 flex items-center justify-center relative">
              <div className="relative z-10 p-10 bg-black/5 rounded-[40px] border border-black/5 text-current scale-110">
                 {card.icon}
              </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function ProtocolSection() {
  return (
    <section className="relative py-32 px-4">
      <div className="max-w-7xl mx-auto text-center mb-32">
        <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.8]">
          The <br/> <span className="text-blue-600">Protocol</span>
        </h2>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-[30vh]">
        {[
          { step: '01', title: 'Ingestion', desc: 'Analyzing benchmarks and design intent.', icon: <PenTool size={48}/>, color: 'bg-[#FF1493]' },
          { step: '02', title: 'Blueprint', desc: 'Optimizing spacing and neural wireframes.', icon: <Layers size={48}/>, color: 'bg-[#32CD32]' },
          { step: '03', title: 'Styling', desc: 'Applying brand DNA and fluid systems.', icon: <Palette size={48}/>, color: 'bg-[#7000FF]' },
          { step: '04', title: 'Code', desc: 'Generating production-ready React components.', icon: <Code size={48}/>, color: 'bg-[#00D4FF]' },
          { step: '05', title: 'Deploy', desc: 'Global CDN push in under a second.', icon: <Send size={48}/>, color: 'bg-[#FF4500]' },
        ].map((card, i) => (
          <StackingCard key={i} card={card} index={i} />
        ))}
      </div>

      <div className="h-[40vh]" />
    </section>
  );
}
