import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Zap, Menu, X, LogIn } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, loginWithGoogle } = useAuth();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-white/10 bg-black/50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Zap className="text-black w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">WABIAI</span>
        </div>
        
        <div className="hidden md:flex gap-10 text-sm font-medium text-gray-400">
          {['Features', 'Workflow', 'Pricing'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <button 
                onClick={loginWithGoogle}
                className="hidden sm:flex items-center gap-2 text-sm font-medium hover:text-gray-300 text-white"
              >
                <LogIn className="w-4 h-4" /> Log in
              </button>
              <button 
                onClick={loginWithGoogle}
                className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-all active:scale-95"
              >
                Get Started
              </button>
            </>
          ) : (
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-all active:scale-95"
            >
              Dashboard
            </button>
          )}
          
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </nav>
  );
}
