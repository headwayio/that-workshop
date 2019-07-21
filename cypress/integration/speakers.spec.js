context('Speakers', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('conference speakers', () => {
    it('list', () => {
      cy.contains('Speakers').click()
      cy.get('li').should('contain', 'Matt Reetz')
      cy.get('li').should('contain', 'Tim Gremore')
    })
  })
})
