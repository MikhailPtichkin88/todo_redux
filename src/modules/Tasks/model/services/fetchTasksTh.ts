import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkConfig } from '@/providers/StoreProvider'
import { ITask } from '@/components/Task'

export const fetchTasksTh = createAsyncThunk<
  ITask[],
  undefined,
  IThunkConfig<string>
>('tasksSlice/fetchTasksTh', async (_, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI
  try {
    const res = await extra.api.get<ITask[]>(`/tasks`)
    if (!res.data) {
      throw new Error()
    }
    return res.data
  } catch (e) {
    return rejectWithValue('fetch tasks data error')
  }
})
