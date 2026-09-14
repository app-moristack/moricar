import { Heart, MapPin } from 'lucide-react'
import { Link } from 'react-router'
import { type Car, formatPrice } from '@/data/marketplace'

export function CarCard({ car }: { car: Car }) {
  return <article className="mc-car-card"><Link to={`/cars/${car.slug}`} className="mc-card-media"><img src={car.image} alt={`${car.year} ${car.make} ${car.model}`} /><span className={`mc-badge mc-badge--${car.type}`}>{car.type === 'sale' ? 'For sale' : 'For rent'}</span></Link><button type="button" className="mc-heart" aria-label={`Save ${car.make} ${car.model}`}><Heart /></button><div className="mc-card-body"><p className="mc-card-kicker">{car.body} / {car.fuel}</p><h3><Link to={`/cars/${car.slug}`}>{car.year} {car.make} {car.model}</Link></h3><strong>{formatPrice(car)}</strong><div className="mc-card-specs"><span>{car.mileage.toLocaleString()} km</span><span>{car.transmission}</span><span><MapPin /> {car.locality}</span></div></div></article>
}
