import { useEffect } from 'react'
import { AppRouter } from '@/providers/AppRouter'
import {
  authSliceActions,
  getIsInited,
  HeaderAppBar,
} from '@/modules/HeaderAppBar'
import { useSelector } from 'react-redux'
import { useAppDispatch } from './providers/StoreProvider'
import { USER_LOCALSTORAGE_KEY } from './shared/const/localstorage'

export const App = () => {
  const isInited = useSelector(getIsInited)
  const dispatch = useAppDispatch()

  useEffect(() => {
    // mock "me" request
    if (!isInited) {
      const data = localStorage.getItem(USER_LOCALSTORAGE_KEY)
      if (data) {
        dispatch(authSliceActions.updateUserData(JSON.parse(data)))
      }
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
