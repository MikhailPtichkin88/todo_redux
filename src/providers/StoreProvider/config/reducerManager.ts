import {
  Action,
  combineReducers,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit'
import { IStateSchema, TStateSchemaKey } from './StateSchema'

export function createReducerManager(
  initialReducers: ReducersMapObject<IStateSchema>
) {
  const reducers = { ...initialReducers }

  let combinedReducer = combineReducers(reducers)

  let keysToRemove: TStateSchemaKey[] = []

  return {
    reduce: (state: IStateSchema, action: Action) => {
      if (keysToRemove.length > 0) {
        state = { ...state }
        for (const key of keysToRemove) {
          delete state[key]
        }
        keysToRemove = []
      }
      return combinedReducer(state, action)
    },

    add: (key: TStateSchemaKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return
      }
      reducers[key] = reducer
      combinedReducer = combineReducers(reducers)
    },

    remove: (key: TStateSchemaKey) => {
      if (!key || !reducers[key]) {
        return
      }
      delete reducers[key]
      keysToRemove.push(key)
      combinedReducer = combineReducers(reducers)
    },
  }
}
