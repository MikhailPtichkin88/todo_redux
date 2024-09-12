import { IStateSchema } from '@/providers/StoreProvider'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { ITasksSchema } from '../types/types'
import { fetchTasksTh } from '../services/fetchTasksTh'
import { deleteTaskTh, ITask, updateTaskTh } from '@/components/Task'
import { createTaskTh } from '@/components/CreateTask'

const taskAdapter = createEntityAdapter<ITask>()

export const getTasksSelector = taskAdapter.getSelectors<IStateSchema>(
  (state) => state.tasks || taskAdapter.getInitialState()
)

const initialState: ITasksSchema = {
  isLoading: false,
  error: undefined,
  ids: [],
  entities: {},
}

const tasksSlice = createSlice({
  name: 'tasksSlice',
  initialState: taskAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder

      // fetch
      .addCase(fetchTasksTh.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchTasksTh.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(fetchTasksTh.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = undefined
        taskAdapter.setMany(state, action.payload)
      })

      // create
      .addCase(createTaskTh.rejected, (state, action) => {
        state.error = action.payload
      })
      .addCase(createTaskTh.fulfilled, (state, action) => {
        state.error = undefined
        taskAdapter.addOne(state, action.payload)
      })

      // update
      .addCase(updateTaskTh.rejected, (state, action) => {
        state.error = action.payload
      })
      .addCase(updateTaskTh.fulfilled, (state, action) => {
        state.error = undefined
        taskAdapter.setOne(state, action.payload)
      })

      // delete
      .addCase(deleteTaskTh.rejected, (state, action) => {
        state.error = action.payload
      })
      .addCase(deleteTaskTh.fulfilled, (state, action) => {
        state.error = undefined
        taskAdapter.removeOne(state, action.payload)
      })
  },
})

export const { actions: tasksAction } = tasksSlice
export const { reducer: tasksReducer } = tasksSlice
