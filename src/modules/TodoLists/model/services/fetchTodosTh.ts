import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkConfig } from '@/providers/StoreProvider'
import { ITodo } from '@/components/TodoList'

export const fetchTodosTh = createAsyncThunk<
  ITodo[],
  undefined,
  IThunkConfig<string>
>('todoListsSlice/fetchTodosTh', async (_, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI
  try {
    const res = await extra.api.get<ITodo[]>(`/lists`)
    if (!res.data) {
      throw new Error()
    }
    return res.data
  } catch (e) {
    return rejectWithValue('fetch todos data error')
  }
})
