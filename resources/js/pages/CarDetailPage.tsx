import { ArrowLeft, BadgeCheck, Calendar, CarFront, Check, Fuel, Gauge, Heart, MapPin, MessageCircle, Phone, Settings2, Share2, ShieldCheck } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { CarCard } from '@/components/marketplace/CarCard'
import { cars, formatPrice } from '@/data/marketplace'

export function CarDetailPage() {
  const { slug } = useParams()
  const car = cars.find((item) => item.slug === slug) ?? cars[0]!
  return <div className="mc-page mc-detail">
    <div className="mc-shell mc-breadcrumb"><Link to="/cars"><ArrowLeft /> Back to cars</Link><span>Cars / {car.make} / {car.model}</span></div>
    <section className="mc-shell mc-detail-grid">
      <div>
        <div className="mc-gallery"><img src={car.image} alt={`${car.year} ${car.make} ${car.model}`} /><span className="mc-badge">Featured</span><div className="mc-gallery-count">1 / 5</div></div>
        <div className="mc-thumbs">{[1, 2, 3, 4, 5].map((n) => <button key={n}><img src={car.image} alt={`Vehicle view ${n}`} /></button>)}</div>
        <nav className="mc-detail-tabs"><a href="#specifications">Overview</a><a href="#specifications">Specifications</a><a href="#features">Features</a><a href="#description">Description</a><a href="#location">Location</a></nav>
        <section id="specifications" className="mc-detail-panel"><div className="mc-section-title"><h2>Specifications</h2><span>See all details</span></div><div className="mc-spec-grid">
          <div><CarFront /><span><small>Make</small>{car.make}</span></div><div><Settings2 /><span><small>Model</small>{car.model}</span></div><div><Calendar /><span><small>Year</small>{car.year}</span></div><div><Gauge /><span><small>Mileage</small>{car.mileage.toLocaleString()} km</span></div><div><Settings2 /><span><small>Transmission</small>{car.transmission}</span></div><div><Fuel /><span><small>Fuel type</small>{car.fuel}</span></div>
        </div></section>
        <section id="features" className="mc-detail-panel"><div className="mc-section-title"><h2>Key features</h2><span>All the essentials</span></div><div className="mc-features">{['AC package', 'Parking sensors', 'Keyless entry', 'Touchscreen display', 'LED headlights', 'Cruise control', 'Push start', 'Alloy wheels', 'Lane assist', 'Bluetooth', 'ABS', 'Airbags'].map((feature) => <span key={feature}><Check /> {feature}</span>)}</div></section>
        <section id="description" className="mc-detail-panel"><h2>Description</h2><p>Well maintained {car.make} {car.model}, regularly serviced and ready to drive. Smooth, economical and reliable for everyday use. Contact the seller directly for more information or to arrange a viewing.</p></section>
        <section id="location" className="mc-detail-panel mc-location-panel"><div><MapPin /><div><h2>Location</h2><p>{car.locality}, Mauritius</p><small>Approximate location shown for privacy.</small></div></div><div className="mc-map"><MapPin /></div></section>
      </div>
      <aside className="mc-detail-aside">
        <div className="mc-detail-summary"><div className="mc-summary-badges"><span className="mc-badge">{car.type === 'sale' ? 'For sale' : 'For rent'}</span>{car.verified && <span><BadgeCheck /> Verified seller</span>}</div><h1>{car.make} {car.model} {car.year}</h1><p>{car.body} / {car.transmission}</p><strong>{formatPrice(car)}</strong><small>{car.type === 'sale' ? 'Negotiable' : 'Owner confirms availability and terms'}</small><a className="mc-button mc-button--whatsapp" href={`https://wa.me/23057079335?text=${encodeURIComponent(`Hello, I am interested in the ${car.year} ${car.make} ${car.model} on MoriCar.`)}`}><MessageCircle /> {car.type === 'rent' ? 'Enquire about rental' : 'Contact via WhatsApp'}</a><a className="mc-button mc-button--outline" href="tel:+23057079335"><Phone /> Call seller</a><div className="mc-share-actions"><button><Heart /> Save</button><button><Share2 /> Share</button></div></div>
        <div className="mc-seller-card"><div className="mc-avatar">JD</div><div><h2>{car.seller}</h2><p><BadgeCheck /> Verified</p><small>Member since Mar 2024</small></div></div>
        <div className="mc-safety"><ShieldCheck /><div><h2>Buy safely</h2><p>Meet in a public place, inspect the vehicle and never send advance payment.</p><Link to="/terms">Learn more</Link></div></div>
        <div className="mc-budget"><h2>Estimate your budget</h2><p>Get an idea of monthly payments before contacting the seller.</p><button className="mc-button mc-button--outline">Estimate now</button></div>
      </aside>
    </section>
    <section className="mc-section mc-shell"><div className="mc-section-title"><h2>Similar cars</h2><Link to="/cars">View more</Link></div><div className="mc-car-grid">{cars.slice(1, 5).map((item) => <CarCard key={item.id} car={item} />)}</div></section>
  </div>
}
