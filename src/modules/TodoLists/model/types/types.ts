import { ITodo } from '@/components/TodoList'
import { EntityState } from '@reduxjs/toolkit'

export interface ITodoListsSchema extends EntityState<ITodo, number> {
  isLoading: boolean
  error: string | undefined
}
