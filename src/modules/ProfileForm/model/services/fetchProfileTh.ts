import { createAsyncThunk } from '@reduxjs/toolkit'
import { IProfileData } from '../types/types'
import { IThunkConfig } from '@/providers/StoreProvider'

interface IParams {
  userId: string
  resetFormData: (data: Partial<IProfileData>) => void
}

export const fetchProfileTh = createAsyncThunk<
  IProfileData,
  IParams,
  IThunkConfig<string>
>(
  'profileSlice/fetchProfileTh',
  async ({ userId, resetFormData }, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI
    try {
      const res = await extra.api.get<IProfileData>(`/user/${userId}`)
      if (!res.data) {
        throw new Error()
      }
      resetFormData(res.data)
      return res.data
    } catch (e) {
      return rejectWithValue('fetch profile data error')
    }
  }
)
