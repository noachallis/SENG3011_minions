/// <reference types="cypress" />

describe('Language functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('English used by deafult', () => {
    cy.get('[data-cy=stats-overview]').invoke('text').should(
      "match",
      /Total Cases.*Population Vaccinated/
    );
  })

  it('Selecting Deutsch changes the language', () => {
    //Open Navbar Menu
    cy.get('[data-cy=menu-button]').click() 

    // Select Deutsch
    cy.get('[data-cy=language-selection]').click()
    cy.contains('Deutsch').click()

    // Language Changed
    cy.get('[data-cy=stats-overview]').invoke('text').should(
      "match",
      /Fälle insgesamt.*Bevölkerung geimpft/
    );
  })
})
