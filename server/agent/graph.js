/**
 * LangGraph AI Web Builder Agent
 * 
 * This agent uses a highly specialized multi-agent system comprising 20+ distinct sub-agents.
 */

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

// Import all 21 Agents
const RequirementRefiner = require('./agents/RequirementRefiner');
const UXResearcher = require('./agents/UXResearcher');
const DatabaseArchitect = require('./agents/DatabaseArchitect');
const ApiDesigner = require('./agents/ApiDesigner');
const StateManagementPlanner = require('./agents/StateManagementPlanner');
const UIArchitect = require('./agents/UIArchitect');
const ColorThemeDesigner = require('./agents/ColorThemeDesigner');
const TypographyExpert = require('./agents/TypographyExpert');
const ComponentSplitter = require('./agents/ComponentSplitter');
const FrontendDeveloper = require('./agents/FrontendDeveloper');
const BackendDeveloper = require('./agents/BackendDeveloper');
const Copywriter = require('./agents/Copywriter');
const AnimationSpecialist = require('./agents/AnimationSpecialist');
const SeoExpert = require('./agents/SeoExpert');
const AccessibilityAuditor = require('./agents/AccessibilityAuditor');
const SecurityAuditor = require('./agents/SecurityAuditor');
const PerformanceOptimizer = require('./agents/PerformanceOptimizer');
const QaTester = require('./agents/QaTester');
const DevOpsEngineer = require('./agents/DevOpsEngineer');
const TechnicalWriter = require('./agents/TechnicalWriter');
const CodeReviewer = require('./agents/CodeReviewer');

class WebBuilderAgent {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.model = "openai/gpt-4o-mini";
    
    // Initialize all agents
    this.agents = {
      requirementRefiner: new RequirementRefiner(apiKey),
      uxResearcher: new UXResearcher(apiKey),
      databaseArchitect: new DatabaseArchitect(apiKey),
      apiDesigner: new ApiDesigner(apiKey),
      stateManagementPlanner: new StateManagementPlanner(apiKey),
      uiArchitect: new UIArchitect(apiKey),
      colorThemeDesigner: new ColorThemeDesigner(apiKey),
      typographyExpert: new TypographyExpert(apiKey),
      componentSplitter: new ComponentSplitter(apiKey),
      frontendDeveloper: new FrontendDeveloper(apiKey),
      backendDeveloper: new BackendDeveloper(apiKey),
      copywriter: new Copywriter(apiKey),
      animationSpecialist: new AnimationSpecialist(apiKey),
      seoExpert: new SeoExpert(apiKey),
      accessibilityAuditor: new AccessibilityAuditor(apiKey),
      securityAuditor: new SecurityAuditor(apiKey),
      performanceOptimizer: new PerformanceOptimizer(apiKey),
      qaTester: new QaTester(apiKey),
      devOpsEngineer: new DevOpsEngineer(apiKey),
      technicalWriter: new TechnicalWriter(apiKey),
      codeReviewer: new CodeReviewer(apiKey),
    };
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

  async run(userPrompt, onProgress) {
    let state = {
      userPrompt,
      generatedCode: {},
      error: null
    };

    const runStep = async (stepName, label, agentKeys) => {
      if (onProgress) onProgress({ step: stepName, label, state });
      try {
        if (Array.isArray(agentKeys)) {
          // Run parallel agents
          await Promise.all(agentKeys.map(key => this.agents[key].execute(state)));
        } else {
          // Run sequential agent
          await this.agents[agentKeys].execute(state);
        }
      } catch (error) {
        state.error = `Error in ${stepName}: ${error.message}`;
        if (onProgress) onProgress({ step: stepName, error: state.error, state });
        throw error;
      }
    };

    try {
      // Phase 1: Planning & Architecture (Sequential)
      await runStep('planning_1', 'Refining requirements...', 'requirementRefiner');
      await runStep('planning_2', 'Researching UX...', 'uxResearcher');
      
      // Run Architecture planning in parallel
      await runStep('architecture', 'Planning DB, API & State...', ['databaseArchitect', 'apiDesigner', 'stateManagementPlanner']);
      
      // Phase 2: Design
      await runStep('design_1', 'Architecting UI Wireframes...', 'uiArchitect');
      await runStep('design_2', 'Designing Themes & Typography...', ['colorThemeDesigner', 'typographyExpert']);
      await runStep('design_3', 'Splitting atomic components...', 'componentSplitter');

      // Phase 3: Development (Core)
      await runStep('development', 'Writing Core React and Node Code...', ['frontendDeveloper', 'backendDeveloper']);
      
      // Phase 4: Audits & Enhancements (Highly parallelizable)
      await runStep('enhancements', 'Adding Copy & Animations...', ['copywriter', 'animationSpecialist']);
      await runStep('audits', 'Auditing SEO, Accessibility, Security & Performance...', [
        'seoExpert', 'accessibilityAuditor', 'securityAuditor', 'performanceOptimizer'
      ]);

      // Phase 5: Testing, DevOps & Documentation (Parallel)
      await runStep('ops', 'Generating Tests, CI/CD, and Documentation...', ['qaTester', 'devOpsEngineer', 'technicalWriter']);

      // Final Review
      await runStep('review', 'Final Code Review...', 'codeReviewer');
      
      // Consolidate final code
      // We merge outputs that look like files into generatedCode
      const allFiles = {};
      
      // If frontendDeveloper created a file map, we extract it. 
      // If it returned a raw JSON we merge it.
      if (state.frontenddeveloper && typeof state.frontenddeveloper === 'object') {
         Object.assign(allFiles, state.frontenddeveloper);
      }
      if (state.backenddeveloper && typeof state.backenddeveloper === 'object') {
         Object.assign(allFiles, state.backenddeveloper);
      }
      
      state.generatedCode = Object.keys(allFiles).length > 0 ? allFiles : {
         "/App.js": { code: "import React from 'react';\\n\\nexport default function App() { return <div className='p-10'>Project Generated by 21 AI Agents!</div> }" }
      };
      
      state.finalCode = state.generatedCode;

    } catch (e) {
      console.error("Pipeline failed", e);
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
- Ensure the project strictly follows Clean Architecture principles ('/src/presentation/', '/src/domain/', '/src/application/', '/src/infrastructure/').
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
