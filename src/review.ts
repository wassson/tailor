#!/usr/bin/env node

import 'dotenv/config'
import { Command } from "commander"
import { parseDiff, pullRequestDiff } from "./github/index.js";

// CLI
const review = new Command();

review
  .version("0.0.6")
  .description("Review the pull request diff and push the review to the pull request on GitHub.")
  .argument('<value>', 'Pull request number')
  .parse(process.argv);

const pullRequestNumber = review.args[0]

// Execution
const main = async () => {
  const response = await pullRequestDiff(pullRequestNumber)
  console.log(response.data)

  if (response.status == 200) {
    const parsedDiff = parseDiff(response.data)
    console.log(parsedDiff)
  }
  console.log("Reviewing PR...")
}

main()