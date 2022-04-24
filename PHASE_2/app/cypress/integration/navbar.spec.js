/// <reference types="cypress" />

describe('navbar functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('pressing the menu icon opens the navbar ', () => {
    cy.get('[data-cy=menu-button]').should('be.visible')
    cy.get('[data-cy=menu-close-button]').should('not.exist');

    //Open Menu
    cy.get('[data-cy=menu-button]').click() 

    cy.get('[data-cy=menu-close-button]').should('be.visible')
    cy.get('[data-cy=menu-button]').should('exist');
    cy.get('[data-cy=menu-button]').should('not.be.visible');
  })

  it('pressing the chevron icon closes the navbar', () => {
    cy.get('[data-cy=menu-button]').should('be.visible')
    cy.get('[data-cy=menu-close-button]').should('not.exist');
   
    //Open Menu
    cy.get('[data-cy=menu-button]').click() 

    cy.get('[data-cy=menu-close-button]').should('be.visible')
    cy.get('[data-cy=menu-button]').should('exist');
    cy.get('[data-cy=menu-button]').should('not.be.visible');

    //Close Menu
    cy.get('[data-cy=menu-close-button]').click() 

    cy.get('[data-cy=menu-button]').should('be.visible')
    cy.get('[data-cy=menu-close-button]').should('not.exist');
  })
})
