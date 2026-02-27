# Henno AI — SEO & GEO Guidelines

## Content Length

| Type | Word Count | When to Use |
|---|---|---|
| Standard article | 1,500–2,500 | Most topics, how-tos, guides |
| Pillar article | 2,500–3,000 | Competitive keywords, comprehensive guides |
| Quick guide | 800–1,200 | Narrow topics, definitions, comparisons |

## Keyword Optimization

### Density
- **Primary keyword**: 1–2% density (natural integration, never forced)
- **Secondary keywords**: 0.5–1% density each
- **LSI/related terms**: Sprinkled naturally throughout

### Placement (Primary Keyword Must Appear In)
- H1 title (exact or close variation)
- First 100 words of the article
- At least 2 H2 subheadings (natural variation OK)
- Meta title
- Meta description
- URL slug
- Last 100 words / conclusion

### Keyword Research Checklist
- [ ] Identify primary keyword (highest search volume + relevance)
- [ ] Find 3–5 secondary keywords (related terms, long-tail variations)
- [ ] List LSI keywords (semantically related terms)
- [ ] Check search intent (informational, commercial, transactional)
- [ ] Analyze top 5 SERP results for the primary keyword

## Content Structure

### Heading Hierarchy
```
H1: Article Title (1 per article, includes primary keyword)
  H2: Major Section (4–7 per article)
    H3: Subsection (2–4 per H2 as needed)
```

### Article Template
```markdown
# [H1: Primary Keyword + Compelling Angle]

[Hook: 1–2 sentences — question, scenario, stat, or bold claim]

[APP Formula:]
- Agree: Acknowledge the reader's situation
- Promise: What they'll learn/gain
- Preview: Brief outline of what's covered

## [H2: First Major Section]
[Content with first CTA within 500 words]

## [H2: Second Major Section]
[Include mini-story #1]

## [H2: Third Major Section]
[Include mini-story #2, second CTA]

## [H2: Fourth Major Section]
[Practical steps, examples, specifics]

## [H2: Fifth/Final Section or Conclusion]
[Third CTA — strong]

## Frequently Asked Questions
[4–6 FAQs with concise, quotable answers]
```

## Meta Elements

### Meta Title
- **Length**: 50–60 characters (hard limit: 60)
- **Format**: `[Primary Keyword]: [Benefit/Angle] | Henno AI`
- **Rules**: Front-load keyword, include power word, always end with `| Henno AI`

### Meta Description
- **Length**: 150–160 characters (hard limit: 160)
- **Formula**: [What the article covers] + [Key benefit] + [CTA/hook]
- **Rules**: Include primary keyword naturally, end with action-oriented language

### URL Slug
- **Format**: lowercase, hyphen-separated, 3–5 words
- **Include**: Primary keyword (shortened if needed)
- **Avoid**: Stop words (the, a, an, in, for), dates, numbers unless relevant

## Internal Linking

- **Target**: 3–5 internal links per article
- **Anchor text**: Descriptive, keyword-rich (not "click here" or "read more")
- **Link to**: Homepage, blog listing, other blog posts, booking page (`/#book`)
- **Placement**: Within body content (contextual), not just in conclusion
- **Reciprocal**: When publishing a new post, update 1–2 older posts to link back

## External Linking

- **Target**: 2–3 external links per article
- **Link to**: Authority sources (research studies, official docs, industry reports)
- **Avoid**: Linking to competitors, low-quality sites, paywalled content
- **Attributes**: `target="_blank" rel="noopener"` on all external links

## Readability

- **Grade level**: 8th–10th grade (Flesch-Kincaid)
- **Sentence length**: Average 15–20 words, vary between 5 and 30
- **Paragraph length**: 2–4 sentences max
- **Subheading frequency**: Every 120–180 words
- **Visual breaks**: Use bold, lists, blockquotes to break up walls of text

## GEO (Generative Engine Optimization)

### Why GEO Matters
AI search tools (ChatGPT, Perplexity, Google AI Overviews, Claude) pull from web content to generate answers. AI-referred traffic converts at 4.4–15.9x the rate of traditional Google organic. Only 12% of URLs cited by AI platforms rank in Google's top 10, so well-structured content can achieve AI visibility before building domain authority.

### How AI Platforms Choose Sources

| Platform | Primary Index | Key Signal | Citation Behavior |
|---|---|---|---|
| ChatGPT | Bing (+ Google fallback) | Referring domains, content depth, recency | 90% of citations from pages ranked 21+ in Google |
| Perplexity | Real-time web search | Recency, authenticity, community content | 2–6 sources per answer, 50% cite 2025+ content |
| Google AI Overviews | Standard Google index | Traditional SEO ranking, semantic completeness | 76.1% from pages already in Google's top 10 |
| Claude | Brave Search | Clean HTML, content structure | Growing at 12.8x rate, 5% conversion rate |

### GEO Content Requirements (Every Article)

#### 1. Answer-First Structure
Place the direct answer within the first 40–60 words of each section. Answer-first content increases ChatGPT citation rates by 140%. 72.4% of pages cited by ChatGPT contain a short, direct answer immediately after a question-based heading.

#### 2. Quotable Capsules
Write 3–5 self-contained paragraphs (40–100 words each) per 1,000 words that pass the attribution test: "According to henno.ai: [quote]". These blocks must make sense without surrounding context. 44.2% of all LLM citations come from the first 30% of text.

#### 3. Inline Citations with Named Sources
Include 2–4 statistics per article with explicit source attribution in the text. Write "According to a 2025 McKinsey report, 67% of small businesses..." rather than embedding a hyperlink in generic text. Quantitative claims with named sources receive 40% higher citation rates than qualitative statements.

#### 4. Modular, Self-Contained Paragraphs
Target 40–60 word paragraphs that can stand alone. Never write "as mentioned above", "as discussed earlier", "in the section below", or any self-referential language. Each paragraph must work as a standalone excerpt that an AI engine could extract and cite independently.

#### 5. Structured Data Elements
Include at least one comparison table, definition list, or structured callout per article. Pages with tables and structured formatting are 40% more likely to be cited. Definition lists and comparison tables have a 2.3x higher citation chance.

#### 6. Question-Based Headings
Frame H2 headings as questions users actually ask. Keep headings under 60 characters. This maps directly to how users query AI systems and how AI engines search for answers.

#### 7. FAQ Section with Schema
Include 4–6 focused questions with concise 40–60 word answers. Implement matching FAQPage schema markup in JSON-LD. FAQ answers must be self-contained and keyword-inclusive.

#### 8. Expert Authority & Freshness
- Reference real experience and specific outcomes
- Include "Last updated: [date]" timestamp visible on page
- Cite authoritative sources (.edu, .gov, research institutions, industry reports)
- Article schema with author, datePublished, dateModified
- Pages updated within 3 months earn nearly 2x more AI citations

### What NOT To Do for GEO
- **No keyword stuffing** — keyword stuffing performs 10% worse than baseline in AI citation
- **No promotional tone** — AI engines actively penalize promotional content
- **No self-referential language** — "as mentioned above" breaks modular extraction
- **No vague claims** — "many businesses benefit" is uncitable; "73% of businesses reduce costs" is citable

### FAQ Format
Each FAQ answer should be:
- 2–4 sentences (concise enough to be quoted, detailed enough to be useful)
- Self-contained (makes sense without reading the full article)
- Keyword-inclusive (naturally mentions primary or secondary keywords)

## Featured Snippet Optimization

### Target Formats
- **Paragraph snippets**: Write a 40–60 word answer directly below a question heading
- **List snippets**: Use ordered/unordered lists for "how to" or "types of" content
- **Table snippets**: Use comparison tables where relevant

### Structure for Snippets
```markdown
## What is [keyword]?

[40–60 word definition/answer that directly answers the question. Be specific, authoritative, and concise. This paragraph is your featured snippet candidate.]
```

## Pre-Publishing SEO Checklist

- [ ] Primary keyword in H1, first 100 words, 2+ H2s, conclusion
- [ ] Keyword density 1–2% (check with word count)
- [ ] Meta title: 50–60 chars, keyword-first, ends with `| Henno AI`
- [ ] Meta description: 150–160 chars, keyword + CTA
- [ ] URL slug: short, keyword-rich, no stop words
- [ ] 3–5 internal links with descriptive anchors
- [ ] 2–3 external links to authority sources
- [ ] Heading hierarchy: H1 > H2 > H3 (no skipping)
- [ ] FAQ section with 4–6 questions
- [ ] Article schema (JSON-LD) present
- [ ] FAQPage schema (JSON-LD) present
- [ ] Open Graph + Twitter Card meta tags
- [ ] Readability at 8th–10th grade
- [ ] No paragraphs longer than 4 sentences
- [ ] Subheadings every 120–180 words
- [ ] Answer-first opening (40–60 words) in each H2 section
- [ ] 3–5 quotable capsules per 1,000 words (self-contained 40–100 word blocks)
- [ ] 2–4 inline citations with named sources ("According to [Source], ...")
- [ ] No self-referential language (no "as mentioned above", "discussed earlier")
- [ ] At least 1 comparison table or structured data element
- [ ] H2 headings phrased as questions, under 60 characters
- [ ] "Last updated" date visible on published page
- [ ] `dateModified` in Article schema
