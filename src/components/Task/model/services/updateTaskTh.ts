import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkConfig } from '@/providers/StoreProvider'
import { ITask } from '../types/types'

interface IParams {
  taskId: number
  data: Partial<ITask>
}

export const updateTaskTh = createAsyncThunk<
  ITask,
  IParams,
  IThunkConfig<string>
>('tasksListsSlice/updateTaskTh', async ({ taskId, data }, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI
  try {
    const res = await extra.api.patch<ITask>(`/tasks/${taskId}`, data)
    if (!res.data) {
      throw new Error()
    }
    return res.data
  } catch (e) {
    return rejectWithValue('update task error')
  }
})
