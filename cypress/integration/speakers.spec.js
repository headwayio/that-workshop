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

    it('displays speaker details', () => {
      cy.contains('Speakers').click()
      cy.contains('Matt Reetz').click()
      cy.get('p').should('contain', 'Matt is a coding ninja.')
    })
  })
})
