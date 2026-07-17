const express = require('express');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

// Auth middleware
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// GET all projects for user
router.get('/', verifyToken, async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId: req.user.id },
      orderBy: { updatedAt: 'desc' }
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET aggregated dashboard analytics stats
router.get('/user/dashboard-stats', verifyToken, async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId: req.user.id },
      select: { id: true }
    });
    const projectIds = projects.map(p => p.id);

    if (projectIds.length === 0) {
      return res.json({
        totalViews: 0,
        totalVisitors: 0,
        avgSessionDuration: 0,
        avgBounceRate: 0,
        chartData: [],
      });
    }

    const analytics = await prisma.analytics.findMany({
      where: { projectId: { in: projectIds } },
      orderBy: { createdAt: 'desc' }
    });

    const totalViews = analytics.reduce((sum, a) => sum + a.views, 0);
    const totalVisitors = analytics.reduce((sum, a) => sum + a.visitors, 0);
    const avgSession = analytics.length > 0
      ? Math.round(analytics.reduce((sum, a) => sum + a.avgSessionDuration, 0) / analytics.length)
      : 0;
    const avgBounce = analytics.length > 0
      ? Math.round(analytics.reduce((sum, a) => sum + a.bounceRate, 0) / analytics.length)
      : 0;

    const chartData = analytics.map(a => a.views);

    res.json({
      totalViews,
      totalVisitors,
      avgSessionDuration: avgSession,
      avgBounceRate: avgBounce,
      chartData,
    });
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// GET all deployments for the user's projects
router.get('/user/deployments', verifyToken, async (req, res) => {
  try {
    const deployments = await prisma.deployment.findMany({
      where: {
        project: { userId: req.user.id }
      },
      include: {
        project: { select: { name: true } }
      },
      orderBy: { updatedAt: 'desc' }
    });

    const result = deployments.map(d => ({
      id: d.id,
      project: d.project.name,
      branch: d.branch,
      status: d.status,
      url: d.url,
      time: d.updatedAt,
    }));

    res.json(result);
  } catch (error) {
    console.error('Failed to fetch deployments:', error);
    res.status(500).json({ error: 'Failed to fetch deployments' });
  }
});

// GET single project
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const project = await prisma.project.findFirst({
      where: { id: req.params.id, userId: req.user.id }
    });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// CREATE project
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, files, messages } = req.body;
    const project = await prisma.project.create({
      data: { name, files: files || {}, messages: messages || [], userId: req.user.id }
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// UPDATE project
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { name, files, messages } = req.body;
    const project = await prisma.project.updateMany({
      where: { id: req.params.id, userId: req.user.id },
      data: { name, files, messages }
    });
    if (project.count === 0) return res.status(404).json({ error: 'Project not found' });
    const updated = await prisma.project.findUnique({ where: { id: req.params.id } });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// DELETE project
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const project = await prisma.project.deleteMany({
      where: { id: req.params.id, userId: req.user.id }
    });
    if (project.count === 0) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// DEPLOY project to Vercel
router.post('/:id/deploy', verifyToken, async (req, res) => {
  try {
    const project = await prisma.project.findFirst({
      where: { id: req.params.id, userId: req.user.id }
    });
    if (!project) return res.status(404).json({ error: 'Project not found' });

    if (!process.env.VERCEL_TOKEN) {
      return res.status(400).json({ error: 'VERCEL_TOKEN is not configured in .env' });
    }

    const files = project.files || {};
    const vercelFiles = [];

    const getVercelPath = (path) => {
      let cleanPath = path.startsWith('/') ? path.slice(1) : path;
      if (cleanPath === 'App.js') {
        return 'src/App.js';
      } else if (!cleanPath.startsWith('src/') && !cleanPath.startsWith('public/') && (cleanPath.endsWith('.js') || cleanPath.endsWith('.jsx') || cleanPath.endsWith('.css'))) {
        return 'src/' + cleanPath;
      }
      return cleanPath;
    };

    Object.entries(files).forEach(([path, data]) => {
      let cleanPath = path.startsWith('/') ? path.slice(1) : path;
      if (!cleanPath.startsWith('server/')) {
        let code = data.code || '';
        if (cleanPath === 'App.js') {
          code = code.replace(/from\s+['"]\.\/(src\/)/g, "from './");
          code = code.replace(/import\s+['"]\.\/(src\/)/g, "import './");
        }
        vercelFiles.push({ file: getVercelPath(path), data: code });
      }
    });

    vercelFiles.push({
      file: 'package.json',
      data: JSON.stringify({
        name: (project.name.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase() || 'web-builder-ai-project').substring(0, 50),
        version: "0.1.0",
        private: true,
        dependencies: {
          "react": "^18.2.0",
          "react-dom": "^18.2.0",
          "react-scripts": "5.0.1",
          "react-router-dom": "^6.20.0",
          "lucide-react": "^0.292.0",
          "framer-motion": "^10.16.4"
        },
        scripts: {
          "start": "react-scripts start",
          "build": "react-scripts build",
          "test": "react-scripts test",
          "eject": "react-scripts eject"
        }
      }, null, 2)
    });

    vercelFiles.push({
      file: 'public/index.html',
      data: `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${project.name}</title><script src="https://cdn.tailwindcss.com"></script></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div></body></html>`
    });

    vercelFiles.push({
      file: 'src/index.js',
      data: `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\n\nconst root = ReactDOM.createRoot(document.getElementById('root'));\nroot.render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);`
    });

    // We must use node-fetch or native fetch in Node 18+ to call Vercel API
    const response = await fetch('https://api.vercel.com/v13/deployments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: (project.name.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase() || 'web-builder-ai-project').substring(0, 50),
        files: vercelFiles,
        target: 'production',
        projectSettings: {
          framework: 'create-react-app'
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Vercel API error:', data);
      return res.status(500).json({ error: 'Failed to deploy to Vercel', details: data });
    }

    const finalUrl = (data.alias && data.alias.length > 0) ? data.alias[0] : data.url;
    const vercelProjectName = (project.name.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase() || 'web-builder-ai-project').substring(0, 50);

    // Automatically disable Vercel Authentication so the deployment is public
    try {
      const teamId = data.teamId || data.creator?.teamId;
      const patchUrl = `https://api.vercel.com/v9/projects/${vercelProjectName}${teamId ? `?teamId=${teamId}` : ''}`;
      await fetch(patchUrl, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ssoProtection: null })
      });
    } catch (patchErr) {
      console.warn('Could not disable Vercel Protection:', patchErr.message);
    }

    const deployment = await prisma.deployment.create({
      data: {
        projectId: project.id,
        branch: 'main',
        status: 'Building',
        url: finalUrl
      }
    });

    res.json({ deployment, vercel: data, url: finalUrl });
  } catch (error) {
    console.error('Deploy error:', error);
    res.status(500).json({ error: 'Failed to deploy project' });
  }
});

module.exports = router;
