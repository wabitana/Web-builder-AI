import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Zap, Menu, X, LogIn, Sun, Moon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, loginWithGoogle } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-4">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Zap className="text-white dark:text-black w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white">WABIAI</span>
        </div>
        
        <div className="hidden md:flex gap-10 text-sm font-medium text-slate-500 dark:text-gray-400">
          {['Features', 'Workflow', 'Pricing'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-slate-900 dark:hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-gray-300 transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          {!user ? (
            <>
              <button 
                onClick={loginWithGoogle}
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-white dark:hover:text-gray-300"
              >
                <LogIn className="w-4 h-4" /> Log in
              </button>
              <button 
                onClick={loginWithGoogle}
                className="bg-slate-900 text-white dark:bg-white dark:text-black px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-all active:scale-95"
              >
                Get Started
              </button>
            </>
          ) : (
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-blue-600 text-white px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-all active:scale-95"
            >
              Dashboard
            </button>
          )}
          
          <button className="md:hidden text-slate-900 dark:text-white p-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-gray-200 dark:border-white/10 bg-white/95 dark:bg-black/95 backdrop-blur-lg"
          >
            <div className="flex flex-col px-6 py-4 space-y-3">
              {['Features', 'Workflow', 'Pricing'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-slate-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white text-sm font-medium py-2 transition-colors"
                >
                  {item}
                </a>
              ))}
              {!user && (
                <button
                  onClick={() => { loginWithGoogle(); setIsMenuOpen(false); }}
                  className="sm:hidden flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white py-2"
                >
                  <LogIn className="w-4 h-4" /> Log in
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
