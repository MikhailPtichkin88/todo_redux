import axios from 'axios'
import { IProfileData } from '../../types/types'
import { Dispatch } from '@reduxjs/toolkit'
import { IStateSchema } from '@/providers/StoreProvider'
import { fetchProfileTh } from './fetchProfileTh'

jest.mock('axios')

const mockedAxios = jest.mocked(axios)

const mockProfileData: IProfileData = {
  email: 'example@mail.ru',
  username: 'Alex',
  avatar: '',
}

describe('fetchProfileTh', () => {
  let dispatch: Dispatch
  let getState: () => IStateSchema
  let resetFormData: () => void

  beforeEach(() => {
    dispatch = jest.fn()
    getState = jest.fn()
    resetFormData = jest.fn()
  })

  test('should return correct value and reset form when fulfilled', async () => {
    mockedAxios.get.mockReturnValue(Promise.resolve({ data: mockProfileData }))
    const action = fetchProfileTh({ userId: '1', resetFormData })
    const result = await action(dispatch, getState, { api: mockedAxios })

    expect(resetFormData).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(mockProfileData)
  })

  test('should return error when rejected', async () => {
    mockedAxios.get.mockReturnValue(Promise.reject({ status: 404 }))
    const action = fetchProfileTh({ userId: '1', resetFormData })
    const result = await action(dispatch, getState, { api: mockedAxios })

    expect(resetFormData).not.toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('rejected')
  })
})
