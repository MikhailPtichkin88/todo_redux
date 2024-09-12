import { createSelector } from '@reduxjs/toolkit'
import { IStateSchema } from '@/providers/StoreProvider'
import { getTasksSelector } from '../slice/tasksSlice'

// Input selectors
const selectTaskIds = (state: IStateSchema, taskIds: number[]) => taskIds
const selectEntities = getTasksSelector.selectEntities

export const getTasksByIds = createSelector(
  [selectTaskIds, selectEntities],
  (taskIds, entities) => {
    return taskIds?.map((id) => entities[id]).filter(Boolean) ?? []
  }
)
