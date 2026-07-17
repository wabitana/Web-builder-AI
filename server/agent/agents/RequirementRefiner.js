const AgentBase = require('../AgentBase');

class RequirementRefiner extends AgentBase {
  constructor(apiKey) {
    super(apiKey, 'RequirementRefiner', 'Expands basic user prompts into technical specifications.');
  }

  async execute(state) {
    const messages = [
      {
        role: "system",
        content: `You are a web development requirements analyst. Given a user's request, extract:
1. projectType: (landing-page, dashboard, portfolio, e-commerce, blog, saas-app, other)
2. designVibe: (minimal, brutalist, corporate, playful, glassmorphism, dark-luxury, other)
3. components: Array of UI sections needed.
4. colorScheme: primary and accent colors.
5. targetAudience: Who the app is for.

Output MUST be valid JSON only.`
      },
      { role: "user", content: JSON.stringify(state) }
    ];

    try {
      const result = await this.callLLM(messages, 0.7);
      
      // Parse output
      const cleanResult = result.replace(/^\`\`(?:json)?\n?/gm, '').replace(/\`\`$/gm, '').trim();
      const parsed = JSON.parse(cleanResult);
      
      // Merge into state
      state['requirementrefiner'] = parsed;
    } catch (e) {
      console.error(`Failed in ${this.name}`, e.message);
    }
    
    return state;
  }
}

module.exports = RequirementRefiner;
