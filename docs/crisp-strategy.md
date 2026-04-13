# Crisp Live Chat Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Crisp (crisp.chat)
**Free Tier:** 2 seats, unlimited conversations, website chat widget, shared inbox, mobile apps

---

## Overview

Crisp is a customer messaging platform that provides live chat, shared inbox, and customer support tools. Its free tier is notably generous — unlimited conversations and 2 agent seats at no cost, making it the most capable free live chat solution for Edmond's client builds.

For Edmond's service offerings, Crisp serves as:

1. **Live chat for client websites** — Real-time visitor engagement and support for marketing sites and web applications
2. **Lead capture tool** — Chat messages from visitors who prefer conversation over filling out forms
3. **Customer support channel** — Shared inbox for client support teams (up to 2 agents on free tier)
4. **Alternative to Intercom/Crisp paid plans** — Provides core chat functionality without the $50–150/month cost of Intercom or Crisp's own paid tiers

---

## Free Tier Limits (2026)

| Resource | Limit |
|----------|-------|
| Agent seats | 2 |
| Conversations | Unlimited |
| Website chat widget | Included (customisable) |
| Shared inbox | Included |
| Mobile apps (iOS/Android) | Included |
| Chat SDKs | Included |
| Chatbot (basic) | Not available on free tier (requires Essentials at €95/month) |
| Email campaigns | Not available on free tier |
| Knowledge base | Not available on free tier |
| Integrations | Limited (basic integrations available) |
| Conversation history | Limited history on free tier |

**Paid tiers:** Mini at €45/month (4 seats, core features), Essentials at €95/month (unlimited seats, chatbot, knowledge base). Crisp's pricing is notably higher than competitors for paid tiers, making the free tier the primary value proposition.

---

## By Service Category

### 1. Web Design & Development

#### Live Chat Add-On for Client Sites (+P1,800)
- **Use case:** Client wants a live chat widget on their website for visitor engagement and lead capture
- **Implementation:** Crisp widget script → embedded in Next.js layout → customised to match the site's brand colours and positioning
- **Value:** Real-time visitor engagement. Visitors who chat are 3–5x more likely to convert than those who don't. Free tier covers unlimited conversations
- **Positioning:** Crisp is the recommended live chat for clients with 1–2 people handling enquiries. For larger teams, recommend Intercom (paid, from $74/month)

#### Installation and Configuration
- **Widget setup:** Crisp provides a simple script tag. Install in the Next.js layout → configure colours, position, and greeting message via the Crisp dashboard
- **Offline mode:** When no agents are online, Crisp shows an offline message and collects emails — these are stored as conversations in the shared inbox
- **Mobile support:** Both agents can use the Crisp mobile app to respond to enquiries on the go — important for small business owners who aren't always at their desks

---

### 2. Web Applications

#### Customer Support for Boilerplate Builds
- **Boilerplate 2 (Professional Services):** Prospective clients chat to ask questions about services before booking a discovery call
- **Boilerplate 3 (Food/Catering):** Customers ask about menu options, dietary requirements, and event availability
- **Boilerplate 6 (E-commerce):** Pre-purchase questions about products, shipping, and returns
- **Boilerplate 7 (Professional Services Firm):** Prospective clients ask about services before submitting a formal enquiry
- **Value:** Included in the "Live chat integration" add-on (P1,800) — covers Crisp setup, customisation, and handover documentation

#### In-App Support for SaaS Products (Tier C)
- **Use case:** Users of a custom SaaS product can chat with support directly from within the application
- **Implementation:** Crisp SDK identifies logged-in users → support agent sees the user's name, email, and account status in the Crisp dashboard
- **Value:** Contextual support — the support agent knows who they're talking to before the first message

---

### 3. Workflow Automation

#### Crisp → Make.com → CRM Integration
- **Use case:** Crisp chat conversation ends → Make.com webhook → create HubSpot contact with chat transcript → tag as "chat lead"
- **Value:** Chat enquiries flow into the CRM automatically — no manual data entry. The sales team has the full conversation context

#### Offline Message Routing
- **Use case:** Crisp offline message received → Make.com → send email notification to client → create HubSpot task "Follow up with [name]"
- **Value:** No chat enquiry goes unanswered, even when the client is offline

---

## Quick-Win Implementations

### Priority 1: Crisp Widget Embed (15 min)
```typescript
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script id="crisp" strategy="afterInteractive">
          {`
            window.$crisp = [];
            window.CRISP_WEBSITE_ID = "${process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID}";
            (function() {
              d = document;
              s = d.createElement("script");
              s.src = "https://client.crisp.chat/l.js";
              s.async = 1;
              d.getElementsByTagName("head")[0].appendChild(s);
            })();
          `}
        </Script>
      </body>
    </html>
  )
}
```

### Priority 2: Identify Logged-In Users (30 min)
```typescript
// When a user logs in, identify them in Crisp
if (typeof window !== 'undefined' && (window as any).$crisp) {
  (window as any).$crisp.push(['set', 'user:email', [user.email]])
  (window as any).$crisp.push(['set', 'user:nickname', [user.name]])
}
```

### Priority 3: Custom Widget Styling (30 min)
Configure via Crisp dashboard → Settings → Website Settings → Appearance:
- Widget colour: matches client's brand primary colour
- Widget position: bottom-right (default) or bottom-left
- Greeting message: "Hi! How can we help?" or customised per client
- Offline message: "We're currently offline. Leave a message and we'll get back to you."

---

## Resource Budget Planning

**Free tier covers most small business live chat needs:**

| Resource | Typical Usage | Free Limit | Headroom |
|----------|--------------|-------------|----------|
| Conversations/month | 20–200 | Unlimited | N/A |
| Agent seats | 1–2 | 2 | Full or needs upgrade |
| Widget customisation | Basic colours and positioning | Included | N/A |

**When to consider alternatives:**
- More than 2 agents needed → Consider Intercom (from $74/month) or Zendesk (from $55/month). Crisp's paid tiers are expensive (€95/month for Essentials) relative to features
- Chatbot needed → Crisp's chatbot requires Essentials (€95/month). For AI chatbots, consider a custom solution using OpenAI API + a simple chat UI
- Knowledge base needed → Crisp's knowledge base requires Essentials. Use a separate documentation tool (Mintlify, Starlight) instead

---

## Risks & Considerations

1. **2-seat limit:** Only 2 agents can access the shared inbox. If a client's team has 3+ people handling enquiries, the free tier is insufficient. Crisp's paid tiers are expensive relative to competitors
2. **Limited integrations on free tier:** Crisp's free tier has basic integrations only. Advanced integrations (Slack, Zapier, custom webhooks) may require paid tiers — verify at setup
3. **Conversation history limits:** Free tier has limited conversation history retention. Older conversations may not be accessible for reference
4. **No chatbot on free tier:** Automated responses and FAQ handling require Crisp Essentials (€95/month). For simple auto-replies, use Crisp's offline message configuration
5. **Widget performance:** Crisp's widget adds ~200–400KB to page load. Load it with `strategy="afterInteractive"` in Next.js to avoid blocking the initial page render
6. **GDPR compliance:** Crisp collects visitor data (IP addresses, browser info, page URLs). Ensure the client's cookie consent banner (if required) includes Crisp in the tracking preferences

---

## Summary: Revenue and Efficiency Potential

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| Live chat add-on (setup) | +P1,800 | 1 hour labour | 100% |
| Crisp + Make.com integration | +P1,500 (integration add-on) | 1 hour labour | 100% |
| User identification in web apps | Included in build price | 30 min setup | 100% |

**Key insight:** Crisp's free tier (2 seats, unlimited conversations) is the most capable free live chat solution available. It is the recommended choice for clients with 1–2 people handling enquiries — covering the vast majority of SME builds. The 2-seat limit is the most common constraint, and Crisp's paid tiers (starting at €45/month) are expensive relative to the features offered. When a client needs more than 2 agents, recommend Intercom or Zendesk instead and disclose the monthly cost at scoping. For most builds, Crisp free tier = zero platform cost for a professional live chat experience.

---

**End of Crisp Live Chat Integration Strategy**
