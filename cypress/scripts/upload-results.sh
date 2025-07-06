#!/bin/bash

# Ensure the script is running with Bash 4.0 or higher
if ((BASH_VERSINFO[0] < 4)); then
  echo "Error: This script requires Bash version 4.0 or higher."
  exit 1
fi


# Map spec names to TestRail suites
declare -A spec_suite_map=(
  ["Login"]="Login"
)


# Iterate through specs and upload results
for spec in "${!spec_suite_map[@]}"; do
  suite=${spec_suite_map[$spec]}
  merged_report_file="cypress/reports/${spec}-merged.xml"

  if [ ! -f "$merged_report_file" ]; then
    echo "Error: Merged report file $merged_report_file not found for $suite."
    continue
  fi

  echo "Uploading results for $suite with report file $merged_report_file"

  # Upload the results to TestRail
  trcli -n \
    -h "https://mollywebappproject.testrail.io" \
    --project "mollywebappproject" \
    --username "$TESTRAIL_USERNAME" \
    --password "$TESTRAIL_PASSWORD" \
    parse_junit \
    --suite-name "$suite" \
    --case-matcher "name" \
    --title "CYPRESS TEST - $suite" \
    --run-description "$run_description" \
    -f "$merged_report_file"

  # Handle errors during upload
  if [ $? -ne 0 ]; then
    echo "Warning: Upload for $suite failed."
  fi
done