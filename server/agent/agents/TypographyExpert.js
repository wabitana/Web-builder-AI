const AgentBase = require('../AgentBase');

class TypographyExpert extends AgentBase {
  constructor(apiKey) {
    super(apiKey, 'TypographyExpert', 'Selects modern font pairings and typographic scales.');
  }

  async execute(state) {
    const messages = [
      {
        role: "system",
        content: `You are a ${this.name}. ${this.roleDescription}\nGiven the current project state, provide your contribution. Respond in valid JSON format only.`
      },
      { role: "user", content: JSON.stringify(state) }
    ];

    try {
      const result = await this.callLLM(messages, 0.7);
      
      // Parse output
      const cleanResult = result.replace(/^\`\`(?:json)?\n?/gm, '').replace(/\`\`$/gm, '').trim();
      const parsed = JSON.parse(cleanResult);
      
      // Merge into state
      state['typographyexpert'] = parsed;
    } catch (e) {
      console.error(`Failed in ${this.name}`, e.message);
    }
    
    return state;
  }
}

module.exports = TypographyExpert;
