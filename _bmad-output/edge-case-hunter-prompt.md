# Edge Case Hunter Review

**Goal:** You are a pure path tracer. Never comment on whether code is good or bad; only list missing handling.
Scan only the diff hunks and list boundaries that are directly reachable from the changed lines and lack an explicit guard in the diff.

**Your method is exhaustive path enumeration — mechanically walk every branch, not hunt by intuition. Report ONLY paths and conditions that lack handling — discard handled ones silently. Do NOT editorialize or add filler — findings only.**

Return ONLY a valid JSON array of objects. Each object must contain exactly these four fields and nothing else:
```json
[{
  "location": "file:start-end (or file:line when single line, or file:hunk when exact line unavailable)",
  "trigger_condition": "one-line description (max 15 words)",
  "guard_snippet": "minimal code sketch that closes the gap (single-line escaped string, no raw newlines or unescaped quotes)",
  "potential_consequence": "what could actually go wrong (max 15 words)"
}]
```
No extra text, no explanations, no markdown wrapping. An empty array `[]` is valid when no unhandled paths are found.

## Diff to Review

```diff
diff --git a/src/app/(frontend)/api/quote-pdf/route.tsx b/src/app/(frontend)/api/quote-pdf/route.tsx
index 31f5baa..ee6aa52 100644
--- a/src/app/(frontend)/api/quote-pdf/route.tsx
+++ b/src/app/(frontend)/api/quote-pdf/route.tsx
@@ -1,5 +1,5 @@
 import { NextResponse } from 'next/server'
-import { renderToStream } from '@react-pdf/renderer'
+import { renderToBuffer } from '@react-pdf/renderer'
 import { QuotePDF } from '@/components/homepage/CalculatorSection/QuotePDF'
 import React from 'react'
 import { Readable } from 'stream'
@@ -13,20 +13,10 @@ export async function POST(req: Request) {
       return NextResponse.json({ error: 'Missing selections data' }, { status: 400 })
     }
 
-    // Render PDF to stream
-    const stream = await renderToStream(<QuotePDF selections={selections} />)
-    
-    // Convert Node stream to Web stream for NextResponse
-    const webStream = new ReadableStream({
-      async start(controller) {
-        for await (const chunk of stream as any) {
-          controller.enqueue(chunk)
-        }
-        controller.close()
-      },
-    })
+    // Render PDF to buffer
+    const pdfBuffer = await renderToBuffer(<QuotePDF selections={selections} />)
 
-    return new NextResponse(webStream, {
+    return new NextResponse(pdfBuffer, {
       headers: {
         'Content-Type': 'application/pdf',
         'Content-Disposition': `attachment; filename="quote-${selections.serviceLabel.replace(/\s+/g, '-').toLowerCase()}.pdf"`,
diff --git a/src/app/api/dodo-products/route.ts b/src/app/api/dodo-products/route.ts
index d41ec27..01bf902 100644
--- a/src/app/api/dodo-products/route.ts
+++ b/src/app/api/dodo-products/route.ts
@@ -12,7 +12,8 @@ export async function GET() {
     const response = await client.products.list({ limit: 50 } as any)
 
     // Transform products for the storefront
-    const transformed = ((response as any).data || []).map((p: any) => ({
+    const items = (response as any).items || (response as any).data || []
+    const transformed = items.map((p: any) => ({
       id: p.id,
       name: p.name,
       description: p.description || '',
diff --git a/src/components/homepage/ProjectsSection.tsx b/src/components/homepage/ProjectsSection.tsx
index 2610e83..d9e1e91 100644
--- a/src/components/homepage/ProjectsSection.tsx
+++ b/src/components/homepage/ProjectsSection.tsx
@@ -205,8 +205,9 @@ export default function ProjectsSection() {
     fetch('/api/projects', { signal })
       .then((res) => res.json())
       .then((data) => {
-        if (data.projects?.length > 0) {
-          const mapped: Project[] = data.projects
+        const payloadData = data.docs || data.projects || []
+        if (payloadData.length > 0) {
+          const mapped: Project[] = payloadData
             .filter((p: any) => p.category !== 'boilerplate')
             .map((p: any) => ({
               id: p.id,
@@ -241,12 +242,19 @@ export default function ProjectsSection() {
   }, [fetchProjects])
 
   useEffect(() => {
+    let rafId: number
     const updateMousePos = (e: MouseEvent) => {
       if (!isHovering) return
-      setCursorPos({ x: e.clientX, y: e.clientY })
+      cancelAnimationFrame(rafId)
+      rafId = requestAnimationFrame(() => {
+        setCursorPos({ x: e.clientX, y: e.clientY })
+      })
     }
     window.addEventListener('mousemove', updateMousePos)
-    return () => window.removeEventListener('mousemove', updateMousePos)
+    return () => {
+      window.removeEventListener('mousemove', updateMousePos)
+      cancelAnimationFrame(rafId)
+    }
   }, [isHovering])
```
