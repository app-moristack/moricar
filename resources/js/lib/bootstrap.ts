export type BootstrapPayload = {
  appName: string
  supportEmail: string
  supportWhatsapp: string | null
  defaultRadiusKm: number
  maxRadiusKm: number
  radiusOptionsKm: number[]
  providerTypes: { value: string; label: string }[]
  whatsappTemplate: string
}

const FALLBACK: BootstrapPayload = {
  appName: 'MoriCar',
  supportEmail: 'hello@moricar.duckdns.org',
  supportWhatsapp: '+23057079335',
  defaultRadiusKm: 10,
  maxRadiusKm: 50,
  radiusOptionsKm: [2, 5, 10, 20, 30, 50],
  providerTypes: [
    { value: 'individual', label: 'Individual / Self-employed' },
    { value: 'agency', label: 'Showroom, Garage or Agency' },
  ],
  whatsappTemplate: 'Hello, I found your listing on :app. I would like to know more about :service.',
}

declare global {
  interface Window {
    __MORICAR__?: Partial<BootstrapPayload>
  }
}

export const bootstrap: BootstrapPayload = {
  ...FALLBACK,
  ...(typeof window === 'undefined' ? {} : (window.__MORICAR__ ?? {})),
}
