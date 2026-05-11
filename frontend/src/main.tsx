import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'

const root = document.getElementById('root')!

createRoot(root).render(
  <StrictMode>
    {/* Animated liquid-glass background blobs */}
    <div className="liquid-bg" />
    <App />
  </StrictMode>,
)
