import { IStateSchema } from '@/providers/StoreProvider'

export const getTodoListsIsLoading = (state: IStateSchema) =>
  state.todos?.isLoading ?? false
