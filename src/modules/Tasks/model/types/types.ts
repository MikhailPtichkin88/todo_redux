import { ITask } from '@/components/Task'
import { EntityState } from '@reduxjs/toolkit'

export interface ITasksSchema extends EntityState<ITask, number> {
  isLoading: boolean
  error: string | undefined
}
