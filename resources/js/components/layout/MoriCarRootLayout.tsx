import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { InstallPrompt } from '@/components/pwa/InstallPrompt'
import { UpdatePrompt } from '@/components/pwa/UpdatePrompt'
import { PageViewTracker } from './PageViewTracker'
import { MoriCarFooter } from './MoriCarFooter'
import { MoriCarHeader } from './MoriCarHeader'

export function MoriCarRootLayout() {
  const { pathname } = useLocation()
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/')
  useEffect(() => window.scrollTo({ top: 0, behavior: 'instant' }), [pathname])
  return <div className="mc-app"><a href="#main" className="mc-skip">Skip to content</a>{!isAdmin && pathname !== '/login' && <MoriCarHeader />}<PageViewTracker /><main id="main"><Outlet /></main>{!isAdmin && pathname !== '/login' && <MoriCarFooter />}{!isAdmin && <InstallPrompt />}<UpdatePrompt /></div>
}
