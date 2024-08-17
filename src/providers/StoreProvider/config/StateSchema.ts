import { AxiosInstance } from 'axios'
import { createReduxStore } from './store'
import { IAuthSchema } from '@/modules/HeaderAppBar'
import { IProfileSchema } from '@/modules/ProfileForm'

export interface IStateSchema {
  auth: IAuthSchema
  profile: IProfileSchema
}

export interface IThunkExtraArg {
  api: AxiosInstance
}

export interface IThunkConfig<T> {
  rejectValue: T
  extra: IThunkExtraArg
  state: IStateSchema
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
