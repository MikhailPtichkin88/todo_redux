import { useEffect } from 'react'
import { AppRouter } from '@/providers/AppRouter'
import {
  authSliceActions,
  getIsInited,
  HeaderAppBar,
} from '@/modules/HeaderAppBar'
import { useSelector } from 'react-redux'
import { useAppDispatch } from './providers/StoreProvider'

export const App = () => {
  const isInited = useSelector(getIsInited)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isInited) {
      dispatch(authSliceActions.mockMeRequest())
    }
  }, [])

  return (
    <div className="app">
      <HeaderAppBar />
      <div className="container">
        <AppRouter />
      </div>
    </div>
  )
}
