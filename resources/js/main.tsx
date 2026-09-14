import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { MoriCarApp } from './MoriCarApp'
import { AppProviders } from './providers/AppProviders'
import '../css/moricar.css'

const container = document.getElementById('app')

document.documentElement.classList.add('dark')
document.documentElement.style.colorScheme = 'dark'

if (!container) {
  throw new Error('MoriCar could not find its mount element.')
}

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <AppProviders>
        <MoriCarApp />
      </AppProviders>
    </BrowserRouter>
  </StrictMode>,
)
