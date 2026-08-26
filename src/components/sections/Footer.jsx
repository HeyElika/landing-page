/**
 * Footer.
 *
 * Contact and the regulatory statement, then copyright and the legal links.
 * Nothing else: navigation and the app links live higher up the page, and a
 * footer that repeats them becomes a second page rather than a closing note.
 *
 * `legal` must be the approved regulatory wording, never a paraphrase.
 */
export default function Footer({ contact = [], legal = [], bottomLinks = [], copyright }) {
  return (
    <footer className="l-band l-band--tight">
      <div className="l-container l-stack l-stack--800">
        <div className="l-stack l-stack--300">
          {contact.length > 0 && (
            <ul className="l-stack l-stack--100">
              {contact.map((c) => (
                <li key={c.label}>
                  <a href={c.href} className="body-md-semibold">{c.label}</a>
                </li>
              ))}
            </ul>
          )}
          {legal.map((p, i) => (
            <p key={i} className="body-xs-regular t-subtle">{p}</p>
          ))}
        </div>

        <div className="c-footer__bottom">
          <p className="body-xs-regular t-subtle">{copyright}</p>
          {bottomLinks.length > 0 && (
            <ul className="l-row" style={{ gap: 'var(--space-500)' }}>
              {bottomLinks.map((l) => (
                <li key={l.label}><a href={l.href} className="body-xs-regular t-subtle">{l.label}</a></li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  )
}
