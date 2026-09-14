import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Users } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'

export function MoriCarContactPage() {
  const [sent, setSent] = useState(false)
  const submit = (event: FormEvent) => { event.preventDefault(); setSent(true) }
  return <div className="mc-page">
    <section className="mc-page-hero mc-page-hero--contact"><div className="mc-shell"><p className="mc-eyebrow">Contact us</p><h1>Let's Drive<br /><em>Forward Together</em></h1><p>Have a question, need support or want to collaborate? We are here to help.</p><div className="mc-inline-trust"><span><Clock /> Quick response</span><span><ShieldCheck /> Real people</span><span><Users /> Here for everyone</span></div></div></section>
    <section className="mc-shell mc-contact-grid">
      <form className="mc-contact-form" onSubmit={submit}><p className="mc-eyebrow">Tell us how we can help</p><h2>Send us a message</h2>{sent ? <div className="mc-success"><ShieldCheck /><h3>Message ready</h3><p>Thanks for reaching out. Our team will get back to you shortly.</p></div> : <><div className="mc-filter-pair"><label>Your name<input required placeholder="John Doe" /></label><label>Phone number<input required placeholder="+230 5..." /></label></div><div className="mc-filter-pair"><label>Email<input type="email" required placeholder="you@example.com" /></label><label>Subject<select><option>General question</option><option>Listing support</option><option>Business enquiry</option><option>Report content</option></select></label></div><label>Your message<textarea required rows={7} placeholder="Tell us how we can help..." /></label><button className="mc-button" type="submit"><MessageCircle /> Send message</button></>}</form>
      <aside className="mc-contact-aside"><div><p className="mc-eyebrow">Reach us directly</p><h2>Contact information</h2><a href="tel:+23057079335"><Phone /><span><b>Phone</b>+230 5707 9335</span></a><a href="mailto:hello@moricar.duckdns.org"><Mail /><span><b>Email</b>hello@moricar.duckdns.org</span></a><p><MapPin /><span><b>Office</b>Moka, Mauritius</span></p></div><div className="mc-map mc-map--large"><MapPin /><span>MoriCar<br />Moka, Mauritius</span></div><div><h3>Still need help?</h3><p>Visit our Help Centre for guides on buying, listing and more.</p><Link to="/contact">Visit Help Centre <ArrowRight /></Link></div></aside>
    </section>
  </div>
}
