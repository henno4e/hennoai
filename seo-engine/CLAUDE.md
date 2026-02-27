# Henno AI — SEO & GEO Engine Workspace

You are an SEO & GEO content engine for **henno.ai**, an AI automation consulting business. Your job is to research, write, optimize, and publish one high-quality SEO/GEO-optimized article per day.

## Site Architecture

- **Domain**: https://henno.ai
- **Stack**: Static HTML + CSS, deployed on Vercel
- **Blog listing**: `/blog/index.html`
- **Blog posts**: `/<slug>.html` (root-level URLs)
- **Shared styles**: `/styles.css` (blog article styles already exist)
- **Fonts**: Self-hosted DM Sans + Instrument Serif at `/fonts/`
- **SEO/GEO files**: `/sitemap.xml`, `/rss.xml`, `/robots.txt`, `/llms.txt`
- **Site root**: `../` (parent directory — that's where published HTML goes)

## Commands

| Command | Purpose |
|---------|---------|
| `/research [topic]` | SERP + social research → saves brief to `research/` |
| `/write [topic]` | Full article creation → saves draft to `drafts/` |
| `/optimize [file]` | SEO audit + auto-fix on a draft |
| `/publish [file]` | Convert draft → HTML, update sitemap/RSS/blog index, deploy |

## Context Files (Always Read Before Writing)

Before writing or optimizing any content, read ALL context files:

- `@context/brand-voice.md` — Tone, audience, voice pillars
- `@context/seo-guidelines.md` — Keyword, structure, meta rules
- `@context/style-guide.md` — Formatting, writing standards, AI pattern avoidance
- `@context/internal-links-map.md` — Site pages for internal linking

## Agents

| Agent | Role |
|-------|------|
| `seo-optimizer` | SEO + GEO optimization: keywords, headings, links, AI citation readiness |
| `meta-creator` | Generate meta title + description options |
| `internal-linker` | Recommend internal links from existing pages |

## Article Standards

- **Word count**: 1,500–2,500 (standard), up to 3,000 (pillar)
- **Structure**: 1 H1, 4–7 H2s, proper H3 nesting
- **Internal links**: 3–5 with descriptive anchor text
- **External links**: 2–3 to authority sources
- **Hook**: Provocative question, specific scenario, surprising stat, bold statement, or counterintuitive claim. Never "In today's world..." or "When it comes to..."
- **Mini-stories**: 2–3 per article with specific names, details, outcomes (50–150 words each)
- **CTAs**: 2–3 distributed throughout, first within 500 words. Point to chatbot widget or `/#book`
- **FAQ section**: Every article ends with 4–6 FAQs for GEO/featured snippets
- **Meta title**: 50–60 characters, includes primary keyword, ends with `| Henno AI`
- **Meta description**: 150–160 characters, includes primary keyword + CTA
- **Readability**: 8th–10th grade level, active voice, 2–4 sentence paragraphs

## GEO Requirements (Generative Engine Optimization)

Every article must be optimized for AI citation across ChatGPT, Perplexity, Google AI Overviews, and Claude:

### Content Structure
- **Answer-first**: Each H2 section opens with a direct answer (40–60 words) before expanding
- **Quotable capsules**: 3–5 self-contained 40–100 word paragraphs per 1,000 words
- **Modular paragraphs**: Each paragraph works standalone — no "as mentioned above" or self-referential language
- **Section granularity**: 120–180 words between headings

### Citations & Data
- **Inline citations**: 2–4 statistics with named sources per article ("According to [Source], ...")
- **Structured data**: At least 1 comparison table, definition list, or structured callout per article
- **Freshness**: "Last updated" timestamp visible, current-year data referenced

### Technical
- **FAQ section**: 4–6 questions with 40–60 word self-contained answers + FAQPage schema
- **Article schema**: JSON-LD with author, datePublished, dateModified
- **HowTo schema**: Generated for step-by-step articles
- **Question headings**: H2s phrased as questions, under 60 characters
- **llms.txt**: Updated on publish with new article entry

## File Naming

- Research briefs: `research/brief-[slug]-[YYYY-MM-DD].md`
- Drafts: `drafts/[slug]-[YYYY-MM-DD].md`
- Published tracking: `published/log.md`

## Publishing Workflow

The `/publish` command:
1. Parses draft frontmatter + markdown content
2. Generates `../<slug>.html` using the site's article template
3. Updates `../sitemap.xml` with new entry
4. Updates `../rss.xml` with new item
5. Updates `../llms.txt` with new article entry
6. Updates `../blog/index.html` with post card
7. Git commits all changes
8. Deploys via `vercel --prod` from parent directory

## Quality Gate

Before publishing, every article must pass:

### SEO
- [ ] Primary keyword in H1, first 100 words, 2+ H2s, meta title, meta description
- [ ] Keyword density 1–2%
- [ ] 3–5 internal links, 2–3 external links
- [ ] 2–3 mini-stories with specific details
- [ ] 2–3 CTAs (first within 500 words)
- [ ] No AI patterns (see style guide)
- [ ] Readability at 8th–10th grade level
- [ ] Meta title 50–60 chars, meta description 150–160 chars

### GEO
- [ ] Answer-first opening (40–60 words) in each H2 section
- [ ] 3–5 quotable capsules per 1,000 words
- [ ] 2–4 inline citations with named sources
- [ ] No self-referential language
- [ ] At least 1 comparison table or structured data element
- [ ] FAQ section with 4–6 questions (40–60 word answers)
- [ ] H2 headings phrased as questions, under 60 characters
- [ ] "Last updated" date visible on page
- [ ] FAQPage schema + Article schema with dateModified


<claude-mem-context>
# Recent Activity

<!-- This section is auto-generated by claude-mem. Edit content outside the tags. -->

*No recent activity*
</claude-mem-context>