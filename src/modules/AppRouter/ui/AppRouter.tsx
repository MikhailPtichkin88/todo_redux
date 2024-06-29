import { Suspense, useCallback } from "react"
import { Route, Routes } from 'react-router-dom'
import { RequireAuth } from "./components/RequireAuth"
import type { TRouteConfig } from "@/shared/types/types"
import { routesConfig } from "@/shared/config/router/routesConfig"
import { useUserStore } from "@/modules/HeaderAppBar/store/useUserStore"


export const AppRouter = () => {
  const {_inited} = useUserStore()

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
            <RequireAuth isAuthorized={_inited}>{element}</RequireAuth>
          ) : (
            element
          )
        }
      />
    )
  }, [_inited])
  
  return <Routes>{Object.values(routesConfig).map(renderWithWrapper)}</Routes>
}
