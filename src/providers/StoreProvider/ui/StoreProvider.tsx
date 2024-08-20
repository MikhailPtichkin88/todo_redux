import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { createReduxStore } from '../config/store'
import { IStateSchema } from '../config/StateSchema'
import { DeepPartial } from '@/shared/types/types'
import { ReducersMapObject } from '@reduxjs/toolkit'

interface IStoreProviderProps {
  initialState?: DeepPartial<IStateSchema>
  asyncReducers?: DeepPartial<ReducersMapObject>
  children: ReactNode
}

export const StoreProvider = ({
  children,
  asyncReducers,
  initialState = {},
}: IStoreProviderProps) => {
  const store = createReduxStore(
    initialState as IStateSchema,
    asyncReducers as ReducersMapObject<IStateSchema>
  )
  return <Provider store={store}>{children}</Provider>
}
