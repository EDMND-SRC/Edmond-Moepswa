# Unified GEO/SEO PDF Report Generator

## Purpose

This skill generates a professional, visually polished PDF report from unified GEO & SEO audit data. The PDF includes score gauges for both domains, bar charts, platform readiness visualizations, color-coded tables, and a prioritized action plan.

## Prerequisites

- **ReportLab** must be installed: `pip install reportlab`
- The PDF generation script is located at: `.agents/skills/bridgearc-geo-seo/scripts/generate_pdf_report.py`
- Run a full unified audit first (using `/geo-seo-audit`) to have data to include in the report

## How to Generate a PDF Report

### Step 1: Collect Audit Data

After running a full `/geo-seo-audit`, collect all scores, findings, and recommendations into a JSON structure. Complete this locally in Python or Bash before passing it into the Python script:

```json
{
    "url": "https://example.com",
    "brand_name": "Example Company",
    "date": "2026-02-18",
    "geo_score": 65,
    "seo_score": 72,
    "geo_metrics": {
        "ai_citability": 62,
        "brand_authority": 78,
        "content_eeat": 74,
        "schema": 45,
        "platform_optimization": 59
    },
    "seo_metrics": {
        "on_page": 80,
        "keywords": 65,
        "backlinks": 55,
        "local_seo": 88,
        "technical_health": 72
    },
    "platforms": {
        "Google AI Overviews": 68,
        "ChatGPT": 62,
        "Perplexity": 55,
        "Gemini": 60,
        "Bing Copilot": 50
    },
    "executive_summary": "A 4-6 sentence summary...",
    "findings": [
        {
            "severity": "critical",
            "title": "Finding Title",
            "description": "Description of the finding and its impact."
        }
    ],
    "quick_wins": ["Action item 1"],
    "medium_term": ["Action item 1"],
    "strategic": ["Action item 1"],
    "crawler_access": {
        "GPTBot": {"platform": "ChatGPT", "status": "Allowed", "recommendation": "Keep allowed"}
    }
}
```

### Step 2: Write JSON Data to a Temp File

```bash
# Write audit data to temp file
cat > /tmp/geo-seo-audit-data.json << 'EOF'
{ ... audit JSON data ... }
EOF
```

### Step 3: Generate the PDF

Run the PDF generation script (note the updated path):

```bash
python3 .agents/skills/bridgearc-geo-seo/scripts/generate_pdf_report.py /tmp/geo-seo-audit-data.json GEO-SEO-REPORT-[brand].pdf
```

The script will produce a professional PDF report with:
- **Cover Page** — Brand name, URL, date, overall dual scores (GEO & SEO)
- **Score Breakdown** — Matrices covering both GEO and SEO metrics
- **AI Platform Readiness** & **Crawler Access**
- **Prioritized Action Plan**

### Step 4: Return the PDF Path

Tell the user where the PDF was saved and its file size.

## If the User Provides a URL

If the user runs `/geo-seo-report-pdf https://example.com` with a URL:
1. First run a full audit: invoke the `geo-seo-audit` skill for that URL
2. Collect the data
3. Generate the PDF as described above
