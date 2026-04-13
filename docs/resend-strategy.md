# Resend Email API Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Resend (resend.com)
**Free Tier:** 3,000 emails/month, 100 emails/day, 1 custom domain

---

## Overview

Resend is a developer-friendly transactional email API. Compared to AWS SES (complex setup) and SendGrid (legacy API design), Resend provides a clean REST API, React email templates with the `@react-email/components` library, and generous free-tier limits.

For Edmond's service offerings, Resend serves as:

1. **Transactional email delivery** — Order confirmations, booking reminders, password resets, lead notifications
2. **Email marketing for small lists** — Newsletter sends, product updates, and campaign emails (up to 3,000/month covers most SME needs)
3. **React-based email templates** — Design professional, branded emails using React components instead of HTML/CSS
4. **Default email layer for all builds** — Every Foundation and Boilerplate build that includes email functionality uses Resend

---

## Free Tier Limits (2026)

| Resource | Limit |
|----------|-------|
| Emails per month | 3,000 |
| Emails per day | 100 |
| Custom domains | 1 |
| API keys | Unlimited |
| Webhooks | Unlimited |
| Email analytics | Open tracking, click tracking, bounce tracking included |
| Team members | 1 user |

**Paid tiers:** Pro plan starts at $20/month for 50,000 emails. Overages at $0.90/1,000 emails.

---

## By Service Category

### 1. Web Design & Development

#### Email Notifications for Contact Forms (Growth Build — from P19,500)
- **Use case:** Website contact form submitted → Resend sends notification to client's inbox with form details
- **Implementation:** Next.js API route → Resend API → formatted email with submission data
- **Value:** Professional email delivery with tracking (delivery, opens, clicks). Free tier covers 3,000 notifications/month — sufficient for most business websites

#### Email Marketing Integration (Growth Build)
- **Use case:** Newsletter signup form → Resend sends welcome email with branded content → subscriber added to mailing list
- **Value:** Built-in email marketing capability without Mailchimp or Brevo. Free tier handles up to 3,000 sends/month

---

### 2. Web Applications

#### Transactional Emails for All Boilerplate Builds
- **Boilerplate 1 (Artisan):** Commission enquiry notification to artisan
- **Boilerplate 2 (Professional Services):** Booking confirmation and reminder emails
- **Boilerplate 3 (Food/Catering):** Pre-order confirmation, event booking details, reminder before event date
- **Boilerplate 4 (Beauty/Wellness):** Appointment confirmation, reminder (24 hours before), follow-up review request
- **Boilerplate 5 (Events/Photography):** Booking enquiry acknowledgement, availability confirmation
- **Boilerplate 6 (E-commerce):** Order confirmation, shipping notification, delivery confirmation
- **Boilerplate 7 (Professional Services Firm):** Document upload notification, matter update, appointment reminder
- **Boilerplate 8 (NGO/Church):** Volunteer signup confirmation, donation receipt, event reminder
- **Boilerplate 9 (Financial Services):** Callback request confirmation, document received notification

**Free tier capacity per build type:**

| Build Type | Estimated Monthly Emails | Free Tier Usage |
|------------|------------------------|-----------------|
| Marketing site (contact forms) | 50–200 | ~3–7% |
| Booking platform (confirmations + reminders) | 200–800 | ~7–27% |
| E-commerce (order + shipping + delivery) | 500–2,000 | ~17–67% |
| High-volume SaaS (password resets, notifications) | 1,000–3,000 | ~33–100% |

---

### 3. Workflow Automation

#### Make.com + Resend Integration
- **Use case:** Make.com scenario → Resend module → send formatted email. Common patterns:
  - New CRM contact → welcome email
  - Payment received → receipt email
  - Support ticket created → acknowledgement email
  - Monthly report ready → email with download link
- **Value:** Resend is a native Make.com integration — no custom code needed. The email template can include dynamic data from the Make.com scenario

#### Automated Email Sequences
- **Use case:** New user signs up → Day 0: Welcome email → Day 3: Getting started guide → Day 7: Check-in email → Day 30: Monthly summary
- **Implementation:** Make.com scenario with delay steps → Resend email at each stage
- **Free tier note:** A 4-email sequence for 500 users = 2,000 emails — within the 3,000/month limit but approaching the ceiling

---

### 4. Boilerplate Products

#### React Email Template Library
- **Strategy:** Create a library of reusable React email templates for common transactional emails:
  - Order confirmation with itemised breakdown
  - Booking confirmation with date/time/location
  - Password reset with magic link
  - Welcome email with onboarding steps
  - Monthly report with analytics summary
- **Value:** Consistent, branded email experience across all builds. Templates use the client's brand colours, logo, and typography

```tsx
// emails/order-confirmation.tsx
import { Html, Head, Body, Container, Text, Button } from '@react-email/components'

export function OrderConfirmation({ orderNumber, items, total }: OrderEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'system-ui, sans-serif' }}>
        <Container>
          <Text>Order #{orderNumber} confirmed</Text>
          {items.map(item => (
            <Text key={item.name}>{item.name} — {item.quantity} × P{item.price}</Text>
          ))}
          <Text><strong>Total: P{total}</strong></Text>
          <Button href={`https://yoursite.com/orders/${orderNumber}`}>
            View Order
          </Button>
        </Container>
      </Body>
    </Html>
  )
}
```

---

## Quick-Win Implementations

### Priority 1: Resend + Next.js Setup (30 min)
```typescript
// lib/resend.ts
import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOrderConfirmation({ to, orderNumber, items, total }: OrderEmailParams) {
  return resend.emails.send({
    from: 'Your Business <noreply@yourdomain.com>',
    to,
    subject: `Order #${orderNumber} Confirmed`,
    react: <OrderConfirmation orderNumber={orderNumber} items={items} total={total} />,
  })
}
```

### Priority 2: Domain Verification and DNS (30 min)
```
# DNS records to add (via Cloudflare or registrar):
Type: TXT
Name: resend._domainkey
Value: p=MIGfMA0GCSqGSIb3DQEBA...

Type: MX
Name: @
Value: mx1.resend.com (priority 10)
```

### Priority 3: Email Template Testing (1 hour)
Use Resend's preview endpoint to test emails before sending:

```typescript
// In development
import { render } from '@react-email/render'
const html = render(<OrderConfirmation {...sampleData} />)
console.log(html) // Paste into email preview tool or browser
```

---

## Resource Budget Planning

**Free tier covers most transactional email needs:**

| Use Case | Monthly Volume | Free Tier Usage | Cost |
|----------|---------------|-----------------|------|
| Contact form notifications | 100–300 | 3–10% | $0 |
| Booking confirmations + reminders | 200–600 | 7–20% | $0 |
| E-commerce order emails | 500–1,500 | 17–50% | $0 |
| Newsletter (small list) | 1,000–3,000 | 33–100% | $0 |
| High-volume SaaS notifications | 3,000+ | Exceeds free tier | $20/month (Pro) |

**Daily limit awareness:** The 100 emails/day limit means a batch operation (e.g., sending 500 newsletter sends) must be spread over 5 days. For bulk sends, consider Beehiiv (unlimited sends on free tier up to 2,500 subscribers) instead.

**When to upgrade to Pro ($20/month):**
- Monthly sends consistently exceed 2,500
- Need more than 1 custom domain (e.g., separate domains for transactional vs. marketing emails)
- Need higher daily sending limits

---

## Risks & Considerations

1. **Daily sending limit (100/day):** This is the most restrictive free-tier limit. A sudden spike (e.g., 200 booking confirmations in one day) will fail after the 100th email. **Mitigation:** Implement queueing — batch emails and spread them across the day
2. **Single custom domain:** Only 1 verified domain on the free tier. If a client needs separate sending domains (e.g., `noreply@store.com` and `hello@agency.com`), upgrade to Pro
3. **Deliverability:** Resend's shared IP reputation on the free tier is generally good, but dedicated IPs (which improve deliverability for high-volume senders) require the Pro plan
4. **React Email learning curve:** Designing emails with React Email components requires understanding email client quirks (inline styles, table-based layouts for Outlook). Test across Gmail, Apple Mail, and Outlook
5. **Webhook processing:** Resend sends webhooks for bounces, complaints, and delivery events. Handle these to maintain sender reputation — hard bounces should suppress future sends to that address

---

## Summary: Revenue and Efficiency Potential

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| Transactional email (all builds) | Included in build price | $0 (free tier) | 100% |
| Email template design (React) | Included in build | $0 (React Email is free) | 100% |
| Email marketing setup | Included in Growth (P19,500) | $0 (free tier) | 100% |
| Make.com + Resend integration | Included in automation price | $0 | 100% |

**Key insight:** Resend's free tier (3,000 emails/month, 100/day) covers the transactional email needs of virtually every SME build. The React Email component library is a significant productivity advantage over writing raw HTML emails — templates are reusable across builds, reducing per-project setup time. The 100/day limit is the only constraint that requires design awareness — batch operations and newsletter sends should be spread across the day or handled by Beehiiv for larger lists.

---

**End of Resend Email API Integration Strategy**
