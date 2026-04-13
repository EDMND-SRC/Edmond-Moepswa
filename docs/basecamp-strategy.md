# Basecamp Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Basecamp (basecamp.com)
**Your Plan:** Pro Unlimited — $119/month (100% student discount, grandfathered)
**CLI Installed:** ✅ `basecamp version 0.7.2` (authenticated via OAuth)

---

## Overview

Basecamp is the primary project management and client collaboration platform for all of Edmond's service offerings. It serves as the single system of record — replacing scattered tools (Slack, email threads, spreadsheets, file shares, status meetings) and consolidating every project, client relationship, and internal workflow into one predictable, auditable environment.

The Pro Unlimited plan at $119/month (student discount) provides unlimited users, unlimited projects, 5 TB storage, priority support, and all add-ons included (Timesheet, Admin Pro Pack). This is exceptional value — the standard price is $299/month billed annually or $349/month monthly. **Maintaining this discount is a strategic advantage.**

Basecamp operates in three roles for Edmond's practice:

1. **Internal operations backbone** — Managing BridgeArc's own projects, pipelines, documentation, and team workflows
2. **Client collaboration platform** — Shared workspaces where clients see progress, provide feedback, approve deliverables, and track milestones — without access to internal drafts or unfinished work
3. **Agentic automation surface** — The Basecamp CLI (`basecamp-cli`) and SDK provide 100% API coverage (155/155 endpoints) enabling AI agents, CI/CD pipelines, and automated workflows to read/write project data programmatically

---

## Your Plan: What You Get

| Feature | Limit |
|---------|-------|
| Users | Unlimited (no per-user charges) |
| Projects | Unlimited |
| Storage | 5 TB |
| Clients/Contractors | Free (no per-user charges) |
| Support | 24/7/365 priority (<1 hour response) |
| Timesheet add-on | Included |
| Admin Pro Pack | Included |
| Onboarding | Personal session with Basecamp experts |
| Platforms | Web, Mac, Windows, iOS, Android |

**Add-ons included in your plan (would cost extra on Plus):**
- **Timesheet** ($50/month standalone on Plus) — Track time on tasks/meetings, generate aggregate reports for billing
- **Admin Pro Pack** ($50/month standalone on Plus) — Mandatory 2FA, 15-min edit/delete limits, granular project controls, public links, content archiving, OOO management

**Effective value:** At $119/month for what normally costs $399+/month, this plan saves ~$280/month ($3,360/year). Losing it would be a significant cost increase.

---

## Platform Architecture: How Basecamp Works

### Project Structure

Every project in Basecamp contains the same predictable set of tools ("the dock"):

| Tool | Purpose |
|------|---------|
| **Message Board** | Announcements, updates, discussions — replaces email chains |
| **To-dos** | Task tracking with assignments, deadlines, and accountability |
| **To-do Lists** | Grouped tasks organised into sections |
| **Card Table** | Kanban boards for process flows, pipelines, and idea tracking |
| **Docs & Files** | Document storage, version control, file sharing |
| **Schedule** | Deadlines, milestones, calendar sync (Google/Apple/Outlook) |
| **Campfire** | Group chat for real-time discussion |
| **Pings** | Direct messaging for 1:1 or small group ad-hoc conversations |
| **Automatic Check-ins** | Automated status questions ("What did you work on today?") |
| **Lineup** | Visual timeline showing all projects on one screen |

### Client Access Model

- Clients, contractors, and guests can be added to **any project for free**
- Client visibility is controllable — unfinished work can be hidden from clients using the `client_visibility` toggle on recordings
- Clients can respond via email — replies are logged automatically in the project
- Clients see only what they're given access to — no risk of exposing internal drafts
- Every decision, approval, and feedback is permanently recorded and searchable

### Communication Philosophy

Basecamp is designed for **asynchronous, written communication**. This aligns with Edmond's work style:

- No expectation of instant response (unlike Slack)
- Every conversation is searchable and permanent
- The "Hey!" menu aggregates all notifications into one non-intrusive list
- Work communication stays out of personal WhatsApp/email
- Time-zone friendly (clients in different time zones aren't penalised)

---

## By Service Category

### 1. Web Design & Development Projects

#### Project Structure Standard

Every web build gets a dedicated Basecamp project with this structure:

```
[Client Name] — [Project Type]
├── Message Board
│   ├── Kickoff: Project brief, scope confirmation
│   ├── Design Review: Visual direction, colour, typography approvals
│   ├── Development Update: Progress reports, blockers
│   ├── Pre-Launch: Testing, final review, go-live coordination
│   └── Post-Launch: Handover, support window opens
├── To-do Lists
│   ├── Phase 1: Discovery & Strategy
│   │   ├── Discovery call completed
│   │   ├── Brand brief delivered
│   │   └── Competitive landscape audit
│   ├── Phase 2: Design
│   │   ├── Logo system approved
│   │   ├── Colour system approved
│   │   ├── Typography system approved
│   │   └── Visual direction approved
│   ├── Phase 3: Development
│   │   ├── Frontend build
│   │   ├── CMS integration
│   │   ├── API/webhook connections
│   │   └── Mobile responsiveness testing
│   ├── Phase 4: Testing & Launch
│   │   ├── QA audit
│   │   ├── Accessibility review
│   │   ├── SEO checks
│   │   └── Deploy to production
│   └── Phase 5: Handover
│       ├── Documentation delivered
│       ├── Training session completed
│       └── Support window initiated
├── Card Table (Kanban)
│   ├── Columns: Backlog → In Progress → Review → Approved → Done
│   └── Cards: Individual design elements, features, or content pieces
├── Docs & Files
│   ├── Brand guidelines (PDF)
│   ├── Design tokens (CSS)
│   ├── Architecture decision records
│   └── Handover documentation
├── Schedule
│   ├── Milestone: Design approval deadline
│   ├── Milestone: Development complete
│   ├── Milestone: Launch date
│   └── Milestone: Handover complete
└── Campfire
    └── Quick questions, informal updates, link sharing
```

#### Client Portal Strategy

**What clients see:**
- Approved designs and mockups (not work-in-progress)
- Project timeline and milestone status
- To-do items relevant to them (feedback requests, approval needs)
- Message board posts (announcements, update reports)
- Final deliverables and documentation
- Schedule milestones

**What clients don't see:**
- Internal draft designs rejected before client review
- Technical implementation details (unless relevant)
- Edmond's internal task management and scheduling
- Campfire chats (unless specifically invited)
- Other clients' projects

**How to control:** Use Basecamp's built-in client visibility toggle on each recording. Drafts and internal discussions remain private until officially shared.

#### Brand Development Workflow in Basecamp

The brand development process from `Brand_Development_Process.md` maps naturally to Basecamp:

| Phase | Basecamp Tool | Client Interaction |
|-------|--------------|-------------------|
| 1. Intake & Discovery | Message Board (Kickoff post) + Automatic Check-in | Client answers discovery questions via email or Basecamp UI |
| 2. Brand Strategy | Docs (Brand Brief document) | Client reviews and approves brief |
| 3. Visual Identity Direction | Message Board (Visual direction post with image attachments) | Client approves direction before any logo work |
| 4. Logo Development | Card Table (Kanban: Concepts → Shortlist → Final) + Message Board | Client reviews and provides feedback on approved concepts only |
| 5. Colour System | Message Board + Docs (colour documentation) | Client approves palette |
| 6. Typography System | Message Board + Docs (type scale documentation) | Client approves typography |
| 7. Supporting Visual Language | Card Table (icon sets) + Message Board (photography direction) | Client approves iconography and photo direction |
| 8. Brand Guidelines | Docs (final PDF) + File upload | Client receives final guidelines |

#### Design Review & Approval Process

Use Basecamp's **approval workflow** for every deliverable that needs client sign-off:

1. Post design on Message Board with "For Approval" tag
2. Client reviews and comments directly on the post
3. When ready, post: "Please reply 'APPROVED' to confirm this design direction"
4. Client's email reply is logged as a permanent record in the project
5. Screenshot the approval, attach to project docs as evidence
6. Move to next phase

This eliminates: "I never approved that" disputes and provides a clean audit trail.

---

### 2. Workflow Automation Projects

#### Automation Project Structure

```
[Client Name] — Automation Build
├── Message Board
│   ├── Automation Brief: Scope, triggers, expected outcomes
│   ├── Architecture: Workflow diagram, service connections
│   ├── Testing: Test results, edge cases handled
│   └── Deployment: Live confirmation, monitoring setup
├── To-do Lists
│   ├── Discovery
│   │   ├── Audit existing tools and data flows
│   │   ├── Map trigger → action requirements
│   │   └── Document error handling requirements
│   ├── Build
│   │   ├── Scenario 1: [name]
│   │   ├── Scenario 2: [name]
│   │   └── Error handling routes
│   ├── Testing
│   │   ├── Happy path testing
│   │   ├── Edge case testing
│   │   └── Error recovery testing
│   └── Deployment
│       ├── Activate scenarios
│       ├── Set up monitoring
│       └── Document for handover
├── Card Table
│   ├── Columns: Design → Build → Test → Deploy → Monitor
│   └── Cards: Individual scenarios, webhooks, API connections
├── Docs
│   ├── Workflow diagrams (architecture)
│   ├── API documentation
│   ├── Error handling runbook
│   └── Client handover guide
└── Schedule
    ├── Milestone: Build complete
    ├── Milestone: Testing complete
    └── Milestone: Go live
```

#### Automation Monitoring via Basecamp

After deploying a client's automation system, use Basecamp for ongoing monitoring:

- **Automatic Check-in:** "Are all Make.com/n8n scenarios running without errors?" — daily, auto-sent to Edmond
- **Schedule entries:** Monthly review dates for each client's automation health
- **Message Board:** Monthly status report posted to client project ("Your automations ran 2,347 times this month with 99.8% success rate")

---

### 3. SEO/GEO & Content Projects

#### SEO Project Structure

```
[Client Name] — SEO/GEO Strategy
├── Message Board
│   ├── Audit Results: Current SEO health, issues found
│   ├── Strategy: Keyword targets, content plan, technical fixes
│   └── Monthly Reports: Progress, rankings, traffic changes
├── To-do Lists
│   ├── Technical SEO
│   ├── On-Page SEO
│   ├── Content Creation
│   └── Off-Page / Backlinks
├── Card Table
│   ├── Columns: Keyword Research → Brief Written → Draft → Published → Ranking
│   └── Cards: Individual content pieces, optimisation tasks
├── Docs
│   ├── SEO audit report
│   ├── Keyword strategy document
│   ├── Content calendar
│   └── Monthly performance reports
└── Schedule
    └── Content publishing dates, review dates
```

#### Content Pipeline via Card Tables

Use Kanban card tables for content production pipelines:

```
Backlog → Brief → Writing → Review → Scheduled → Published
```

Each card contains:
- Target keyword
- Word count
- Assigned writer (Edmond or subcontractor)
- Target publish date (Schedule entry)
- SEO checklist (attached as a Doc)

---

### 4. Advisory & Consulting Projects

Advisory engagements (financial planning, risk management, business strategy) use a lighter structure:

```
[Client Name] — Advisory Engagement
├── Message Board
│   ├── Engagement scope and terms
│   ├── Analysis deliverables
│   └── Recommendations and action items
├── To-do Lists
│   ├── Data collection
│   ├── Analysis
│   ├── Recommendations
│   └── Implementation support
├── Docs
│   ├── Financial models
│   ├── Risk assessments
│   ├── Strategy documents
│   └── Meeting notes
└── Schedule
    ├── Review meetings
    └── Follow-up deadlines
```

**Key advantage for advisory:** Every recommendation, analysis, and piece of advice is permanently recorded. If a client asks "What did you recommend about X?" months later, the answer is one search away.

---

### 5. Internal BridgeArc Operations

#### Edmond's Personal Project Structure

| Project | Purpose |
|---------|---------|
| **BridgeArc — Operations** | Business management, finances, strategy, planning |
| **BridgeArc — Pipeline** | Active leads, proposals, business development |
| **BridgeArc — Product Development** | Boilerplate builds, template maintenance |
| **BridgeArc — Marketing** | Personal website, content creation, social media |
| **BridgeArc — Knowledge Base** | Process documentation, playbooks, best practices |
| **[Client Name] — [Project]** | One project per active client engagement |

#### Pipeline Management (Lead Tracking)

Use a Card Table in the **BridgeArc — Pipeline** project:

```
Columns:
1. Lead Identified
2. Discovery Call Booked
3. Proposal Sent
4. Negotiation
5. Won
6. Lost / Archived
```

Each card contains:
- Client name and contact
- Service interest (Web Design, Automation, SEO, Advisory)
- Budget range
- Source (website, referral, Upwork, Contra)
- Proposal value
- Expected close date (Schedule entry)

**Monthly review:** Use Basecamp's Reports view to see how many leads moved through each stage. Use Automatic Check-ins to ask: "What proposals are awaiting response?" every Monday.

#### Timesheet Integration

The Timesheet add-on (included in your plan) is critical for billing:

- Log time against specific To-dos in client projects
- Generate aggregate reports at month-end for invoicing
- Export time data for accounting records
- Track which project types consume the most effort

**Workflow:** At end of each work session, log time in the relevant to-do. End of month: generate timesheet report → cross-reference with project deliverables → invoice client.

#### Weekly Operating Rhythm

Basecamp supports a predictable weekly rhythm:

**Monday morning (30 min):**
- Home screen: "What's on my plate this week?"
- Review Lineup for all project timelines
- Check overdue to-dos across all projects
- Set priorities for the week

**Daily (10 min):**
- Home screen: "What's due today?"
- Process Hey! notifications
- Post/update one Message Board per active project

**Friday afternoon (20 min):**
- Review completed work for the week
- Update Card Table columns
- Post weekly summary to client projects
- Automatic Check-in response review

---

## CLI & Agentic Use Cases

The Basecamp CLI (`basecamp version 0.7.2`) is installed and authenticated. It provides **100% API coverage** (155/155 endpoints) and supports `--json`, `--agent`, `--jq`, and `--md` output modes.

### Terminal Automation Patterns

```bash
# Daily standup — what's on my plate?
basecamp assignments --json | jq '.data[] | {title, due_on, project}'

# Overdue items across all projects
basecamp todos list --overdue --all --json

# Weekly status report — all project activity
basecamp recordings --json --limit 50

# Create a to-do in a client project
basecamp todo "Final review of homepage design" --in <project_id> --due tomorrow --assignee me

# Post update to project message board
basecamp message "Weekly Progress Report" "Completed: ... / In Progress: ... / Next: ..." --in <project_id>

# Bulk complete overdue tasks
basecamp todos sweep --overdue --complete --comment "Weekly cleanup" --in <project_id>

# Search across all projects
basecamp search "invoice" --json
```

### AI Agent Integration Patterns

The CLI is designed for agent use. Key patterns:

1. **`--agent` flag:** Headless mode, no interactive prompts. Returns raw JSON on success, `{ok:false,...}` on error.
2. **`--json` output:** Standardised envelope `{ok, data, summary, breadcrumbs, meta}` — parseable by any LLM or script.
3. **`--jq` built-in filtering:** `basecamp todos list --jq '.data[] | select(.completed == false) | .title'` — no external `jq` needed.
4. **URL parsing:** `basecamp url parse "https://3.basecamp.com/..."` — extract account_id, project_id, recording_id from any Basecamp URL.
5. **Exit codes:** 0 (OK), 1 (Usage), 2 (Not Found), 3 (Auth), 4 (Forbidden), 5 (Rate Limit), 6 (Network), 7 (API), 8 (Ambiguous).

### Agentic Workflow: Automated Project Setup

An AI agent (Claude Code, Qwen, or custom) can automate new project setup:

```bash
#!/bin/bash
# New project bootstrap script
# Usage: ./new-project.sh "Client Name" "Project Type"

CLIENT="$1"
TYPE="$2"

# 1. Create the project
PROJECT=$(basecamp projects create "$CLIENT — $TYPE" --json)
PROJECT_ID=$(echo "$PROJECT" | jq -r '.data.id')

# 2. Create standard to-do list structure
basecamp todolists create "Phase 1: Discovery" --in "$PROJECT_ID"
basecamp todolists create "Phase 2: Design" --in "$PROJECT_ID"
basecamp todolists create "Phase 3: Development" --in "$PROJECT_ID"
basecamp todolists create "Phase 4: Testing & Launch" --in "$PROJECT_ID"
basecamp todolists create "Phase 5: Handover" --in "$PROJECT_ID"

# 3. Post kickoff message
basecamp message "Project Kickoff: $CLIENT — $TYPE" "Welcome to your project. This is your central workspace for all communication, files, and deliverables." --in "$PROJECT_ID" --subscribe

# 4. Create schedule milestone
basecamp schedule create "Design Approval Deadline" --date "$(date -v+14d +%Y-%m-%d)" --in "$PROJECT_ID" --notify
basecamp schedule create "Launch Target" --date "$(date -v+30d +%Y-%m-%d)" --in "$PROJECT_ID" --notify

# 5. Create Kanban card table
# (Note: card tables are accessed via project dock — use the SDK for programmatic creation)

echo "Project created: $PROJECT_ID"
echo "URL: https://3.basecamp.com/$ACCOUNT_ID/projects/$PROJECT_ID"
```

### Agentic Workflow: CI/CD Pipeline Integration

Connect your development workflow to Basecamp:

```bash
# GitHub Actions — on PR merged to main
# Update Basecamp to-do status
basecamp done <todo_id> --json

# Post deployment notification
basecamp message "Deployment: $PROJECT_NAME" "✅ Deployed to production. URL: $VERCEL_URL" --in <project_id>

# GitHub Actions — on PR opened
# Create to-do for code review
basecamp todo "Review PR #$PR_NUMBER: $PR_TITLE" --in <project_id> --assignee me --json
```

### Agentic Workflow: Automated Weekly Reports

```bash
#!/bin/bash
# Weekly report generator
# Run every Friday via cron

for PROJECT_ID in $(basecamp projects list --jq '.data[].id'); do
  PROJECT_NAME=$(basecamp projects show "$PROJECT_ID" --jq '.data.name')
  
  # Get completed items this week
  COMPLETED=$(basecamp todos list --in "$PROJECT_ID" --jq '[.data[] | select(.completed == true)] | length')
  
  # Get overdue items
  OVERDUE=$(basecamp todos list --overdue --in "$PROJECT_ID" --jq '.data | length')
  
  # Get recent messages
  MESSAGES=$(basecamp messages list --in "$PROJECT_ID" --jq '.data | length')
  
  # Post summary
  basecamp message "Weekly Summary — $PROJECT_NAME" "
  This week's activity:
  - Completed to-dos: $COMPLETED
  - Overdue items: $OVERDUE
  - Messages posted: $MESSAGES
  " --in "$PROJECT_ID"
done
```

### SDK Integration (Custom Applications)

The Basecamp SDK (TypeScript, Python, Go, Ruby, Kotlin, Swift) enables building custom integrations:

```typescript
// Example: Build a custom dashboard for Edmond's practice
import { createBasecampClient } from '@basecamp/sdk-typescript'

const client = createBasecampClient({
  accountId: process.env.BASECAMP_ACCOUNT_ID!,
  accessToken: process.env.BASECAMP_TOKEN!,
})

// Get all projects
const projects = await client.projects.list()

// For each project, get overdue todos
for (const project of projects) {
  const overdue = await client.todosets.list({ bucketId: project.id })
  // Build custom dashboard view
}
```

**Use case:** Build an internal dashboard that aggregates data across all BridgeArc projects — revenue tracking (via timesheets), project health scores (from overdue ratios), and client engagement metrics.

---

## Webhook Automation Architecture

Basecamp webhooks provide real-time event notification for 20+ event types:

### Subscribable Event Types

| Category | Event Types |
|----------|------------|
| **Todos** | `Todo_created`, `Todo_completed`, `Todo_uncompleted`, `Todolist_created`, `Todolist_trashed` |
| **Messages** | `Message_created`, `Message_trashed`, `Message_archived` |
| **Cards** | `Kanban::Card_created`, `Kanban::Card_trashed`, `Kanban::Step_created` |
| **Comments** | `Comment_created` (on any recording) |
| **Files** | `Upload_created`, `Document_created`, `CloudFile_created` |
| **Schedule** | `Schedule::Entry_created`, `Schedule::Entry_updated` |
| **Check-ins** | `Question_created`, `Question::Answer_created`, `Question_paused`, `Question_resumed` |
| **Client** | `Client::Approval::Response`, `Client::Forward`, `Client::Reply` |
| **Lifecycle** | `*_created`, `*_trashed`, `*_untrashed`, `*_archived`, `*_unarchived`, `*_deleted` |

### Webhook → Make.com Integration Pattern

```
Basecamp Webhook (POST to HTTPS endpoint)
  ↓
Make.com Webhook Receiver
  ↓
Router:
  ├── Todo completed → Log to Google Sheets (timesheet backup)
  ├── Comment created → Post to Slack/Discord notification
  ├── Card moved → Update HubSpot deal stage
  ├── Message created → Forward to email digest
  └── Upload created → Sync to Google Drive backup
```

**Webhook technical requirements:**
- Payload URL **must** be HTTPS
- Retries up to 10 times with exponential backoff
- Only `2xx` responses accepted (no redirects)
- Last 25 delivery attempts logged and retrievable
- Payload includes: event ID, kind, recording object (generic), creator info, bucket info

### Webhook → n8n Integration Pattern

For self-hosted automation (zero per-operation cost):

```
Basecamp Webhook → n8n webhook node
  ↓
Transform payload (Function node)
  ↓
Route to appropriate service:
  ├── HTTP Request (HubSpot API) — update CRM
  ├── HTTP Request (Resend API) — send notification
  ├── Google Sheets — log activity
  └── Database (Supabase/Neon) — persistent record
```

---

## Client Onboarding Workflow

### New Client Project Setup (15 minutes)

1. **Create project in Basecamp:**
   - Name format: `[Client Name] — [Service Type]`
   - Add client as participant (free — no per-user cost)
   - Set project colour (for visual distinction)

2. **Run project bootstrap script** (CLI or manual):
   - Create standard to-do list structure (5 phases)
   - Post kickoff message with project overview
   - Create schedule milestones (design deadline, launch target)
   - Set up Card Table (Kanban) for tracking deliverables

3. **Configure client visibility:**
   - Review default project settings
   - Ensure client only sees appropriate sections
   - Set up client-specific check-in questions if needed

4. **Send welcome message** with:
   - How to access the project (web, Mac, iOS, Android)
   - How to respond to questions (email or Basecamp UI)
   - What to expect (update frequency, review cadence)
   - How to provide feedback (comment on posts, reply to check-ins)

### Client Communication Standards

| Communication Type | Basecamp Tool | Frequency |
|-------------------|---------------|-----------|
| Project announcements | Message Board | Weekly or milestone-driven |
| Task assignments | To-dos | As needed |
| Quick questions | Campfire / Pings | Ad-hoc |
| Status updates | Automatic Check-ins | Daily (internal) / Weekly (client) |
| File sharing | Docs & Files | As deliverables are ready |
| Deadline tracking | Schedule | Continuous |
| Formal approvals | Message Board (with "APPROVED" reply) | Per milestone |

---

## Cross-Platform Integration Map

Basecamp as the hub, connected to Edmond's existing tool stack:

```
                    ┌─────────────────┐
                    │    Basecamp     │
                    │  (Central Hub)  │
                    └────────┬────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
    ┌─────┴─────┐     ┌─────┴─────┐     ┌─────┴─────┐
    │  Design   │     │  Develop  │     │  Automate  │
    └─────┬─────┘     └─────┬─────┘     └─────┬─────┘
          │                  │                  │
    ┌─────┴─────┐     ┌─────┴─────┐     ┌─────┴─────┐
    │   Figma   │     │  GitHub   │     │  Make.com  │
    │  (Doors)  │     │  (Webhook)│     │ (Webhook)  │
    └───────────┘     └───────────┘     └───────────┘
                              │
                        ┌─────┴─────┐
                        │  Vercel   │
                        │ (Webhook) │
                        └───────────┘
```

**"Doors" feature:** Basecamp can link to external tools (Google Docs, Figma, Dropbox, Airtable) without importing content — keeping Basecamp as the central hub while specialised tools handle their specific jobs.

**Integration points:**
- **GitHub → Basecamp:** PR merged webhook → mark to-do complete → post deployment notification
- **Vercel → Basecamp:** Deployment success webhook → post message to project
- **Make.com → Basecamp:** Form submission → create to-do for new lead → notify in project
- **Figma → Basecamp:** Use Doors to link design files — client views them in Basecamp, clicks through to Figma
- **HubSpot → Basecamp:** New deal won → create Basecamp project → bootstrap standard structure
- **Cal.com → Basecamp:** Discovery call booked → create check-in question for prep → "What do we know about this client?"

---

## Quick-Win Implementations

### Priority 1: Standardise Project Template (30 min)

Create a **Basecamp Template** for web design projects:

1. In Basecamp, create a project called "Template — Web Design"
2. Set up the standard to-do list structure, card table, and kickoff message
3. Use `basecamp templates` CLI commands or the Basecamp UI to save as template
4. For every new client: create project from template → customise → invite client

```bash
# Create template via CLI
basecamp templates create "Web Design Standard" --from-project <template_project_id>

# Create new project from template
basecamp templates construct "Client Name — Web Design" --template-id <template_id>
```

### Priority 2: Configure Automatic Check-ins (15 min)

Set up Automatic Check-ins for internal discipline:

**Daily (internal, Monday–Friday, 9:00 AM CAT):**
- "What are you working on today?"
- "Any blockers or dependencies?"

**Weekly (internal, Friday, 4:00 PM CAT):**
- "What did you accomplish this week?"
- "What's the priority for next week?"
- "Any client communications pending response?"

**Weekly (client-facing, Monday, 10:00 AM CAT):**
- "On a scale of 1–5, how satisfied are you with project progress this week?"

### Priority 3: Set Up Webhook → Make.com Pipeline (1 hour)

Create a webhook receiver in Make.com that processes Basecamp events:

1. **In Make.com:** Create scenario with Custom Webhook trigger → copy URL
2. **In Basecamp CLI:**
   ```bash
   basecamp webhooks create <project_id> --url "https://hook.eu2.make.com/YOUR_URL" --types "Todo_completed,Message_created,Comment_created"
   ```
3. **In Make.com scenario:** Add Router to handle each event type:
   - `Todo_completed` → Log to Google Sheets timesheet
   - `Message_created` → Parse content → If contains "approved" → Update HubSpot deal stage
   - `Comment_created` → Forward to email digest

### Priority 4: Build Internal Dashboard (2 hours)

Use the Basecamp SDK (TypeScript) to build a simple internal dashboard:

```typescript
// /app/(payload)/admin/components/BasecampDashboard.tsx
import { getPayload } from 'payload'
import { createBasecampClient } from '@basecamp/sdk-typescript'

async function getBridgeArcMetrics() {
  const client = createBasecampClient({
    accountId: process.env.BASECAMP_ACCOUNT_ID!,
    accessToken: process.env.BASECAMP_TOKEN!,
  })

  const projects = await client.projects.list()
  const activeProjects = projects.filter((p) => !p.archived)

  // Get timesheet data for billing
  const timesheets = await client.timesheets.list({
    from: startOfMonth,
    to: endOfMonth,
  })

  return {
    activeProjectCount: activeProjects.length,
    totalHoursThisMonth: timesheets.reduce((sum, t) => sum + t.hours, 0),
    overdueTodos: await countOverdueItems(client),
    pendingApprovals: await countPendingApprovals(client),
  }
}
```

### Priority 5: Configure Lineup for Visual Timeline (10 min)

Use Basecamp's Lineup feature to see all projects on one visual timeline:

```bash
# View all upcoming schedule entries across projects
basecamp lineup list --json

# Create a milestone marker
basecamp lineup create "Q2 Review" --date "2026-06-30"
```

Pin this as your daily view — it answers "What's coming up across all my projects?" in one screen.

---

## Revenue & Pricing Integration

### Include Basecamp in Client Pricing

Basecamp's client access is **free** — this is a competitive advantage:

**In project proposals:**
> "All projects include a dedicated Basecamp workspace — your central hub for tracking progress, providing feedback, approving deliverables, and accessing project files. You'll have real-time visibility into project status without needing to schedule status meetings."

**Positioning against competitors:**
- Competitors charge per-user for project management tools (Asana, Monday, Jira)
- Basecamp includes unlimited client access at no extra cost
- This is especially valuable for clients with multiple stakeholders

### Timesheet → Invoice Workflow

1. Log all project time in Basecamp Timesheets (against specific to-dos)
2. End of month: generate timesheet report
3. Cross-reference with project milestones achieved
4. Invoice client based on agreed pricing model:
   - **Fixed-price projects:** Timesheet tracks actual effort vs. estimated effort (margin analysis)
   - **Hourly consulting:** Timesheet is the billing source
5. Archive timesheet data for tax records

---

## Risks & Considerations

1. **Student discount sustainability:** The 100% discount on Pro Unlimited is grandfathered but Basecamp reserves the right to end discount programmes due to "chronic abuse." Monitor for any policy changes. If lost, Pro Unlimited jumps to $299/month (annual) or $349/month (monthly) — a significant increase.

2. **Basecamp is not a replacement for all tools:**
   - **Figma** remains essential for design work — Basecamp links to it via Doors
   - **VS Code / Cursor** remain essential for development — Basecamp tracks the work, not the code
   - **GitHub** remains essential for version control — webhooks connect it to Basecamp
   - **Make.com/n8n** remain essential for complex automation — Basecamp can trigger them but not replace them

3. **No native time tracking in all plans:** The Timesheet add-on is included in your Pro Unlimited plan, but would cost $50/month extra on Plus. If downgrading, factor this in.

4. **API rate limiting:** The Basecamp API enforces rate limits. The CLI handles `Retry-After` headers automatically. For high-volume integrations, batch requests and cache responses.

5. **Data export:** Basecamp provides self-service data export at any time. All data is yours to keep. Export regularly for backup purposes.

6. **Client adoption friction:** Some clients are accustomed to email or WhatsApp. Basecamp supports email-based interaction (clients reply via email, responses are logged in the project). Use this for reluctant clients — they get the organisation without changing their habits.

7. **Single language interface:** Basecamp is English-only. For Botswana clients, this is ideal. For international Francophone or Lusophone clients, confirm comfort with English interface.

8. **Webhook limitations:** Webhooks are scoped to individual projects (buckets). To monitor all projects, you need one webhook per project. There is no account-level webhook.

---

## Summary: Strategic Value Assessment

| Dimension | Assessment |
|-----------|-----------|
| **Cost efficiency** | $119/month for unlimited everything is exceptional value. Standard price: $399+/month. You're paying 30% of list price. |
| **Client experience** | Professional, transparent, auditable. Clients see progress in real-time. Reduces "what's the status?" emails by 80%+. |
| **Internal efficiency** | Single system of record. No tool context-switching. Predictable project structure means zero setup overhead. |
| **Scalability** | Unlimited users and projects. Adding a 50th client costs nothing extra. |
| **Automation potential** | 100% API coverage, CLI with agent mode, webhook support, SDK in 6 languages. Highly automatable. |
| **Competitive differentiation** | Most freelancers use scattered tools. Offering a structured client workspace signals professionalism. |
| **Risk** | Primary risk is losing the student discount. Mitigate by maintaining account compliance and monitoring policy changes. |

**Key insight:** Basecamp is the organisational spine of BridgeArc. It replaces 4–5 separate subscriptions (Slack, Asana, Dropbox, Notion, status meetings) at a fraction of the combined cost. The student discount makes it economically unbeatable. The CLI and API coverage make it highly automatable — AI agents can manage projects programmatically, and webhooks connect it to the entire automation stack (Make.com, n8n, custom integrations). For client work, it provides a professional, structured experience that distinguishes BridgeArc from freelancers who manage projects via WhatsApp and email.

---

**End of Basecamp Integration Strategy**
