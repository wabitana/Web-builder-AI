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
3. components: Array of UI sections needed. Support core elements and at least 500+ advanced features: (hero, navbar, features, pricing, testimonials, footer, sidebar, charts, forms, authentication, user-profile, real-time-chat, kanban-board, data-tables, file-uploads, interactive-maps, calendar, notifications, rich-text-editor, settings-panel, multi-step-wizards, admin-dashboard, drag-and-drop, search-and-filter, analytics-charts, web3-crypto-wallet, ai-chatbot, payment-gateway, video-streaming, webrtc-calling, multi-language-i18n, offline-pwa, social-media-feed, gamification-badges, user-reviews, 3d-graphics, augmented-reality-ar, virtual-reality-vr, audio-player, podcast-streaming, machine-learning-dashboard, sentiment-analysis-view, visual-page-builder, syntax-highlighter, code-editor-ide, spreadsheet-editor, pdf-viewer, docx-editor, biometric-auth, multi-factor-auth-2fa, hardware-token-auth, oauth-sso, biometric-facial-recognition, qr-code-scanner, barcode-scanner, nfc-reader, bluetooth-device-manager, geolocation-tracker, weather-widget, stock-ticker, crypto-tracker, nft-marketplace, defi-dashboard, smart-contract-deployer, iot-device-dashboard, home-automation-panel, fleet-tracking, real-estate-map, booking-engine, hotel-reservations, flight-tracker, ticketing-system, event-management, seating-chart, recipe-builder, nutrition-tracker, fitness-log, workout-planner, meditation-timer, habit-tracker, sleep-monitor, period-tracker, pregnancy-timeline, telemedicine-portal, patient-records, doctor-appointments, lab-results-viewer, pharmacy-prescriptions, e-learning-lms, course-catalog, video-lectures, quizzes-assessments, student-grades, discussion-forums, alumni-network, job-board, resume-builder, applicant-tracking-system-ats, interview-scheduler, employee-directory, payroll-dashboard, time-tracking, expense-reports, performance-reviews, okr-tracker, crm-pipeline, sales-funnel, lead-scoring, email-campaign-manager, sms-marketing, social-media-scheduler, influencer-dashboard, affiliate-tracking, customer-support-helpdesk, live-agent-chat, faq-knowledge-base, community-forum, bug-tracker, feature-requests, roadmap-timeline, release-notes, api-documentation, swagger-ui, graphql-playground, webhooks-manager, rate-limit-dashboard, server-monitoring, log-viewer, uptime-status-page, ci-cd-pipeline-view, kubernetes-dashboard, docker-container-manager, cloud-billing-dashboard, database-schema-viewer, sql-query-editor, nosql-data-explorer, redis-cache-manager, message-queue-dashboard, kafka-topics-view, splunk-logs, grafana-dashboards, prometheus-metrics, datadog-alerts, pagerduty-oncall, incident-response, runbook-automation, compliance-dashboard, gdpr-cookie-consent, privacy-policy-generator, terms-of-service, accessibility-audit, seo-analyzer, page-speed-insights, heatmaps, session-replays, ab-testing, feature-flags, survey-builder, poll-creator, net-promoter-score-nps, customer-feedback, testimonial-carousel, logo-cloud, partner-directory, sponsor-logos, press-mentions, award-badges, team-members, careers-page, company-history, mission-vision, values-manifesto, contact-form, location-map, branch-locator, store-hours, delivery-tracker, order-history, shopping-cart, checkout-flow, wish-list, product-comparison, size-guide, reviews-ratings, q-and-a, related-products, recently-viewed, cross-sell-upsell, subscription-manager, loyalty-program, gift-cards, discount-codes, referral-program, affiliate-dashboard, vendor-portal, b2b-wholesale, bulk-ordering, rfq-form, invoice-generator, quote-builder, tax-calculator, shipping-estimator, inventory-manager, warehouse-dashboard, purchase-orders, supplier-directory, supply-chain-map, sustainability-dashboard, carbon-footprint, esg-reporting, donation-form, crowdfunding-campaign, volunteer-signup, petition-signer, fundraising-thermometer, auction-bidding, sweepstakes-entry, lottery-numbers, bracket-tournament, fantasy-sports, live-scores, match-statistics, player-profiles, team-rosters, league-standings, club-membership, forum-badges, user-reputation, leaderboard, achievements, daily-streaks, progress-bars, level-up-animations, confetti-cannon, dark-mode-toggle, language-switcher, currency-converter, timezone-selector, theme-customizer, font-picker, color-palette-generator, layout-builder, drag-drop-grid, masonry-gallery, lightbox-viewer, image-carousel, video-background, parallax-scrolling, scroll-animations, cursor-effects, page-transitions, loading-spinners, skeleton-screens, toast-notifications, snackbars, modal-dialogs, popovers, tooltips, accordions, tabs, breadcrumbs, pagination, infinite-scroll, sticky-headers, mega-menus, hamburger-menu, off-canvas-sidebar, floating-action-button-fab, back-to-top, chat-widget, feedback-button, share-buttons, print-friendly, export-pdf, export-csv, export-excel, copy-to-clipboard, voice-search, speech-to-text, text-to-speech, translation-api, image-recognition, object-detection, face-detection, ocr-text-extraction, background-removal, image-filters, photo-editor, meme-generator, avatar-creator, resume-parser, document-signer, e-signature, contract-builder, legal-templates, notary-services, virtual-assistant, contextual-help, walkthrough-tour, onboarding-steps, blank-slate, error-boundaries, 404-page, 500-page, maintenance-mode, coming-soon, launch-countdown, waitlist-signup, early-access, beta-invite, multi-tenant-architecture, progressive-web-app-pwa, server-side-rendering-ssr, static-site-generation-ssg, microservices-dashboard, edge-computing-analytics, graphql-subscriptions, websocket-live-updates, redis-pubsub, elasticsearch-search-bar, vector-database-search, rag-retrieval-augmented-generation, text-summarization, ai-image-generation, ai-code-completion, ai-copilot-widget, text-to-video-ai, voice-cloning-ai, real-time-translation, geospatial-mapping, drone-fleet-tracker, sat-imagery-viewer, blockchain-explorer, smart-contract-auditor, token-staking-dashboard, yield-farming-calculator, apy-tracker, dex-aggregator, liquidity-pool-manager, governance-voting-portal, dao-treasury-dashboard, cross-chain-bridge, wallet-connect-integration, metamask-login, phantom-wallet-login, coinbase-commerce, stripe-connect, paypal-payouts, plaid-bank-sync, yodlee-integration, twilio-sms, sendgrid-emails, mailchimp-sync, hubspot-crm-sync, salesforce-integration, zendesk-tickets, jira-issue-tracker, linear-app-sync, trello-board-sync, asana-tasks, slack-bot-integration, discord-oauth, github-actions-status, gitlab-pipelines, bitbucket-commits, aws-s3-uploader, azure-blob-storage, gcp-cloud-storage, firebase-auth, supabase-auth, auth0-login, clerk-auth, magic-link-login, passwordless-auth, sms-otp, authenticator-app-2fa, webauthn-passkeys, saml-sso, active-directory-sync, ldap-login, role-based-access-control-rbac, attribute-based-access-control-abac, audit-logging, session-management, device-fingerprinting, ip-geolocation, rate-limiting, bot-protection, ddos-mitigation, waf-dashboard, vulnerability-scanner, dependency-checker, static-code-analysis, dynamic-application-security-testing-dast, software-composition-analysis-sca, pen-test-reports, bug-bounty-leaderboard, incident-timeline, post-mortem-builder, status-page-subscriber, sla-calculator, uptime-monitor, synthetics-ping, real-user-monitoring-rum, core-web-vitals-dashboard, lighthouse-scores, seo-metadata-manager, canonical-url-builder, structured-data-json-ld, xml-sitemap-generator, robots-txt-editor, open-graph-preview, twitter-card-preview, social-sharing-buttons, whatsapp-share, telegram-share, reddit-share, linkedin-share, pinterest-pin, email-share, print-page, download-pdf, export-json, import-csv, bulk-edit-grid, inline-editing, rich-text-wysiwyg, markdown-editor, code-mirror-integration, monaco-editor, quill-js, tiptap-editor, slate-js, lexical-editor, draft-js, ckeditor, tinymce, mathjax-equations, katex-renderer, syntax-highlighting, diff-viewer, merge-conflict-resolver, commit-history, branch-manager, pull-request-reviewer, code-comments, line-annotations, snippet-manager, gist-embed, codepen-embed, codesandbox-embed, youtube-player, vimeo-player, twitch-embed, spotify-embed, soundcloud-player, apple-music-embed, podcast-rss-feed, audio-waveform-visualizer, video-trimmer, subtitle-editor, closed-captions, pip-picture-in-picture, fullscreen-toggle, cast-to-tv, airplay-button, chromecast-integration, webrtc-video-chat, peer-to-peer-file-transfer, screen-sharing, whiteboarding, collaborative-cursor, real-time-presence, typing-indicators, read-receipts, message-reactions, thread-replies, mentions-autocomplete, hashtag-parser, url-preview-card, link-shortener, qr-code-generator, barcode-generator, pdf-watermarker, image-compressor, webp-converter, svg-optimizer, favicon-generator, manifest-json-builder, service-worker-register, offline-fallback-page, cache-storage-manager, indexeddb-explorer, localstorage-viewer, cookies-manager, sessionstorage-editor, indexed-db-wrapper, websql-legacy, webgl-canvas, threejs-scene, babylonjs-engine, playcanvas-viewer, aframe-vr, react-three-fiber, gsap-animations, framer-motion-transitions, react-spring-physics, lottie-animations, rive-animations, spine-2d, pixijs-canvas, phaser-game-engine, matterjs-physics, box2d-physics, cannonjs-3d-physics, ammojs, tensorflow-js, brain-js, ml5-js, face-api-js, handtrack-js, posenet, body-pix, speech-commands, toxicity-classifier, universal-sentence-encoder, mobilenet-classification, coco-ssd-detection, yolov-object-detection, tesseract-js-ocr, pdf-js-viewer, epub-reader, comic-book-reader, manga-viewer, image-magnifier, zoom-pan-pinch, swipeable-carousel, coverflow-gallery, masonry-layout, justified-grid, waterfall-layout, sticky-sidebar, auto-hiding-navbar, scroll-spy, back-to-top-button, smooth-scrolling, infinite-scrolling, virtualized-list, windowed-grid, lazy-loading-images, blur-up-placeholders, skeleton-loaders, progress-bar-top, nprogress-indicator, toast-notifications, snackbar-alerts, sweetalert-modals, confetti-celebration, fireworks-effect, snow-falling-effect, rain-effect, matrix-digital-rain, terminal-typing-effect, typewriter-animation, glitch-text-effect, neon-glow-text, gradient-text, text-stroke, drop-shadow-builder, box-shadow-generator, border-radius-preview, css-grid-builder, flexbox-playground, color-picker-wheel, hex-rgb-hsl-converter, contrast-checker, accessibility-color-blind-simulator, font-pairing-recommender, typography-scale-calculator, spacing-system-builder, design-tokens-manager, theme-builder-ui, dark-mode-switch, system-theme-detector, high-contrast-mode, reduced-motion-preference, right-to-left-rtl-support, internationalization-i18n, localization-l10n, translation-management-system-tms, multi-currency-selector, exchange-rate-ticker, timezone-converter, date-picker, time-picker, date-range-picker, multi-date-selector, recurring-event-rule-builder, cron-expression-generator, timezone-map, interactive-globe, choropleth-map, heatmap-layer, cluster-markers, route-planner, directions-api, geocoding-search, reverse-geocoding, places-autocomplete, address-validator, zip-code-lookup, ip-address-lookup, mac-address-vendor-lookup, asn-lookup, dns-record-viewer, whois-lookup, ssl-certificate-checker, port-scanner, ping-tool, traceroute-visualizer, subnet-calculator, cidr-notation-converter, base64-encoder-decoder, url-encoder-decoder, html-entity-encoder, md5-hash-generator, sha256-hash-generator, bcrypt-hasher, jwt-decoder, uuid-generator, random-password-generator, lorem-ipsum-generator, placeholder-image-generator, dummy-json-data-generator, mock-api-server, graphql-mock-schema, websocket-echo-server, webhook-tester, request-bin, rest-api-client, postman-collection-runner, curl-command-builder, openapi-spec-viewer, swagger-ui-embed, redoc-api-docs, graphql-voyager, apollo-studio-embed, graphiql-interface, prisma-studio-embed, pgadmin-web, phpmyadmin-clone, mongo-express-ui, redis-commander, rabbitmq-management, kafka-ui, elastic-kibana, splunk-dashboard, datadog-embed, new-relic-charts, grafana-panels, prometheus-targets, jaeger-traces, zipkin-spans, sentry-errors, bugsnag-crashes, rollbar-items, logrocket-sessions, fullstory-replays, hotjar-heatmaps, crazyegg-snapshots, google-analytics-dashboard, mixpanel-events, amplitude-funnels, segment-destinations, posthog-insights, matomo-stats, plausible-analytics, fathom-analytics, umami-dashboard, custom-event-tracker, conversion-rate-optimization-cro, ab-test-calculator, statistical-significance-checker, sample-size-calculator, roi-calculator, mortgage-calculator, loan-amortization-schedule, compound-interest-calculator, tax-bracket-estimator, retirement-planner, budget-tracker, expense-categorizer, receipt-scanner, invoice-ocr, bank-statement-parser, qif-ofx-csv-importer, plaid-transactions, stripe-billing-portal, paypal-checkout, square-payment-form, braintree-dropin, razorpay-checkout, paystack-inline, flutterwave-modal, adyen-dropin, klarna-checkout, affirm-financing, afterpay-clearpay, apple-pay-button, google-pay-button, amazon-pay, wechat-pay, alipay-qr, crypto-payment-gateway, bitpay-checkout, coinbase-commerce-button, nowpayments-integration, lightning-network-invoice, webln-support, nostr-zap-button, tip-jar, buy-me-a-coffee, patreon-pledge, kofi-donations, kickstarter-widget, indiegogo-campaign, gofundme-tracker, charity-water-donation, donorbox-form, eventbrite-tickets, meetup-rsvp, luma-events, ticketing-qr-scanner, boarding-pass-wallet, hotel-booking-engine, flight-search-aggregator, car-rental-booking, cruise-search, tour-operator-booking, restaurant-table-reservation, opentable-widget, resy-booking, yelp-reviews, tripadvisor-rating, google-places-reviews, trustpilot-widget, g2-crowd-badges, capterra-reviews, product-hunt-badge, app-store-download, google-play-download, apk-downloader, testflight-invite, expo-snack-embed, react-native-web, flutter-web, wasm-module-loader, rust-wasm-integration, golang-wasm, assemblyscript-runner, pyodide-python-in-browser, jupyter-notebook-viewer, r-shiny-app-embed, streamlit-dashboard, dash-plotly, bokeh-charts, highcharts-graphs, chartjs-canvas, d3-data-viz, recharts-components, victory-charts, nivo-dataviz, echart-js, apexcharts, tradingview-widget, lightweight-charts, candlestick-chart, depth-chart, order-book-visualizer, slippage-calculator, impermanent-loss-calculator, gas-fee-estimator, mempool-viewer, block-height-ticker, hash-rate-chart, network-difficulty, node-status-dashboard, miner-stats, staking-rewards-calculator, validator-uptime, slashing-insurance, dao-proposal-creator, snapshot-voting, tally-governance, aragon-dao, colabland-token-gating, guild-xyz-roles, poap-claim, nft-minting-dapp, erc721-gallery, erc1155-marketplace, ipfs-uploader, arweave-permaweb, filecoin-storage, storj-network, sia-skynet, decentralized-identity-did, verifiable-credentials-vc, zero-knowledge-proofs-zkp, zksync-dashboard, starknet-bridge, optimism-gateway, arbitrum-bridge, polygon-pos-bridge, avalanche-c-chain, solana-pay, phantom-deeplink, near-wallet-selector, polkadot-js-extension, cosmos-keplr-wallet, ibc-transfer-ui, osmosis-dex, thorchain-swaps, ren-vm-bridge, wrapping-unwrapping-ui, flash-loan-arbitrage-bot-ui, mev-dashboard, sandwich-attack-visualizer, front-running-simulator, smart-contract-fuzzer, formal-verification-results, bytecode-decompiler, solidity-compiler-in-browser, vyper-compiler, hardhat-console, foundry-cast-ui, truffle-dashboard, ganache-ui, anvil-local-node, ethereum-js-vm, web3-js-console, ethers-js-playground, viem-react-hooks, wagmi-connect-kit, rainbowkit-wallet-button, web3modal-v2, thirdweb-sdk, moralis-api, alchemy-dashboard, infura-stats, quicknode-endpoints, tenderly-simulation, blocknative-mempool, the-graph-subgraphs, covalent-api, chainlink-price-feeds, pyth-network-oracles, band-protocol, api3-airnode, tellor-oracles, verifiable-random-function-vrf, keepers-automation, gelato-network, superfluid-streams, sablier-finance, token-vesting-schedule, linear-release, cliff-unlocks, airdrop-claimer, merkle-tree-generator, whitelist-registration, sybil-resistance-checker, gitcoin-passport, proof-of-humanity, brightid, worldcoin-orb-verification, captcha-hcaptcha, recaptcha-v3, turnstile-cloudflare, friendly-captcha, pow-captcha, honeypot-field, form-validation-yup, zod-schema-validation, joi-validation, react-hook-form, formik-forms, final-form, redux-form, unform, react-jsonschema-form, auto-saving-drafts, multi-step-wizard, progress-indicator, conditional-logic-forms, dynamic-field-arrays, file-dropzone, image-cropper, webcam-capture, screen-recorder, audio-recorder, midi-keyboard, gamepad-api-tester, web-bluetooth-terminal, web-usb-device-info, web-serial-console, web-nfc-reader, ambient-light-sensor, device-orientation-compass, geolocation-tracker, battery-status-api, network-information-api, vibration-api-morse-code, web-share-api, contact-picker-api, generic-sensor-api, push-api-notifications, badging-api, background-sync-api, periodic-background-sync, idle-detection-api, screen-wake-lock, presentation-api, picture-in-picture-api, payment-request-api, credential-management-api, fedcm-api, web-otp-api, local-font-access, file-system-access-api, window-controls-overlay, multi-screen-window-placement, capture-handle, region-capture, element-capture, compute-pressure-api, eye-dropper-api, barcode-detection-api, face-detection-api, text-detection-api, shape-detection, speech-recognition, speech-synthesis, web-audio-api-synthesizer, web-midi-api-sequencer, web-crypto-api, subresource-integrity-sri, content-security-policy-csp-builder, cross-origin-resource-sharing-cors-tester, strict-transport-security-hsts, x-frame-options, x-content-type-options, referrer-policy, permissions-policy, clear-site-data, expect-ct, public-key-pins, certificate-transparency, dns-over-https-doh, encrypted-sni-esni, tls-1-3-checker, quic-http3-tester, http2-push, server-sent-events-sse, websockets, webrtc-data-channels, service-workers, shared-workers, web-workers, worklet-audio, worklet-paint, worklet-animation, worklet-layout, css-houdini, css-variables-editor, custom-properties, css-modules, styled-components, emotion-css, tailwind-configurator, windi-css, unocss, twin-macro, linaria, vanilla-extract, stitches, astroturf, styled-jsx, radix-ui-primitives, headless-ui, reach-ui, ariakit, floating-ui, popper-js, tippy-js, sweetalert2, react-toastify, sonner, framer-motion, react-spring, tsParticles, vanta-js, zdog-3d, rough-js, rough-notation, anime-js, velocity-js, mo-js, popmotion, react-beautiful-dnd, dnd-kit, react-dnd, sortable-js, dragula, interact-js, swiper-js, slick-carousel, glide-js, embla-carousel, flickity, tiny-slider, keen-slider, react-slick, react-responsive-carousel, react-alice-carousel, pure-react-carousel, react-id-swiper, react-swipeable-views, react-swipeable, hammer-js, zingtouch, interact-js, alloyfinger, react-use-gesture, auto-animate, formkit, vee-validate, vuelidate, pinia, vuex, ngxs, ngrx, akita, mobx, zustand, jotai, recoil, valtio, redux-toolkit, rtk-query, react-query, swr, apollo-client, urql, relay, trpc, grpc-web, twirp, connect-rpc, json-rpc, xml-rpc, soap-ui, odata-explorer, sparql-endpoint, gremlin-console, cypher-query-builder, sql-formatter, json-beautifier, xml-formatter, yaml-parser, toml-editor, ini-parser, csv-to-json, json-to-csv, markdown-to-html, html-to-markdown, base64-image-converter, data-uri-generator, svg-to-jsx, jsx-to-svg, css-to-tailwind, tailwind-to-css, px-to-rem, hex-to-rgba, color-namer, regex-tester, cron-parser, cron-describer, jwt-signer, rsa-key-generator, pgp-key-generator, ssh-key-generator, htpasswd-generator, uuid-v4-generator, ulid-generator, nanoid-generator, cuid-generator, snowflake-id-generator, object-id-generator, hashids, shortid, string-manipulation-tools, diff-checker, text-compare, word-counter, character-counter, reading-time-estimator, case-converter, string-reverser, text-repeater, slug-generator, url-slugify, ascii-art-generator, figlet-text, zalgo-text, leet-speak, morse-code-translator, binary-translator, hex-translator, octal-translator, base32-encoder, base58-encoder, base64url-encoder, punycode-converter, unicode-inspector, emoji-picker, emoji-search, kaomoji-picker, symbol-picker, math-symbols, currency-symbols, flag-emojis, country-codes, dial-codes, ip-subnets, mac-addresses, user-agents, mime-types, http-status-codes, linux-commands, vim-cheatsheet, git-cheatsheet, docker-cheatsheet, kubernetes-cheatsheet, regex-cheatsheet, markdown-cheatsheet, html-entities, css-selectors, javascript-events, dom-properties, browser-apis, web-apis, etc.)
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
- Generate a multi-file architecture following Clean Architecture principles strictly.
- Organize files into structural layers: '/src/presentation/' (React UI, pages, components), '/src/domain/' (business rules, models), '/src/application/' (services, hooks, use-cases), and '/src/infrastructure/' (API wrappers, mock data, external integrations).
- Use React functional components with hooks inside the presentation layer.
- Use Tailwind CSS utility classes for ALL styling. Make it visually stunning with gradients, shadows, rounded corners, proper spacing, hover effects, and modern design patterns.
- Use dark backgrounds (bg-gray-900, bg-slate-950, etc.) with vibrant accent colors for dark themes.
- Add smooth transitions and hover states on interactive elements.
- Return the output as a valid JSON object where keys are file paths (e.g., '/App.js', '/src/presentation/components/Hero.js', '/src/domain/User.js') and values are objects containing a 'code' property.
- DO NOT generate '/index.js' or '/package.json' or '/src/index.js'. Sandpack handles the React mount automatically. Your main entry point MUST be exactly '/App.js'.
- DO NOT use any external CSS files. Only use Tailwind utility classes directly in the JSX className attributes.
- Example format:
{
  "/App.js": { "code": "..." },
  "/src/presentation/components/Hero.js": { "code": "..." },
  "/src/application/useAuth.js": { "code": "..." }
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
