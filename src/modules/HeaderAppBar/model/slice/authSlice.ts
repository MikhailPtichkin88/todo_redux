import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAuthSchema, IUser } from '../types/types'

const initialState: IAuthSchema = {
  isInited: false,
  user: undefined,
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logout: (state) => {
      state.isInited = false
      state.user = undefined
    },
    updateUserData: (state, action: PayloadAction<Partial<IUser>>) => {
      state.isInited = true
      state.user = { ...state.user, ...action.payload }
    },
  },
})
export const { actions: authSliceActions } = authSlice
export const { reducer: authSliceReducer } = authSlice
