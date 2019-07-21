context('About', () => {
  beforeEach(() => {
    cy.visit('/about')
  })

  describe('contact information', () => {
    it('displays speaker email addresses', () => {
      cy.get('li').should('contain', 'matt@headway.io')
      cy.get('li').should('contain', 'tim@headway.io')
    })
  })
})
