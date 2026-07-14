import React from 'react';

export default function LogoCloud() {
  return (
    <section className="py-12 border-y border-white/5 bg-white/[0.02]">
      <p className="text-center text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-8">Powering the next generation of startups</p>
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-12 opacity-30 grayscale brightness-200">
        {['Stripe', 'Vercel', 'Linear', 'Airbnb', 'OpenAI'].map(logo => (
          <span key={logo} className="text-2xl font-bold italic tracking-tighter">{logo}</span>
        ))}
      </div>
    </section>
  );
}
