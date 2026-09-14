import { ArrowLeft, BarChart3, CarFront, Eye, LockKeyhole, Mail, ShieldCheck, Wrench } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth, describeAuthError } from '@/hooks/useAuth'
import { MoriCarBrand } from '@/components/layout/MoriCarBrand'

export function MoriCarLoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setError('')
    const data = new FormData(event.currentTarget)
    try { await login({ identifier: String(data.get('email')), password: String(data.get('password')), remember: data.get('remember') === 'on' }); navigate('/dashboard') }
    catch (reason) { setError(describeAuthError(reason)) } finally { setBusy(false) }
  }
  return <div className="mc-login-page">
    <div className="mc-login-bg" />
    <header><MoriCarBrand /><Link to="/"><ArrowLeft /> Back to Home</Link></header>
    <div className="mc-login-copy"><p className="mc-eyebrow">Welcome back</p><h1>Drive<br />More<br /><em>Together.</em></h1><p>Sign in to manage your cars, services and grow your automotive business in Mauritius.</p></div>
    <form className="mc-login-card" onSubmit={submit}><MoriCarBrand /><p className="mc-eyebrow">Your MoriCar account</p><h2>Sign in</h2><p>Enter your details to access your account.</p>{error && <div className="mc-form-error">{error}</div>}<label>Email address<div className="mc-input-icon"><Mail /><input name="email" type="email" required /></div></label><label>Password<div className="mc-input-icon"><LockKeyhole /><input name="password" type={show ? 'text' : 'password'} required /><button type="button" onClick={() => setShow(!show)} aria-label="Show password"><Eye /></button></div></label><div className="mc-remember"><label><input name="remember" type="checkbox" /> Remember me</label><Link to="/reset-password">Forgot password?</Link></div><button className="mc-button" disabled={busy}>{busy ? 'Signing in...' : 'Sign in'}</button><span className="mc-or">or</span><p>Don't have an account?</p><Link className="mc-button mc-button--outline" to="/for-sellers">Create an account</Link><small><ShieldCheck /> Your data is secure with us</small></form>
    <div className="mc-login-benefits"><span><CarFront /> Manage your listings</span><span><Wrench /> Update your services</span><span><BarChart3 /> Track your enquiries</span></div>
  </div>
}
