import { TReducersList } from '@/shared/types/types'
import { FC, ReactNode, useEffect } from 'react'
import { useStore } from 'react-redux'
import {
  IReduxStoreWithManager,
  TStateSchemaKey,
} from '../StoreProvider/config/StateSchema'

interface DynamicModuleLoaderProps {
  reducers: TReducersList
  removeAfterUnmount?: boolean
  children: ReactNode
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
  const { children, reducers, removeAfterUnmount = true } = props

  const store = useStore() as IReduxStoreWithManager

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]) => {
      store.reducerManager.add(name as TStateSchemaKey, reducer)
    })

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name]) => {
          store.reducerManager.remove(name as TStateSchemaKey)
        })
      }
    }
  }, [])

  return <>{children}</>
}

// const { children, reducers, removeAfterUnmount = true } = props

// const store = useStore() as IReduxStoreWithManager
// const dispatch = useDispatch()
// useEffect(() => {
//   const mountedReducers = store.reducerManager.getMountedReducers()
//   Object.entries(reducers).forEach(([name, reducer]) => {
//     store.reducerManager.add(name as TStateSchemaKey, reducer)
//     const mounted = mountedReducers[name as TStateSchemaKey]
//     // Добавляем новый редьюсер, только если его нет
//     if (!mounted) {
//       store.reducerManager.add(name as TStateSchemaKey, reducer)
//       dispatch({ type: `@INIT ${name} reducer` })
//     }
//   })

//   return () => {
//     if (removeAfterUnmount) {
//       Object.entries(reducers).forEach(([name]) => {
//         store.reducerManager.remove(name as TStateSchemaKey)
//       })
//     }
//   }
// }, [])

// return <>{children}</>
