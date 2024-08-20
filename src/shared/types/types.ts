import {
  IStateSchema,
  TStateSchemaKey,
} from '@/providers/StoreProvider/config/StateSchema'
import { Reducer } from '@reduxjs/toolkit'
import { RouteProps } from 'react-router-dom'
export type TRouteConfig = RouteProps & {
  authOnly?: boolean
}

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

export type TReducersList = {
  [name in TStateSchemaKey]?: Reducer<NonNullable<IStateSchema[name]>>
}

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//  export type TOptionalRecord<K extends keyof any, T> = {
//     [P in K]?: T
//   }
