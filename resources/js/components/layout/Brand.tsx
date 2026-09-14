import { Link } from 'react-router'
import mark from '../../../images/moricar-house-services-logo.webp'
import wordmark from '../../../images/moricar-wordmark.webp'

export function Brand({
  footer = false,
  tagline = 'Local professionals. A stronger tomorrow.',
}: {
  footer?: boolean
  tagline?: string
}) {
  return (
    <Link
      to="/"
      aria-label="MoriCar home"
      className={`moricar-brand ${footer ? 'moricar-brand-footer' : ''}`}
    >
      <span className="flex items-center gap-1">
        <img src={mark} alt="" width={60} height={42} className="brand-mark" />
        <img src={wordmark} alt="MoriCar" width={166} height={28} className="brand-wordmark" />
      </span>
      <span className="brand-tagline">{tagline}</span>
    </Link>
  )
}
