import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  Plus, Folder, Trash2, Clock, Zap, LogOut,
  Sun, Moon, Settings, Search, LayoutGrid, List,
  ArrowRight, Sparkles, BarChart3, Globe
} from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/api/projects`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async () => {
    if (!newProjectName.trim()) return;
    try {
      const res = await fetch(`${API_URL}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: newProjectName }),
      });
      if (res.ok) {
        const project = await res.json();
        setShowNewModal(false);
        setNewProjectName('');
        navigate(`/builder/${project.id}`);
      }
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const deleteProject = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this project?')) return;
    try {
      await fetch(`${API_URL}/api/projects/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-white transition-colors duration-300">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-[#0A0A0A] border-r border-gray-200 dark:border-white/10 p-6 flex flex-col z-40 hidden lg:flex">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-black tracking-tighter">WABIAI</span>
        </div>

        <nav className="space-y-2 flex-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold text-sm">
            <Folder className="w-4 h-4" /> Projects
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 font-medium text-sm transition-colors">
            <BarChart3 className="w-4 h-4" /> Analytics
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 font-medium text-sm transition-colors">
            <Globe className="w-4 h-4" /> Deployments
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 font-medium text-sm transition-colors">
            <Settings className="w-4 h-4" /> Settings
          </button>
        </nav>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 font-medium text-sm transition-colors mb-2"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>

        {/* User */}
        <div className="border-t border-gray-200 dark:border-white/10 pt-4">
          <div className="flex items-center gap-3 mb-3">
            {user?.avatar ? (
              <img src={user.avatar} alt="" className="w-9 h-9 rounded-full" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{user?.name || 'Guest'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || 'Not signed in'}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-6 lg:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black tracking-tight">
              Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''} 👋
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and build your projects</p>
          </div>
          <button
            onClick={() => setShowNewModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4" /> New Project
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Projects', value: projects.length, icon: Folder, color: 'blue' },
            { label: 'AI Generations', value: projects.length * 3, icon: Sparkles, color: 'purple' },
            { label: 'Active Deploys', value: 0, icon: Globe, color: 'green' },
            { label: 'This Week', value: projects.filter(p => new Date(p.createdAt) > new Date(Date.now() - 7 * 86400000)).length, icon: BarChart3, color: 'orange' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-5 h-5 text-${stat.color}-500`} />
              </div>
              <p className="text-2xl font-black">{stat.value}</p>
              <p className="text-xs text-gray-500 font-medium mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Search + View Toggle */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A0A0A] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>
          <div className="flex items-center border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 ${viewMode === 'grid' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 ${viewMode === 'list' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-64 text-center"
          >
            <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold mb-2">No projects yet</h3>
            <p className="text-gray-500 text-sm mb-6">Create your first project and let AI build it for you</p>
            <button
              onClick={() => setShowNewModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm"
            >
              <Plus className="w-4 h-4" /> Create Project
            </button>
          </motion.div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(`/builder/${project.id}`)}
                className={`group cursor-pointer bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 rounded-2xl hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all hover:shadow-lg ${
                  viewMode === 'list' ? 'flex items-center justify-between p-4' : 'p-5'
                }`}
              >
                {viewMode === 'grid' && (
                  <div className="h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 rounded-xl mb-4 flex items-center justify-center border border-gray-100 dark:border-white/5">
                    <Zap className="w-8 h-8 text-blue-500/30" />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm group-hover:text-blue-600 transition-colors">{project.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {new Date(project.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => deleteProject(project.id, e)}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* New Project Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl"
          >
            <h2 className="text-2xl font-black mb-2">New Project</h2>
            <p className="text-gray-500 text-sm mb-6">Give your project a name to get started</p>
            <input
              type="text"
              placeholder="My Awesome Website"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && createProject()}
              autoFocus
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 mb-6"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowNewModal(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-white/10 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createProject}
                className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-colors"
              >
                Create
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
