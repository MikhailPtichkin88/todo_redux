import { componentRender } from '@/shared/tests/componentRender'
import { AppRouter } from './AppRouter'
import '@testing-library/jest-dom'
import { act, renderHook, screen, waitFor } from '@testing-library/react'
import { AppRoutesPaths } from '@/shared/config/router/routesConfig'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { useUserStore } from '@/modules/HeaderAppBar'

describe('AppRouter', () => {
  afterAll(() => {
    localStorage.removeItem(USER_LOCALSTORAGE_KEY)
  })

  test('page should render', async () => {
    componentRender(<AppRouter />, { route: AppRoutesPaths.login })
    const page = await screen.findByTestId('LoginPage')
    expect(page).toBeInTheDocument()
  })

  test('not found page', async () => {
    componentRender(<AppRouter />, { route: '/skjasjk' })
    const page = await screen.findByTestId('NotFoundPage')
    expect(page).toBeInTheDocument()
  })

  test('redirect unauthorized user to login page', async () => {
    componentRender(<AppRouter />, { route: AppRoutesPaths.main })
    let page
    await waitFor(async () => {
      page = await screen.findByTestId('LoginPage')
    })
    expect(page).toBeInTheDocument()
  })

  test('redirect authorized user to main page', async () => {
    const { result } = renderHook(() => useUserStore())
    act(() => {
      localStorage.setItem(
        USER_LOCALSTORAGE_KEY,
        JSON.stringify({ id: '1', email: 'example@mail.ru' })
      )
      result.current.mockMeRequest()
    })

    componentRender(<AppRouter />, {
      route: AppRoutesPaths.login,
    })

    let page
    await waitFor(
      async () => {
        page = await screen.findByTestId('MainPage')
        expect(page).toBeInTheDocument()
      },
      { timeout: 4000 }
    )
  })
})
