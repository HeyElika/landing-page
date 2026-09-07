/**
 * Renders every page to its own HTML file, with its own head.
 *
 * Before this, all routes served one index.html carrying the template's
 * generic title, and the real title was set by JavaScript after React mounted.
 * Google may run that JavaScript; the scrapers behind Facebook, LinkedIn,
 * WhatsApp and Slack do not. A shared link showed "Billease landing page" and
 * no image, whichever page it pointed at.
 *
 * Each page now gets: title, description, canonical, Open Graph, Twitter card,
 * JSON-LD, and its markup already in #root — which also means a crawler, or a
 * reader on a slow connection, sees content before any JavaScript runs.
 *
 * Run automatically after `vite build`.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'
import { StaticRouter } from 'react-router-dom'
import App from '../src/App.jsx'
import { pages } from '../src/content/index.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const SITE = process.env.SITE_URL || 'https://landing-page-eight-opal-12.vercel.app'
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')

function head(page, path) {
  const m = page.meta || {}
  const url = `${SITE}${path === '/' ? '' : path}`
  const image = m.ogImage ? `${SITE}${m.ogImage}` : null
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: m.title,
    description: m.description,
    url,
    isPartOf: { '@type': 'WebSite', name: 'Billease', url: SITE },
    ...(m.structuredData || {}),
  }
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<link rel="canonical" href="${esc(m.canonical || url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Billease" />`,
    `<meta property="og:title" content="${esc(m.ogTitle || m.title)}" />`,
    `<meta property="og:description" content="${esc(m.ogDescription || m.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    image ? `<meta property="og:image" content="${esc(image)}" />` : null,
    image ? `<meta property="og:image:alt" content="${esc(m.ogImageAlt || m.title)}" />` : null,
    `<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />`,
    `<meta name="twitter:title" content="${esc(m.ogTitle || m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.ogDescription || m.description)}" />`,
    image ? `<meta name="twitter:image" content="${esc(image)}" />` : null,
    `<script type="application/ld+json">${JSON.stringify(ld)}</script>`,
  ].filter(Boolean).join('\n    ')
}

function write(page, path) {
  const markup = renderToStaticMarkup(
    createElement(StaticRouter, { location: path }, createElement(App)),
  )
  const html = template
    // Replace the template's own title and description rather than adding a second one.
    .replace(/<title>[\s\S]*?<\/title>\s*<meta name="description"[^>]*\/>/, head(page, path))
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)

  const dir = path === '/' ? dist : join(dist, path.replace(/^\//, ''))
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
  return { path, bytes: html.length, title: page.meta?.title }
}

const written = [write(pages[0], '/'), ...pages.map((p) => write(p, `/${p.slug}`))]
for (const w of written) console.log(`  ${w.path.padEnd(14)} ${String(Math.round(w.bytes / 1024)).padStart(3)} KB  ${w.title}`)

// A sitemap, since every page now has a stable URL of its own.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${SITE}/${p.slug}</loc></url>`).join('\n')}
</urlset>
`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)
console.log(`  sitemap.xml    ${pages.length} urls`)
