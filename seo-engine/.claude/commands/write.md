# /write — Full Article Creation Pipeline

Write a complete SEO/GEO-optimized article for henno.ai.

**Topic**: $ARGUMENTS

## Instructions

---

### STEP 0: Preparation

1. **Read all context files**:
   - `@context/brand-voice.md`
   - `@context/seo-guidelines.md`
   - `@context/style-guide.md`
   - `@context/internal-links-map.md`

2. **Check for research brief**: Look in `research/` for a brief matching this topic. If found, use it. If not, do quick research (WebSearch for the keyword + top 3 results) before proceeding.

3. **Define keywords**:
   - Primary keyword: [the main term to rank for]
   - Secondary keywords: [3–5 related terms]
   - LSI keywords: [semantically related terms]

---

### STEP 1: Article Planning

Before writing a single sentence, plan the article section-by-section.

For each section, define:
- **H2 heading** (includes keyword variation where natural)
- **Purpose** (what this section achieves for the reader)
- **Key points** (3–5 bullets)
- **Target word count** (aim for 120–180 words between headings — split longer sections into subsections)
- **Engagement element** (mini-story, example, stat, quote, list, or CTA)
- **Gap filled** (which competitor gap this addresses, if any)
- **Quotable capsule** (which 40–100 word self-contained block will this section produce?)
- **Inline citation** (which statistic with named source will this section include?)

Plan 5–7 sections plus intro and FAQ.

---

### STEP 2: Write Section-by-Section

Write each section individually. This prevents quality degradation in long-form content.

#### Introduction (150–250 words)
1. **Hook** (first 1–2 sentences): Use one of these types:
   - Provocative question: "What if your receptionist is losing you $2,000/month in missed calls?"
   - Specific scenario: "Last month, a Cape Town bakery owner realized her team spent 12 hours a week on tasks a $50/month tool could handle."
   - Surprising statistic: "67% of small businesses still manually process invoices — and it's costing them 15 hours every month."
   - Bold statement: "Most small business owners are paying for AI tools they'll never use."
   - Counterintuitive claim: "The cheapest AI tool might be the most expensive mistake you make this year."

   **Never open with**: "In today's...", "When it comes to...", "If you're looking for...", "X is..."

2. **APP Formula**:
   - **Agree**: Acknowledge the reader's situation or frustration
   - **Promise**: What they'll learn or gain from this article
   - **Preview**: Brief mention of what's covered (not a boring outline)

3. Primary keyword must appear in the first 100 words.

4. **TL;DR Opening**: The first 2–4 sentences must directly answer the article's core question with a key statistic or specific insight. 44.2% of all LLM citations come from the first 30% of text, so the opening paragraph is the most important paragraph for GEO.

#### Body Sections (200–500 words each)
For each section:
1. Open with a hook (question, scenario, or transition that creates curiosity)
2. **Answer-first**: After any hook, immediately provide a 1–2 sentence direct answer to the section's question before expanding with evidence. This answer block should be 40–60 words and extractable by AI engines.
3. Deliver the core content (practical, specific, actionable)
4. **Inline citations**: Include at least one statistic with an explicitly named source per section. Use the format: "According to [Source Name], [specific statistic]." Do not bury citations in hyperlinks.
5. Include an engagement element (mini-story, example, data point)
6. **Structured data**: Where relevant, include a comparison table, numbered list, or definition callout. These structured elements are 2.3x more likely to be cited by AI engines.
7. Close with a bridge to the next section

**Mini-stories** (include 2–3 across the article):
- Specific person (name, even if fictional)
- Concrete situation (dates, numbers, specifics)
- Clear outcome (illustrates the point)
- 50–150 words each

**CTAs** (include 2–3 across the article):
- First CTA within 500 words (soft: "Want to see how this works for your business?")
- Second CTA mid-article (medium: "We'll map out your automation opportunities in 30 minutes.")
- Final CTA at the end (strong: "Ready to stop doing work a machine should handle?")
- All CTAs point to chatbot widget or `/#book`

#### FAQ Section (4–6 questions)
- Questions should match what real people search for (use research brief if available)
- Answers: 40–60 words each (concise enough to be extracted by AI, detailed enough to be useful)
- Include primary or secondary keyword in at least 2 answers
- Write as if answering someone directly — conversational, not textbook
- Each answer must be a standalone, self-contained paragraph — no references to other parts of the article
- Use neutral, factual tone in FAQ answers for maximum AI extractability

#### Self-Referential Language Ban
Never use these phrases anywhere in the article — they break modular extraction by AI engines:
- "As mentioned above", "as discussed earlier", "in the section below"
- "As we'll see later", "refer to the previous section"
- "The above table shows", "the following section covers"

Each paragraph must work independently as a standalone excerpt.

---

### STEP 3: Self-Edit Pass

After writing all sections, do a complete edit pass:

1. **AI pattern scrub**: Remove every instance of banned phrases from `@context/style-guide.md`. Replace em-dashes (max 2 total). Fix robotic transitions.

2. **Specificity check**: Replace every "many", "significant", "various", "numerous" with a specific number or example. If you can't be specific, cut the sentence.

3. **Rhythm check**: Read each paragraph aloud mentally. Flag 3+ consecutive sentences with the same structure and vary them.

4. **Keyword check**: Verify primary keyword is in H1, first 100 words, 2+ H2s, conclusion, and throughout at 1–2% density.

5. **Link check**: Verify 3–5 internal links and 2–3 external links are placed with descriptive anchors.

6. **GEO check — quotable capsules**: Count self-contained 40–100 word paragraphs that pass the attribution test ("According to henno.ai: [quote]"). Target: 3–5 per 1,000 words.

7. **GEO check — inline citations**: Count "According to [Source]" or "[Source] found that" patterns. Target: 2–4 statistics with named sources per article.

8. **GEO check — self-referential language**: Search for "as mentioned", "discussed above", "section below", "as we saw". Remove all instances and rewrite for standalone readability.

9. **GEO check — answer-first verification**: Confirm each H2 section opens with a direct answer (1–2 sentences, 40–60 words) before expanding into detail.

10. **Quality gut-check**: Would you actually read this? Would you share it? If not, what's missing?

---

### STEP 4: Add Frontmatter & Save

Add this frontmatter to the top of the draft:

```yaml
---
title: "[Article H1 Title]"
slug: "[url-slug]"
meta_title: "[50-60 char meta title] | Henno AI"
meta_description: "[150-160 char meta description]"
date: "[YYYY-MM-DD]"
date_modified: "[YYYY-MM-DD]"
author: "Henno"
reading_time: "[X] min read"
primary_keyword: "[keyword]"
secondary_keywords: ["keyword2", "keyword3", "keyword4"]
excerpt: "[1-2 sentence excerpt for blog listing card]"
---
```

**Save to**: `drafts/[slug]-[YYYY-MM-DD].md`

---

### STEP 5: Run Optimization Agents

After saving the draft, run these agents in sequence:

1. **SEO Optimizer** (`@agents/seo-optimizer`): Audit keyword density, heading structure, link count, meta elements. Apply any critical fixes.

2. **Meta Creator** (`@agents/meta-creator`): Generate 3 meta title and 3 meta description options. Update frontmatter with the best options.

3. **Internal Linker** (`@agents/internal-linker`): Check internal links against `@context/internal-links-map.md`. Add any missing links.

Apply fixes from all agents, then save the updated draft.

---

## Output

The final draft at `drafts/[slug]-[YYYY-MM-DD].md` should be ready for `/publish`. Tell the user:
- Draft location
- Word count
- Primary keyword and density
- Number of internal/external links
- Number of CTAs
- Any items that need human review

---

## Rules

- **Section-by-section writing is mandatory** — do not write the entire article in one pass
- **Research before writing** — check for briefs, do quick research if none exists
- **Every paragraph earns its place** — if you can't explain why a paragraph exists, cut it
- **Specifics over generalities** — always prefer a number, name, or example over vague language
- **CTAs feel natural** — they should fit the flow, not interrupt it
- **Read all context files first** — brand voice and style guide are non-negotiable
