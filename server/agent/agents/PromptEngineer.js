const AgentBase = require('../AgentBase');

class PromptEngineer extends AgentBase {
  constructor(apiKey) {
    super(apiKey, 'PromptEngineer', 'Expands short user ideas into highly detailed, modern software specifications.');
  }

  async execute(state) {
    const messages = [
      {
        role: "system",
        content: `You are an expert Prompt Engineer and Product Manager. Your task is to take a short, basic idea for a web application and expand it into a highly detailed, professional software specification.

Guidelines for the enhanced prompt:
- Make it "modern, clean, and impressive". Include specific instructions for sleek UI/UX, animations (using framer-motion), dark mode, glassmorphism, and a polished aesthetic.
- Specify essential features, database models, and API endpoints that would naturally belong in such an application.
- Break the prompt into clear sections: Overview, UI/UX Design, Core Features, and Database Schema.
- Keep the final output under 400 words, but make it extremely dense with technical and design requirements.
- The output should read as a direct instruction to the AI development team.

Return ONLY the enhanced prompt text.`
      },
      { role: "user", content: `Raw Idea: ${state.rawPrompt}` }
    ];

    try {
      const result = await this.callLLM(messages, 0.7);
      return result.trim();
    } catch (e) {
      console.error(`Failed in ${this.name}:`, e.message);
      return state.rawPrompt; // fallback to original prompt
    }
  }
}

module.exports = PromptEngineer;
