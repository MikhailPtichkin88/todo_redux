import { selectByTestId } from '../../helpers/selectByTestId'

describe('Profile page', () => {
  const email = 'test_profile@mail.ru'
  const password = '123456'

  afterEach(() => {
    cy.logout()
  })

  it('should show pre filled input fields with correct data', () => {
    cy.intercept(
      {
        method: 'POST',
        url: 'http://localhost:8002/login',
      },
      (req) => {
        delete req.headers['if-none-match']
      }
    ).as('login')
    let responseData

    cy.visit('/login')
    cy.enterAuthData(email, password)
    cy.getByTestId('LoginBtn').click()

    cy.wait('@login').then((interception) => {
      responseData = interception.response.body
      expect(interception.response.body.email).to.eql(email)

      cy.get(selectByTestId('ProfileAvatar')).click()
      cy.get(selectByTestId('ProfilePage')).should('exist')

      cy.getByTestId('ProfilePage.emailInput').should(
        'have.value',
        responseData.email
      )
      cy.getByTestId('ProfilePage.nameInput').should(
        'have.value',
        responseData.username
      )
      cy.getByTestId('ProfilePage.avatarInput').should(
        'have.value',
        responseData.avatar
      )

      cy.getByTestId('UserName').should('contain.text', responseData.username)
      cy.getByTestId('ProfileAvatar').within(() => {
        cy.get('img')
          .should('have.attr', 'src')
          .should('eql', responseData.avatar)
      })
    })
  })
})
