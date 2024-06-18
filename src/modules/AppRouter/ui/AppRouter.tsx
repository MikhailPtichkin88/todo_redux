import { Suspense, useCallback } from "react"
import { Route, Routes } from 'react-router-dom'
import { RequireAuth } from "./components/RequireAuth"
import type { TRouteConfig } from "@/shared/types/types"
import { useAuthStore } from "../store/useAuthStore"
import { routesConfig } from "@/shared/config/router/routesConfig"


export const AppRouter = () => {
  const {isAuthorized} = useAuthStore()
  const renderWithWrapper = useCallback((route: TRouteConfig) => {
    const element = (
      <Suspense fallback={"Loading..."}>{route.element}</Suspense>
    )
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? (
            <RequireAuth isAuthorized={isAuthorized}>{element}</RequireAuth>
          ) : (
            element
          )
        }
      />
    )
  }, [isAuthorized])
  return <Routes>{Object.values(routesConfig).map(renderWithWrapper)}</Routes>
}
