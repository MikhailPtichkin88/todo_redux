import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { ErrorBoundary } from './providers/ErrorBoundary'
import './index.css'
import { Toaster } from 'sonner'
import { StoreProvider } from './providers/StoreProvider'

const root = document.getElementById('root')
if (!root) {
  throw new Error('root not found')
}

const container = createRoot(root)
container.render(
  <BrowserRouter>
    <ErrorBoundary>
      <StoreProvider>
        <App />
        <Toaster />
      </StoreProvider>
    </ErrorBoundary>
  </BrowserRouter>
)
