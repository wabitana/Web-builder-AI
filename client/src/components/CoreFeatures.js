import React from 'react';
import { Cpu, Code, Smartphone } from 'lucide-react';

export default function CoreFeatures() {
  return (
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
  );
}
