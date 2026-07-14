import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { io } from 'socket.io-client';
import { SandpackProvider, SandpackLayout, SandpackPreview } from "@codesandbox/sandpack-react";
import {
  Zap, Send, ArrowLeft, Sparkles, Monitor, Smartphone, Tablet,
  Download, Sun, Moon, Loader2, Code, Eye, RefreshCw, Copy,
  CheckCircle2, Palette, Mic, StopCircle, Undo2, Redo2, Save,
  Terminal, FileCode, FileJson, FileText
} from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const SOCKET_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const VIBES = [
  { id: 'minimal', label: 'Minimal', color: 'bg-gray-500' },
  { id: 'brutalist', label: 'Brutalist', color: 'bg-black' },
  { id: 'corporate', label: 'Corporate', color: 'bg-blue-600' },
  { id: 'playful', label: 'Playful', color: 'bg-pink-500' },
  { id: 'glassmorphism', label: 'Glass', color: 'bg-cyan-400' },
  { id: 'dark-luxury', label: 'Luxury', color: 'bg-amber-500' },
];

const DEFAULT_FILES = {
  "/App.js": { code: `import React from 'react';\n\nexport default function App() {\n  return (\n    <div className="flex items-center justify-center h-screen bg-white text-black font-sans">\n      <p>Your generated app will appear here</p>\n    </div>\n  );\n}` }
};

export default function Builder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  
  const [socket, setSocket] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  
  const [files, setFiles] = useState(DEFAULT_FILES);
  const [activeFile, setActiveFile] = useState("/App.js");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState('');
  
  const [viewMode, setViewMode] = useState('preview'); // preview or code
  const [deviceMode, setDeviceMode] = useState('desktop');
  const [selectedVibe, setSelectedVibe] = useState('minimal');
  const [projectName, setProjectName] = useState('Untitled');
  const [showVibeSelector, setShowVibeSelector] = useState(false);
  
  const chatEndRef = useRef(null);

  // Initialize Socket
  useEffect(() => {
    const s = io(SOCKET_URL);
    setSocket(s);

    s.on('progress', (data) => {
      setCurrentStep(data.label || data.step);
      if (data.label) {
        setMessages((prev) => [...prev, { type: 'system', text: data.label }]);
      }
    });

    s.on('result', (data) => {
      const generatedFiles = data.code || data.state?.finalCode;
      if (generatedFiles && typeof generatedFiles === 'object') {
        setFiles(generatedFiles);
        setHistory((prev) => [...prev, generatedFiles]);
        setHistoryIndex((prev) => prev + 1);
        
        // Ensure active file exists, else fallback to first key
        if (!generatedFiles[activeFile]) {
          setActiveFile(Object.keys(generatedFiles)[0] || "/App.js");
        }
      }
      setIsGenerating(false);
      setCurrentStep('');
      setMessages((prev) => [...prev, { type: 'system', text: '✅ Generation complete!' }]);
    });

    s.on('error', (data) => {
      setIsGenerating(false);
      setCurrentStep('');
      setMessages((prev) => [...prev, { type: 'error', text: data.message }]);
    });

    return () => s.disconnect();
  }, [activeFile]);

  // Load project from DB
  useEffect(() => {
    if (id && id !== 'new') {
      loadProject();
    }
  }, [id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadProject = async () => {
    try {
      const res = await fetch(`${API_URL}/api/projects/${id}`, { credentials: 'include' });
      if (res.ok) {
        const project = await res.json();
        setProjectName(project.name);
        
        if (project.messages && Array.isArray(project.messages) && project.messages.length > 0) {
          setMessages(project.messages);
        }
        
        if (project.files && Object.keys(project.files).length > 0) {
          setFiles(project.files);
          setHistory([project.files]);
          setHistoryIndex(0);
          setActiveFile(Object.keys(project.files)[0]);
        }
      }
    } catch (err) {
      console.error('Failed to load project:', err);
    }
  };

  const saveProject = async () => {
    if (!id || id === 'new') return;
    try {
      await fetch(`${API_URL}/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: projectName, files, messages }),
      });
      // Removed the toast to prevent spamming on auto-save
    } catch (err) {
      console.error('Failed to save:', err);
    }
  };

  // Auto-save effect
  useEffect(() => {
    if (!id || id === 'new') return;
    const timeout = setTimeout(() => {
      saveProject();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [files, messages, projectName]);

  const handleGenerate = () => {
    if (!prompt.trim() || !socket) return;
    
    const newMsg = { type: 'user', text: prompt };
    setMessages((prev) => [...prev, newMsg]);
    setIsGenerating(true);

    const fullPrompt = `Design vibe: ${selectedVibe}. ${prompt}`;
    socket.emit('generate', { prompt: fullPrompt, currentFiles: files });
    setPrompt('');
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setFiles(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setFiles(history[historyIndex + 1]);
    }
  };

  const handleExport = async () => {
    try {
      const JSZip = (await import('jszip')).default;
      const { saveAs } = await import('file-saver');
      const zip = new JSZip();
      
      Object.entries(files).forEach(([path, data]) => {
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        zip.file(cleanPath, data.code || '');
      });
      
      const blob = await zip.generateAsync({ type: 'blob' });
      saveAs(blob, `${projectName.replace(/\s+/g, '-').toLowerCase()}.zip`);
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  const getFileIcon = (filename) => {
    if (filename.endsWith('.json')) return <FileJson className="w-4 h-4 text-yellow-500" />;
    if (filename.endsWith('.js') || filename.endsWith('.jsx')) return <FileCode className="w-4 h-4 text-blue-400" />;
    return <FileText className="w-4 h-4 text-gray-400" />;
  };

  const deviceWidths = { desktop: '100%', tablet: '768px', mobile: '375px' };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-[#050505] text-gray-900 dark:text-white transition-colors overflow-hidden font-sans">
      {/* Top Header */}
      <header className="h-14 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-4 flex-shrink-0 bg-white dark:bg-[#0A0A0A]">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600 fill-blue-600" />
            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="bg-transparent font-bold text-sm outline-none border-none w-48 focus:ring-2 focus:ring-blue-500/50 rounded px-2 py-1"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {viewMode === 'preview' && (
            <div className="hidden sm:flex items-center border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden mr-2">
              {[
                { mode: 'desktop', icon: Monitor },
                { mode: 'tablet', icon: Tablet },
                { mode: 'mobile', icon: Smartphone },
              ].map(({ mode, icon: Icon }) => (
                <button
                  key={mode}
                  onClick={() => setDeviceMode(mode)}
                  className={`p-2 ${deviceMode === mode ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600' : 'text-gray-400'}`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden mr-2">
            <button onClick={() => setViewMode('preview')} className={`p-2 ${viewMode === 'preview' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600' : 'text-gray-400'}`}>
              <Eye className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode('code')} className={`p-2 ${viewMode === 'code' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600' : 'text-gray-400'}`}>
              <Code className="w-4 h-4" />
            </button>
          </div>

          <button onClick={handleUndo} disabled={historyIndex <= 0} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 disabled:opacity-30"><Undo2 className="w-4 h-4" /></button>
          <button onClick={handleRedo} disabled={historyIndex >= history.length - 1} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 disabled:opacity-30"><Redo2 className="w-4 h-4" /></button>
          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400">{isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}</button>
          <button onClick={saveProject} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400"><Save className="w-4 h-4" /></button>
          
          <button onClick={handleExport} className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar (File Explorer) always visible */}
        <div className="w-64 border-r border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#080808] flex flex-col flex-shrink-0">
          <div className="p-3 border-b border-gray-200 dark:border-white/10 text-xs font-bold text-gray-500 uppercase tracking-wider">
            Explorer
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {Object.keys(files).sort().map(filename => (
              <button
                key={filename}
                onClick={() => {
                  setActiveFile(filename);
                  setViewMode('code'); // Auto-switch to code when clicking a file
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                  activeFile === filename && viewMode === 'code'
                    ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 font-medium' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/5'
                }`}
              >
                {getFileIcon(filename)}
                <span className="truncate">{filename}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Center Panel (Code Editor or Sandpack Preview) */}
        <div className="flex-1 flex flex-col bg-gray-100 dark:bg-[#111] overflow-hidden relative">
          {viewMode === 'code' ? (
            <div className="flex-1 bg-[#1e1e1e] overflow-auto">
              <div className="p-4 border-b border-white/10 flex items-center gap-2 text-gray-400 text-xs bg-[#181818]">
                {getFileIcon(activeFile)} {activeFile}
              </div>
              <pre className="p-6 text-sm text-green-400 font-mono whitespace-pre-wrap leading-relaxed">
                {files[activeFile]?.code || '// Empty file'}
              </pre>
            </div>
          ) : (
            <div className="flex-1 flex flex-col p-0 bg-white" style={{ minHeight: 0 }}>
              {/* CSS overrides to force Sandpack to fill 100% height */}
              <style>{`
                .sp-wrapper { height: 100% !important; }
                .sp-layout { height: 100% !important; border: none !important; border-radius: 0 !important; }
                .sp-preview-container { height: 100% !important; }
                .sp-preview-iframe { height: 100% !important; }
                .sp-preview-actions { right: 8px !important; bottom: 8px !important; }
                .sp-stack { height: 100% !important; }
              `}</style>
              <div 
                className="h-full w-full"
                style={{ width: deviceWidths[deviceMode], maxWidth: '100%', margin: '0 auto' }}
              >
                <SandpackProvider
                  template="react"
                  theme={isDark ? "dark" : "light"}
                  files={files}
                  options={{
                    externalResources: ["https://cdn.tailwindcss.com"]
                  }}
                  customSetup={{
                    dependencies: {
                      "react": "^18.2.0",
                      "react-dom": "^18.2.0",
                      "lucide-react": "^0.292.0",
                      "framer-motion": "^10.16.4",
                    }
                  }}
                >
                  <SandpackLayout style={{ border: 'none', height: '100%', borderRadius: 0 }}>
                    <SandpackPreview
                      showNavigator={false}
                      showRefreshButton={true}
                      showOpenInCodeSandbox={false}
                      style={{ height: '100%', flex: 1 }}
                    />
                  </SandpackLayout>
                </SandpackProvider>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar (Chat AI) */}
        <div className="w-96 border-l border-gray-200 dark:border-white/10 flex flex-col bg-white dark:bg-[#0A0A0A] hidden md:flex flex-shrink-0">
          <div className="p-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <span className="font-bold text-sm">AI Builder</span>
            </div>
            <button onClick={() => setShowVibeSelector(!showVibeSelector)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5">
              <Palette className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <AnimatePresence>
            {showVibeSelector && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 p-3 border-b border-gray-200 dark:border-white/10">
                  {VIBES.map((vibe) => (
                    <button
                      key={vibe.id}
                      onClick={() => setSelectedVibe(vibe.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedVibe === vibe.id
                          ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 ring-2 ring-blue-500'
                          : 'bg-gray-100 dark:bg-white/5 text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full ${vibe.color}`} />
                      {vibe.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 text-sm mt-20">
                <Sparkles className="w-8 h-8 mx-auto mb-3 text-blue-500/30" />
                <p className="font-semibold mb-1">Start building</p>
                <p className="text-xs">Describe what you want to create</p>
              </div>
            )}
            
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm ${
                  msg.type === 'user'
                    ? 'bg-blue-600 text-white rounded-2xl rounded-br-md px-4 py-3 ml-8'
                    : msg.type === 'error'
                    ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-2xl px-4 py-3 mr-8'
                    : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 rounded-2xl rounded-bl-md px-4 py-3 mr-8'
                }`}
              >
                {msg.text}
              </motion.div>
            ))}

            {isGenerating && (
              <div className="flex items-center gap-3 text-blue-500 text-sm px-4 py-2 bg-blue-50 dark:bg-blue-500/10 rounded-2xl mr-16">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="font-medium">{currentStep || 'Processing...'}</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-white/10">
            <div className="flex items-end gap-2 relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
                placeholder="Message AI Builder..."
                rows={2}
                className="w-full resize-none rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 pr-12"
              />
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="absolute right-2 bottom-2 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
