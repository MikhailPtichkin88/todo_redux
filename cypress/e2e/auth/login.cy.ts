describe('Login flow', () => {
  const email = 'user1@mail.ru'
  const password = '123456'

  it('should pass to main page and logout back to login page', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '/login',
      },
      (req) => {
        delete req.headers['if-none-match']
      }
    ).as('login')

    cy.visit('/login')
    cy.enterAuthData(email, password)
    cy.getByTestId('LoginBtn').click()

    cy.wait('@login').then((interception) => {
      expect(interception.request.body).to.deep.equal({
        email,
        password,
      })
    })

    cy.getByTestId('MainPage').should('exist')

    cy.getByTestId('LogoutBtn').click()
    cy.getByTestId('LoginPage').should('exist')
  })
})
