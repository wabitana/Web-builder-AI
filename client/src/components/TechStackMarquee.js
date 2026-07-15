import React from 'react';

const TECH = [
  'React', 'Next.js', 'Vue.js', 'Angular', 'Svelte', 'TypeScript', 'Tailwind CSS', 
  'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'REST API',
  'Docker', 'AWS', 'Vercel', 'Firebase', 'Supabase', 'Prisma', 'tRPC', 'Zod',
  'Framer Motion', 'Three.js', 'Stripe', 'Auth0', 'Socket.io', 'Webpack', 'Vite', 'Turborepo',
];

export default function TechStackMarquee() {
  return (
    <section className="py-10 border-y border-white/5 bg-[#050505] overflow-hidden">
      <p className="text-center text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em] mb-6">
        Technologies We Generate Code For
      </p>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
        
        <div className="flex animate-marquee whitespace-nowrap">
          {[...TECH, ...TECH].map((tech, i) => (
            <span 
              key={i} 
              className="mx-8 text-sm font-semibold text-gray-500 hover:text-white transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
