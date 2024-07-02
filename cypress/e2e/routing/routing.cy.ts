import { selectByTestId } from '../../helpers/selectByTestId'

describe('Routing: not authorized', () => {
  it('should redirect to login page', () => {
    cy.visit('/profile')
    cy.get(selectByTestId('LoginPage')).should('exist')
  })
  it('redirect to not found page', () => {
    cy.visit('/sdfsfegt3')
    cy.get(selectByTestId('NotFoundPage')).should('exist')
  })
})

describe('Routing: authorized', () => {
  beforeEach(() => {
    cy.login()
  })

  it('checks auth pages navigation', () => {
    cy.visit('/')
    cy.get(selectByTestId('MainPage')).should('exist')

    cy.get(selectByTestId('ProfileAvatar')).click()
    cy.get(selectByTestId('ProfilePage')).should('exist')

    cy.get(selectByTestId('LogoLink')).click()
    cy.get(selectByTestId('MainPage')).should('exist')
  })
})
