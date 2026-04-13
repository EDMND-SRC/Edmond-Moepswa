# Cal.com Scheduling Integration Strategy — Edmond Moepswa

**Generated:** 6 April 2026
**Platform:** Cal.com (cal.com) — Open-source scheduling
**Free Tier:** 1 user, 1 calendar connection, 1 event type, unlimited bookings

---

## Overview

Cal.com is an open-source scheduling and booking platform that provides an alternative to Calendly with a more generous free tier and self-hosting capability. Its cloud free tier includes unlimited bookings (unlike Calendly's 1-event-type limit), and the self-hosted version is fully open-source (MIT license) with no usage limits.

For Edmond's service offerings, Cal.com serves as:

1. **Discovery call booking** — The 30-minute free discovery call that begins every client engagement
2. **Client appointment scheduling** — Embedded booking widget in Boilerplate 2 (Professional Services), Boilerplate 3 (Food/Catering), Boilerplate 4 (Beauty/Wellness), and Boilerplate 5 (Events/Photography)
3. **Advisory session scheduling** — Bookable Foundation Sessions (P2,500) and Half-Day Working Sessions (P6,500)
4. **Internal meeting management** — Edmond's own calendar coordination with clients, contractors, and partners

---

## Free Tier Limits (Cloud — 2026)

| Resource | Limit |
|----------|-------|
| Users | 1 |
| Calendar connections | 1 (Google Calendar, Outlook, or Apple Calendar) |
| Event types | 1 |
| Bookings | Unlimited |
| Booking pages | 1 (cal.com/[your-username]) |
| Timezone detection | Automatic |
| Email notifications | Included |
| Reminders | Email reminders included |
| Payment collection | Stripe integration (not available in Botswana — use manual payment instructions) |
| Teams | Not available on free tier |
| Workflows (SMS reminders, custom notifications) | Not available on free tier |

**Self-hosted (MIT license):** Unlimited users, unlimited calendars, unlimited event types, unlimited bookings. Only cost is the server infrastructure to run it.

---

## By Service Category

### 1. Web Design & Development

#### Discovery Call Booking (All Services)
- **Use case:** Every service engagement begins with a free 30-minute discovery call, bookable via Cal.com
- **Setup:** Cal.com event type "Discovery Call — 30 min" → embed link on personal website (`edmondmoepswa.com/book`) → client books → automatic Google Calendar sync
- **Value:** Professional booking experience — client sees available slots, books in one click, receives confirmation and reminder emails. No back-and-forth emails to find a time

#### Boilerplate 2 — Personal Professional Services (from P28,000)
- **Use case:** Professional's discovery calls and appointment bookings embedded directly on their website
- **Implementation:** Cal.com embed (iframe or component) → visitors book directly on the site → calendar sync → email notifications
- **Value:** Included in the boilerplate build. Professional gets a fully functional booking system without building custom scheduling logic

#### Booking / Scheduling Add-On (+P2,500)
- **Use case:** Any Foundation or Growth build client who wants online booking capability
- **Implementation:** Cal.com embed → styled to match the site's design → integrated with the site's CRM (HubSpot) for lead tracking
- **Value:** Functional booking system in 1 hour of setup — far cheaper than building custom booking logic

---

### 2. Web Applications

#### Multi-Staff Booking (Boilerplate 3, 4, 5)
- **Use case:** Salon with 3 stylists, catering company with 2 event coordin, photography studio with multiple photographers — each staff member has their own Cal.com event type
- **Free tier limitation:** 1 event type on the cloud free tier. For multi-staff, either: (a) self-host Cal.com (free, unlimited), or (b) use Cal.com paid plan ($10/user/month)
- **Recommendation:** For multi-staff boilerplate builds, self-host Cal.com on a free-tier VPS (Oracle Cloud ARM) — zero platform cost, unlimited staff and event types

#### Paid Advisory Sessions
- **Use case:** Foundation Session (P2,500, 60 min) and Half-Day Working Session (P6,500, 3 hours) — bookable via Cal.com with payment confirmation before the session is confirmed
- **Payment limitation:** Cal.com's payment integration requires Stripe (unavailable in Botswana). **Workaround:** Cal.com event type → booking confirmed → automated email with bank transfer instructions → client pays → Edmond confirms manually → session confirmed
- **Alternative:** Use a custom booking flow on the personal website — form submission → Resend confirmation email → manual payment → calendar invite sent after payment confirmed

---

### 3. Workflow Automation

#### Cal.com + Make.com Integration
- **Use case:** Cal.com booking → webhook to Make.com → create HubSpot contact → send personalised confirmation email via Resend → add to Google Calendar
- **Value:** Automated booking workflow — the client's CRM is updated automatically, no manual data entry

#### Booking Reminder Automation
- **Use case:** Cal.com booking → Make.com scheduled scenario → 24 hours before appointment → send email reminder via Resend + SMS reminder via Twilio
- **Value:** Reduced no-show rate through multi-channel reminders. Cal.com's free tier only includes email reminders — SMS requires Cal.com paid plan or a Make.com workaround

---

### 4. Advisory & Consulting

#### Session Booking for Advisory Services
- **Use case:** Advisory clients book sessions through Cal.com → payment confirmed via bank transfer → automated email with session prep brief and video call link
- **Process:** Book via Cal.com → receive booking confirmation → receive payment instructions → pay → receive session confirmation with prep materials
- **Value:** Professional, automated booking experience for paid advisory services — builds confidence before the first interaction

---

## Quick-Win Implementations

### Priority 1: Cal.com Embed on Personal Website (15 min)
```tsx
// app/book/page.tsx
export default function BookingPage() {
  return (
    <iframe
      src="https://cal.com/edmond-moepswa/discovery-call"
      style={{ width: '100%', height: '700px', border: 'none' }}
      allow="camera; microphone"
    />
  )
}
```

Or use the Cal.com React component for tighter integration:

```tsx
import { CalProvider } from '@calcom/embed-react'

export function BookingWidget() {
  return (
    <CalProvider namespace="edmond-moepswa">
      <CalElement
        calLink="discovery-call"
        config={{
          theme: 'light',
          hideEventTypeDetails: false,
        }}
      />
    </CalProvider>
  )
}
```

### Priority 2: Self-Hosted Cal.com for Multi-Staff Builds (3 hours)
Deploy on Oracle Cloud Free Tier ARM instance:

```bash
# Clone and deploy
git clone https://github.com/calcom/cal.com.git
cd cal.com
docker-compose up -d

# Configure:
# - Database: PostgreSQL (included in Docker Compose)
# - Calendar: Connect via OAuth (Google Calendar)
# - Domain: clientsite.com/book (reverse proxy via Caddy/Nginx)
```

### Priority 3: Manual Payment Workflow (1 hour)
Since Stripe is unavailable in Botswana, implement a manual payment flow:

1. Client books via Cal.com
2. Automated email sent: "Your session is tentatively booked. To confirm, please transfer P2,500 to [bank details] with reference [booking ID]"
3. Payment received → Edmond confirms → calendar invite sent
4. No payment within 48 hours → booking auto-cancelled (manual process)

---

## Resource Budget Planning

**Cloud free tier:**

| Resource | Usage | Free Limit | Headroom |
|----------|-------|-------------|----------|
| Event types | 1 (discovery call or single service) | 1 | Full |
| Bookings/month | 10–50 | Unlimited | N/A |
| Calendar connections | 1 (Google Calendar) | 1 | Full |

**Self-hosted (Oracle Cloud Free Tier):**

| Resource | Usage | Limit | Headroom |
|----------|-------|-------|----------|
| Event types | Unlimited | Unlimited | N/A |
| Staff members | Unlimited | Unlimited | N/A |
| Bookings | Unlimited | Unlimited | N/A |
| Server cost | $0/month | Oracle ARM free | N/A |

**When to use cloud free vs. self-hosted:**

| Scenario | Recommendation |
|----------|---------------|
| Edmond's personal booking page | Cal.com cloud free (1 event type is sufficient) |
| Single-staff client site | Cal.com cloud free (1 event type for their service) |
| Multi-staff client site | Self-hosted Cal.com (unlimited event types, $0 platform cost) |
| Paid session booking with Stripe | Not available in Botswana — use manual payment flow |

---

## Risks & Considerations

1. **1 event type on cloud free tier:** A professional services client who offers discovery calls AND paid consultations needs 2 event types — exceeding the free tier. **Mitigation:** Self-host Cal.com or use the paid plan ($10/user/month)
2. **No payment integration in Botswana:** Stripe is the only Cal.com payment provider. Botswana clients must use manual bank transfer or Orange Money payment flows outside Cal.com
3. **No SMS reminders on free tier:** Email reminders only. For clients who need SMS reminders, use Make.com + Twilio as a workaround (adds complexity and cost — ~$0.10/SMS)
4. **Calendar sync limitation:** 1 calendar connection on the free tier. If the client uses both Google Calendar and Outlook Calendar, they need the paid plan or self-hosting
5. **No team features on free tier:** Multi-user scheduling (receptionist books on behalf of doctor, assistant manages executive's calendar) requires paid plans
6. **Self-hosting complexity:** Self-hosted Cal.com requires server management, database maintenance, and updates. Suitable for Edmond's builds but may be beyond a client's technical capacity after handover

---

## Summary: Revenue and Efficiency Potential

| Use Case | Client Price | Internal Cost | Margin |
|----------|-------------|---------------|--------|
| Discovery call booking (personal site) | N/A — internal tool | $0 (free tier) | N/A |
| Booking add-on for client site | +P2,500 | $0 (free tier) | 100% |
| Multi-staff booking (self-hosted) | Included in boilerplate price | $0 (Oracle Free Tier) | 100% |
| Advisory session booking | Included in advisory pricing | $0 (free tier) | 100% |

**Key insight:** Cal.com's cloud free tier (1 event type, unlimited bookings) is perfect for Edmond's personal discovery call booking and for single-service client sites. For multi-staff or multi-service builds, self-hosted Cal.com on Oracle Cloud's free tier provides unlimited booking capability at zero platform cost. The main limitation in Botswana is payment integration — Stripe is unavailable, so paid session booking requires a manual bank transfer workflow. This adds a manual step but is operationally manageable and clearly documented in the client handover.

---

**End of Cal.com Scheduling Integration Strategy**
