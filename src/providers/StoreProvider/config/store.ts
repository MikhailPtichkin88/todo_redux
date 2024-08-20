import { $api } from '@/shared/api/api'
import { rtkApi } from '@/shared/api/rtkApi'

import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import {
  AppDispatch,
  IStateSchema,
  IThunkExtraArg,
  IReducerManager,
} from './StateSchema'
import { useDispatch } from 'react-redux'
import { authSliceReducer } from '@/modules/HeaderAppBar'
import { createReducerManager } from './reducerManager'

const extraArg: IThunkExtraArg = {
  api: $api,
}

export function createReduxStore(
  initialState?: IStateSchema,
  asyncReducers?: ReducersMapObject<IStateSchema>
) {
  const rootReducer: ReducersMapObject<IStateSchema> = {
    ...asyncReducers,

    auth: authSliceReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
    // profile: profileSliceReducer,
  }

  const reducerManager: IReducerManager = createReducerManager(rootReducer)

  const store = configureStore({
    devTools: __IS_DEV__,
    preloadedState: initialState,
    reducer: reducerManager.reduce,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }).concat(rtkApi.middleware),
  })

  return {
    ...store,
    reducerManager,
  }
}

export const useAppDispatch = () => useDispatch<AppDispatch>()
