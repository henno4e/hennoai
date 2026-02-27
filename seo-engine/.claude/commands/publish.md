# /publish — Convert Draft to HTML & Deploy

Convert a markdown draft to a fully styled HTML page, update the sitemap/RSS/blog index, and deploy to production.

**File**: $ARGUMENTS

## Instructions

---

### STEP 1: Parse the Draft

1. Read the draft file. If no path specified, check `drafts/` for the most recent `.md` file.
2. Parse the YAML frontmatter to extract: `title`, `slug`, `meta_title`, `meta_description`, `date`, `author`, `reading_time`, `primary_keyword`, `secondary_keywords`, `excerpt`.
3. Parse the markdown body content.

---

### STEP 2: Convert Markdown to HTML

Convert the markdown body to HTML elements:

- `# H1` → `<h1>` (only in article-header, not article-body)
- `## H2` → `<h2>`
- `### H3` → `<h3>`
- Paragraphs → `<p>` tags
- `**bold**` → `<strong>`
- `*italic*` → `<em>`
- `[text](url)` → `<a href="url">text</a>` (add `target="_blank" rel="noopener"` for external links)
- Unordered lists → `<ul><li>`
- Ordered lists → `<ol><li>`
- `> blockquote` → `<blockquote><p>`
- `---` → `<hr>`
- `` `code` `` → `<code>`
- Code blocks → `<pre><code>`

For internal links (henno.ai URLs): no `target` or `rel` attributes.
For external links (any other domain): add `target="_blank" rel="noopener"`.

---

### STEP 3: Build the FAQ Schema

If the article has a FAQ section (## Frequently Asked Questions), extract the Q&A pairs and build FAQPage JSON-LD:

```json
{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "[Question text]",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "[Answer text]"
            }
        }
    ]
}
```

---

### STEP 3b: Build HowTo Schema (if applicable)

If the article contains numbered step-by-step instructions (e.g., "Step 1:", "Step 2:" or an ordered list under a "How to..." heading), extract the steps and build HowTo JSON-LD:

```json
{
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "{{title}}",
    "description": "{{meta_description}}",
    "step": [
        {
            "@type": "HowToStep",
            "name": "[Step heading]",
            "text": "[Step description]"
        }
    ]
}
```

Only generate HowTo schema if the article genuinely contains sequential steps. Not every article qualifies.

---

### STEP 4: Generate the HTML File

Create `../<slug>.html` (in the parent hennoai directory — the Vercel site root) using this template:

```html
<!DOCTYPE html>
<html lang="en" data-theme="light" style="color-scheme: light dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <meta name="theme-color" content="#f8f8fa" media="(prefers-color-scheme: light)">
    <meta name="theme-color" content="#08080a" media="(prefers-color-scheme: dark)">

    <title>{{meta_title}}</title>
    <meta name="description" content="{{meta_description}}">
    <link rel="canonical" href="https://henno.ai/{{slug}}.html">

    <!-- Open Graph -->
    <meta property="og:title" content="{{meta_title}}">
    <meta property="og:description" content="{{meta_description}}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://henno.ai/{{slug}}.html">
    <meta property="og:site_name" content="Henno AI">
    <meta property="article:published_time" content="{{date}}">
    <meta property="article:author" content="Henno">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="{{meta_title}}">
    <meta name="twitter:description" content="{{meta_description}}">

    <!-- Fonts -->
    <link rel="preload" href="/fonts/dm-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="/fonts/instrument-serif-latin.woff2" as="font" type="font/woff2" crossorigin>

    <!-- Styles -->
    <link rel="stylesheet" href="/styles.css">
    <link rel="alternate" type="application/rss+xml" title="Henno AI Blog" href="/rss.xml">

    <!-- Article Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "{{title}}",
        "description": "{{meta_description}}",
        "url": "https://henno.ai/{{slug}}.html",
        "datePublished": "{{date}}",
        "dateModified": "{{date_modified}}",
        "author": {
            "@type": "Person",
            "name": "Henno",
            "url": "https://henno.ai/",
            "sameAs": [
                "https://www.linkedin.com/in/hennoai/",
                "https://x.com/henno_4e"
            ]
        },
        "publisher": {
            "@type": "Organization",
            "name": "Henno AI",
            "url": "https://henno.ai/"
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://henno.ai/{{slug}}.html"
        }
    }
    </script>

    <!-- FAQPage Schema (if article has FAQ section) -->
    {{faq_schema_script_tag_if_applicable}}
    {{howto_schema_script_tag_if_applicable}}
</head>
<body>

    <a href="#main" class="skip-link">Skip to main content</a>

    <!-- Nav -->
    <nav>
        <div class="container">
            <a href="/" class="nav-logo">henno<span>.ai</span></a>
            <div style="display:flex;align-items:center;gap:12px;">
                <a href="/blog/" class="nav-link">Blog</a>
                <button class="theme-toggle" aria-label="Toggle theme">
                    <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                    <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                </button>
                <a href="/#book" class="nav-cta">Book Free Audit</a>
            </div>
        </div>
    </nav>

    <main id="main">
        <article>
            <header class="article-header">
                <div class="container">
                    <a href="/blog/" class="back-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                        Back to blog
                    </a>
                    <div class="article-meta">
                        <time datetime="{{date}}">{{formatted_date}}</time>
                        <span class="dot"></span>
                        <span>{{reading_time}}</span>
                    </div>
                    <h1>{{title}}</h1>
                    <p class="article-excerpt">{{excerpt}}</p>
                    <p class="article-updated">Last updated: <time datetime="{{date_modified}}">{{formatted_date_modified}}</time></p>
                </div>
            </header>

            <div class="article-body">
                {{article_html_content}}
            </div>
        </article>
    </main>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-text">&copy; 2026 Henno AI. Cape Town, South Africa.</div>
            <div class="footer-links">
                <a href="/blog/">Blog</a>
                <a href="https://www.linkedin.com/in/hennoai/" target="_blank">LinkedIn</a>
                <a href="https://x.com/henno_4e" target="_blank">X / Twitter</a>
            </div>
        </div>
    </footer>

    <script>
        /* Theme toggle */
        (function() {
            const stored = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const theme = stored || (prefersDark ? 'dark' : 'light');
            document.documentElement.setAttribute('data-theme', theme);
        })();

        document.querySelector('.theme-toggle').addEventListener('click', function() {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });

        /* Nav scroll behavior */
        const nav = document.querySelector('nav');
        let lastScrollY = 0;
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    if (currentScrollY > 50) {
                        nav.classList.add('scrolled');
                    } else {
                        nav.classList.remove('scrolled');
                    }
                    if (currentScrollY > lastScrollY && currentScrollY > 200) {
                        nav.classList.add('hidden');
                    } else {
                        nav.classList.remove('hidden');
                    }
                    lastScrollY = currentScrollY;
                    ticking = false;
                });
                ticking = true;
            }
        });
    </script>

    <script defer src="/_vercel/insights/script.js"></script>
    <script defer src="/_vercel/speed-insights/script.js"></script>
</body>
</html>
```

**Template variables** (replace with actual values from frontmatter):
- `{{meta_title}}` — from frontmatter `meta_title`
- `{{meta_description}}` — from frontmatter `meta_description`
- `{{slug}}` — from frontmatter `slug`
- `{{date}}` — from frontmatter `date` (YYYY-MM-DD format)
- `{{formatted_date}}` — human-readable date (e.g., "February 26, 2026")
- `{{title}}` — from frontmatter `title`
- `{{reading_time}}` — from frontmatter `reading_time`
- `{{excerpt}}` — from frontmatter `excerpt`
- `{{article_html_content}}` — the converted HTML body (everything after frontmatter)
- `{{faq_schema_script_tag_if_applicable}}` — the FAQPage JSON-LD script tag, or empty if no FAQ section
- `{{date_modified}}` — from frontmatter `date_modified` (YYYY-MM-DD format, defaults to `date` if not set)
- `{{formatted_date_modified}}` — human-readable modified date
- `{{howto_schema_script_tag_if_applicable}}` — HowTo JSON-LD script tag, or empty if no step-by-step content

---

### STEP 5: Update Sitemap

Read `../sitemap.xml` and add a new `<url>` entry before the closing `</urlset>`:

```xml
  <url>
    <loc>https://henno.ai/{{slug}}.html</loc>
    <lastmod>{{date}}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
```

Also update the blog listing's `<lastmod>` to today's date.

---

### STEP 6: Update RSS Feed

Read `../rss.xml` and add a new `<item>` immediately after the `<atom:link>` element (top of the feed):

```xml
    <item>
      <title>{{title}}</title>
      <link>https://henno.ai/{{slug}}.html</link>
      <guid isPermaLink="true">https://henno.ai/{{slug}}.html</guid>
      <pubDate>{{rfc2822_date}}</pubDate>
      <description>{{excerpt}}</description>
    </item>
```

`{{rfc2822_date}}` format: `Wed, 26 Feb 2026 00:00:00 +0200` (use the article's publish date).

Also update the channel's `<lastBuildDate>` to today.

---

### STEP 7: Update Blog Index

Read `../blog/index.html`.

**If this is the first post** (blog-empty div exists), replace the `<div class="blog-empty">...</div>` with a `<div class="blog-grid">` containing the new post card.

**If posts already exist** (blog-grid div exists), add the new post card at the TOP of the `<div class="blog-grid">` (newest first).

Post card HTML:

```html
            <a href="/{{slug}}.html" class="blog-card">
                <div class="blog-card-meta">
                    <time datetime="{{date}}">{{formatted_date}}</time>
                    <span class="dot"></span>
                    <span>{{reading_time}}</span>
                </div>
                <h2>{{title}}</h2>
                <p>{{excerpt}}</p>
            </a>
```

---

### STEP 8: Update Internal Links Map

Read `seo-engine/context/internal-links-map.md` and add the new post under the "## Blog Posts" section:

```markdown
| {{title}} | https://henno.ai/{{slug}}.html | "[anchor 1]", "[anchor 2]" |
```

Choose 2–3 descriptive anchor text suggestions based on the article topic.

---

### STEP 8b: Update llms.txt

Read `../llms.txt` and add the new article under the `## Guides` section:

```markdown
- [{{title}}](https://henno.ai/{{slug}}.html): {{excerpt}}
```

Add it at the end of the Guides list.

---

### STEP 9: Update Published Log

Append to `published/log.md`:

```markdown
| {{date}} | {{title}} | /{{slug}}.html | {{primary_keyword}} | {{word_count}} words |
```

If `published/log.md` doesn't exist yet, create it with a header:

```markdown
# Published Articles

| Date | Title | URL | Primary Keyword | Word Count |
|------|-------|-----|-----------------|------------|
```

---

### STEP 10: Git Commit

From the **parent directory** (`../`), stage and commit all changed files:

```bash
cd /Users/henno/Documents/Projects/hennoai
git add {{slug}}.html sitemap.xml rss.xml blog/index.html seo-engine/context/internal-links-map.md seo-engine/published/log.md llms.txt
git commit -m "Publish: {{title}}"
```

---

### STEP 11: Deploy

Deploy to Vercel from the parent directory:

```bash
cd /Users/henno/Documents/Projects/hennoai && vercel --prod
```

Or if the repo uses git-based deploys:

```bash
cd /Users/henno/Documents/Projects/hennoai && git push
```

---

### STEP 12: Verify

After deployment:
1. Confirm the article URL resolves: `https://henno.ai/{{slug}}.html`
2. Confirm it appears on the blog listing: `https://henno.ai/blog/`
3. Confirm the sitemap includes the new URL
4. Report the live URL to the user

---

## Output Summary

Tell the user:
- Published URL: `https://henno.ai/{{slug}}.html`
- Blog listing updated: yes/no
- Sitemap updated: yes/no
- RSS updated: yes/no
- Internal links map updated: yes/no
- Git committed: yes/no
- Deployed: yes/no

---

## Rules

- **Never overwrite an existing HTML file** without confirming with the user
- **Validate the HTML** — all tags properly closed, no broken attributes
- **Match existing site design exactly** — same nav, footer, theme toggle, font loading
- **Preserve existing sitemap/RSS entries** — only append, never remove
- **Blog index ordering** — newest post first (top of grid)
- **Test the slug** — ensure it doesn't conflict with existing files (check with `ls ../`)
