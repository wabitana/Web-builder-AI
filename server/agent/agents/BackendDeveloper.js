const AgentBase = require('../AgentBase');

class BackendDeveloper extends AgentBase {
  constructor(apiKey) {
    super(apiKey, 'BackendDeveloper', 'Generates the server-side logic and API routes.');
  }

  async execute(state) {
    const messages = [
      {
        role: "system",
        content: `You are an expert Node.js and Express developer. Generate the backend structure.
Rules:
- Organize into routes, controllers, and services.
- Return output as a valid JSON object where keys are file paths (e.g., '/server/index.js') and values are objects containing a 'code' property.
- Example format:
{
  "/server/index.js": { "code": "..." },
  "/server/routes/api.js": { "code": "..." }
}

Return ONLY the raw JSON object. Do not wrap in markdown.`
      },
      { role: "user", content: JSON.stringify(state) }
    ];

    try {
      const result = await this.callLLM(messages, 0.7);
      
      // Parse output
      const cleanResult = result.replace(/^\`\`(?:json)?\n?/gm, '').replace(/\`\`$/gm, '').trim();
      const parsed = JSON.parse(cleanResult);
      
      // Merge into state
      state['backenddeveloper'] = parsed;
    } catch (e) {
      console.error(`Failed in ${this.name}`, e.message);
    }
    
    return state;
  }
}

module.exports = BackendDeveloper;
