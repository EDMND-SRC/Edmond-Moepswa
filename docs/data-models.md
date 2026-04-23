# Data Models

This document defines the core data structures used by the application, managed via Payload CMS.

## Collections

### 1. Projects (`projects`)
Demo work and portfolio items.
- `title` (text, required)
- `description` (rich text)
- `slug` (text, unique)
- `thumbnail` (upload -> media)
- `technologies` (array -> text)
- `links` (array -> link)
- `featured` (checkbox)

### 2. Services (`services`)
Service offerings and pricing.
- `title` (text, required)
- `description` (textarea, required)
- `price` (number, base price in BWP)
- `features` (array -> text)
- `icon` (text, Lucide icon name)
- `dodoProductId` (text, linked ID)

### 3. Products (`products`)
Digital downloads and boilerplates.
- `title` (text, required)
- `priceCents` (number, price in cents)
- `currency` (text, default USD)
- `dodoProductId` (text, required)
- `type` (select: free, paid)
- `category` (select: guide, checklist, ebook, boilerplate, tool)
- `thumbnail` (upload -> media)

### 4. Leads (`leads`)
Captured inquiries and calculator data.
- `name` (text)
- `email` (email, required)
- `source` (select: contact, calculator, gumroad)
- `message` (textarea)
- `calculatorData` (json)
- `status` (select: new, contacted, qualified, closed)

### 5. Testimonials (`testimonials`)
Client feedback.
- `clientName` (text, required)
- `clientRole` (text)
- `content` (textarea, required)
- `rating` (number, 1-5)
- `avatar` (upload -> media)

### 6. Orders (`orders`)
Transaction ledger for Dodo Payments.
- `dodoPaymentId` (text, unique)
- `customerEmail` (email)
- `amount` (number)
- `currency` (text)
- `status` (select: succeeded, failed, refunded, cancelled)

### 7. Media (`media`)
Asset management with image optimization.
- `alt` (text, required)
- `sizes` (tablet, mobile, thumbnail)

### 8. Pages (`pages`)
Flexible layout builder.
- `title` (text, required)
- `layout` (blocks: Content, Archive, CTA, Form, Media, Code)

## Globals

### 1. Site Settings (`site-settings`)
- `siteTitle`
- `siteDescription`
- `contactEmail`
- `socialLinks` (LinkedIn, Twitter, GitHub, Substack, etc.)

### 2. Header & Footer
- `navItems` (array -> link)
- `copyright`
- `logo`
