export const dragNdrop = () => {
  cy.getByTestId('MainPage.AddressList.FirstAddress')
    .as('firstItem')
    .focus()
    .trigger('keydown', { keyCode: 32 })

    .get('@firstItem')
    .trigger('keydown', { keyCode: 40, force: true })

    .wait(0.2 * 1000)
    .trigger('keydown', { keyCode: 32, force: true })
}

declare global {
  namespace Cypress {
    interface Chainable {
      dragNdrop(): Chainable<void>
    }
  }
}
