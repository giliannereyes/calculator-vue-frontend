describe('Contact Form e2e', () => {
  beforeEach(() => {
    cy.visit('/contactform')
  })

  it('disables submit when only name is filled', () => {
    cy.get('#name').type('John Doe')
    cy.get('button[type="submit"]').should('be.disabled')
  })

  it('disables submit when only email is filled', () => {
    cy.get('#email').type('johndoe@gmail.com')
    cy.get('button[type="submit"]').should('be.disabled')
  })

  it('disables submit when only message is filled', () => {
    cy.get('#message').type('message here')
    cy.get('button[type="submit"]').should('be.disabled')
  })

  it('disables submit when name and email are filled', () => {
    cy.get('#name').type('John Doe')
    cy.get('#email').type('johndoe@gmail.com')
    cy.get('button[type="submit"]').should('be.disabled')
  })

  it('disables submit when email and message are filled', () => {
    cy.get('#email').type('johndoe@gmail.com')
    cy.get('#message').type('message here')
    cy.get('button[type="submit"]').should('be.disabled')
  })

  it('enables submit when all fields are valid', () => {
    cy.get('#name').type('John Doe')
    cy.get('#email').type('johndoe@gmail.com')
    cy.get('#message').type('message here')
    cy.get('button[type="submit"]').should('be.enabled')
  })

  it('submits successfully with valid data', () => {
    cy.intercept('POST', '**/feedback', {
      statusCode: 200,
      body: {}
    }).as('submitFeedback')

    cy.get('#name').type('John Doe')
    cy.get('#email').type('johndoe@gmail.com')
    cy.get('#message').type('message')

    cy.get('button[type="submit"]').click()

    cy.wait('@submitFeedback')
      .its('request.body')
      .should('deep.equal', {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        message: 'message'
      })

    cy.get('.status.success')
      .should('be.visible')
      .and('contain', 'Success! Thank you for your feedback.')

    cy.get('#message').should('have.value', '')
  })
})
