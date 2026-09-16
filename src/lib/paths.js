/**
 * Resolve a content path against the deploy's base.
 *
 * Vercel serves this project from the domain root; the internal review host
 * serves it from /biz-reports/design/. Vite rewrites the paths it owns (the
 * bundle, the stylesheet, anything imported or written in CSS) but it cannot
 * rewrite a path that lives as a string in a content file, so `/card.jpg`
 * would 404 under any prefix.
 *
 * Content files stay plain data. Pages are data here, and a data file should
 * not have to know where it is hosted, so the resolution happens once at the
 * point of render.
 *
 * Anchors, external URLs and relative paths are left alone; `<Link>` is the
 * router's job and is handled by the basename instead.
 */
const BASE = import.meta.env.BASE_URL

export function withBase(path) {
  if (typeof path !== 'string' || !path.startsWith('/')) return path
  return BASE + path.slice(1)
}

/** The basename `<BrowserRouter>` and `<StaticRouter>` take: no trailing slash. */
export const basename = BASE.replace(/\/$/, '')
