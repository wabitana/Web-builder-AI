const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const chatRoutes = require('./routes/chat');
const WebBuilderAgent = require('./agent/graph');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  },
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(passport.initialize());

// Routes
app.use('/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Wabiai API is running 🚀' });
});

// Socket.io — AI Agent WebSocket handler
io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);

  socket.on('generate', async (data) => {
    const { prompt, currentFiles } = data;

    if (!process.env.OPENROUTER_API_KEY) {
      socket.emit('error', { message: 'OpenRouter API key is not configured.' });
      return;
    }

    const agent = new WebBuilderAgent(process.env.OPENROUTER_API_KEY);

    try {
      // Check if we already have real generated files (not just the default placeholder)
      const hasExistingWork = currentFiles 
        && typeof currentFiles === 'object'
        && Object.keys(currentFiles).length > 1;

      if (hasExistingWork) {
        // Iterative refinement mode — update the existing project
        socket.emit('progress', { step: 'refine', label: 'Analyzing your existing code...' });
        const refined = await agent.refine(currentFiles, prompt, (progress) => {
          socket.emit('progress', progress);
        });
        socket.emit('result', { code: refined, step: 'complete' });
      } else {
        // Full generation mode — brand new project
        const result = await agent.run(prompt, (progress) => {
          socket.emit('progress', progress);
        });

        if (result.error) {
          socket.emit('error', { message: result.error });
        } else {
          socket.emit('result', { code: result.finalCode || result.generatedCode, state: result });
        }
      }
    } catch (error) {
      console.error('Agent error:', error);
      socket.emit('error', { message: error.message });
    }
  });

  socket.on('enhance_prompt', async (data) => {
    const { prompt } = data;
    if (!process.env.OPENROUTER_API_KEY) {
      socket.emit('enhance_result', { error: 'OpenRouter API key is not configured.' });
      return;
    }

    try {
      const PromptEngineer = require('./agent/agents/PromptEngineer');
      const engineer = new PromptEngineer(process.env.OPENROUTER_API_KEY);
      const enhancedPrompt = await engineer.execute({ rawPrompt: prompt });
      socket.emit('enhance_result', { enhancedPrompt });
    } catch (error) {
      console.error('PromptEngineer error:', error);
      socket.emit('enhance_result', { error: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`\n🚀 Wabiai server running on http://localhost:${PORT}`);
  console.log(`📡 WebSocket ready for connections\n`);
});
