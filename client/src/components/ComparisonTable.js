import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const ROWS = [
  { feature: 'Build a full landing page', wabi: '60 seconds', trad: '2–4 weeks' },
  { feature: 'Responsive design', wabi: 'Automatic', trad: 'Manual CSS' },
  { feature: 'Component architecture', wabi: 'AI-optimized', trad: 'Manual setup' },
  { feature: 'Dark mode support', wabi: 'Built-in', trad: 'Extra effort' },
  { feature: 'SEO optimization', wabi: 'Auto-generated', trad: 'Plugin config' },
  { feature: 'Animations & transitions', wabi: 'Included', trad: 'Library setup' },
  { feature: 'Deployment ready', wabi: 'Instant export', trad: 'CI/CD pipeline' },
  { feature: 'Cost', wabi: 'Free tier', trad: '$5k–$50k+' },
];

export default function ComparisonTable() {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider mb-6">
          Why WabiAI?
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
          WabiAI vs Traditional Development
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">See how WabiAI compares to hiring a dev team or building from scratch.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl border border-white/10 overflow-hidden"
      >
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5">
              <th className="px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Feature</th>
              <th className="px-6 py-4 text-sm font-bold text-blue-400 uppercase tracking-wider text-center">WabiAI</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider text-center">Traditional</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={i} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4 text-sm text-gray-300 font-medium">{row.feature}</td>
                <td className="px-6 py-4 text-sm text-center">
                  <span className="inline-flex items-center gap-1.5 text-green-400 font-semibold">
                    <Check className="w-4 h-4" /> {row.wabi}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-center text-gray-500">{row.trad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </section>
  );
}
