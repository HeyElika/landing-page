/** Number band. Each item: { value, label }. */
export default function Stats({ items = [], background = 'dark', title }) {
  const bandTone = { default: '', subtle: 'l-band--subtle', dark: 'l-band--dark', brand: 'l-band--brand' }[background] || ''
  const onDark = background === 'dark' || background === 'brand'
  return (
    <section className={['l-band', bandTone].filter(Boolean).join(' ')}>
      <div className="l-container l-stack l-stack--600">
        {title && <h2 className={['t-h3', 't-center', onDark ? 't-on-dark' : ''].filter(Boolean).join(' ')}>{title}</h2>}
        <ul className={`l-grid l-grid--${Math.min(items.length, 4) || 3}`}>
          {items.map((item) => (
            <li key={item.label} className="l-stack l-stack--100 t-center">
              <span className={['t-h2', onDark ? 't-on-dark' : ''].filter(Boolean).join(' ')}>{item.value}</span>
              <span className={onDark ? 't-small t-on-dark-subtle' : 't-small'}>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
