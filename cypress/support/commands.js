// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import login from '../PageObjects/Login'
const loginPage = new login()

Cypress.Commands.add('loginUser', () => {
    cy.fixture('users').then((data) => {
      cy.visit('https://riveravargasmiguel.wixsite.com/mollystorm')
      //click on login button -> it goes to sign up
      cy.get(loginPage.loginButtonSignUp).click({ force: true })
      //click on Log in button
      cy.get(loginPage.loginButton).click({ force: true })
      //Enter credentials
      cy.get(loginPage.emailField).type(data.email)
      cy.get(loginPage.passwordField).type(data.password)
      //Submit login
      cy.get(loginPage.submitLoginButton).click()
    })
  })