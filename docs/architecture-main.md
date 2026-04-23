# Architecture Overview

This document describes the high-level architecture of the Edmond Moepswa full-stack web application.

## 1. Executive Summary

The project is a custom-built, full-stack web application designed for a personal brand and digital services consultancy. It combines a modern frontend (Next.js 16) with a robust headless CMS (Payload CMS 3.82) to provide a dynamic, editable, and performant user experience.

## 2. Technology Stack

- **Core**: Next.js 16 (App Router), TypeScript 6
- **CMS**: Payload CMS 3.82 (PostgreSQL Adapter)
- **Database**: PostgreSQL (Neon)
- **Styling**: Tailwind CSS 4, shadcn/ui
- **Animations**: Motion, GSAP, Lenis
- **Integrations**: Dodo Payments, Make.com, Cal.com, PostHog, Sentry

## 3. Architecture Pattern

The application follows a **Monolithic Headless CMS** pattern:
- **Client/Server**: Next.js handles both the frontend rendering (Server Components) and the backend API routes.
- **Data Layer**: Payload CMS provides a type-safe interface to the PostgreSQL database, exposing both a REST API and a Local API for server-side data fetching.
- **Service Integration**: External services (Dodo, Make) are integrated via secure server-side API routes and webhooks.

## 4. Data Architecture

The data model is centered around several core collections:
- **Projects**: Demo work and portfolio items.
- **Services**: Service offerings and pricing tiers.
- **Leads**: Capture and management of potential client inquiries.
- **Orders**: Ledger of transactions processed via Dodo Payments.
- **Pages**: Flexible page builder using layout blocks.

## 5. UI/UX Architecture

- **SPA Behavior**: The homepage is a single-page application with code-split sections for performance.
- **Design System**: A dark-first, motion-rich design system implemented via Tailwind CSS and Motion.
- **Accessibility**: Built with accessibility as a first-class citizen (ARIA labels, keyboard navigation, reduced motion support).

## 6. Integration Architecture

- **Dodo Payments**: Handles checkout flows and digital asset delivery.
- **Make.com**: Orchestrates complex business logic (e.g., generating quote PDFs, lead nurturing).
- **Cal.com**: Synchronizes discovery call bookings with the lead management system.
- **Substack**: Dynamically pulls and parses blog content for display.

## 7. Security Model

- **RBAC**: Role-based access control for the Payload admin panel (Admin vs. Editor).
- **Environment Safety**: All secrets and API keys are managed via environment variables and never committed to source control.
- **Input Validation**: Strict validation on all public-facing forms (Leads collection) to prevent spam and malformed data.
