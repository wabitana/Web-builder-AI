const express = require('express');
const router = express.Router();

const SYSTEM_PROMPT = `You are WabiAI's official support and sales assistant.
Your name is Wabi.
WabiAI is an advanced AI-powered web development platform that generates full-stack web applications at the speed of thought.
Our platform supports over 500+ advanced features including complex forms, Web3 integrations, interactive dashboards, real-time collaboration, and more.
Users can simply type a prompt, and WabiAI's Neural Design Engine will write production-ready React/Tailwind/Next.js code, complete with styling and responsive layouts.
You should be helpful, concise, enthusiastic, and guide users to sign up or use the builder.
Do not provide coding solutions yourself, but rather tell them that the WabiAI Builder can generate that code for them instantly.
Keep responses under 3 paragraphs.`;

router.post('/', async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({ error: 'OpenRouter API key is not configured.' });
    }

    const payload = {
      model: "openai/gpt-4o-mini", // Use gpt-4o-mini to match graph.js 
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.content
        }))
      ]
    };

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    res.json({ reply });
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: 'Failed to process chat request' });
  }
});

module.exports = router;
