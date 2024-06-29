import { RouteProps } from 'react-router-dom'
export type TRouteConfig = RouteProps & {
  authOnly?: boolean
}
