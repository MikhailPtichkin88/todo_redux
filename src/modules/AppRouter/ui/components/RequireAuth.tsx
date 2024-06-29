import { Navigate, useLocation } from 'react-router-dom'
import { AppRoutesPaths } from '@/shared/config/router/routesConfig'

interface IRequireAuthProps {
  children: JSX.Element
  isAuthorized?: boolean
}

export const RequireAuth = ({ children, isAuthorized }: IRequireAuthProps) => {
  const location = useLocation()

  if (!isAuthorized) {
    return (
      <Navigate to={AppRoutesPaths.login} state={{ from: location }} replace />
    )
  }
  return children
}
