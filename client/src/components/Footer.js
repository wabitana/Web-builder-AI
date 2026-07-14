import React from 'react';
import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <>
      <footer className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-12 border-t border-white/10">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-6 h-6 fill-white" />
            <span className="text-2xl font-black tracking-tighter">WABIAI</span>
          </div>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed font-medium">
            Revolutionizing the web through generative intelligence. Built in San Francisco for the world's best creators.
          </p>
        </div>
        {[
          { title: 'Product', links: ['Features', 'Integrations', 'Pricing', 'Changelog'] },
          { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Contact'] },
          { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'GDPR'] }
        ].map((col) => (
          <div key={col.title}>
            <h5 className="font-bold mb-6 uppercase text-xs tracking-widest text-gray-400">{col.title}</h5>
            <ul className="space-y-4 text-sm text-gray-500 font-bold">
              {col.links.map(link => <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>)}
            </ul>
          </div>
        ))}
      </footer>

      <div className="text-center text-[10px] text-gray-600 py-10 uppercase tracking-[0.4em] font-black border-t border-white/5">
        © 2026 Wabiai Labs Inc. • Handcrafted by Intelligence.
      </div>
    </>
  );
}
