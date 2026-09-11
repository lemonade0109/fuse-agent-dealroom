# Fuse Agent Dealroom

A proof-of-work prototype exploring how an AI-native sales platform can turn account signals into an explainable next-best action, keep a human in control of customer-facing decisions, and hand approved actions into an auditable agent execution workflow.

Built as a product and engineering exploration for **Fuse AI**.

## The idea

AI sales agents can research accounts and draft actions quickly, but customer-facing automation needs more than generation. Teams also need to understand **why** an action was recommended, inspect the evidence behind it, edit the output, approve or reject it, and see what happened afterward.

**Account signals → AI strategy → Evidence → Human review → Approval → Agent execution → Audit trail**

## Product walkthrough

### 1. Account intelligence

The Dealroom starts with opportunity context and signals such as hiring activity, buying intent, and the likely decision maker. The Strategy Agent can then analyze those signals.

![Account intelligence dashboard](public/screenshots/01-account-intelligence.png)

### 2. AI-generated recommendation

The Strategy Agent sends the supplied account context to Gemini and generates a next-best action, reasoning, confidence score, and concise outreach draft.

![AI-generated sales recommendation](public/screenshots/02-ai-recommendation.png)

### 3. Human review and approval

Before a customer-facing action is released, the user can inspect the recommendation and supporting evidence, edit the outreach message, approve it, or reject it.

![Human approval workflow](public/screenshots/03-human-review.png)

### 4. Approved action enters execution

Once approved, the exact message selected by the human is carried into the execution view. The interface makes the handoff across Research, Enrichment, Strategy, Human Approval, and Outreach explicit.

![Agent execution ready](public/screenshots/04-execution-ready.png)

### 5. Auditable completion

The Outreach Agent can execute the approved action in the prototype. The UI records the completed state and shows the chain that led to execution.

![Completed agent execution](public/screenshots/05-execution-complete.png)

## What is actually AI-powered?

The recommendation flow calls the **Gemini API server-side** through a Next.js API route.

Gemini receives the supplied account context and signals and returns structured data containing:

```json
{
  "recommendation": "specific next action",
  "reasoning": "evidence-grounded explanation",
  "confidence": 92,
  "message": "personalized outreach draft"
}
```

The generated recommendation is carried into the review workflow instead of being replaced with static copy. The model is instructed to use only the supplied account information and not invent unsupported facts.

## Human-in-the-loop design

The core product decision is that generation and execution are separate steps.

The AI can analyze supplied signals, recommend an action, explain its reasoning, and generate an outreach draft. The human controls editing, approval, rejection, and whether the action is released for execution.

That creates a visible control point between **agent reasoning** and **customer-facing action**.

## Architecture

```text
Mock account intelligence
        │
        ▼
Next.js Dealroom UI
        │
        ▼
POST /api/recommendation
        │
        ▼
Gemini Strategy Agent
        │
        ▼
Structured recommendation
        │
        ▼
Human review / edit / approve
        │
        ▼
Approved action
        │
        ▼
Simulated Outreach Agent execution
        │
        ▼
Execution status + audit trail
```

For this focused proof of work, browser `sessionStorage` carries the generated recommendation and approved message between screens. A production implementation would persist workflow state and audit events in a backend datastore.

## Tech stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Google Gemini via `@google/genai`
- Lucide React
- `sessionStorage` for lightweight prototype workflow state

## Run locally

Install dependencies:

```bash
npm install
```

Create `.env.local` in the project root:

```env
GEMINI_API_KEY=your_google_ai_studio_key
GEMINI_MODEL=gemini-3.6-flash
```

Start the app:

```bash
npm run dev
```

Then open `http://localhost:3000`.

> Keep `GEMINI_API_KEY` server-side. Do not commit `.env.local` to source control.

## Prototype scope

This is intentionally a focused proof of concept, not a production CRM.

The account intelligence and supporting evidence shown in the demo are representative prototype data. Outreach execution is simulated and does **not** send a real email or write to a CRM.

The live Gemini recommendation is the real AI integration. The goal is to demonstrate the product interaction and engineering architecture around trustworthy, human-controlled agent execution without disguising prototype behavior as production integrations.

## Why I built it

I wanted to explore a product problem that becomes increasingly important as GTM agents gain more autonomy: **how do you make AI-generated actions fast without making them opaque or uncontrollable?**

The Dealroom is one answer: give agents room to research and reason, while making evidence, human judgment, execution state, and accountability part of the same workflow.

---

Built by **Jubril Oyebamiji** as a proof-of-work project for Fuse AI.
