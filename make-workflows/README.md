# Make.com Automation Workflows

These scenarios are the live Make.com automations used by the public-only `edmond` site.

They are managed through the Make.com API from `make-workflows/create-scenarios.mjs`, using the credentials and webhook URLs stored in `.env.local`.

## Active workflows

1. `lead-capture`
   - trigger: `/api/make-webhook`
   - source: public contact form submissions
   - action: sends the HTML follow-up email through Gmail

2. `calculator-quote`
   - trigger: `/api/make-webhook`
   - source: public calculator quote requests
   - action: sends the HTML quote follow-up email through Gmail when the estimate is above the configured threshold

3. `dodo-payments`
   - trigger: `/api/webhooks/dodo` forwards the verified event to the Make.com webhook
   - source: signed Dodo payment events that already passed through the site
   - action: sends the post-purchase nurture emails through Gmail

## What is intentionally not here

- No `resource-download` workflow
- No direct Dodo-to-Make webhook registration
- No hardcoded API tokens, connection IDs, or hook IDs in source control

## Syncing scenarios

Run:

```bash
node make-workflows/create-scenarios.mjs
```

The script will:

- read `MAKE_API_TOKEN`, `MAKE_TEAM_ID`, `MAKE_ZONE`, `MAKE_GMAIL_CONNECTION_ID`, and the live webhook URLs from `.env.local`
- discover the matching Make.com hooks by webhook URL
- create missing scenarios
- start inactive scenarios
- write the resolved scenario IDs back into `.env.local`

## Templates

- `templates/workflow_3_contact_reply.html`
- `templates/workflow_4_calculator_quote.html`
- `templates/workflow_7_dodo_nurture_day_1.html`
- `templates/workflow_7_dodo_nurture_day_4.html`

The public app forwards Make.com compatibility payloads so the existing scenarios can stay stable:

- calculator quotes include `estimatedBWP` as the forwarded total field
- Dodo nurture forwards top-level `customer` and `product_cart` fields to match the existing Gmail templates

## Environment variables

- `MAKE_API_TOKEN`
- `MAKE_TEAM_ID`
- `MAKE_ZONE` or `MAKE_BASE_URL`
- `MAKE_GMAIL_CONNECTION_ID`
- `MAKE_WEBHOOK_LEAD_CAPTURE`
- `MAKE_WEBHOOK_CALCULATOR_QUOTE`
- `MAKE_WEBHOOK_DODO_PAYMENTS`
- `MAKE_SCENARIO_CONTACT_FORM`
- `MAKE_SCENARIO_CALCULATOR_QUOTE`
- `MAKE_SCENARIO_DODO_NURTURE`
