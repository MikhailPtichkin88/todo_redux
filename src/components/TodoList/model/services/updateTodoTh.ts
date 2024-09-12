import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkConfig } from '@/providers/StoreProvider'
import { ITodo } from '../types/types'

interface IParams {
  todoId: number
  data: Partial<ITodo>
}

export const updateTodoTh = createAsyncThunk<
  ITodo,
  IParams,
  IThunkConfig<string>
>('todoListsSlice/updateTodoTh', async ({ todoId, data }, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI
  try {
    const res = await extra.api.patch<ITodo>(`/lists/${todoId}`, data)
    if (!res.data) {
      throw new Error()
    }
    return res.data
  } catch (e) {
    return rejectWithValue('update todolist error')
  }
})
