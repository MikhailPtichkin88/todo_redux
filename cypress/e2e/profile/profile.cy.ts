import { selectByTestId } from '../../helpers/selectByTestId'

const initialUserData = {
  email: 'test_profile@mail.ru',
  password: '123456',
  username: 'Alex',
  avatar: 'https://logowik.com/content/uploads/images/homer-simpson4924.jpg',
}
const updatedData = {
  email: 'test_updated_profile@mail.ru',
  password: '654321',
  username: 'Hanna',
  avatar: 'https://example.com',
}

describe('Profile page', () => {
  const email = 'test_profile@mail.ru'
  const password = '123456'

  afterEach(() => {
    cy.logout()
  })
  after(() => {
    cy.updateUser({ id: '2', data: initialUserData })
  })

  it('should show pre filled input fields with correct data ', () => {
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

  it('should show correct data after update', () => {
    cy.intercept(
      {
        url: '/user/**',
        hostname: 'localhost',
      },
      (req) => {
        delete req.headers['if-none-match']
      }
    ).as('updateProfile')

    cy.visit('/login')
    cy.enterAuthData(email, password)
    cy.getByTestId('LoginBtn').click()

    cy.wait(1000)

    cy.get(selectByTestId('ProfileAvatar')).click()
    cy.get(selectByTestId('ProfilePage')).should('exist')

    cy.enterProfileData(updatedData)
    cy.getByTestId('updateProfileBtn').click()

    cy.wait('@updateProfile').then((interception) => {
      const updatedUserData = interception.response.body
      expect(interception.response.body.email).to.eql(updatedData.email)
      expect(interception.response.body.username).to.eql(updatedData.username)

      cy.get(selectByTestId('ProfileAvatar')).click()

      cy.getByTestId('ProfilePage.emailInput').should(
        'have.value',
        updatedUserData.email
      )
      cy.getByTestId('ProfilePage.avatarInput').should(
        'have.value',
        updatedUserData.avatar
      )
      cy.getByTestId('ProfilePage.nameInput').should(
        'have.value',
        updatedUserData.username
      )

      cy.getByTestId('UserName').should(
        'contain.text',
        updatedUserData.username
      )
      cy.getByTestId('ProfileAvatar').within(() => {
        cy.get('img')
          .should('have.attr', 'src')
          .should('eql', updatedUserData.avatar)
      })
    })
  })
})
