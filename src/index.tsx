import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { App } from "./App"
import { ErrorBoundary } from "./modules/ErrorBoundary"
import "./index.css"
import { Toaster } from "sonner"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const root = document.getElementById("root")
if (!root) {
  throw new Error("root not found")
}

const queryClient = new QueryClient()

const container = createRoot(root)
container.render(
  <BrowserRouter>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster />
      </QueryClientProvider>
    </ErrorBoundary>
  </BrowserRouter>
)


