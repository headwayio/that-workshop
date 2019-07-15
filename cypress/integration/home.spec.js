context('Home', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('welcome statement', () => {
    it('successfully loads', () => {
      cy.get('h1').should('contain', 'Welcome!')
    })
  })
})
