/* eslint-disable @typescript-eslint/no-var-requires */
import { authSliceActions, IUser } from '@/modules/HeaderAppBar'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { componentRender } from '@/shared/tests/componentRender'
import { waitFor } from '@testing-library/react'
import nock from 'nock'
import { LoginForm } from './LoginForm'

import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const mockUserData: IUser = {
  id: '1',
  email: 'example@mail.ru',
  username: 'Alex',
  avatar: '',
}

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

describe('useAuth', () => {
  beforeAll(() => {
    nock(__API__).post('/login').reply(200, mockUserData)
    nock(__API__).post('/user').reply(200, mockUserData)
  })

  afterEach(() => {
    localStorage.removeItem(USER_LOCALSTORAGE_KEY)
  })

  it('login request should return correct data and set it to localStorage', async () => {
    componentRender(<LoginForm />, {
      route: '/login',
      initialState: { auth: { isInited: false, user: undefined } },
    })

    expect(screen.getByTestId('LoginBtn')).toBeInTheDocument()

    await userEvent.type(
      screen.getByTestId('LoginForm.emailInput'),
      'test@mail.ru'
    )
    await userEvent.type(
      screen.getByTestId('LoginForm.passwordInput'),
      '123456'
    )

    await userEvent.click(screen.getByTestId('LoginBtn'))

    await waitFor(async () => {
      expect(JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY))).toEqual(
        mockUserData
      )
    })
  })

  it('register request should return correct data and set it to localStorage', async () => {
    const mockDispatch = jest.fn()
    jest
      .spyOn(require('@/providers/StoreProvider'), 'useAppDispatch')
      .mockReturnValue(mockDispatch)
    const mockNavigate = jest.fn()
    ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)

    componentRender(<LoginForm />, {
      route: '/login',
      initialState: { auth: { isInited: false, user: undefined } },
    })

    expect(screen.getByTestId('RegisterBtn')).toBeInTheDocument()

    const spyToast = jest.spyOn(toast, 'success')
    await userEvent.type(
      screen.getByTestId('LoginForm.emailInput'),
      'test@mail.ru'
    )
    await userEvent.type(
      screen.getByTestId('LoginForm.passwordInput'),
      '123456'
    )

    await userEvent.click(screen.getByTestId('RegisterBtn'))

    await waitFor(async () => {
      expect(JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY))).toEqual(
        mockUserData
      )
      expect(spyToast).toHaveBeenCalled()
      expect(mockDispatch).toHaveBeenCalled()
      expect(mockDispatch).toHaveBeenCalledWith(
        authSliceActions.updateUserData(mockUserData)
      )
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

  it('should show an error message when login fails', async () => {
    const mockError = { message: 'Invalid email or password' }
    nock(__API__).post('/login').reply(400, mockError)

    componentRender(<LoginForm />, {
      route: '/login',
      initialState: { auth: { isInited: false, user: undefined } },
    })
    const spyToast = jest.spyOn(toast, 'error')
    await userEvent.type(
      screen.getByTestId('LoginForm.emailInput'),
      'test@invalid.com'
    )
    await userEvent.type(
      screen.getByTestId('LoginForm.passwordInput'),
      'wrongpassword'
    )
    await userEvent.click(screen.getByTestId('LoginBtn'))

    await waitFor(() => {
      expect(spyToast).toHaveBeenCalled()
    })
  })
})
