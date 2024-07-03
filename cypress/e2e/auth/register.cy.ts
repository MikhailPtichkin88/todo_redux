describe('Login flow', () => {
  const email = 'test_user@mail.ru'
  const password = '123456'

  it('should register new user, check response data, logout and delete user', () => {
    let userId

    cy.intercept(
      {
        method: 'POST',
        url: '/user',
      },
      (req) => {
        delete req.headers['if-none-match']
      }
    ).as('register')

    cy.intercept(
      {
        method: 'DELETE',
        url: '/user',
      },
      (req) => {
        delete req.headers['if-none-match']
      }
    ).as('delete')

    cy.visit('/login')
    cy.enterAuthData(email, password)
    cy.getByTestId('RegisterBtn').click()

    cy.wait('@register').then(({ response: { body } }) => {
      userId = body.id

      expect(body).to.deep.equal({
        id: userId,
        email,
        password,
      })

      cy.getByTestId('MainPage').should('exist')
      cy.getByTestId('UserName').should('contain.text', email)

      cy.getByTestId('LogoutBtn').click()
      cy.getByTestId('LoginPage').should('exist')

      if (userId) {
        cy.deleteUser(userId)
      }
    })
  })
})
