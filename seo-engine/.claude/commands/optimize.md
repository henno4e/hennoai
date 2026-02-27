# /optimize — SEO Optimization Pass

Run a comprehensive SEO audit on an article draft and apply fixes automatically.

**File**: $ARGUMENTS

## Instructions

---

### STEP 1: Read Context & Draft

1. Read the draft file specified in the arguments. If no path given, check `drafts/` for the most recent file.
2. Read `@context/seo-guidelines.md` for the rules to audit against.
3. Read `@context/style-guide.md` for writing quality standards.
4. Read `@context/internal-links-map.md` for available link targets.

---

### STEP 2: SEO Audit

Perform a complete audit covering these areas:

#### Keyword Analysis
- Extract the primary keyword from frontmatter (or infer from H1)
- Count occurrences and calculate density (target: 1–2%)
- Check placement: H1, first 100 words, H2s, meta title, meta description, conclusion
- Identify secondary/LSI keyword usage

#### Structure Audit
- Count H1s (must be exactly 1)
- Count H2s (target: 4–7)
- Verify heading hierarchy (no H1→H3 skips)
- Check subheading frequency (every 120–180 words)
- Measure paragraph lengths (flag any >4 sentences)

#### Link Audit
- Count internal links (target: 3–5)
- Count external links (target: 2–3)
- Check anchor text quality (descriptive, not "click here")
- Verify internal links point to real pages in the links map
- Count CTAs (target: 2–3, first within 500 words)

#### Meta Audit
- Title length (50–60 chars, ends with `| Henno AI`)
- Description length (150–160 chars)
- Keyword in title and description
- Slug quality (short, keyword-rich)

#### GEO Audit
- **Answer-first structure**: Does each H2 section open with a direct 1–2 sentence answer (40–60 words) before expanding? Flag sections that start with background or context instead of an answer.
- **Quotable capsules**: Count self-contained 40–100 word paragraphs that pass the attribution test ("According to henno.ai: [quote]"). Target: 3–5 per 1,000 words.
- **Inline citations**: Count "According to [named source]" patterns. Target: 2–4 per article. Flag statistics that lack explicit source attribution.
- **Self-referential language**: Scan for "as mentioned above", "discussed earlier", "in the section below", "as we'll see", "the above table". Flag all instances for rewriting.
- **Structured data elements**: Verify at least one comparison table, definition list, or structured callout is present. Flag if missing.
- **Section granularity**: Count words between headings. Flag sections with >200 words between headings (target: 120–180).
- **Heading format**: Check if H2s are phrased as questions matching search intent. Check heading length (target: under 60 characters). Flag headings that are statements rather than questions.
- **FAQ section**: Verify 4–6 questions with 40–60 word self-contained answers. No self-referential language in answers.
- **Neutral tone in quotable blocks**: Verify that statistical claims and definitions use neutral, factual phrasing suitable for AI extraction.
- **Freshness signals**: Check for "Last updated" date reference and current-year data.

#### Readability Audit
- Estimate reading grade level (target: 8th–10th)
- Check for AI patterns from the banned phrases list in style guide
- Count em-dashes (max 2 allowed)
- Check sentence variety (flag repetitive structure)
- Verify active voice dominance

---

### STEP 3: Run Agents

Run all 3 agents on the draft:

1. **SEO Optimizer** (`@agents/seo-optimizer`): Full SEO analysis and recommendations
2. **Meta Creator** (`@agents/meta-creator`): Generate meta title/description options
3. **Internal Linker** (`@agents/internal-linker`): Internal link recommendations

---

### STEP 4: Apply Fixes

Automatically apply all critical and quick-win fixes to the draft. For each fix:
1. Show what's being changed (before → after)
2. Apply the change
3. Note any fixes that need human judgment (mark as "REVIEW")

Categories of auto-fixes:
- Missing keyword in critical locations → add naturally
- Heading hierarchy issues → restructure
- Missing internal/external links → add where natural
- Meta element issues → update frontmatter
- AI pattern phrases → rewrite sentences
- Em-dash overuse → replace with appropriate punctuation
- Paragraphs too long → break up

---

### STEP 5: Report

Output a summary report:

```markdown
## Optimization Report: [Article Title]

### Score: [PASS / NEEDS REVIEW]

### Changes Applied
1. [Change description] — [location in article]
2. ...

### Items for Human Review
1. [Item] — [why it needs human judgment]
2. ...

### Final Metrics
| Metric | Before | After | Target |
|--------|--------|-------|--------|
| Word count | X | X | 1,500–2,500 |
| Keyword density | X% | X% | 1–2% |
| Internal links | X | X | 3–5 |
| External links | X | X | 2–3 |
| CTAs | X | X | 2–3 |
| FAQs | X | X | 4–6 |
| Quotable capsules | X | X | 3–5 per 1,000 words |
| Inline citations | X | X | 2–4 |
| Answer-first sections | X/Y | X/Y | All H2s |
| Section word count | X avg | X avg | 120–180 |
| Meta title length | X chars | X chars | 50–60 |
| Meta desc length | X chars | X chars | 150–160 |
| Em-dashes | X | X | ≤2 |

### Verdict
[1-2 sentence summary: is this ready to publish or does it need more work?]
```

Save the updated draft back to its original location.

---

## Rules

- **Fix, don't just report** — the primary purpose is to improve the draft, not generate a report
- **Show before/after** for every change so the user can verify
- **Don't break the writing** — fixes should improve SEO without making the text sound robotic
- **Be conservative with rewrites** — change the minimum needed to fix the issue
- **Flag ambiguity** — if you're unsure whether a fix improves things, mark it REVIEW
