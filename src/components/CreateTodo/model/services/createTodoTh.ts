import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkConfig } from '@/providers/StoreProvider'
import { ITodo } from '@/components/TodoList'

export const createTodoTh = createAsyncThunk<
  ITodo,
  string,
  IThunkConfig<string>
>('todoListsSlice/createTodoTh', async (name, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI
  const data: Omit<ITodo, 'id'> = {
    name,
    taskIds: [],
    completed: false,
  }
  try {
    const res = await extra.api.post<ITodo>(`/lists`, data)
    if (!res.data) {
      throw new Error()
    }
    return res.data
  } catch (e) {
    return rejectWithValue('create todo data error')
  }
})
