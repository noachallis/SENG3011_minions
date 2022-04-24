/// <reference types="cypress" />

describe('legend functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('pressing the legend button opens the legend', () => {
    cy.get('[data-cy=legend-button]').should('be.visible')
    cy.get('[data-cy=legend-arrow]').should('not.be.visible');

    //Open Legend
    cy.get('[data-cy=legend-button]').click() 

    cy.get('[data-cy=legend-button]').should('not.exist')
    cy.get('[data-cy=legend-button-closed]').should('be.visible')
    cy.get('[data-cy=legend-arrow]').should('be.visible')
  })

  it('pressing the legend button closes the legend', () => {
    cy.get('[data-cy=legend-button]').should('be.visible')
    cy.get('[data-cy=legend-arrow]').should('not.be.visible');

    //Open Legend
    cy.get('[data-cy=legend-button]').click() 

    cy.get('[data-cy=legend-button]').should('not.exist')
    cy.get('[data-cy=legend-button-closed]').should('be.visible')
    cy.get('[data-cy=legend-arrow]').should('be.visible')

    //Close Legend with legend button
    cy.get('[data-cy=legend-button-closed]').click() 

    cy.get('[data-cy=legend-button]').should('be.visible')
    cy.get('[data-cy=legend-arrow]').should('not.be.visible');
  })

  it('pressing the chevron button closes the legend', () => {
    cy.get('[data-cy=legend-button]').should('be.visible')
    cy.get('[data-cy=legend-arrow]').should('not.be.visible');
   
    //Open Legend
    cy.get('[data-cy=legend-button]').click() 

    cy.get('[data-cy=legend-button]').should('not.exist')
    cy.get('[data-cy=legend-button-closed]').should('be.visible')
    cy.get('[data-cy=legend-arrow]').should('be.visible')

    //Close Legend with arrow button
    cy.get('[data-cy=legend-arrow]').click() 

    cy.get('[data-cy=legend-button]').should('be.visible')
    cy.get('[data-cy=legend-arrow]').should('not.be.visible');
  })
})
