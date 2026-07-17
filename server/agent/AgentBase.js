const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

class AgentBase {
  constructor(apiKey, name, roleDescription) {
    this.apiKey = apiKey;
    this.name = name;
    this.roleDescription = roleDescription;
    this.model = "openai/gpt-4o-mini";
  }

  async callLLM(messages, temperature = 0.7) {
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Wabiai Web Builder"
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        temperature,
        max_tokens: 8192,
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`[${this.name}] API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  async execute(state) {
    // To be overridden by subclasses
    return state;
  }
}

module.exports = AgentBase;
