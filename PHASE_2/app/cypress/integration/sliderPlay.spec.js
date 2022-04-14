/// <reference types="cypress" />

describe('slider play functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('play button shows by default', () => {
    cy.get('[data-cy=play-button]').should('be.visible')
    cy.get('[data-cy=pause-button]').should('not.exist');
  })

  it('pressing play button replaces it with pause button', () => {
    cy.get('[data-cy=play-button]').should('be.visible')
    cy.get('[data-cy=pause-button]').should('not.exist');

    //Press Play
    cy.get('[data-cy=play-button]').click() 

    cy.get('[data-cy=play-button]').should('not.exist');
    cy.get('[data-cy=pause-button]').should('be.visible')
  })

  it('pressing pause button replaces it with play button', () => {
    cy.get('[data-cy=play-button]').should('be.visible')
    cy.get('[data-cy=pause-button]').should('not.exist');

    //Press Play
    cy.get('[data-cy=play-button]').click() 

    cy.get('[data-cy=play-button]').should('not.exist');
    cy.get('[data-cy=pause-button]').should('be.visible')

    //Press Pause
    cy.get('[data-cy=pause-button]').click() 

    cy.get('[data-cy=play-button]').should('be.visible')
    cy.get('[data-cy=pause-button]').should('not.exist');
  })
})
