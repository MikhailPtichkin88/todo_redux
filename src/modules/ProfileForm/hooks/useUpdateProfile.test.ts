import { IUserData } from '@/modules/HeaderAppBar'
import nock from 'nock'
import { act, renderHook, waitFor } from '@testing-library/react'
import { TestProvider } from '@/shared/tests/componentRender'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { useUpdateProfile } from './useUpdateProfile'
import axios from 'axios'

const mockUserData: IUserData = {
  id: '1',
  email: 'example@mail.ru',
  username: 'Alex',
  avatar: '',
}

describe('useUpdateProfile', () => {
  beforeAll(() => {
    nock(__API__).patch(`/user/1`).reply(200, mockUserData)
  })

  afterEach(() => {
    jest.restoreAllMocks()
    localStorage.removeItem(USER_LOCALSTORAGE_KEY)
  })

  it('update profile should return correct data and set it to localStorage', async () => {
    let user = {}

    const {
      result: { current },
    } = renderHook(
      () =>
        useUpdateProfile({
          setUserData: (data) => {
            user = data
          },
          userId: '1',
        }),
      {
        wrapper: ({ children }) =>
          TestProvider({ children, options: { route: '/profile' } }),
      }
    )

    act(() => {
      current.updateProfile({ email: 'mock', password: '', username: 'Hanna' })
    })

    await waitFor(async () => {
      expect(JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY))).toEqual(
        mockUserData
      )
      expect(user).toEqual(mockUserData)
    })
  })

  it('check deleting password from request body if it is empty', async () => {
    const {
      result: { current },
    } = renderHook(
      () =>
        useUpdateProfile({
          setUserData: () => ({}),
          userId: '1',
        }),
      {
        wrapper: ({ children }) =>
          TestProvider({ children, options: { route: '/profile' } }),
      }
    )

    const patchRequest = jest.spyOn(axios, 'patch')
    patchRequest.mockImplementation((_, data) => {
      expect(current.isPending).toBe(true)
      expect(data).not.toHaveProperty('password')
      return Promise.resolve({ data: mockUserData })
    })

    act(() => {
      current.updateProfile({ email: 'mock', password: '', username: 'Hanna' })
    })
  })
})
