describe('The game', () => {
  it('has a spinner that chooses a tile', () => {
    cy.visit('localhost:3001')

    cy.get('.tile.active').should('not.exist')

    cy.get('button').trigger('click')

    cy.get('.tile.active').should('exist')
  })
})