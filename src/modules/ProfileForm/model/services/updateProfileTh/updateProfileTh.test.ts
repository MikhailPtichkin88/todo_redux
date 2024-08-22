import axios from 'axios'
import { IProfileData } from '../../types/types'
import { Dispatch } from '@reduxjs/toolkit'
import { IStateSchema } from '@/providers/StoreProvider'
import { updateProfileTh } from './updateProfileTh'
import { IThunkExtraArg } from '@/providers/StoreProvider/config/StateSchema'

jest.mock('axios')

const mockedAxios = jest.mocked(axios)

const mockProfileData: IProfileData = {
  email: 'example@mail.ru',
  username: 'Alex',
  avatar: '',
}

describe('updateProfileTh', () => {
  let dispatch: Dispatch
  let getState: () => IStateSchema
  let extra: IThunkExtraArg

  beforeEach(() => {
    dispatch = jest.fn()
    getState = jest.fn()
    extra = { api: mockedAxios }
  })

  test('should return correct value when fulfilled', async () => {
    mockedAxios.patch.mockReturnValue(
      Promise.resolve({ data: mockProfileData })
    )
    const action = updateProfileTh({
      userId: '1',
      data: { username: 'newUsername' },
    })
    const result = await action(dispatch, getState, extra)

    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(mockProfileData)
  })

  test('should return error when rejected', async () => {
    mockedAxios.patch.mockReturnValue(Promise.reject({ status: 404 }))
    const action = updateProfileTh({
      userId: '1',
      data: { username: 'newUsername' },
    })
    const result = await action(dispatch, getState, extra)

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('update profile error')
  })

  test('should throw error when response data is empty', async () => {
    mockedAxios.patch.mockReturnValue(Promise.resolve({ data: null }))
    const action = updateProfileTh({
      userId: '1',
      data: { username: 'newUsername' },
    })
    const result = await action(dispatch, getState, extra)

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('incorrect data')
  })
})
