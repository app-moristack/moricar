import { Link } from 'react-router'
import logo from '../../../images/moricar-logo.png'

export function MoriCarBrand({ footer = false }: { footer?: boolean }) {
  return (
    <Link to="/" aria-label="MoriCar home" className={`moricar-brand ${footer ? 'moricar-brand--footer' : ''}`}>
      <img src={logo} alt="MoriCar - cars, expertise, nearby" />
    </Link>
  )
}
