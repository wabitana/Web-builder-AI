const AgentBase = require('../AgentBase');

class FrontendDeveloper extends AgentBase {
  constructor(apiKey) {
    super(apiKey, 'FrontendDeveloper', 'Generates the structural React + Tailwind code.');
  }

  async execute(state) {
    const messages = [
      {
        role: "system",
        content: `You are an expert React and Tailwind CSS developer. Generate a COMPLETE, production-ready React application based on the wireframe plan.

Rules:
- Generate a multi-file architecture following Clean Architecture principles strictly.
- Organize files into structural layers: '/src/presentation/' (React UI, pages, components).
- Use React functional components with hooks.
- Use Tailwind CSS utility classes for ALL styling. Make it visually stunning.
- Return the output as a valid JSON object where keys are file paths (e.g., '/App.js', '/src/presentation/components/Hero.js') and values are objects containing a 'code' property.
- DO NOT generate '/index.js' or '/package.json'. Your main entry point MUST be exactly '/App.js'.
- If using React Router, you MUST use React Router v6 syntax (<Routes> instead of <Switch>, element={<Component />} instead of component={Component}).
- Example format:
{
  "/App.js": { "code": "..." },
  "/src/presentation/components/Hero.js": { "code": "..." }
}

Return ONLY the raw JSON object. Do not wrap it in markdown code blocks.`
      },
      { role: "user", content: JSON.stringify(state) }
    ];

    try {
      const result = await this.callLLM(messages, 0.7);
      
      // Parse output
      const cleanResult = result.replace(/^\`\`(?:json)?\n?/gm, '').replace(/\`\`$/gm, '').trim();
      const parsed = JSON.parse(cleanResult);
      
      // Merge into state
      state['frontenddeveloper'] = parsed;
    } catch (e) {
      console.error(`Failed in ${this.name}`, e.message);
    }
    
    return state;
  }
}

module.exports = FrontendDeveloper;
