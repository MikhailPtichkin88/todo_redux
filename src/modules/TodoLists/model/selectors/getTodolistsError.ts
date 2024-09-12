import { IStateSchema } from '@/providers/StoreProvider'

export const getTodoListsError = (state: IStateSchema) => state.todos?.error
