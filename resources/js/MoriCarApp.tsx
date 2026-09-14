import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { MoriCarRootLayout } from '@/components/layout/MoriCarRootLayout'
import { RequireAdmin, RequireProvider } from '@/components/layout/RouteGuards'
import { Spinner } from '@/components/ui/Spinner'
import { MoriCarHomePage } from '@/pages/MoriCarHomePage'
import { CarsPage } from '@/pages/CarsPage'
import { CarDetailPage } from '@/pages/CarDetailPage'
import { ServicesPage } from '@/pages/ServicesPage'
import { SellersPage } from '@/pages/SellersPage'
import { MoriCarAboutPage } from '@/pages/MoriCarAboutPage'
import { MoriCarContactPage } from '@/pages/MoriCarContactPage'
import { MoriCarLoginPage } from '@/pages/MoriCarLoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const ResetPasswordPage = lazy(() => import('@/pages/ResetPasswordPage'))
const InstallPage = lazy(() => import('@/pages/InstallPage'))
const ProviderDashboardPage = lazy(() => import('@/pages/provider/ProviderDashboardPage'))
const ProviderProfileEditPage = lazy(() => import('@/pages/provider/ProviderProfileEditPage'))
const ProviderPortfolioPage = lazy(() => import('@/pages/provider/ProviderPortfolioPage'))
const ProviderSecurityPage = lazy(() => import('@/pages/provider/ProviderSecurityPage'))
const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage'))
const AdminUsersPage = lazy(() => import('@/pages/admin/AdminUsersPage'))
const AdminReviewQueuePage = lazy(() => import('@/pages/admin/AdminReviewQueuePage'))
const AdminProviderReviewPage = lazy(() => import('@/pages/admin/AdminProviderReviewPage'))
const AdminCategoriesPage = lazy(() => import('@/pages/admin/AdminCategoriesPage'))
const AdminLayout = lazy(() => import('@/components/admin/AdminLayout').then((module) => ({ default: module.AdminLayout })))

const loading = <Spinner label="Loading MoriCar" />
function Legal({ page }: { page: 'terms' | 'privacy' }) {
  return <section className="mc-section mc-shell mc-legal"><p className="mc-eyebrow">MoriCar policies</p><h1>{page === 'terms' ? 'Terms of use' : 'Privacy policy'}</h1><p>This launch-ready page is reserved for the approved Mauritius legal copy. MoriCar does not process vehicle purchases, rental payments or repair bookings. Buyers, renters, sellers and professionals agree arrangements directly.</p></section>
}

export function MoriCarApp() {
  return <Routes><Route element={<MoriCarRootLayout />}>
    <Route index element={<MoriCarHomePage />} /><Route path="cars" element={<CarsPage />} /><Route path="cars/:slug" element={<CarDetailPage />} /><Route path="services" element={<ServicesPage />} /><Route path="search" element={<Navigate to="/services" replace />} /><Route path="for-sellers" element={<SellersPage />} /><Route path="for-professionals" element={<Navigate to="/for-sellers" replace />} /><Route path="about" element={<MoriCarAboutPage />} /><Route path="contact" element={<MoriCarContactPage />} /><Route path="login" element={<MoriCarLoginPage />} /><Route path="reset-password" element={<Suspense fallback={loading}><ResetPasswordPage /></Suspense>} /><Route path="install" element={<Suspense fallback={loading}><InstallPage /></Suspense>} /><Route path="terms" element={<Legal page="terms" />} /><Route path="privacy" element={<Legal page="privacy" />} />
    <Route path="register" element={<Navigate to="/for-sellers" replace />} /><Route path="register/individual" element={<Suspense fallback={loading}><RegisterPage providerType="individual" /></Suspense>} /><Route path="register/business" element={<Suspense fallback={loading}><RegisterPage providerType="agency" /></Suspense>} />
    <Route path="dashboard" element={<RequireProvider />}><Route index element={<Suspense fallback={loading}><ProviderDashboardPage /></Suspense>} /><Route path="profile" element={<Suspense fallback={loading}><ProviderProfileEditPage /></Suspense>} /><Route path="portfolio" element={<Suspense fallback={loading}><ProviderPortfolioPage /></Suspense>} /><Route path="security" element={<Suspense fallback={loading}><ProviderSecurityPage /></Suspense>} /></Route>
    <Route path="admin" element={<RequireAdmin />}><Route element={<Suspense fallback={loading}><AdminLayout /></Suspense>}><Route index element={<Suspense fallback={loading}><AdminDashboardPage /></Suspense>} /><Route path="users" element={<Suspense fallback={loading}><AdminUsersPage /></Suspense>} /><Route path="providers" element={<Suspense fallback={loading}><AdminReviewQueuePage /></Suspense>} /><Route path="providers/:id" element={<Suspense fallback={loading}><AdminProviderReviewPage /></Suspense>} /><Route path="categories" element={<Suspense fallback={loading}><AdminCategoriesPage /></Suspense>} /></Route></Route>
    <Route path="*" element={<NotFoundPage />} />
  </Route></Routes>
}
