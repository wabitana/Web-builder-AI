import React from 'react';

export default function FAQSection() {
  return (
    <section className="py-24 px-6 max-w-3xl mx-auto">
      <h2 className="text-4xl font-black mb-12 text-center tracking-tighter">Everything else</h2>
      <div className="space-y-4">
        {[
          { q: "Is the code really production-ready?", a: "Yes. We use standard React patterns and Tailwind CSS. The output is indistinguishable from code written by a senior engineer." },
          { q: "Can I host the sites myself?", a: "Absolutely. With a Pro account, you can export the full source code and deploy it anywhere from Vercel to AWS." },
          { q: "Who owns the copyright?", a: "You do. We provide the tools, but you own 100% of the assets, code, and design created by the AI." }
        ].map((item, i) => (
          <div key={i} className="border border-white/10 p-6 rounded-2xl bg-[#0A0A0A] hover:bg-white/[0.02] transition-colors group cursor-pointer">
            <h4 className="flex justify-between items-center font-bold text-lg group-hover:text-blue-400">
              {item.q} <span className="text-gray-600 group-hover:rotate-45 transition-transform">+</span>
            </h4>
            <p className="text-gray-500 mt-4 text-sm leading-relaxed max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
