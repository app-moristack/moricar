import { LayoutDashboard, LogOut, MapPin, Menu, Moon, Search, UserRound, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/cn'
import { MoriCarBrand } from './MoriCarBrand'

const links = [
  { to: '/', label: 'Home' },
  { to: '/cars', label: 'Find a Car' },
  { to: '/services', label: 'Automotive Services' },
  { to: '/for-sellers', label: 'For Sellers & Professionals' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function MoriCarHeader() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, isProvider, logout } = useAuth()
  return (
    <header className="mc-header">
      <div className="mc-shell mc-header__inner">
        <MoriCarBrand />
        <nav className="mc-nav" aria-label="Main navigation">
          {links.map((link) => <NavLink key={link.to} to={link.to} end={link.to === '/'} className={({ isActive }) => cn('mc-nav__link', isActive && 'is-active')}>{link.label}</NavLink>)}
        </nav>
        <div className="mc-header__actions">
          <span className="mc-location"><MapPin aria-hidden /> Mauritius</span>
          <button type="button" className="mc-icon-btn" aria-label="Search cars" onClick={() => navigate('/cars')}><Search aria-hidden /></button>
          <span className="mc-icon-btn" aria-label="Dark theme"><Moon aria-hidden /></span>
          {isProvider && <Link to="/dashboard" className="mc-icon-btn" aria-label="Dashboard"><LayoutDashboard aria-hidden /></Link>}
          {isAuthenticated ? <button type="button" className="mc-button mc-button--small" onClick={() => void logout()}><LogOut aria-hidden /> Sign out</button> : <Link to="/login" className="mc-button mc-button--small"><UserRound aria-hidden /> List Now</Link>}
          <button type="button" className="mc-menu" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && <nav className="mc-mobile-nav" aria-label="Mobile navigation"><div className="mc-shell">{links.map((link) => <Link key={link.to} to={link.to} className={pathname === link.to ? 'is-active' : ''} onClick={() => setOpen(false)}>{link.label}</Link>)}<Link to="/login" onClick={() => setOpen(false)}>Sign in / Create account</Link></div></nav>}
    </header>
  )
}
