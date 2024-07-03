import { IUserData } from '../../../src/modules/HeaderAppBar'

export const enterProfileData = ({
  email,
  password,
  avatar,
  username,
}: Omit<IUserData, 'id'>) => {
  cy.getByTestId('ProfilePage.emailInput').clear().type(email)
  cy.getByTestId('ProfilePage.passwordInput').clear().type(password)
  cy.getByTestId('ProfilePage.avatarInput').clear().type(avatar)
  cy.getByTestId('ProfilePage.nameInput').clear().type(username)
}

export const updateUser = ({
  id,
  data,
}: {
  id: string
  data: Omit<IUserData, 'id'>
}) => {
  cy.request({
    method: 'PATCH',
    url: `http://localhost:8002/user/${id}`,
    body: data,
    headers: { Authorization: 'random_text' },
  }).then((res) => res)
}

declare global {
  namespace Cypress {
    interface Chainable {
      enterProfileData(data: Omit<IUserData, 'id'>): Chainable<void>
      updateUser(data: {
        id: string
        data: Omit<IUserData, 'id'>
      }): Chainable<IUserData>
    }
  }
}
