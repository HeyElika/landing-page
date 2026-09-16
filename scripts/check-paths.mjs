/**
 * Every URL in the built HTML must resolve under the deploy's base.
 *
 * Vite rewrites the paths it owns. It cannot rewrite `/card.jpg` written as a
 * string in a content file, and the first build under a prefix shipped 36 such
 * references: nine images, ten logos, the font preload and every internal
 * link, each one a 404 on the internal host and every one of them invisible in
 * a build that passed.
 *
 * This walks the real output rather than the source, so it catches a path
 * however it got there, including from a content file added later.
 *
 * Run after `vite build`; the build script does it automatically.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const base = process.env.BASE_PATH || '/'

function html(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) return html(full)
    return entry.endsWith('.html') ? [full] : []
  })
}

const files = html(dist)
if (!files.length) {
  console.error('check-paths: no HTML in dist/ — run the build first')
  process.exit(1)
}

// Root-relative only. Anchors, external URLs and relative paths are fine.
const ATTR = /(?:src|href)="(\/[^"]*)"/g
const offenders = []

for (const file of files) {
  const text = readFileSync(file, 'utf8')
  for (const [, url] of text.matchAll(ATTR)) {
    if (url.startsWith(base)) continue
    offenders.push({ file: file.slice(dist.length + 1), url })
  }
}

if (offenders.length) {
  const byUrl = new Map()
  for (const o of offenders) byUrl.set(o.url, (byUrl.get(o.url) || 0) + 1)
  console.error(`\ncheck-paths FAILED: ${offenders.length} reference(s) outside base "${base}"\n`)
  for (const [url, count] of [...byUrl].sort((a, b) => b[1] - a[1])) {
    console.error(`  ${String(count).padStart(3)}x  ${url}`)
  }
  console.error(`
Wrap the value in withBase() where it is rendered (src/lib/paths.js), or use
<Link> so the router's basename handles it. Do not edit the content file: a
page is data and does not know where it is hosted.
`)
  process.exit(1)
}

console.log(`paths ok: every URL in ${files.length} page(s) resolves under "${base}"`)
