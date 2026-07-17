import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  Plus, Folder, Trash2, Clock, Zap, LogOut,
  Sun, Moon, Settings, Search, LayoutGrid, List,
  ArrowRight, Sparkles, BarChart3, Globe, Menu, X,
  Activity, Users, ArrowUpRight, TrendingUp, CheckCircle, AlertCircle, RefreshCw
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
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [deployments, setDeployments] = useState([]);
  const [deploymentsLoading, setDeploymentsLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (activeTab === 'analytics' && !analyticsData) {
      fetchAnalytics();
    }
    if (activeTab === 'deployments') {
      if (deployments.length === 0) {
        fetchDeployments();
      }
      
      // Polling logic: if any deployment is 'Building', refresh every 5 seconds
      const hasBuilding = deployments.some(d => d.status === 'Building');
      if (hasBuilding) {
        const interval = setInterval(() => {
          fetchDeployments(true);
        }, 5000);
        return () => clearInterval(interval);
      }
    }
  }, [activeTab, deployments]);

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

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/projects/user/dashboard-stats`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setAnalyticsData(data);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const fetchDeployments = async (silent = false) => {
    if (!silent) setDeploymentsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/projects/user/deployments`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setDeployments(data);
      }
    } catch (error) {
      console.error('Failed to fetch deployments:', error);
    } finally {
      if (!silent) setDeploymentsLoading(false);
    }
  };

  const timeAgo = (dateStr) => {
    const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const formatDuration = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}m ${s}s`;
  };

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const SidebarContent = () => {
    const tabs = [
      { id: 'projects', label: 'Projects', icon: Folder },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      { id: 'deployments', label: 'Deployments', icon: Globe },
      { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
    <>
      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Zap className="text-white w-5 h-5 fill-current" />
        </div>
        <span className="text-xl font-black tracking-tighter">WABIAI</span>
      </div>

      <nav className="space-y-2 flex-1">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setShowMobileSidebar(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors ${
              activeTab === tab.id 
                ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold' 
                : 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400'
            }`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
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
    </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-white transition-colors duration-300">
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-[#0A0A0A] border-r border-gray-200 dark:border-white/10 p-6 flex flex-col z-40 hidden lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {showMobileSidebar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setShowMobileSidebar(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-72 bg-white dark:bg-[#0A0A0A] border-r border-gray-200 dark:border-white/10 p-6 flex flex-col z-50 lg:hidden"
            >
              <button
                onClick={() => setShowMobileSidebar(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-10">
        
        {/* Mobile menu button & Header for non-projects tabs */}
        <div className="flex items-center gap-3 mb-10 lg:hidden">
          <button
            onClick={() => setShowMobileSidebar(true)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {activeTab === 'projects' && (
          <>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">

            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''} 👋
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm sm:text-base">Manage and build your projects</p>
            </div>
          <button
            onClick={() => setShowNewModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 sm:px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4" /> New Project
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
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
              className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 rounded-2xl p-4 sm:p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-5 h-5 text-${stat.color}-500`} />
              </div>
              <p className="text-xl sm:text-2xl font-black">{stat.value}</p>
              <p className="text-xs text-gray-500 font-medium mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Search + View Toggle */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6">
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
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
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
                  <div className="min-w-0 flex-1 mr-2">
                    <h3 className="font-bold text-sm group-hover:text-blue-600 transition-colors truncate">{project.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3 flex-shrink-0" /> {new Date(project.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
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
          </>
        )}

        {activeTab === 'analytics' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black tracking-tight">Analytics Overview</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Monitor your project performance and traffic</p>
              </div>
            </div>
            
            {analyticsLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : analyticsData ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Views', value: analyticsData.totalViews.toLocaleString(), icon: Users, colorClass: 'bg-blue-50 dark:bg-blue-500/10 text-blue-500' },
                    { label: 'Active Visitors', value: analyticsData.totalVisitors.toLocaleString(), icon: Activity, colorClass: 'bg-green-50 dark:bg-green-500/10 text-green-500' },
                    { label: 'Avg. Session', value: formatDuration(analyticsData.avgSessionDuration), icon: Clock, colorClass: 'bg-purple-50 dark:bg-purple-500/10 text-purple-500' },
                    { label: 'Bounce Rate', value: `${analyticsData.avgBounceRate}%`, icon: TrendingUp, colorClass: 'bg-orange-50 dark:bg-orange-500/10 text-orange-500' },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 rounded-2xl p-5 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.colorClass}`}>
                          <stat.icon className="w-5 h-5" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-black">{stat.value}</h3>
                      <p className="text-sm text-gray-500 font-medium mt-1">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                {analyticsData.chartData && analyticsData.chartData.length > 0 && (
                  <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 rounded-2xl p-6 h-80 flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 opacity-50"></div>
                    <div className="w-full h-full flex items-end justify-between gap-1 sm:gap-2 z-10 px-2 sm:px-4">
                      {analyticsData.chartData.map((value, i) => {
                        const maxVal = Math.max(...analyticsData.chartData);
                        return (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${(value / maxVal) * 100}%` }}
                            transition={{ delay: i * 0.05, duration: 0.5 }}
                            className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md opacity-80 group-hover:opacity-100 transition-opacity"
                          ></motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <BarChart3 className="w-10 h-10 text-gray-300 dark:text-gray-600 mb-3" />
                <p className="text-gray-500 text-sm">No analytics data available yet.</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'deployments' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black tracking-tight">Deployments</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage and track your project deployments</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => fetchDeployments()} className="flex items-center gap-2 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-all shadow-sm">
                  <RefreshCw className={`w-4 h-4 ${deploymentsLoading ? 'animate-spin' : ''}`} /> Refresh
                </button>
                <button className="flex items-center gap-2 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-all shadow-sm">
                  <Globe className="w-4 h-4" /> Custom Domains
                </button>
              </div>
            </div>

            {deploymentsLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : deployments.length > 0 ? (
              <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
                <div className="divide-y divide-gray-200 dark:divide-white/10">
                  {deployments.map((deploy, i) => (
                    <div key={deploy.id || i} className="p-4 sm:p-5 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center border border-gray-200 dark:border-white/10 shrink-0">
                          {deploy.status === 'Ready' && <CheckCircle className="w-5 h-5 text-green-500" />}
                          {deploy.status === 'Building' && <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />}
                          {deploy.status === 'Failed' && <AlertCircle className="w-5 h-5 text-red-500" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm">{deploy.project}</h4>
                            <span className="text-[10px] font-mono bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-300">
                              {deploy.branch}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                            <span className={
                              deploy.status === 'Ready' ? 'text-green-600 dark:text-green-400' :
                              deploy.status === 'Failed' ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'
                            }>{deploy.status}</span>
                            <span>•</span>
                            <span>{timeAgo(deploy.time)}</span>
                          </div>
                        </div>
                      </div>
                      {deploy.url && (
                        <a href={`https://${deploy.url}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-500/20">
                          Visit <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Globe className="w-10 h-10 text-gray-300 dark:text-gray-600 mb-3" />
                <p className="text-gray-500 text-sm">No deployments yet.</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-6">
            <div>
              <h2 className="text-2xl font-black tracking-tight">Settings</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage your account preferences and configuration</p>
            </div>

            <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 rounded-2xl p-6 space-y-6 shadow-sm">
              <h3 className="text-lg font-bold border-b border-gray-100 dark:border-white/5 pb-4">Profile Information</h3>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-white dark:border-[#0A0A0A]">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <button className="px-4 py-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl border border-gray-200 dark:border-white/10 text-sm font-semibold transition-colors">
                  Change Avatar
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name</label>
                  <input type="text" defaultValue={user?.name || ''} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
                  <input type="email" defaultValue={user?.email || ''} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" />
                </div>
              </div>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                Save Changes
              </button>
            </div>

            <div className="bg-white dark:bg-[#0A0A0A] border border-red-100 dark:border-red-500/20 rounded-2xl p-6 space-y-4 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-red-50 dark:bg-red-500/5 pointer-events-none"></div>
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-2">Danger Zone</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 max-w-lg">Once you delete your account, there is no going back. All your projects, deployments, and settings will be permanently erased.</p>
                <button className="px-6 py-3 bg-red-500 text-white font-bold text-sm rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20 active:scale-95">
                  Delete Account
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* New Project Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl"
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
