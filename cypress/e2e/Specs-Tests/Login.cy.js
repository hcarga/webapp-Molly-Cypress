import login from '../../PageObjects/Login.js'
import { taggedIt } from '../../support/tagging.js';
import '../../support/commands'

//Using POM
//General description
//Tags for the section of this test suite->example: @test
//Tags for Cy automation-> @regression @e2e


describe('Login scenarios', () => {
  beforeEach(() => {
    cy.viewport(1300, 800)
    cy.visit('https://riveravargasmiguel.wixsite.com/mollystorm')
  })

  taggedIt('[TestRailId] Validation message for empty submission @regression @smoke', () => {
    const ln = new login()
    ln.loginEmptyValidation()
  }) 

  taggedIt('[TestRailId] Forgot password button should open forgot password @regression @smoke', () => {
    const ln = new login()
    ln.goToForgotPassword()
  })

  taggedIt('[TestRailId] Login success @regression @smoke', () => {
    cy.loginUser()
  })
})