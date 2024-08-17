import { createAsyncThunk } from '@reduxjs/toolkit'
import { IProfileData } from '../types/types'
import { IThunkConfig } from '@/providers/StoreProvider'

interface IData {
  userId: string
  data: Partial<IProfileData>
}

export const updateProfileTh = createAsyncThunk<
  IProfileData,
  IData,
  IThunkConfig<string>
>('profileSlice/updateProfileTh', async ({ userId, data }, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI
  try {
    const res = await extra.api.patch<IProfileData>(`/user/${userId}`, data)
    if (!res.data) {
      throw new Error()
    }
    return res.data
  } catch (e) {
    return rejectWithValue('update profile error')
  }
})
