import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkConfig } from '@/providers/StoreProvider'

export const deleteTodoTh = createAsyncThunk<
  number,
  number,
  IThunkConfig<string>
>('todoListsSlice/deleteTodoTh', async (id, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI
  try {
    await extra.api.delete(`/lists/${id}`)

    return id
  } catch (e) {
    return rejectWithValue('delete todolist error')
  }
})
