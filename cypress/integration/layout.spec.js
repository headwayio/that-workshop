context('Layout', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('navbar', () => {
    it('includes a link to the about page', () => {
      cy.contains('About').click()
      cy.get('p').should('contain', 'If we can be of assistance, please contact us')
    })
  })
})
