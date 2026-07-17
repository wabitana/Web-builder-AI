const AgentBase = require('../AgentBase');

class UIArchitect extends AgentBase {
  constructor(apiKey) {
    super(apiKey, 'UIArchitect', 'Plans the wireframe and component layout.');
  }

  async execute(state) {
    const messages = [
      {
        role: "system",
        content: `You are a UI/UX architect. Given project requirements, create a detailed wireframe plan.
For each component, describe:
- Layout structure (grid, flex, etc.)
- Key elements and their hierarchy
- Responsive behavior
- Interactions and animations

Respond in valid JSON with a "wireframe" array of component plans.`
      },
      { role: "user", content: JSON.stringify(state) }
    ];

    try {
      const result = await this.callLLM(messages, 0.7);
      
      // Parse output
      const cleanResult = result.replace(/^\`\`(?:json)?\n?/gm, '').replace(/\`\`$/gm, '').trim();
      const parsed = JSON.parse(cleanResult);
      
      // Merge into state
      state['uiarchitect'] = parsed;
    } catch (e) {
      console.error(`Failed in ${this.name}`, e.message);
    }
    
    return state;
  }
}

module.exports = UIArchitect;
