import React from 'react';
import { Zap } from 'lucide-react';

export default function Testimonials() {
  return (
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
  );
}
