const { defineConfig } = require('cypress')
const fs = require('fs-extra');
const path = require('path');
const xml2js = require('xml2js');
const { readFileSync, writeFileSync } = require('fs');

//const { verifyDownloadTasks } = require('cy-verify-downloads');

module.exports = defineConfig({
  requestTimeout: 30000,
  numTestsKeptInMemory: 0,
  responseTimeout: 50000,
  pageLoadTimeout: 100000,
  experimentalMemoryManagement: true,
  defaultCommandTimeout: 10000,
  //projectId: '',//cypress cloud
  
  //testrail - report 
  reporter: 'mocha-junit-reporter',
  reporterOptions: {
    mochaFile: 'cypress/reports/junit-[hash].xml',
    toConsole: true
    },

  e2e: {
    setupNodeEvents(on, config) {

      //testrail report
      on('after:run', () => {
        const reportPath = 'cypress/reports/junit-report.xml'; // Path to the JUnit report
        try {
          // Read the existing report
          let xml = readFileSync(reportPath, 'utf8');

          //Modify the test case names using regex
          xml = xml.replace(
            /<testcase name="([^:]+):([^@]+)(?:@.*?)?"/g, // Regex to match test case names
            (_, prefix, testName) => {
              // Clean the test name: remove anything before the colon and anything after the @
              const cleanedTestName = testName.trim(); // No need for split, we just need the test name.
              return `<testcase name="${cleanedTestName}"`; // Replace the name part
            }
          );


          // Write the modified report back
          writeFileSync(reportPath, xml, 'utf8');
          console.log('JUnit report modified successfully.');
        } catch (error) {
          console.error('Error modifying JUnit report:', error.message);
        }
      });
    },
    //testrail - report -end
    
    //Tags  
    supportFile: 'cypress/support/tagging.js', // Path to your tagging script

		//baseUrls
    baseUrl: 'https://riveravargasmiguel.wixsite.com/mollystorm',
    browser: 'chrome',
  },

//Other settings- retries in case does not find an element or any problem
  retries: {
    experimentalStrategy: 'detect-flake-and-pass-on-threshold',
    experimentalOptions: {
      maxRetries: 2,
      passesRequired: 1,
    },

    // you must also explicitly set openMode and runMode to
    // either true or false when using experimental retries
    openMode: true,
    runMode: true,
  },
})
