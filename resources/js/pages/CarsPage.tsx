import { Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { CarCard } from '@/components/marketplace/CarCard'
import { cars } from '@/data/marketplace'

export function CarsPage() {
  const [type, setType] = useState<'all' | 'sale' | 'rent'>('all')
  const [term, setTerm] = useState('')
  const visible = useMemo(() => cars.filter((car) => (type === 'all' || car.type === type) && `${car.make} ${car.model} ${car.locality}`.toLowerCase().includes(term.toLowerCase())), [type, term])
  return <div className="mc-page">
    <section className="mc-page-hero mc-page-hero--cars"><div className="mc-shell"><p className="mc-eyebrow">Cars across Mauritius</p><h1>Find the one that<br /><em>moves you.</em></h1><p>Buy or rent directly from local owners and trusted businesses.</p></div></section>
    <section className="mc-shell mc-listing-layout">
      <aside className="mc-filters">
        <h2><SlidersHorizontal /> Filters</h2>
        <label>Keyword<div className="mc-input-icon"><Search /><input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Make, model or locality" /></div></label>
        <fieldset><legend>Listing type</legend>{(['all', 'sale', 'rent'] as const).map((value) => <label key={value}><input type="radio" checked={type === value} onChange={() => setType(value)} /> {value === 'all' ? 'All cars' : value === 'sale' ? 'For sale' : 'For rent'}</label>)}</fieldset>
        <label>Make<select><option>All makes</option><option>Toyota</option><option>BMW</option><option>Suzuki</option></select></label>
        <label>Body type<select><option>All body types</option><option>SUV</option><option>Sedan</option><option>Hatchback</option><option>Pickup</option></select></label>
        <div className="mc-filter-pair"><label>Min price<input type="number" placeholder="MUR" /></label><label>Max price<input type="number" placeholder="MUR" /></label></div>
        <label>Location<select><option>All Mauritius</option><option>Black River</option><option>Grand Baie</option><option>Moka</option></select></label>
      </aside>
      <div className="mc-results"><div className="mc-results-head"><div><p className="mc-eyebrow">Explore inventory</p><h2>{visible.length} cars found</h2></div><select aria-label="Sort results"><option>Newest first</option><option>Price: low to high</option><option>Price: high to low</option><option>Lowest mileage</option></select></div>
        {visible.length ? <div className="mc-car-grid mc-car-grid--results">{visible.map((car) => <CarCard key={car.id} car={car} />)}</div> : <div className="mc-empty"><h3>No exact matches</h3><p>Try removing a filter or searching all Mauritius.</p></div>}
      </div>
    </section>
  </div>
}
