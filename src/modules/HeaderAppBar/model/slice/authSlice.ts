import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAuthSchema, IUser } from '../types/types'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'

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
    updateUserDate: (state, action: PayloadAction<Partial<IUser>>) => {
      localStorage.setItem(
        USER_LOCALSTORAGE_KEY,
        JSON.stringify({ ...state.user, ...action.payload })
      )
      state.isInited = true
      state.user = { ...state.user, ...action.payload }
    },
    mockMeRequest: (state) => {
      const data = localStorage.getItem(USER_LOCALSTORAGE_KEY)
      if (data) {
        state.user = { ...state.user, ...JSON.parse(data) }
        state.isInited = true
      }
    },
  },
})
export const { actions: authSliceActions } = authSlice
export const { reducer: authSliceReducer } = authSlice
