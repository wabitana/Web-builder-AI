import React from 'react';

export default function CTASection() {
  return (
    <section className="py-20 bg-blue-600 mx-6 rounded-[50px] mb-24 overflow-hidden relative shadow-3xl shadow-blue-500/20">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
        <h2 className="text-5xl md:text-7xl font-black mb-6 leading-none">Ready to automate your workflow?</h2>
        <p className="text-blue-100 text-xl mb-10 font-medium">Join 50,000+ developers building the future today.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-black text-white px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all">
            Build My Website
          </button>
          <button className="bg-white/20 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-white/30 transition-all">
            Get a Demo
          </button>
        </div>
      </div>
    </section>
  );
}
