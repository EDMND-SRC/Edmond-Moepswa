# Make.com Automation Workflows

This folder contains the step-by-step setup instructions for Make.com (Teams Plan) automation workflows. Since Make.com scenarios require authentication with personal accounts (Google, Cal.com, Google Sheets, Gumroad), each workflow must be created via the Make.com visual builder UI.

Follow these blueprints to create and configure your automations.

> **IMPORTANT:** Never commit API tokens, email addresses, or webhook URLs to version control. All sensitive values must be stored as environment variables in `.env.local` and Vercel project settings.

---

## Workflow 1: Cal.com Booking Confirmation Email

**Purpose:** Automatically send a confirmation email to anyone who books a discovery call.
**Trigger:** Cal.com webhook fires when a new booking is created.
**Actions:** Gmail sends a personalised confirmation to the attendee.

### Make.com Setup

1. **Create Scenario** in Make.com.
2. **Add Trigger Module** — Select `Custom Webhook`.
   - Make.com will generate a webhook URL. Copy this URL.
   - In Cal.com dashboard: Settings → Webhooks → Add New Webhook.
   - Event: `Booking Created`. Paste the Make.com webhook URL. Save.
3. **Add Action Module** — Select `Gmail → Send an Email`.
   - Connect your Google Account (edmond.moepswa@gmail.com).
   - Grant required OAuth permissions.
4. **Configure the email:**

| Gmail Field | Value                                                                                                                            |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------- |
| To          | `1.attendees[].email` (map from webhook payload)                                                                                 |
| Subject     | `Booking Confirmed: Discovery Call with Edmond Moepswa`                                                                          |
| Content     | `Hi {1.attendees[].name},<br><br>Looking forward to our call on {1.startTime}.<br><br>Join here: {1.meetingUrl}<br><br>— Edmond` |

### Testing

- [ ] Book a test meeting via your Cal.com page.
- [ ] Verify the webhook fires in Make.com (check scenario execution log).
- [ ] Check your inbox for the confirmation email.
- [ ] Confirm attendee name, date/time, and meeting link are correctly populated.

---

## Workflow 2: Cal.com Booking Lead Tracking (Google Sheets)

**Purpose:** Log every Cal.com booking into a Google Sheet for CRM/lead tracking.
**Trigger:** Same Cal.com webhook as Workflow 1 (branch from the same webhook module).
**Actions:** Google Sheets adds a new row with booking details.

### Make.com Setup

1. **In the same scenario as Workflow 1**, add a second branch from the `Custom Webhook` module.
2. **Add Action Module** — Select `Google Sheets → Add a Row`.
   - Connect your Google Account.
   - Select the spreadsheet: `Portfolio Leads CRM` (create one if it does not exist).
   - Ensure the sheet has columns: `Name`, `Email`, `Date/Time`, `Service Interest`, `Source`.
3. **Configure the row:**

| Google Sheets Column | Mapped Value                                        |
| -------------------- | --------------------------------------------------- |
| Name                 | `1.attendees[].name`                                |
| Email                | `1.attendees[].email`                               |
| Date/Time            | `1.startTime`                                       |
| Service Interest     | `1.eventType.title` (or custom field if configured) |
| Source               | `"Cal.com - Portfolio"` (static value)              |

### Testing

- [ ] Book a test meeting via your Cal.com page.
- [ ] Verify a new row appears in the Google Sheet.
- [ ] Confirm all columns are populated correctly.

---

## Workflow 3: Contact Form Intent-Based Email Reply

**Purpose:** When a visitor submits the contact form on the portfolio, send a tailored email reply based on their project intent.
**Trigger:** Custom webhook from the portfolio's `/api/make-webhook` route (workflow: `lead-capture`).
**Actions:** Text parser extracts intent, then Gmail sends a tailored response.

### Make.com Setup

1. **Create Scenario** in Make.com.
2. **Add Trigger Module** — Select `Custom Webhook`.
   - Copy the webhook URL. Set it as `MAKE_WEBHOOK_LEAD_CAPTURE` in `.env.local` and Vercel env vars.
   - The portfolio form POSTs to `/api/make-webhook` with `{ workflow: 'lead-capture', data: { name, email, projectType, message, ... } }`.
3. **Add Router Module** — Create routes based on `projectType`:
   - Route 1: `projectType` contains "Website Design" or "Web Application"
   - Route 2: `projectType` contains "Workflow Automation"
   - Route 3: `projectType` contains "SEO/GEO"
   - Route 4: `projectType` contains "Boilerplate Build"
   - Route 5: `projectType` contains "Advisory/Consulting"
   - Default Route: catch-all for "Other" or unmatched
4. **Add Action Module (per route)** — Select `Gmail → Send an Email`.
   - Connect your Google Account.

### Field Mappings (per route example)

| Gmail Field | Value                                                                                                                                                                                                                                                                        |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| To          | `data.email` (from webhook payload)                                                                                                                                                                                                                                          |
| Subject     | `Thanks for reaching out, {data.name}!`                                                                                                                                                                                                                                      |
| Content     | Route-specific template. Example for "Website Design":<br><br>`Hi {data.name},<br><br>Thanks for your interest in a website design project. I would love to learn more about your vision.<br><br>Book a free discovery call: https://cal.com/edmond-moepswa<br><br>— Edmond` |

### Testing

- [ ] Submit the contact form on `/contact` with project type "Website Design".
- [ ] Verify the webhook fires in Make.com execution log.
- [ ] Check inbox for the tailored email reply.
- [ ] Repeat for each project type to verify routing.

---

## Workflow 4: Calculator High-Value Quote Alert

**Purpose:** When a visitor uses the pricing calculator and requests a formal quote for a high-value project (estimate > P2,000), send a personalised offer email.
**Trigger:** Custom webhook from the calculator's "Request Formal Quote" button.
**Actions:** Filter checks estimate > P2,000, then Gmail sends an offer email.

### Make.com Setup

1. **Create Scenario** in Make.com.
2. **Add Trigger Module** — Select `Custom Webhook`.
   - Copy the webhook URL. Set it as `MAKE_WEBHOOK_CALCULATOR_QUOTE` in `.env.local` and Vercel env vars.
3. **Add Filter Module** — Set condition:
   - `data.estimatedBWP` (number) > `2000`.
4. **Add Action Module** — Select `Gmail → Send an Email`.
   - Connect your Google Account.

### Field Mappings

| Gmail Field | Value                                                                                                                                                                                                                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| To          | `data.email` (from webhook payload)                                                                                                                                                                                                                                                      |
| Subject     | `Your Project Estimate: {data.estimatedBWP} BWP`                                                                                                                                                                                                                                         |
| Content     | `Hi {data.name},<br><br>I noticed you were exploring a high-tier project on my site (estimated at {data.estimatedBWP} BWP).<br><br>I would love to discuss this in more detail and provide a formal quote. Let's schedule a call:<br><br>https://cal.com/edmond-moepswa<br><br>— Edmond` |

### Testing

- [ ] Use the calculator, select services that total > P2,000.
- [ ] Click "Request Formal Quote", enter name + email, submit.
- [ ] Verify the webhook fires in Make.com execution log.
- [ ] Confirm the filter passes and the email is sent.
- [ ] Test with a low-value estimate (< P2,000) — verify the filter blocks the email.

---

## Workflow 5: Weekly Vercel Analytics Report

**Purpose:** Receive a weekly summary of Vercel analytics (page views, visits, unique visitors) every Monday morning.
**Trigger:** Scheduled trigger every Monday at 08:00 CAT.
**Actions:** HTTP request fetches Vercel analytics API, then Gmail sends a formatted summary.

### Make.com Setup

1. **Create Scenario** in Make.com.
2. **Add Trigger Module** — Select `Tools → Basic Trigger` (Schedule).
   - Configure: Every Monday at 08:00 (Africa/Gaborone timezone).
3. **Add Action Module** — Select `HTTP → Make a Request`.
   - Method: `GET`
   - URL: `https://api.vercel.com/v2/projects/{VERCEL_PROJECT_ID}/analytics/views`
   - Query Parameters:
     - `slug` = `pageviews`
     - `start` = `{{addDays(formatDate(now; "X"); -7)}}` (7 days ago)
     - `end` = `{{formatDate(now; "X")}}` (now)
   - Headers:
     - `Authorization` = `Bearer {VERCEL_TOKEN}`
   - Set `VERCEL_PROJECT_ID` and `VERCEL_TOKEN` from `.env.local`.
4. **Add Action Module** — Select `Gmail → Send an Email`.
   - To: Your email (edmond.moepswa@gmail.com).
   - Subject: `Weekly Vercel Analytics — {{formatDate(now; "DD MMM YYYY")}}`
   - Content: Parse the JSON response and format key metrics (pageviews, visitors, unique visitors) into a readable table.

### Testing

- [ ] Manually trigger the scenario in Make.com.
- [ ] Verify the HTTP request returns valid analytics data.
- [ ] Check your inbox for the formatted email.
- [ ] Confirm the date range in the query covers the last 7 days.

---

## Workflow 6: Cal.com Cancelled Booking Re-engagement

**Purpose:** When a booked discovery call is cancelled, send a re-engagement email with a reschedule link and a small incentive.
**Trigger:** Cal.com webhook fires when a booking is cancelled.
**Actions:** Gmail sends a re-engagement email.

### Make.com Setup

1. **Create Scenario** in Make.com.
2. **Add Trigger Module** — Select `Custom Webhook`.
   - Copy the webhook URL. In Cal.com dashboard: Settings → Webhooks → Add New Webhook.
   - Event: `Booking Cancelled`. Paste the Make.com webhook URL. Save.
   - (You can reuse `CAL_WEBHOOK_URL` or create a separate webhook URL for cancellation handling.)
3. **Add Action Module** — Select `Gmail → Send an Email`.
   - Connect your Google Account.

### Field Mappings

| Gmail Field | Value                                                                                                                                                                                                                                                                                                             |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| To          | `1.attendees[].email` (from webhook payload)                                                                                                                                                                                                                                                                      |
| Subject     | `Sorry we missed you — let's reschedule`                                                                                                                                                                                                                                                                          |
| Content     | `Hi {1.attendees[].name},<br><br>Sorry we could not connect for our discovery call. No worries — you can reschedule at a time that works better for you:<br><br>https://cal.com/edmond-moepswa<br><br>As a thank-you for your interest, use code **RECONNECT10** for 10% off your first project.<br><br>— Edmond` |

### Testing

- [ ] Book a test meeting, then cancel it from Cal.com.
- [ ] Verify the webhook fires in Make.com execution log.
- [ ] Check your inbox for the re-engagement email.
- [ ] Confirm the attendee name and reschedule link are correct.

---

## Workflow 7: Gumroad Download Nurture Sequence

**Purpose:** After someone downloads a free resource from Gumroad, send a two-email nurture sequence spaced over 4 days.
**Trigger:** Gumroad webhook fires when a new sale/download occurs.
**Actions:** Sleep 1 day → Email 1 → Sleep 3 days → Email 2.

### Make.com Setup

1. **Create Scenario** in Make.com.
2. **Add Trigger Module** — Select `Gumroad → Watch Sales` (or use a Custom Webhook triggered by Gumroad's ping).
   - If using Custom Webhook: In Gumroad dashboard → Products → Edit Product → Webhooks → add the Make.com webhook URL for "Purchase" events.
   - Copy the webhook URL. Set it as `MAKE_WEBHOOK_GUMROAD_DOWNLOAD` in `.env.local` and Vercel env vars.
3. **Add Action Module** — Select `Tools → Sleep`.
   - Duration: `1 day` (86400 seconds).
4. **Add Action Module** — Select `Gmail → Send an Email` (Email 1).
   - Connect your Google Account.

### Field Mappings — Email 1

| Gmail Field | Value                                                                                                                                                                                                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| To          | `buyer_email` (from Gumroad payload)                                                                                                                                                                                                                                                   |
| Subject     | `Hope you found it useful!`                                                                                                                                                                                                                                                            |
| Content     | `Hi {buyer_name},<br><br>I hope you enjoyed the free resource. If you found it helpful, here are a few things that might interest you:<br><br>- Book a free discovery call: https://cal.com/edmond-moepswa<br>- Check out my pricing calculator on the portfolio site<br><br>— Edmond` |

5. **Add Action Module** — Select `Tools → Sleep`.
   - Duration: `3 days` (259200 seconds).
6. **Add Action Module** — Select `Gmail → Send an Email` (Email 2).

### Field Mappings — Email 2

| Gmail Field | Value                                                                                                                                                                                                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| To          | `buyer_email` (from Gumroad payload)                                                                                                                                                                                |
| Subject     | `Still thinking about your next project?`                                                                                                                                                                           |
| Content     | `Hi {buyer_name},<br><br>Just checking in. If you are planning a website, web app, or automation project, I would be happy to chat.<br><br>Book a free 30-min call: https://cal.com/edmond-moepswa<br><br>— Edmond` |

### Testing

- [ ] Trigger a test Gumroad purchase (use Gumroad's test mode).
- [ ] Verify the webhook fires in Make.com execution log.
- [ ] After 1 day, verify Email 1 is received.
- [ ] After 3 more days, verify Email 2 is received.
- [ ] **Tip:** During testing, reduce sleep durations to 1 minute to verify quickly, then reset to production values.

---

## Environment Variables

Add these to your `.env.local` file and Vercel project settings:

| Variable                        | Purpose                       | Where to Get                                                |
| ------------------------------- | ----------------------------- | ----------------------------------------------------------- |
| `MAKE_WEBHOOK_LEAD_CAPTURE`     | Contact form → lead tracking  | Make.com Custom Webhook URL (Workflow 3)                    |
| `MAKE_WEBHOOK_CALCULATOR_QUOTE` | Calculator high-value trigger | Make.com Custom Webhook URL (Workflow 4)                    |
| `MAKE_WEBHOOK_GUMROAD_DOWNLOAD` | Gumroad download tracking     | Make.com Custom Webhook or Gumroad webhook URL (Workflow 7) |
| `CAL_WEBHOOK_URL`               | Cal.com booking notifications | Make.com Custom Webhook URL (Workflow 1 & 2)                |
| `VERCEL_PROJECT_ID`             | Vercel analytics API          | Vercel dashboard → Project Settings                         |
| `VERCEL_TOKEN`                  | Vercel API authentication     | Vercel dashboard → Settings → Tokens                        |

> **Note:** The `CAL_WEBHOOK_URL` is already configured. New Make.com webhook URLs must be created and added after setting up each scenario in Make.com.

---

## Testing Checklist

Run through these steps after creating all workflows:

- [ ] **Workflow 1:** Book a Cal.com meeting → confirm email received.
- [ ] **Workflow 2:** Book a Cal.com meeting → verify row in Google Sheet.
- [ ] **Workflow 3:** Submit contact form on `/contact` → confirm tailored email reply.
- [ ] **Workflow 4:** Use calculator with estimate > P2,000 → request quote → confirm email.
- [ ] **Workflow 4 (negative):** Use calculator with estimate < P2,000 → confirm no email sent.
- [ ] **Workflow 5:** Manually trigger Vercel analytics scenario → confirm weekly report email.
- [ ] **Workflow 6:** Book then cancel a Cal.com meeting → confirm re-engagement email.
- [ ] **Workflow 7:** Trigger Gumroad test purchase → confirm Email 1 after 1d, Email 2 after 3d (or 1min in test mode).
- [ ] **All workflows:** Check Make.com execution history for errors or failed runs.

---

## Troubleshooting

| Issue                               | Cause                                                                            | Fix                                                                                                                         |
| ----------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Webhook not firing                  | Wrong URL or webhook not connected                                               | Verify the Make.com webhook URL matches the one configured in the external service (Cal.com, Gumroad, portfolio API route). |
| Gmail module fails                  | OAuth token expired or revoked                                                   | Re-authorise the Gmail connection in Make.com (module settings → Re-authorise).                                             |
| Google Sheets row not added         | Sheet structure changed or missing permissions                                   | Ensure the sheet exists with the correct column headers. Re-authorise the Google Sheets connection.                         |
| Make.com scenario runs but no email | Filter conditions not met                                                        | Check the filter logic. Review the payload structure in the execution log to ensure field names match.                      |
| Vercel analytics returns 401        | Expired or invalid token                                                         | Regenerate `VERCEL_TOKEN` in Vercel dashboard and update Make.com HTTP module + `.env.local`.                               |
| Gumroad webhook not received        | Webhook not configured in Gumroad dashboard                                      | Go to Gumroad → Products → Edit → Webhooks → add the Make.com URL for "Purchase" events.                                    |
| Duplicate emails sent               | Webhook fires multiple times (e.g., Cal.com sends booking.created on update too) | Add deduplication in Make.com: store the last processed booking ID in a variable and skip if duplicate.                     |

---

## Security Notes

- **Never commit webhook URLs or API tokens to version control.** All sensitive values must be stored in `.env.local` (gitignored) and Vercel environment variables.
- **Make.com Teams Plan expires 2026-08-12.** Monitor the plan expiration and renew before workflows stop executing.
- **Use environment variables** for all secrets. Reference them in Make.com module configuration using the UI mapping — never hardcode.
- **Limit webhook access.** Custom webhooks in Make.com accept any POST request. If you notice unauthorised triggers, add a secret key validation in the webhook payload and filter on it in Make.com.
- **Rotate tokens periodically.** Regenerate `VERCEL_TOKEN` and Gumroad `ACCESS_TOKEN` every 90 days as a best practice.
- **Monitor Make.com execution logs** weekly for unexpected errors or unauthorised triggers.
