import { AxiosInstance } from 'axios'
import { createReduxStore } from './store'
import { IAuthSchema } from '@/modules/HeaderAppBar'
import { IProfileSchema } from '@/modules/ProfileForm'
import { rtkApi } from '@/shared/api/rtkApi'
import {
  Action,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit'
// import { TOptionalRecord } from '@/shared/types/types'

export interface IStateSchema {
  auth: IAuthSchema
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

  //async
  profile?: IProfileSchema
}

export interface IThunkExtraArg {
  api: AxiosInstance
}

export interface IThunkConfig<T> {
  rejectValue: T
  extra: IThunkExtraArg
  state: IStateSchema
}

export type TStateSchemaKey = keyof IStateSchema

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']

// export type TMountedReducers = TOptionalRecord<TStateSchemaKey, boolean>

export interface IReducerManager {
  // getReducerMap: () => ReducersMapObject<IStateSchema>;
  reduce: (state: IStateSchema | undefined, action: Action) => IStateSchema
  add: (key: TStateSchemaKey, reducer: Reducer) => void
  remove: (key: TStateSchemaKey) => void
  // getMountedReducers: () => TMountedReducers
}

export interface IReduxStoreWithManager extends EnhancedStore<IStateSchema> {
  reducerManager: IReducerManager
}
