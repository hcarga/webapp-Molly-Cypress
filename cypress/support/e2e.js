// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
//import './commands'
const createSelectorUpdateMessage = (error, runnable) => {
    return `
  =================================================================
  TEST REQUIRES SELECTOR UPDATE - ${runnable.title}
  =================================================================
  Location: ${runnable.file}
  Original Error: ${error.message}
  
  REQUIRED ACTIONS:
  1. Check if the element selector has changed in the application
  2. Update the test case with the correct selector
  3. Verify the element's visibility conditions
  4. Re-run the test to confirm fixes
  =================================================================`
  }
  
  // Modified error handling with both logging and error throwing
  Cypress.on('fail', (error, runnable) => {
    if (
      error.message.includes('Expected to find element') ||
      error.message.includes('could not be found') ||
      error.message.includes('failed to find element') ||
      error.message.includes('failed because this element is not visible') ||
      error.message.includes('Timed out retrying')
    ) {
      const updateMessage = createSelectorUpdateMessage(error, runnable)
  
      // Log to console for immediate visibility
      console.error(updateMessage)
  
      // Create a new error with our custom message
      const newError = new Error(updateMessage)
      newError.name = 'SelectorUpdateRequired'
  
      // Preserve the original stack trace
      newError.stack = error.stack
  
      throw newError
    }
    throw error
  })
  
  // Import commands.js using ES2015 syntax:
  import './commands'
  
  // Import reporter
  import 'cypress-mochawesome-reporter/register'
  require('cy-verify-downloads').addCustomCommand()
  
  import './commands'
  Cypress.on('uncaught:exception', (err, runnable, promise) => {
    // Log the full error for debugging
    cy.log('Error:', err.message)
    cy.log('Stack:', err.stack)
  
    if (err.message.includes('undefined') || err.message.includes('unknown error') || promise) {
      return false // prevents test failure
    }
  
    // let other errors fail the test
    return true
  })
  // Add this to cypress/support/e2e.js or cypress/support/index.js
  Cypress.Commands.add('runIfTag', (tags) => {
    const currentTag = Cypress.env('TEST_TYPE')
    if (!currentTag) return true // If no tag is set, run all tests
  
    // Split tags in case multiple tags are provided (e.g., 'smoke,regression')
    const tagList = currentTag.split(',').map((tag) => tag.trim())
    return tags.some((tag) => tagList.includes(tag))
  })