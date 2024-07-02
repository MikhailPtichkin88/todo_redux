import { act, renderHook } from '@testing-library/react'

import { IUserData } from '@/modules/HeaderAppBar'
import { deleteMockLocalStorage } from '@/shared/tests/localStorageMock'
import { useProfileStore } from './useProfileStore'

const mockUserData: IUserData = {
  id: '1',
  email: 'example@mail.ru',
  username: 'Alex',
  avatar: '',
}

describe('useUserStore', () => {
  afterEach(() => deleteMockLocalStorage())

  it('should initialize with empty profile', () => {
    const { result } = renderHook(() => useProfileStore())
    expect(result.current.profile.email).toBe('')
  })

  it('should correctly set data from auth store to profile store', () => {
    const { result } = renderHook(() => useProfileStore())

    act(() => {
      result.current.setProfileData(mockUserData)
    })
    expect(result.current.profile.username).toBe('Alex')
    expect(result.current.profile.email).toBe('example@mail.ru')
  })

  it('should correctly reset profile data', () => {
    const { result } = renderHook(() => useProfileStore())

    act(() => {
      result.current.resetProfileData()
    })
    expect(result.current.profile.username).toBe('')
    expect(result.current.profile.email).toBe('')
  })
})
