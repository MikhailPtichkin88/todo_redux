import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProfileData, IProfileSchema } from '../types/types'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { toast } from 'sonner'
import { fetchProfileTh } from '../services/fetchProfileTh/fetchProfileTh'
import { updateProfileTh } from '../services/updateProfileTh/updateProfileTh'

const initialState: IProfileSchema = {
  profile: undefined,
  isLoading: false,
}

const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    updateProfileDate: (
      state,
      action: PayloadAction<Partial<IProfileData>>
    ) => {
      state.profile = { ...state.profile, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileTh.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        fetchProfileTh.fulfilled,
        (state, action: PayloadAction<IProfileData>) => {
          state.isLoading = false
          state.profile = action.payload
        }
      )
      .addCase(fetchProfileTh.rejected, (state) => {
        state.profile = undefined
        state.isLoading = false
      })
      .addCase(updateProfileTh.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        updateProfileTh.fulfilled,
        (state, action: PayloadAction<IProfileData>) => {
          const updatedData = { ...state.profile, ...action.payload }
          state.isLoading = false
          state.profile = updatedData
          localStorage.setItem(
            USER_LOCALSTORAGE_KEY,
            JSON.stringify(updatedData)
          )
          toast.success(`Profile successfully updated`)
        }
      )
      .addCase(updateProfileTh.rejected, (state) => {
        state.isLoading = false
      })
  },
})
export const { actions: profileSliceActions } = profileSlice
export const { reducer: profileSliceReducer } = profileSlice
