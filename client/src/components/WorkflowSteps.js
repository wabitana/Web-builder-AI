import React from 'react';
import { Sparkles } from 'lucide-react';

export default function WorkflowSteps() {
  return (
    <section id="workflow" className="py-24 bg-white text-black rounded-[60px]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
              Ship in minutes, <br/>not months.
            </h2>
            <div className="space-y-10">
              {[
                { step: '01', title: 'Describe your vision', desc: 'Type what you want in simple words. No prompt engineering needed.' },
                { step: '02', title: 'Iterate with AI', desc: 'Refine sections by chatting with the AI assistant in real-time.' },
                { step: '03', title: 'Connect & Launch', desc: 'Hook up your domain and go live with one click on our global edge.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <span className="text-sm font-black text-blue-600 border-b-2 border-blue-600 h-fit leading-none">{item.step}</span>
                  <div>
                    <h4 className="text-2xl font-bold mb-1 group-hover:translate-x-1 transition-transform">{item.title}</h4>
                    <p className="text-gray-500 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-100 rounded-[40px] aspect-square flex items-center justify-center p-8 border-[12px] border-black shadow-2xl relative">
              <div className="absolute inset-0 bg-blue-600/5 animate-pulse rounded-3xl"></div>
              <div className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col relative z-10">
                <div className="h-10 bg-gray-200 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="p-8 flex-1 flex flex-col gap-6">
                  <div className="h-4 w-3/4 bg-gray-100 rounded-full" />
                  <div className="h-32 w-full bg-blue-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-blue-200">
                    <Sparkles className="text-blue-400 w-10 h-10" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-20 bg-gray-50 rounded-xl" />
                    <div className="h-20 bg-gray-50 rounded-xl" />
                    <div className="h-20 bg-gray-50 rounded-xl" />
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
