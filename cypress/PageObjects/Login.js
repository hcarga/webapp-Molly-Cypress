class login {
    //Elements
    loginButtonSignUp = '[data-testid="handle-button"]' 
    logindialog = '[data-testid="siteMembersDialogLayout"]'
    loginButton = '[data-testid="signUp.switchToSignUp"]' 
    emailField = '[id="input_input_emailInput_SM_ROOT_COMP886"]'
    passwordField = '[id="input_input_passwordInput_SM_ROOT_COMP886"]'
    emptyValidationMessagePassw = '[data-testid="siteMembers.inlineErrorMsg"]' 
    emptyValidationMessageEmail = '[data-testid="siteMembers.inlineErrorMsg"]' 
    forgotPasswordButton = '[data-testid="forgotPasswordMobile"]' 
    forgotPasswordPage = '[data-testid="enterEmailSubtitle"]' 
    submitLoginButton = '[data-testid="siteMembers.loginButton"]'
  
    //********************************************************************************************----**/
    //methods general description
  
    //[TestRailID]Validation message for empty submission @regression @smoke
    loginEmptyValidation() {
      cy.get(this.loginButtonSignUp).contains('Log In').should('be.visible').click({ force: true })
      cy.get(this.logindialog).should('be.visible')
    //   cy.get(this.loginButton).should('be.visible').click({ force: true })
    //   cy.get(this.emptyValidationMessagePassw).should('be.visible')
    //   cy.get(this.emptyValidationMessageEmail).should('be.visible')
    }
  
    //[TestRailID]Forgot password button should open forgot password @regression @smoke
    goToForgotPassword() {
      cy.get(this.forgotPasswordButton).click()
      cy.url().should('include', '/forgot-password')
      cy.get(this.forgotPasswordPage).should('be.visible')
    }
  }
  
  export default login
  