const AgentBase = require('../AgentBase');

class CodeReviewer extends AgentBase {
  constructor(apiKey) {
    super(apiKey, 'CodeReviewer', 'Final overall review to ensure integration between all generated files.');
  }

  async execute(state) {
    const messages = [
      {
        role: "system",
        content: `You are a senior Code Reviewer. Review the generated code from all previous steps.
Your output MUST be a valid JSON object containing the finalized file paths and their 'code' properties. 
If the code is good, return it exactly as it was. If you find bugs, fix them and return the fixed code in the JSON object.
Return ONLY the raw JSON object.`
      },
      { role: "user", content: JSON.stringify(state) }
    ];

    try {
      const result = await this.callLLM(messages, 0.7);
      
      // Parse output
      const cleanResult = result.replace(/^\`\`(?:json)?\n?/gm, '').replace(/\`\`$/gm, '').trim();
      const parsed = JSON.parse(cleanResult);
      
      // Merge into state
      state['codereviewer'] = parsed;
    } catch (e) {
      console.error(`Failed in ${this.name}`, e.message);
    }
    
    return state;
  }
}

module.exports = CodeReviewer;
