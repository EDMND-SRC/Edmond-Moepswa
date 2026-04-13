# Cursor IDE Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Cursor (cursor.com) — AI-assisted IDE
**Free Tier:** Hobby plan — 200 slow completions/month, 14-day trial of Pro features, then falls back to basic AI features

---

## Overview

Cursor is an AI-assisted code editor built on VS Code. It provides context-aware code completions, chat-based code generation, multi-file editing, and codebase understanding — all powered by AI models (Claude, GPT-4) integrated directly into the development workflow.

For Edmond's practice, Cursor serves as:

1. **Accelerated development** — Faster code generation, refactoring, and debugging across all web builds
2. **Codebase understanding** — Cursor indexes the entire project, enabling questions like "where is the form validation logic?" and "what does this hook do?"
3. **Rapid prototyping** — Generate boilerplate code, component structures, and API routes through natural language prompts
4. **Learning tool** — When working with unfamiliar technologies or libraries, Cursor explains code and suggests improvements

---

## Free Tier Limits (Hobby Plan — 2026)

| Feature | Limit |
|---------|-------|
| Slow AI completions | 200/month |
| Pro feature trial | 14 days (full access) |
| After trial: Basic AI features | Unlimited (uses free-tier models) |
| Codebase indexing | Unlimited |
| Chat-based code generation | Limited to 200 slow completions/month after trial |
| Multi-file editing | Available |
| Tab autocomplete | Available (basic model after trial) |
| Command-K (inline edit) | Limited to 200/month after trial |

**Pro plan ($20/month):** Unlimited fast completions, 2,000 premium model requests/month, unlimited slow completions, priority access to latest models.

**Business plan ($40/user/month):** Admin controls, privacy mode, usage analytics, SSO.

---

## By Service Category

### 1. Web Design & Development

#### Component Generation
- **Use case:** Describe a React component in natural language → Cursor generates the TypeScript, Tailwind CSS, and accessibility attributes → review and refine
- **Example prompt:** "Create a responsive pricing card component with three tiers (Basic, Pro, Enterprise), each with a feature list, price, and CTA button. Use Tailwind CSS. The Pro tier should be highlighted."
- **Value:** Generates the structural code in seconds — Edmond focuses on design refinement and brand customisation rather than boilerplate markup

#### Code Refactoring
- **Use case:** Select a block of code → Command-K → "Refactor this into a reusable hook" or "Add error handling and loading states"
- **Value:** Routine refactoring work is handled by AI — Edmond reviews the output for correctness and project conventions

---

### 2. Web Applications

#### Multi-File Architecture Changes
- **Use case:** "Add a new `status` field to the Product model — update the schema, the API route, and the admin form"
- **Cursor capability:** Codebase-aware editing — Cursor understands the project structure and makes consistent changes across multiple files
- **Value:** Architecture changes that would normally require searching through 5–10 files are handled in a single prompt

#### Database Schema Generation
- **Use case:** Describe the data model → Cursor generates Drizzle ORM schema definitions with proper types, relationships, and constraints
- **Example prompt:** "Create a Drizzle schema for an e-commerce store with products, categories, orders, order_items, and customers tables. Include proper foreign keys and default values."
- **Value:** Accelerates the initial setup phase of every application build

#### API Route Generation
- **Use case:** "Create a Next.js API route that handles form submissions — validates the input, stores in Supabase, and sends a notification email via Resend"
- **Value:** Generates the structural code with proper error handling, validation, and TypeScript types — Edmond focuses on business logic and edge cases

---

### 3. Development Workflow

#### Code Review and Explanation
- **Use case:** Paste unfamiliar code → "Explain what this does" → Cursor provides a line-by-line explanation
- **Value:** Faster onboarding to new codebases, faster debugging of unfamiliar libraries, faster learning of new frameworks

#### Bug Detection
- **Use case:** "Find the bug in this code — the form submits but the data doesn't reach the database"
- **Value:** AI-assisted debugging catches common mistakes (missing await, incorrect import, wrong column name) before manual debugging begins

#### Documentation Generation
- **Use case:** Select a function → "Write JSDoc documentation for this function"
- **Value:** Consistent documentation across the codebase without manual effort

---

## Quick-Win Implementations

### Priority 1: Cursor Rules Setup (15 min)
Create a `.cursorrules` file in every project to enforce consistent AI-generated code:

```
# .cursorrules
- Always use TypeScript with strict mode
- Use Tailwind CSS for styling — no inline styles
- Use arrow functions for React components
- Prefer const over let
- Use descriptive variable names (no single-letter variables)
- Add error handling to all async functions
- Use the `@/` path alias for src imports
- Follow the project's existing file structure and naming conventions
- Never use `any` — use proper TypeScript types
- Add comments for complex logic only — don't comment obvious code
```

### Priority 2: Project-Specific Context (30 min per project)
Add a `CURSOR.md` file at the project root with context:
```markdown
# Project Context

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL)
- Drizzle ORM
- Resend (email)
- Cal.com (booking)

## Conventions
- Components in src/components/ (PascalCase)
- API routes in src/app/api/ (kebab-case)
- Database schema in src/db/schema.ts
- Environment variables in .env.local

## Important Notes
- This is a client-facing project — accessibility is a priority
- The CMS is Keystatic — content is stored as Markdown in Git
- Deploy to Vercel — use Frankfurt region (fra1)
```

### Priority 3: AI-Assisted Testing (30 min)
- Use Cursor to generate Vitest unit tests: "Write tests for this utility function — cover the happy path and edge cases"
- Use Cursor to generate Playwright E2E tests: "Write an E2E test for the contact form submission flow"
- Review and refine the generated tests — AI-generated tests often miss project-specific context

---

## Resource Budget Planning

**Hobby plan (free) vs. Pro ($20/month):**

| Usage Pattern | Hobby (Free) | Pro ($20/mo) |
|---------------|-------------|-------------|
| Daily coding with AI assistance | 200 slow completions = ~7/day | Unlimited fast completions |
| Multi-file refactoring sessions | Quick consumption of budget | Comfortable usage |
| Code review and explanation | Sufficient for occasional use | Sufficient for heavy use |
| Boilerplate generation | Sufficient for new projects | Faster, higher-quality output |

**When to upgrade to Pro ($20/month):**
- Using Cursor as the primary IDE (not just occasionally)
- Need fast completions (slow completions on Hobby have ~10-second latency)
- Need premium model access (Claude Sonnet, GPT-4o) for complex reasoning
- 200 slow completions/month is regularly exhausted

**ROI calculation:** If Cursor saves 2 hours/week of development time, that's 8 hours/month. At Edmond's rate of P1,200/hour, that's P9,600/month in saved time — far exceeding the $20/month cost (~P270).

---

## Risks & Considerations

1. **AI-generated code quality:** Cursor's output is a starting point, not production-ready code. Always review for correctness, security, project conventions, and edge cases. AI can generate plausible-looking but incorrect code
2. **Privacy:** Cursor sends code to AI model providers (Anthropic, OpenAI). For client projects with sensitive code (proprietary algorithms, confidential business logic), review the client's data security requirements. Cursor's Business plan ($40/user/month) offers a privacy mode that doesn't train on your code
3. **Over-reliance:** AI assistance can create dependency — the ability to generate code quickly may reduce deep understanding of what the code actually does. Maintain the skill of writing code from first principles
4. **Slow completions on free tier:** After the 14-day Pro trial, completions use slower models with ~10-second latency. This is usable but significantly less productive than the Pro plan's fast completions
5. **Context window limits:** Cursor's codebase understanding has limits. For very large projects (50,000+ lines), Cursor may not maintain full context. Be specific about which files and functions to reference in prompts

---

## Summary: Value to Practice

| Use Case | Time Saved | Value |
|----------|-----------|-------|
| Component generation | 15–30 min per component | P300–600 per component |
| Schema generation | 30–60 min per project | P600–1,200 per project |
| API route generation | 15–30 min per route | P300–600 per route |
| Code refactoring | 30–60 min per session | P600–1,200 per session |
| Bug detection | 15–30 min per bug | P300–600 per bug |

**Key insight:** Cursor is the most impactful AI development tool in Edmond's stack — it directly accelerates the core activity of writing code. The free Hobby tier (200 slow completions/month) is sufficient for occasional use, but the Pro plan ($20/month) should be treated as essential infrastructure for a full-time developer. At P1,200/hour, even 1 hour of saved time per week pays for the subscription many times over. The critical discipline is review: AI-generated code is a draft, not a deliverable. Every output must be reviewed for correctness, security, type safety, and project conventions before committing.

---

**End of Cursor IDE Integration Strategy**
