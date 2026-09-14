import { BriefcaseBusiness, Camera, Globe2, MapPin, Play } from 'lucide-react'
import { Link } from 'react-router'
import { MoriCarBrand } from './MoriCarBrand'

export function MoriCarFooter() {
  return (
    <footer className="mc-footer">
      <div className="mc-shell mc-footer__grid">
        <div><MoriCarBrand footer /><p>Buy. Rent. Find expertise.<br />All across Mauritius.</p></div>
        <div><h2>Explore</h2><Link to="/cars">Find a Car</Link><Link to="/services">Automotive Services</Link><Link to="/for-sellers">For Sellers & Professionals</Link><Link to="/about">About</Link></div>
        <div><h2>Support</h2><Link to="/contact">Help Centre</Link><Link to="/terms">Terms of Use</Link><Link to="/privacy">Privacy Policy</Link><Link to="/contact">Contact</Link></div>
        <div><h2>Stay connected</h2><p>Follow us for the latest rides and services.</p><div className="mc-socials"><a href="#social" aria-label="Website"><Globe2 /></a><a href="#social" aria-label="Photos"><Camera /></a><a href="#social" aria-label="Videos"><Play /></a><a href="#social" aria-label="Business"><BriefcaseBusiness /></a></div></div>
        <div className="mc-footer__place"><MapPin /><span>Built in Mauritius<br /><small>For a stronger local community.</small></span></div>
      </div>
      <div className="mc-shell mc-footer__bottom"><span>Copyright {new Date().getFullYear()} MoriCar. A MoriStack product.</span><span>Built in Mauritius</span></div>
    </footer>
  )
}
