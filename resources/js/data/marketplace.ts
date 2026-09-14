import roadDay from '../../images/moricar-road-day.png'
import roadSunset from '../../images/moricar-road-sunset.png'

export type Car = { id: number; slug: string; make: string; model: string; year: number; price: number; type: 'sale' | 'rent'; mileage: number; transmission: string; fuel: string; locality: string; seller: string; verified: boolean; image: string; body: string }

export const cars: Car[] = [
  { id: 1, slug: 'toyota-corolla-2021', make: 'Toyota', model: 'Corolla', year: 2021, price: 850000, type: 'sale', mileage: 55000, transmission: 'Automatic', fuel: 'Hybrid', locality: 'Black River', seller: 'Jean Dupont', verified: true, image: roadDay, body: 'Sedan' },
  { id: 2, slug: 'hyundai-i20-2019', make: 'Hyundai', model: 'i20', year: 2019, price: 595000, type: 'sale', mileage: 68000, transmission: 'Automatic', fuel: 'Petrol', locality: 'Moka', seller: 'Island Auto', verified: true, image: roadSunset, body: 'Hatchback' },
  { id: 3, slug: 'bmw-x3-2020', make: 'BMW', model: 'X3', year: 2020, price: 2300000, type: 'sale', mileage: 42000, transmission: 'Automatic', fuel: 'Diesel', locality: 'Tamarin', seller: 'Premium Motors', verified: true, image: roadDay, body: 'SUV' },
  { id: 4, slug: 'suzuki-swift-rental', make: 'Suzuki', model: 'Swift', year: 2022, price: 1400, type: 'rent', mileage: 31000, transmission: 'Automatic', fuel: 'Petrol', locality: 'Grand Baie', seller: 'Mauritius Drive', verified: true, image: roadSunset, body: 'Hatchback' },
  { id: 5, slug: 'toyota-hilux-2021', make: 'Toyota', model: 'Hilux', year: 2021, price: 1750000, type: 'sale', mileage: 61000, transmission: 'Manual', fuel: 'Diesel', locality: 'Curepipe', seller: 'Auto Select', verified: false, image: roadDay, body: 'Pickup' },
  { id: 6, slug: 'kia-seltos-rental', make: 'Kia', model: 'Seltos', year: 2023, price: 2200, type: 'rent', mileage: 18000, transmission: 'Automatic', fuel: 'Petrol', locality: 'Mahebourg', seller: 'Coastal Rentals', verified: true, image: roadSunset, body: 'SUV' },
]

export const services = [
  { icon: 'GEAR', name: 'Car Servicing', description: 'Routine care and maintenance' },
  { icon: 'TYRE', name: 'Tyres & Wheels', description: 'Fitting, balance and alignment' },
  { icon: 'STOP', name: 'Brakes', description: 'Inspection and replacement' },
  { icon: 'AC', name: 'AC Repair', description: 'Diagnosis and re-gassing' },
  { icon: 'BODY', name: 'Bodywork & Painting', description: 'Restore every detail' },
  { icon: 'CARE', name: 'Car Detailing', description: 'Interior and exterior care' },
  { icon: 'POWER', name: 'Batteries', description: 'Supply and installation' },
  { icon: 'TECH', name: 'Car Electronics', description: 'Diagnostics and electrical' },
]

export const professionals = [
  { name: 'Auto Plus Garage', service: 'Car Servicing', locality: 'Quatre Bornes', rating: '4.8', image: roadDay },
  { name: 'Speed Tyres', service: 'Tyres & Wheels', locality: 'Phoenix', rating: '4.9', image: roadSunset },
  { name: 'Premium Detailing', service: 'Car Detailing', locality: 'Grand Baie', rating: '4.9', image: roadDay },
  { name: 'Mauritius Auto Care', service: 'Mechanical Repair', locality: 'Rose Hill', rating: '4.7', image: roadSunset },
]

export const formatPrice = (car: Car) => `MUR ${new Intl.NumberFormat('en-MU').format(car.price)}${car.type === 'rent' ? ' / day' : ''}`
