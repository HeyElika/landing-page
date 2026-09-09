import { Link } from 'react-router-dom'
import TokenReference from './TokenReference'

/**
 * The token reference on a page of its own.
 *
 * It used to sit under the pattern catalogue. Keeping them apart lets each
 * answer one question: /patterns is what a page is assembled from, /tokens is
 * what those parts are made of. The data still comes from the same generated
 * file, so the two cannot disagree.
 */
export default function TokensPage() {
  return (
    <div className="l-band l-container l-stack l-stack--900">
      <div className="l-stack l-stack--300">
        <h1 className="display-md">Tokens</h1>
        <p className="body-lg-regular l-measure">
          Every value the pages paint with, extracted from the stylesheets and the design system
          Button rather than written by hand.
        </p>
        <nav aria-label="On this page" className="l-row" style={{ gap: 'var(--space-400)' }}>
          {[['type', 'Type'], ['colour', 'Colour'], ['icons', 'Icons'], ['buttons', 'Buttons']].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="body-sm-semibold c-link">{label}</a>
          ))}
          <Link to="/patterns" className="body-sm-semibold c-link">Patterns</Link>
        </nav>
      </div>

      <TokenReference />
    </div>
  )
}
