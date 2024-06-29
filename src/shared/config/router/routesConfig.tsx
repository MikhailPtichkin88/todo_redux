import { LoginPage } from "@/pages/Login"
import { MainPage } from "@/pages/Main"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { ProfilePage } from "@/pages/ProfilePage"
import type { TRouteConfig } from "@/shared/types/types"


export enum AppRoutes {
  MAIN = "main",
  LOGIN = "login",
  PROFILE  = "profile",
  NOT_FOUND = 'not_found',
}

export const AppRoutesPaths: Record<AppRoutes, string>= {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.PROFILE]: "/profile",
  [AppRoutes.NOT_FOUND]: '*',
}

export const routesConfig: Record<AppRoutes, TRouteConfig> = {
  [AppRoutes.MAIN]: {
    path: AppRoutesPaths.main,
    element: <MainPage />,
    authOnly: true
  },
  [AppRoutes.LOGIN]: {
    path: AppRoutesPaths.login,
    element: <LoginPage />
  },
  [AppRoutes.PROFILE]: {
    path: AppRoutesPaths.profile,
    element: <ProfilePage />,
    authOnly: true
  },
  [AppRoutes.NOT_FOUND]: {
    path: AppRoutesPaths.not_found,
    element: <NotFoundPage />
  },
}