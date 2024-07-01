import { renderHook, act } from '@testing-library/react'
import { IUserData, useUserStore } from './useUserStore'
import {
  createMockLocalStorage,
  deleteMockLocalStorage,
} from '@/shared/tests/localStorageMock'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'

const mockUserData: IUserData = {
  id: '1',
  email: 'example@mail.ru',
  username: 'Alex',
  avatar: '',
}

describe('useUserStore', () => {
  afterEach(() => deleteMockLocalStorage())

  it('should initialize with _inited = false', () => {
    const { result } = renderHook(() => useUserStore())
    expect(result.current._inited).toBe(false)
  })

  it('should init when "me" request has passed', () => {
    createMockLocalStorage({ key: USER_LOCALSTORAGE_KEY, value: mockUserData })

    const { result } = renderHook(() => useUserStore())

    act(() => {
      result.current.mockMeRequest()
    })
    expect(result.current._inited).toBe(true)
    expect(result.current.user.email).toBe('example@mail.ru')
  })

  it('should correctly set user data', () => {
    const { result } = renderHook(() => useUserStore())

    act(() => {
      result.current.setUserData(mockUserData)
    })
    expect(result.current.user.username).toBe('Alex')
    expect(result.current.user.email).toBe('example@mail.ru')
  })

  it('should init when "me" request has passed', () => {
    createMockLocalStorage({ key: USER_LOCALSTORAGE_KEY, value: mockUserData })

    const { result } = renderHook(() => useUserStore())

    act(() => {
      result.current.mockMeRequest()
    })
    expect(result.current._inited).toBe(true)
    expect(result.current.user.email).toBe('example@mail.ru')
  })

  it('should correctly logout', () => {
    createMockLocalStorage({ key: USER_LOCALSTORAGE_KEY, value: mockUserData })

    const { result } = renderHook(() => useUserStore())

    act(() => {
      result.current.logout()
    })
    expect(result.current._inited).toBe(false)
    expect(result.current.user.email).toBe(undefined)
  })
})
