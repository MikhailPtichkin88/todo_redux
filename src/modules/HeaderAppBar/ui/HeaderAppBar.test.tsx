import { componentRender } from '@/shared/tests/componentRender'
import '@testing-library/jest-dom'
import { act, renderHook, screen, within } from '@testing-library/react'
import { useUserStore } from '../store/useUserStore'
import { HeaderAppBar } from './HeaderAppBar'

import { AppRouter } from '@/modules/AppRouter'

const mockUserData = {
  id: '1',
  email: 'example@mail.ru',
  avatar: 'http://localhost',
  username: '',
}
describe('HeaderAppBar', () => {
  it('should navigate to profile page for authorized user', async () => {
    const { result } = renderHook(() => useUserStore())

    act(() => {
      result.current.setUserData(mockUserData)
    })

    componentRender(
      <>
        <HeaderAppBar />
        <AppRouter />
      </>
    )

    const logoutBtn = await screen.findByTestId('LogoutBtn')
    expect(logoutBtn).toBeInTheDocument()

    const profileAvatar = await screen.findByTestId('ProfileAvatar')
    expect(profileAvatar).toBeInTheDocument()

    const userName = await screen.findByTestId('UserName')
    expect(userName).toBeInTheDocument()

    const { getByText } = within(userName)
    expect(getByText('example@mail.ru')).toBeInTheDocument()
  })
})
