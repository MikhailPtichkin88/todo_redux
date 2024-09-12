import { IStateSchema } from '@/providers/StoreProvider'
import { getTodoListsSelector } from '../slice/todoListsSlice'

export const getTodoLists = (state: IStateSchema) =>
  getTodoListsSelector.selectAll(state) ?? []
