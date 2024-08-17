import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { createReduxStore } from '../config/store'
import { IStateSchema } from '../config/StateSchema'

interface IStoreProviderProps {
  initialState?: Partial<IStateSchema>
  children: ReactNode
}

export const StoreProvider = ({
  children,
  initialState = {},
}: IStoreProviderProps) => {
  const store = createReduxStore(initialState as IStateSchema)
  return <Provider store={store}>{children}</Provider>
}
