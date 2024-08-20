import { IProfileSchema } from '../types/types'
import { profileSliceActions, profileSliceReducer } from './profileSlice'

const initialUserData = { id: '1', email: 'test', username: 'test_user' }

describe('profileSlice.test', () => {
  test('updateProfileData', () => {
    const state: IProfileSchema = {
      isLoading: false,
      profile: initialUserData,
    }
    const updatedUserData = { email: 'test_1', username: 'test_user_1' }

    expect(
      profileSliceReducer(
        state,
        profileSliceActions.updateProfileDate(updatedUserData)
      )
    ).toEqual({
      isLoading: false,
      profile: {
        id: '1',
        email: 'test_1',
        username: 'test_user_1',
      },
    })
  })
})
