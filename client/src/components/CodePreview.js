import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Copy, CheckCircle2 } from 'lucide-react';

const CODE_SNIPPETS = {
  react: `import { useState } from 'react';
import { motion } from 'framer-motion';

export default function GeneratedApp() {
  const [active, setActive] = useState(false);
  
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActive(!active)}
        className={\`px-8 py-4 rounded-xl font-bold \${
          active ? 'bg-indigo-500' : 'bg-slate-700'
        }\`}
      >
        {active ? 'System Active' : 'Initialize System'}
      </motion.button>
    </div>
  );
}`,
  nextjs: `// app/page.tsx
import { Suspense } from 'react';
import { DataGrid } from '@/components/DataGrid';
import { Skeleton } from '@/components/ui/skeleton';

export default async function DashboardPage() {
  return (
    <main className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 tracking-tight">
        Analytics Dashboard
      </h1>
      
      <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-xl" />}>
        <DataGrid endpoint="/api/v1/metrics" refreshInterval={5000} />
      </Suspense>
    </main>
  );
}`,
  api: `import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2)
});

app.post('/api/users', async (req, res) => {
  try {
    const data = userSchema.parse(req.body);
    const user = await prisma.user.create({ data });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});`
};

export default function CodePreview() {
  const [activeTab, setActiveTab] = useState('react');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12 items-center">

        <div className="flex-1 md:pr-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-6">
            Production-Ready Output
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
            Code you'd be proud to commit.
          </h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            WabiAI doesn't just generate generic boilerplate. It writes idiomatic, strictly typed, and beautifully formatted code utilizing the latest framework features like React Server Components and Framer Motion.
          </p>
          <ul className="space-y-4">
            {['TypeScript native', 'Tailwind CSS styling', 'ESLint compliant', 'Accessible (a11y)'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-300 font-medium">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 w-full max-w-[600px] rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl shadow-purple-900/20 relative">
          {/* Editor Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#111] border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex gap-2">
              {['react', 'nextjs', 'api'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === tab ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
                >
              {tab === 'react' ? 'App.tsx' : tab === 'nextjs' ? 'page.tsx' : 'server.ts'}
            </button>
              ))}
          </div>
          <button onClick={handleCopy} className="text-gray-500 hover:text-white transition-colors">
            {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Editor Body */}
        <div className="p-6 overflow-x-auto text-sm font-mono leading-relaxed relative">
          <AnimatePresence mode="wait">
            <motion.pre
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="text-gray-300"
            >
              <code>{CODE_SNIPPETS[activeTab]}</code>
            </motion.pre>
          </AnimatePresence>
          <div className="absolute top-0 right-0 p-4">
            <Terminal className="w-24 h-24 text-white/5" />
          </div>
        </div>
      </div>

    </div>
    </section >
  );
}
