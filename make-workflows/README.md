# Make.com Automation Workflows

Automated email workflows for the Edmond Moepswa personal website. All 3 scenarios were created programmatically via the Make.com API — no manual scenario building required.

> **Plan:** Make.com Teams Plan (expires 2026-08-12)  
> **Zone:** eu2.make.com  
> **Organization:** BridgeArc Digital (ID: 4892531)

---

## Scenarios Overview

| # | Scenario | ID | Trigger | Status |
|---|----------|----|---------|--------|
| 1 | Contact Form Reply | `9114789` | Webhook (contact form submission) | ✅ Active |
| 2 | Calculator High-Value Quote | `9114793` | Webhook (estimate > P 2,000) | ✅ Active |
| 3 | Dodo Payments Nurture | `9114795` | Webhook (payment.succeeded) | ✅ Active |

**Direct links:**
- [Scenario 1](https://eu2.make.com/scenario/9114789)
- [Scenario 2](https://eu2.make.com/scenario/9114793)
- [Scenario 3](https://eu2.make.com/scenario/9114795)

---

## How It Works

### Scenario 1: Contact Form Reply

```
Website contact form → /api/make-webhook (lead-capture) → Webhook → Gmail
```

When a visitor submits the contact form on `/contact`, the website POSTs to the internal API route, which forwards sanitized data to Make.com. Make.com sends a personalised HTML email reply via Gmail.

- **Template:** `templates/workflow_3_contact_reply.html`
- **Subject:** `// Re: {{projectType}} Project`
- **Variables:** `name`, `email`, `projectType`

### Scenario 2: Calculator High-Value Quote

```
Pricing calculator → /api/make-webhook (calculator-quote) → Webhook → [Filter: > P 2,000] → Gmail
```

When a visitor uses the pricing calculator and requests a formal quote, and the estimate exceeds P 2,000, Make.com sends a personalised offer email.

- **Template:** `templates/workflow_4_calculator_quote.html`
- **Subject:** `// Your Estimate: P {{estimatedBWP}}`
- **Variables:** `name`, `email`, `estimatedBWP`
- **Filter:** Only fires when `estimatedBWP > 2000`

### Scenario 3: Dodo Payments Nurture Sequence

```
Dodo Payments (payment.succeeded) → Webhook → Gmail (Email 1) → Gmail (Email 2)
```

After a customer purchases or downloads a product via Dodo Payments, two emails are sent:
1. **Email 1:** Soft check-in — confirms delivery, invites reply if stuck
2. **Email 2:** Follow-up — pitches consulting services with a CTA to book a call

- **Templates:** `templates/workflow_7_dodo_nurture_day_1.html` and `templates/workflow_7_dodo_nurture_day_4.html`
- **Variables:** `customer.name`, `customer.email`, `product_cart[1].name`

> **Note:** Both emails send immediately in sequence. Make.com's Sleep module has a maximum duration of ~1 hour, which makes multi-day delays impossible within a single scenario. To add delays later, use a Data Store + scheduled scenario architecture.

---

## Remaining Manual Steps: Done 23 April 2026 ✅

Almost everything was automated via the Make.com API. Only **one** manual step remains:

### Step 1: Register the Dodo Payments Webhook

This tells Dodo Payments to notify Make.com whenever a payment succeeds.

1. Go to [dodopayments.com](https://dodopayments.com) and log in
2. Click **Developer** in the left sidebar
3. Click **Webhooks**
4. Click **Add Webhook**
5. In the **URL** field, paste:
   ```
   https://hook.eu2.make.com/c89f0f0sprnmo7g8ymdunv4mgmo0a79w
   ```
6. Under **Events**, check the box for `payment.succeeded`
7. Click **Save**

That's it. Any successful payment will now trigger the nurture sequence.

---

## Email Templates

All templates use **fully inline CSS** for Gmail compatibility. Gmail strips `<style>` blocks, so every style is applied directly on each HTML element.

| Template | Purpose | CTA |
|----------|---------|-----|
| `workflow_3_contact_reply.html` | Reply to contact form submissions | Book a Call |
| `workflow_4_calculator_quote.html` | High-value quote follow-up | Schedule Scope Review |
| `workflow_7_dodo_nurture_day_1.html` | Post-purchase check-in (soft touch) | None (reply invite) |
| `workflow_7_dodo_nurture_day_4.html` | Post-purchase follow-up (service pitch) | Book a Call |

### Editing Templates

1. Edit the `.html` file in `make-workflows/templates/`
2. Run `node make-workflows/create-scenarios.mjs` to rebuild blueprints and update scenarios
3. Or manually: open the scenario in Make.com → click the Gmail module → set Content Type to **HTML** → paste the updated HTML

### Make.com Variable Syntax

In the templates, dynamic values use Make.com's double-brace syntax:
- `{{1.name}}` — field from webhook module (module ID 1)
- `{{1.customer.email}}` — nested field
- `{{formatNumber(1.estimatedBWP; 2; ","; ".")}}` — formatted number

---

## File Structure

```
make-workflows/
├── README.md                    # This file
├── create-scenarios.mjs         # Script to create/update scenarios via API
├── blueprints/                  # Generated Make.com blueprint JSON files
│   ├── workflow_1_contact_form_reply.json
│   ├── workflow_2_calculator_quote.json
│   └── workflow_3_dodo_nurture.json
└── templates/                   # HTML email templates (inline CSS)
    ├── workflow_3_contact_reply.html
    ├── workflow_4_calculator_quote.html
    ├── workflow_7_dodo_nurture_day_1.html
    └── workflow_7_dodo_nurture_day_4.html
```

---

## Environment Variables

All Make.com credentials and IDs are stored in `.env.local`:

| Variable | Purpose |
|----------|---------|
| `MAKE_API_TOKEN` | API authentication |
| `MAKE_ORGANIZATION_ID` | Organization (4892531) |
| `MAKE_TEAM_ID` | Team (2464095) |
| `MAKE_ZONE` | API zone (eu2.make.com) |
| `MAKE_GMAIL_CONNECTION_ID` | Gmail OAuth connection (13308866) |
| `MAKE_WEBHOOK_LEAD_CAPTURE` | Contact form webhook URL |
| `MAKE_WEBHOOK_CALCULATOR_QUOTE` | Calculator quote webhook URL |
| `MAKE_WEBHOOK_DODO_PAYMENTS` | Dodo Payments webhook URL |
| `MAKE_SCENARIO_CONTACT_FORM` | Scenario ID (9114789) |
| `MAKE_SCENARIO_CALCULATOR_QUOTE` | Scenario ID (9114793) |
| `MAKE_SCENARIO_DODO_NURTURE` | Scenario ID (9114795) |

---

## Testing

### Quick Test: Contact Form (Scenario 1)

1. Go to your website's `/contact` page
2. Fill in the form with a test email you can check
3. Select any project type and submit
4. Check the [scenario execution log](https://eu2.make.com/scenario/9114789)
5. Check your test email inbox for the styled reply

### Quick Test: Calculator (Scenario 2)

1. Go to your website's pricing calculator
2. Select services totalling more than P 2,000
3. Click "Request Formal Quote" and enter your test email
4. Check the [scenario execution log](https://eu2.make.com/scenario/9114793)
5. Verify the email arrives (test with < P 2,000 to confirm the filter blocks it)

### Quick Test: Dodo Payments (Scenario 3)

1. Use Dodo Payments **Test Mode** to trigger a test purchase
2. Check the [scenario execution log](https://eu2.make.com/scenario/9114795)
3. Verify both nurture emails arrive

---

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| Webhook not firing | URL mismatch | Verify URLs in `.env.local` match the ones in Make.com |
| Gmail module fails | OAuth expired | Open the scenario → click Gmail module → Re-authorize |
| No email sent | Filter blocked it | Check execution log — for Scenario 2, estimate must exceed 2000 |
| Duplicate emails | Dodo sends multiple events | Add a filter for `payment.succeeded` only (not other statuses) |
| Email looks unstyled | Template uses CSS classes | Ensure all styles are inline (no `<style>` blocks) |
| Scenario shows "inactive" | Was deactivated | Go to scenario URL → toggle ON, or use API: `POST /scenarios/{id}/start` |

---

## Security Notes

- **Never commit** `.env.local` to version control (it is gitignored)
- **Teams Plan expires 2026-08-12** — renew before workflows stop
- **Monitor execution logs** weekly at [Make.com dashboard](https://eu2.make.com)
- The Gmail connection uses OAuth — if the token expires, re-authorize in any scenario's Gmail module
