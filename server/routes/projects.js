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

module.exports = router;
