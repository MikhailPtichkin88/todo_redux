import { IAuthSchema } from '../types/types'
import { authSliceActions, authSliceReducer } from './authSlice'

const initialUserData = { id: '1', email: 'test', username: 'test_user' }

describe('authSlice.test', () => {
  test('logout', () => {
    const state: IAuthSchema = {
      isInited: true,
      user: { id: '1', email: 'test' },
    }
    expect(authSliceReducer(state, authSliceActions.logout())).toEqual({
      isInited: false,
      user: undefined,
    })
  })

  test('updateUserDate', () => {
    const state: IAuthSchema = {
      isInited: true,
      user: initialUserData,
    }
    expect(
      authSliceReducer(
        state,
        authSliceActions.updateUserData({
          email: 'test_1',
          username: 'test_user_1',
        })
      )
    ).toEqual({
      isInited: true,
      user: {
        id: '1',
        email: 'test_1',
        username: 'test_user_1',
      },
    })
  })

  test('should work with empty state', () => {
    expect(
      authSliceReducer(
        undefined,
        authSliceActions.updateUserData(initialUserData)
      )
    ).toEqual({
      isInited: true,
      user: initialUserData,
    })
  })
})
