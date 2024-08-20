import { componentRender } from '@/shared/tests/componentRender'
import { HeaderAppBar } from './HeaderAppBar'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('HeaderAppBar.test', () => {
  test('should hide elements when not authorized', async () => {
    componentRender(<HeaderAppBar />, {
      route: '/',
      initialState: { auth: { isInited: true, user: { username: 'test' } } },
    })

    expect(screen.getByTestId('LogoutBtn')).toBeInTheDocument()
    expect(screen.getByTestId('UserName')).toHaveTextContent('test')

    await userEvent.click(screen.getByTestId('LogoutBtn'))

    expect(screen.queryByTestId('LogoutBtn')).toBeNull
    expect(screen.queryByTestId('UserName')).toBeNull
  })
})
