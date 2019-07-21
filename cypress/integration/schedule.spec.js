context('Schedule', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('conference schedule', () => {
    it('list', () => {
      cy.contains('Schedule').click()
      cy.get('li').should('contain', 'Conference Kickoff')
      cy.get('li').should('contain', 'Conference Welcoming Party.')
      cy.get('li').should('contain', 'Goodbye Conference')
      cy.get('li').should('contain', 'Farewell')
    })
  })
})
