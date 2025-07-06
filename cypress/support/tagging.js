function taggedIt(title, testFn) {
    const tag = Cypress.env('TAG')
    if (tag && !title.includes(`@${tag}`)) {
      // Skip the test if it does not match the tag
      it.skip(title, testFn)
    } else {
      // Run the test if it matches the tag or if no tag is set
      it(title, testFn)
    }
  }
  
  // Export the function for use in test files
  export { taggedIt }