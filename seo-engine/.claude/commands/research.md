# /research — Keyword & Competitive Research

Research a topic for an SEO/GEO-optimized article on henno.ai. Produces a comprehensive research brief.

**Topic**: $ARGUMENTS

## Instructions

Read `@context/brand-voice.md` and `@context/seo-guidelines.md` before starting.

Execute these 4 research phases in order. Be thorough — the quality of the article depends on this research.

---

### PHASE 1: SERP Analysis

1. **Search**: Use WebSearch for the target keyword and 2–3 variations (long-tail, question-based).

2. **Analyze top 5 results**: Use WebFetch on the top 5 organic results. For each, document:
   - URL, title, word count (estimate)
   - Heading structure (H1, H2s)
   - Key topics covered
   - Unique angles or data they include
   - What's missing, outdated, or weak

3. **Identify gaps**: What do ALL top results miss? What's outdated? What questions go unanswered? These gaps are our competitive advantage.

4. **Featured snippet analysis**: Is there a featured snippet? What format (paragraph, list, table)? Can we win it?

5. **Search intent**: Is the intent informational, commercial, or transactional? This determines article structure.

---

### PHASE 2: AI Citation Analysis

1. **Query AI platforms**: Use WebSearch to find how AI platforms currently answer queries related to this topic. Search for:
   - `site:perplexity.ai [topic keyword]` — see what Perplexity cites
   - `[topic keyword] AI overview` — find analysis of AI Overview results
   - General searches that mimic how users ask AI platforms about this topic

2. **Document the AI citation landscape**:
   - Which websites currently get cited for this topic?
   - What format do the cited passages take (statistics, definitions, step-by-step, comparison)?
   - What content structure appears in AI-generated responses?
   - What's missing or wrong in current AI responses? (Our opportunity)

3. **Identify GEO opportunities**:
   - Questions that AI platforms answer poorly or incompletely
   - Topics where AI responses lack specific data or South African context
   - Formats that would be highly extractable (comparison tables, numbered steps, definitions)
   - Statistics and data points we could provide that don't exist in current AI responses

---

### PHASE 3: Social Research

1. **Reddit**: Use WebSearch with `site:reddit.com [topic]`. Find 3–5 relevant threads. Use WebFetch to read the actual threads. Extract:
   - Real questions people ask (in their own words)
   - Pain points and frustrations
   - Recommendations and success stories
   - Language and terminology they use (this is gold for natural writing)
   - Counterarguments or skepticism

2. **YouTube**: Use WebSearch with `site:youtube.com [topic]`. Find 3–5 relevant videos. Note:
   - Video titles and angles
   - Key points from descriptions
   - Common themes across videos
   - Gaps (what videos don't cover well that text can)

3. **Quora / Forums** (optional): If Reddit results are thin, search Quora or niche forums for additional real-user insights.

---

### PHASE 4: Research Brief

Compile everything into a single research brief. Save to: `research/brief-[slug]-[YYYY-MM-DD].md`

Use this format:

```markdown
# Research Brief: [Topic]

**Date**: [YYYY-MM-DD]
**Primary keyword**: [keyword] (estimated monthly search volume if available)
**Secondary keywords**: [keyword 2], [keyword 3], [keyword 4]
**Search intent**: [Informational / Commercial / Transactional]

## SERP Landscape

### Top 5 Competitors
| # | Title | URL | Word Count | Strengths | Weaknesses |
|---|-------|-----|-----------|-----------|------------|
| 1 | ... | ... | ... | ... | ... |
| 2 | ... | ... | ... | ... | ... |

### Content Gaps (Our Advantage)
1. [Gap]: [Why it matters] — [How we'll fill it]
2. [Gap]: [Why it matters] — [How we'll fill it]
3. [Gap]: [Why it matters] — [How we'll fill it]

### Featured Snippet Opportunity
- Current snippet: [format] by [domain]
- Our strategy: [how to win it]

## Social Research Insights

### Real User Pain Points
1. [Pain point] — Source: [Reddit thread/YouTube video]
2. [Pain point] — Source: [Reddit thread/YouTube video]

### Questions People Actually Ask
1. "[Question in their words]" — [Source]
2. "[Question in their words]" — [Source]

### User Language & Terminology
- People say "[X]" not "[Y]" (use their language)
- Common phrases: "[phrase 1]", "[phrase 2]"

### Success Stories & Examples
- [Example from Reddit/YouTube that we can reference or adapt]

### Skepticism & Objections
- [Common objection] — [How to address it]

## AI Citation Landscape

### Who Gets Cited Now
| Source | Platform(s) | Format Cited | Why They Get Cited |
|---|---|---|---|
| [domain] | [ChatGPT/Perplexity/AI Overview] | [format] | [reason] |

### GEO Opportunities
1. [Gap in AI responses] — [How we fill it] — [Format to use]
2. [Gap in AI responses] — [How we fill it] — [Format to use]

### Quotable Data Points to Include
- [Statistic] — Source: [named source] — [How to cite inline]
- [Statistic] — Source: [named source] — [How to cite inline]

### Authoritative Sources to Cite Inline
- [Source name] ([type: research/report/study]) — [relevant finding]
- [Source name] ([type: research/report/study]) — [relevant finding]

## Recommended Article Approach

### Angle
[1–2 sentence description of our unique angle based on gaps + social insights]

### Recommended Structure
1. [H2: Section idea] — covers [what], fills gap [which]
2. [H2: Section idea] — includes insight from [social source]
3. ...

### Mini-Story Ideas
- [Story idea 1 based on social research]
- [Story idea 2 based on social research]

### FAQ Candidates (for GEO)
Identify 4–6 FAQ candidates from SERP gaps, Reddit questions, and AI response gaps:
1. [Question] — derived from [SERP gap / Reddit question / AI response gap]
2. [Question]
3. [Question]
4. [Question]

### Target Metrics
- Word count: [X] words
- Internal links: [specific pages to link to]
- External links: [authority sources to cite]
```

---

## Rules

- **Be thorough but focused** — research should take significant effort. Don't rush.
- **Prioritize real user insights** — Reddit comments and YouTube discussions reveal what SEO articles miss.
- **Note exact language** — how real people describe the problem is how we should write about it.
- **Identify 3+ gaps** — if you can't find gaps in the top 5 results, the topic might not be worth writing about.
- **Save everything** — the brief should contain enough detail that `/write` can produce the article without additional research.
