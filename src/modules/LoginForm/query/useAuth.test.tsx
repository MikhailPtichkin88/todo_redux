import { IUserData } from '@/modules/HeaderAppBar'
import nock from 'nock'
import { act, renderHook, waitFor } from '@testing-library/react'
import { useAuth } from './useAuth'
import { TestProvider } from '@/shared/tests/componentRender'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'

const mockUserData: IUserData = {
  id: '1',
  email: 'example@mail.ru',
  username: 'Alex',
  avatar: '',
}

describe('useAuth', () => {
  beforeAll(() => {
    nock(__API__).post('/login').reply(200, mockUserData)
    nock(__API__).post('/user').reply(200, mockUserData)
  })

  afterEach(() => {
    localStorage.removeItem(USER_LOCALSTORAGE_KEY)
  })

  it('login request should return correct data and set it to localStorage', async () => {
    let user = {}
    const {
      result: { current },
    } = renderHook(
      () =>
        useAuth({
          setUserData: (data) => {
            user = data
          },
          resetForm: () => ({}),
        }),
      {
        wrapper: ({ children }) =>
          TestProvider({ children, options: { route: '/login' } }),
      }
    )

    act(() => {
      current.mutate({
        data: { email: 'mock', password: 'mock' },
        type: 'login',
      })
    })

    await waitFor(async () => {
      expect(JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY))).toEqual(
        mockUserData
      )
      expect(user).toEqual(mockUserData)
    })
  })

  it('register request should return correct data and set it to localStorage', async () => {
    let user = {}
    const {
      result: { current },
    } = renderHook(
      () =>
        useAuth({
          setUserData: (data) => {
            user = data
          },
          resetForm: () => ({}),
        }),
      {
        wrapper: ({ children }) =>
          TestProvider({ children, options: { route: '/register' } }),
      }
    )

    act(() => {
      current.mutate({
        data: { email: 'mock', password: 'mock' },
        type: 'register',
      })
    })

    await waitFor(async () => {
      expect(JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY))).toEqual(
        mockUserData
      )
      expect(user).toEqual(mockUserData)
    })
  })
})
