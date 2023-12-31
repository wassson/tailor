#!/usr/bin/env node

import { Command } from "commander"

// CLI
const program = new Command();

program
  .version("0.0.6")
  .description("Review the pull request diff and push the review to the pull request on GitHub.")
  .argument('<value>', 'Pull request number')
  .parse(process.argv);

// Execution
const main = async () => {
  console.log("Reviewing PR...")
}

main()