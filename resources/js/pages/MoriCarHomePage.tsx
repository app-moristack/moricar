import { ArrowRight, BadgeCheck, CarFront, ChevronRight, MapPin, MessageCircle, Search, ShieldCheck, Store, Users, Wrench } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { CarCard } from '@/components/marketplace/CarCard'
import { cars, professionals, services } from '@/data/marketplace'

const bodyTypes = [['Hatchback', 'Perfect for the city'], ['Sedan', 'Comfortable and refined'], ['SUV', 'Space for every journey'], ['Pickup', 'Built for work and play'], ['Hybrid & EV', 'Drive the future'], ['Luxury', 'Premium without compromise']]

export function MoriCarHomePage() {
  const navigate = useNavigate()
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    navigate(`/cars?type=${data.get('type')}&make=${data.get('make')}&locality=${data.get('locality')}`)
  }
  return <div className="mc-page">
    <section className="mc-hero mc-hero--home">
      <div className="mc-hero-shade" />
      <div className="mc-shell mc-hero__content">
        <p className="mc-eyebrow">Mauritius automotive marketplace</p>
        <h1>Find your<br />next <em>car.</em></h1>
        <p className="mc-hero__lead">Find the people<br />who keep it moving.</p>
        <p className="mc-copy">Buy or rent cars nearby and connect with trusted automotive professionals across Mauritius.</p>
        <div className="mc-quick-links"><Link to="/cars"><CarFront /> Find a car</Link><Link to="/services"><Wrench /> Automotive services</Link><Link to="/for-sellers"><Store /> Sell or list</Link></div>
        <span className="mc-script">Mauritius<br />Drives Here</span>
      </div>
      <form className="mc-search-panel mc-shell" onSubmit={submit}>
        <div className="mc-tabs"><label><input type="radio" name="type" value="sale" defaultChecked /> Buy a car</label><label><input type="radio" name="type" value="rent" /> Rent a car</label><Link to="/services">Find a service</Link></div>
        <div className="mc-search-grid">
          <label><span>Make</span><select name="make" defaultValue=""><option value="">All makes</option><option>Toyota</option><option>BMW</option><option>Hyundai</option><option>Suzuki</option></select></label>
          <label><span>Model</span><select name="model" defaultValue=""><option value="">All models</option><option>Corolla</option><option>X3</option><option>Swift</option></select></label>
          <label><span>Location</span><select name="locality" defaultValue=""><option value="">All Mauritius</option><option>Black River</option><option>Grand Baie</option><option>Moka</option></select></label>
          <button className="mc-button" type="submit"><Search /> Search</button>
        </div>
      </form>
    </section>
    <section className="mc-trust-strip"><div className="mc-shell">
      <div><BadgeCheck /><span><b>Local & trusted</b>Reviewed before publication</span></div>
      <div><MapPin /><span><b>Nearby in Mauritius</b>Search around you</span></div>
      <div><MessageCircle /><span><b>Direct contact</b>No middleman</span></div>
      <div><Users /><span><b>One marketplace</b>Cars, rentals and services</span></div>
    </div></section>
    <main>
      <section className="mc-section mc-shell">
        <div className="mc-section-title"><div><p className="mc-eyebrow">Start with a shape</p><h2>Browse by vehicle type</h2></div><Link to="/cars">View all cars <ArrowRight /></Link></div>
        <div className="mc-body-grid">{bodyTypes.map(([name, detail]) => <Link key={name} to={`/cars?body=${name}`}><CarFront /><b>{name}</b><small>{detail}</small></Link>)}</div>
      </section>
      <section className="mc-section mc-shell">
        <div className="mc-section-title"><div><p className="mc-eyebrow">Hand-picked for you</p><h2>Featured cars</h2></div><Link to="/cars">View all cars <ArrowRight /></Link></div>
        <div className="mc-car-grid">{cars.slice(0, 4).map((car) => <CarCard key={car.id} car={car} />)}</div>
      </section>
      <section className="mc-section mc-section--soft"><div className="mc-shell">
        <div className="mc-section-title"><div><p className="mc-eyebrow">Keep your car moving</p><h2>Automotive services</h2></div><Link to="/services">View all services <ArrowRight /></Link></div>
        <div className="mc-service-grid">{services.map((service) => <Link to="/services" key={service.name}><span>{service.icon}</span><b>{service.name}</b><small>{service.description}</small><ChevronRight /></Link>)}</div>
      </div></section>
      <section className="mc-section mc-shell">
        <div className="mc-section-title"><div><p className="mc-eyebrow">Verified local expertise</p><h2>Featured professionals</h2></div><Link to="/services">View all professionals <ArrowRight /></Link></div>
        <div className="mc-pro-grid">{professionals.map((pro) => <article key={pro.name}><img src={pro.image} alt="" /><div><span className="mc-verified"><ShieldCheck /> Verified</span><h3>{pro.name}</h3><p>{pro.service}</p><small><MapPin /> {pro.locality} / ★ {pro.rating}</small><Link to="/services">View profile <ArrowRight /></Link></div></article>)}</div>
      </section>
      <section className="mc-how"><div className="mc-shell mc-how__grid">
        <div><p className="mc-eyebrow">Simple by design</p><h2>How it works</h2><p>Finding your next car or the right expert should feel effortless.</p><Link className="mc-button mc-button--outline" to="/about">Learn more <ArrowRight /></Link></div>
        <ol><li><span>01</span><div><Search /><b>Browse</b><p>Explore cars or trusted services.</p></div></li><li><span>02</span><div><MapPin /><b>Discover nearby</b><p>Filter by area, price and what matters.</p></div></li><li><span>03</span><div><MessageCircle /><b>Connect direct</b><p>Contact sellers and professionals yourself.</p></div></li><li><span>04</span><div><CarFront /><b>Drive forward</b><p>Agree the details directly and move ahead.</p></div></li></ol>
      </div></section>
      <section className="mc-cta-band"><div className="mc-shell"><div><p className="mc-eyebrow">Built for local business</p><h2>Are you a seller or automotive professional?</h2><p>List your car, showcase your services and reach customers across Mauritius.</p></div><Link to="/for-sellers" className="mc-button">List your business <ArrowRight /></Link></div></section>
    </main>
  </div>
}
