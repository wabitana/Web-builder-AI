import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function PricingTable() {
  return (
    <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black mb-4">Simple, transparent pricing</h2>
        <p className="text-gray-400 text-lg">No credit card required to start.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        <div className="p-8 sm:p-10 border border-white/10 rounded-[32px] bg-[#0A0A0A] flex flex-col hover:border-white/20 transition-all">
          <h3 className="text-xl font-bold uppercase tracking-widest text-gray-400">Starter</h3>
          <p className="text-5xl font-black mt-4">ETB0<span className="text-lg font-normal text-gray-600">/mo</span></p>
          <ul className="mt-8 space-y-4 flex-1">
            {['3 AI generations/mo', 'Wabiai Subdomain', 'Community Support'].map(f => (
              <li key={f} className="flex items-center gap-3 text-gray-400 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-gray-600" /> {f}</li>
            ))}
          </ul>
          <button className="mt-10 w-full py-4 rounded-2xl border border-white/10 font-bold hover:bg-white text-white hover:text-black transition-all">Start Free</button>
        </div>

        <div className="p-8 sm:p-10 border-2 border-blue-600 rounded-[32px] md:rounded-[40px] bg-blue-600/5 relative flex flex-col md:scale-105 z-10 shadow-2xl shadow-blue-500/10">
          <div className="absolute top-0 right-10 -translate-y-1/2 bg-blue-600 text-[10px] uppercase tracking-[0.2em] font-black px-4 py-1.5 rounded-full">Most Popular</div>
          <h3 className="text-xl font-bold uppercase tracking-widest">Pro</h3>
          <p className="text-5xl font-black mt-4">ETB29<span className="text-lg font-normal text-blue-300/60">/mo</span></p>
          <ul className="mt-8 space-y-4 flex-1">
            {['Unlimited AI builds', 'Custom Domains', 'No Branding', 'Priority Support', 'Full Code Export'].map(f => (
              <li key={f} className="flex items-center gap-3 text-sm font-bold text-white"><CheckCircle2 className="w-4 h-4 text-blue-500" /> {f}</li>
            ))}
          </ul>
          <button className="mt-10 w-full py-5 rounded-2xl bg-white text-black font-black text-lg hover:bg-gray-200 transition-all shadow-xl shadow-white/10">Upgrade Now</button>
        </div>

        <div className="p-8 sm:p-10 border border-white/10 rounded-[32px] bg-[#0A0A0A] flex flex-col hover:border-white/20 transition-all">
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
  );
}
