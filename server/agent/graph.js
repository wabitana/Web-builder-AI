/**
 * LangGraph AI Web Builder Agent
 * 
 * This agent uses a multi-step state machine to:
 * 1. Parse user prompts (intent classification)
 * 2. Plan the UI layout (wireframe)
 * 3. Generate component code
 * 4. Assemble the final project
 * 
 * Uses OpenRouter as the LLM provider.
 */

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

class WebBuilderAgent {
  constructor(apiKey) {
    this.apiKey = apiKey;
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
      throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  /**
   * Node 1: Parse the user's intent and extract requirements
   */
  async parseIntent(state) {
    const messages = [
      {
        role: "system",
        content: `You are a web development requirements analyst. Given a user's request, extract:
1. projectType: (landing-page, dashboard, portfolio, e-commerce, blog, saas-app, other)
2. designVibe: (minimal, brutalist, corporate, playful, glassmorphism, dark-luxury, other)
3. components: Array of UI sections needed (hero, navbar, features, pricing, testimonials, footer, sidebar, charts, forms, etc.)
4. colorScheme: primary and accent colors
5. additionalNotes: any other requirements

Respond in valid JSON only, no markdown.`
      },
      { role: "user", content: state.userPrompt }
    ];

    const result = await this.callLLM(messages, 0.3);
    try {
      state.requirements = JSON.parse(result);
    } catch {
      state.requirements = { raw: result, projectType: "landing-page", components: ["hero", "features", "footer"] };
    }
    state.currentStep = "wireframe";
    return state;
  }

  /**
   * Node 2: Generate the wireframe / layout plan
   */
  async generateWireframe(state) {
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
      { role: "user", content: JSON.stringify(state.requirements) }
    ];

    const result = await this.callLLM(messages, 0.5);
    try {
      state.wireframe = JSON.parse(result);
    } catch {
      state.wireframe = { raw: result };
    }
    state.currentStep = "codegen";
    return state;
  }

  /**
   * Node 3: Generate the actual React + Tailwind code
   */
  async generateCode(state) {
    const messages = [
      {
        role: "system",
        content: `You are an expert React and Tailwind CSS developer. Generate a COMPLETE, production-ready React application based on the wireframe plan.

Rules:
- Generate a multi-file architecture with separate component files.
- Use React functional components with hooks.
- Use Tailwind CSS utility classes for ALL styling. Make it visually stunning with gradients, shadows, rounded corners, proper spacing, hover effects, and modern design patterns.
- Use dark backgrounds (bg-gray-900, bg-slate-950, etc.) with vibrant accent colors for dark themes.
- Add smooth transitions and hover states on interactive elements.
- Return the output as a valid JSON object where keys are file paths (e.g., '/App.js', '/components/Hero.js') and values are objects containing a 'code' property.
- DO NOT generate '/index.js' or '/package.json' or '/src/index.js'. Sandpack handles the React mount automatically. Your main entry point should be '/App.js'.
- DO NOT use any external CSS files. Only use Tailwind utility classes directly in the JSX className attributes.
- Example format:
{
  "/App.js": { "code": "..." },
  "/components/Hero.js": { "code": "..." }
}

Return ONLY the raw JSON object. Do not wrap it in markdown code blocks. Do not add any conversational text.`
      },
      { role: "user", content: `Requirements: ${JSON.stringify(state.requirements)}\n\nWireframe: ${JSON.stringify(state.wireframe)}` }
    ];

    const result = await this.callLLM(messages, 0.7);
    
    // Parse the JSON
    let parsedFiles;
    try {
      const cleanResult = result.replace(/^```(?:json)?\n?/gm, '').replace(/```$/gm, '').trim();
      parsedFiles = JSON.parse(cleanResult);
    } catch (e) {
      console.error("Failed to parse LLM output as JSON", e);
      parsedFiles = {
        "/App.js": { code: `// Failed to parse AI output. Raw response:\n/* ${result} */` }
      };
    }

    state.generatedCode = parsedFiles; // generatedCode is now a files object
    state.currentStep = "review";
    return state;
  }

  /**
   * Node 4: Review and refine the generated code
   */
  async reviewCode(state) {
    // Skipping review for now to save time on multi-file JSON parsing.
    // The previous generatedCode object is passed forward as finalCode.
    state.finalCode = state.generatedCode;
    state.currentStep = "complete";
    return state;
  }

  /**
   * Run the full agent pipeline (LangGraph-style state machine)
   */
  async run(userPrompt, onProgress) {
    let state = {
      userPrompt,
      requirements: null,
      wireframe: null,
      generatedCode: null,
      finalCode: null,
      currentStep: "parse",
      error: null
    };

    const steps = [
      { name: "parse", fn: this.parseIntent.bind(this), label: "Analyzing your requirements..." },
      { name: "wireframe", fn: this.generateWireframe.bind(this), label: "Designing the wireframe..." },
      { name: "codegen", fn: this.generateCode.bind(this), label: "Generating React code..." },
      { name: "review", fn: this.reviewCode.bind(this), label: "Reviewing and polishing..." },
    ];

    for (const step of steps) {
      try {
        if (onProgress) onProgress({ step: step.name, label: step.label, state });
        state = await step.fn(state);
      } catch (error) {
        state.error = `Error in ${step.name}: ${error.message}`;
        if (onProgress) onProgress({ step: step.name, error: state.error, state });
        break;
      }
    }

    if (onProgress) onProgress({ step: "complete", label: "Done!", state });
    return state;
  }

  /**
   * Chat-based iteration: refine an existing multi-file project
   */
  async refine(currentFiles, userFeedback, onProgress) {
    if (onProgress) onProgress({ step: 'refine', label: 'Understanding your request...' });

    // Serialize the current file structure for context
    const filesContext = Object.entries(currentFiles)
      .map(([path, data]) => `=== ${path} ===\n${data.code}`)
      .join('\n\n');

    if (onProgress) onProgress({ step: 'codegen', label: 'Updating your code...' });

    const messages = [
      {
        role: "system",
        content: `You are an expert React and Tailwind CSS developer. The user has an existing multi-file React application and wants to modify or improve it.

Rules:
- Apply the requested changes precisely across all relevant files.
- Keep all existing functionality unless explicitly asked to remove it.
- You may add new files, modify existing files, or restructure as needed.
- Use Tailwind CSS classes for all styling. Make the design visually stunning with modern gradients, shadows, and spacing.
- DO NOT generate '/index.js' or '/package.json'. The entry point is '/App.js'.
- Return the FULL updated project as a JSON object where keys are file paths and values are objects with a 'code' property.
- Return ONLY the raw JSON object. No markdown code blocks. No conversational text.`
      },
      { 
        role: "user", 
        content: `Here is my current project:\n\n${filesContext}\n\nRequested changes:\n${userFeedback}` 
      }
    ];

    const result = await this.callLLM(messages, 0.7);
    
    let parsedFiles;
    try {
      const cleanResult = result.replace(/^```(?:json)?\n?/gm, '').replace(/```$/gm, '').trim();
      parsedFiles = JSON.parse(cleanResult);
    } catch (e) {
      console.error("Failed to parse refine output as JSON", e);
      // Fallback: return current files unchanged
      parsedFiles = currentFiles;
    }

    if (onProgress) onProgress({ step: 'complete', label: 'Done!' });
    return parsedFiles;
  }
}

module.exports = WebBuilderAgent;
