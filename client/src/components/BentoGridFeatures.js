import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Shield, Zap, Cpu, Code2, Rocket, CloudLightning, LineChart } from 'lucide-react';

const BENTO_ITEMS = [
  {
    title: 'Global Edge Network',
    description: 'Deploy instantly to 150+ edge locations worldwide for sub-50ms latency.',
    icon: Globe,
    colSpan: 'md:col-span-2',
    bg: 'bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/40 dark:to-blue-900/10',
    border: 'border-blue-200 dark:border-blue-500/20',
  },
  {
    title: 'Bank-Grade Security',
    description: 'End-to-end encryption, SOC2 compliance, and automated DDoS protection built in.',
    icon: Shield,
    colSpan: 'md:col-span-1',
    bg: 'bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/40 dark:to-green-900/10',
    border: 'border-green-200 dark:border-green-500/20',
  },
  {
    title: 'Neural Engine V2',
    description: 'Our proprietary LLM understands context better than a senior developer.',
    icon: Cpu,
    colSpan: 'md:col-span-1',
    bg: 'bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/40 dark:to-purple-900/10',
    border: 'border-purple-200 dark:border-purple-500/20',
  },
  {
    title: 'Lightning Fast Builds',
    description: 'Turborepo and Vite integration means zero waiting for HMR.',
    icon: Zap,
    colSpan: 'md:col-span-1',
    bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100/50 dark:from-yellow-900/40 dark:to-yellow-900/10',
    border: 'border-yellow-200 dark:border-yellow-500/20',
  },
  {
    title: 'Clean Architecture',
    description: 'Enforces SOLID principles and clean folder structures automatically.',
    icon: Code2,
    colSpan: 'md:col-span-1',
    bg: 'bg-slate-100 dark:bg-[#0A0A0A]',
    border: 'border-slate-200 dark:border-white/10',
  },
  {
    title: 'Analytics & Insights',
    description: 'Built-in real-time analytics dashboard for user engagement tracking.',
    icon: LineChart,
    colSpan: 'md:col-span-2',
    bg: 'bg-gradient-to-br from-rose-50 to-rose-100/50 dark:from-rose-900/40 dark:to-rose-900/10',
    border: 'border-rose-200 dark:border-rose-500/20',
  },
];

export default function BentoGridFeatures() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
          Everything you need to scale.
        </h2>
        <p className="text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          WabiAI doesn't just build MVPs. It builds enterprise-grade infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BENTO_ITEMS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-3xl p-8 border ${item.border} ${item.bg} ${item.colSpan} relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-slate-900 dark:bg-white opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.02] transition-opacity duration-300" />
            
            <item.icon className="w-10 h-10 text-slate-700 dark:text-white/70 mb-6" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">{item.title}</h3>
            <p className="text-slate-600 dark:text-gray-400 font-medium leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
