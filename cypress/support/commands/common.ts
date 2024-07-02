import { IUserData } from '../../../src/modules/HeaderAppBar'
import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage'
import { selectByTestId } from '../../helpers/selectByTestId'

export const enterAuthData = (email: string, password: string) => {
  cy.getByTestId('LoginForm.emailInput').clear().type(email)
  cy.getByTestId('LoginForm.passwordInput').clear().type(password)
}

export const login = (email = 'user1@mail.ru', password = '123456') => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:8002/login',
    body: {
      email,
      password,
    },
  }).then(({ body }) => {
    window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body))
    return body
  })
}

export const getByTestId = (testId: string) => {
  return cy.get(selectByTestId(testId))
}

declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable<IUserData>
      enterAuthData(email?: string, password?: string): Chainable<IUserData>
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>
    }
  }
}
