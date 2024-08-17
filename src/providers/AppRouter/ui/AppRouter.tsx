import { Suspense, useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'
import { RequireAuth } from './components/RequireAuth'
import type { TRouteConfig } from '@/shared/types/types'
import { routesConfig } from '@/shared/config/router/routesConfig'
import { useSelector } from 'react-redux'
import { getIsInited } from '@/modules/HeaderAppBar'

export const AppRouter = () => {
  const isInited = useSelector(getIsInited)

  const renderWithWrapper = useCallback(
    (route: TRouteConfig) => {
      const element = (
        <Suspense fallback={'Loading...'}>{route.element}</Suspense>
      )
      return (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.authOnly ? (
              <RequireAuth isAuthorized={isInited}>{element}</RequireAuth>
            ) : (
              element
            )
          }
        />
      )
    },
    [isInited]
  )

  return <Routes>{Object.values(routesConfig).map(renderWithWrapper)}</Routes>
}
