import { AxiosInstance } from 'axios'
import { createReduxStore } from './store'
import { IAuthSchema } from '@/modules/HeaderAppBar'
import { IProfileSchema } from '@/modules/ProfileForm'
import { rtkApi } from '@/shared/api/rtkApi'
import { Action, EnhancedStore, Reducer } from '@reduxjs/toolkit'

export interface IStateSchema {
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

  //async
  profile?: IProfileSchema
  auth?: IAuthSchema
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

export interface IReducerManager {
  reduce: (state: IStateSchema | undefined, action: Action) => IStateSchema
  add: (key: TStateSchemaKey, reducer: Reducer) => void
  remove: (key: TStateSchemaKey) => void
}

export interface IReduxStoreWithManager extends EnhancedStore<IStateSchema> {
  reducerManager: IReducerManager
}
