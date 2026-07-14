import React from 'react';
import { motion } from 'framer-motion';

export default function StatsGrid() {
  return (
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
  );
}
