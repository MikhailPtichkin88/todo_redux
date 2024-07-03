export const register = (email = 'test@test.ru', password = '12345') => {
  cy.request({
    method: 'POST',
    url: '/user',
    body: {
      email,
      password,
    },
  }).then(({ body }) => {
    return body
  })
}

export const deleteUser = (userId: string) => {
  cy.request({
    method: 'DELETE',
    url: `http://localhost:8002/user/${userId}`,
    headers: { Authorization: 'random_text' },
  }).then((res) => res)
}

declare global {
  namespace Cypress {
    interface Chainable {
      register(email: string, password: string): Chainable<void>
      deleteUser(userId: string): Chainable<void>
    }
  }
}
