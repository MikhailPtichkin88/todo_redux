import { $api } from '@/shared/api/api'
import { rtkApi } from '@/shared/api/rtkApi'

import { configureStore, Middleware } from '@reduxjs/toolkit'
import { AppDispatch, IStateSchema, IThunkExtraArg } from './StateSchema'
import { useDispatch } from 'react-redux'
import { authSliceReducer } from '@/modules/HeaderAppBar'
import { profileSliceReducer } from '@/modules/ProfileForm'

const extraArg: IThunkExtraArg = {
  api: $api,
}

export function createReduxStore(initialState?: IStateSchema) {
  return configureStore({
    devTools: __IS_DEV__,
    preloadedState: initialState,
    reducer: {
      auth: authSliceReducer,
      profile: profileSliceReducer,
      [rtkApi.reducerPath]: rtkApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }).concat(rtkApi.middleware),
  })
}

export const useAppDispatch = () => useDispatch<AppDispatch>()
