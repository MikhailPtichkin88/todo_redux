describe('AddressList Component', () => {
  // Эти тесты предполагают, что компонент будет рендерится под определенным URL
  beforeEach(() => {
    // Предоставим тестовые данные
    const addressList = [
      {
        address: 'метро Академическая, Калужско-Рижская линия, Москва, Россия',
        coordinates: [55.68766, 37.573348],
        id: 2,
      },
      {
        address: 'Большая Черкизовская улица, Москва, Россия',
        coordinates: [55.798465, 37.729853],
        id: 1,
      },
      {
        address:
          'метро Тимирязевская, Серпуховско-Тимирязевская линия, Москва, Россия',
        coordinates: [55.8187, 37.57528],
        id: 3,
      },
    ]

    cy.intercept('GET', '*/address_list', {
      statusCode: 200,
      body: addressList,
    })
    cy.login()
    cy.visit('/')
  })

  it('renders the address list', () => {
    cy.get('[data-testid="MainPage.AddressList"]')
      .children()
      .should('have.length', 3)
  })

  it('displays the loader when isFetching is true', () => {
    cy.visit('/')

    cy.get('[data-testid="MainPage.AddressList.Loader"]').should('exist')
  })

  it('displays the message when address list is empty', () => {
    cy.intercept('GET', '*/address_list', {
      statusCode: 200,
      body: [],
    })

    cy.visit('/')

    cy.contains('Нет данных').should('exist')
  })
})

describe('AddressList Component drag and drop', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/')
  })
  afterEach(() => {
    cy.dragNdrop()
  })

  it('updates the address list order on drag and drop', () => {
    cy.dragNdrop()

    cy.getByTestId('MainPage.AddressList.SecondAddress')
      .as('secondItem')
      .should('contain', 'Большая Черкизовская улица, Москва')
  })
})
