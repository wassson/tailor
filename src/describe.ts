#!/usr/bin/env node

import 'dotenv/config'
import { Octokit } from "@octokit/core"
import { Command } from "commander"

// CLI
const describe = new Command();

describe
  .version("0.0.2")
  .description("Analyze a pull request and push a summary to the pull request on GitHub.")
  .argument('<value>', 'Pull request number')
  .parse(process.argv);

const pullRequestNumber = describe.args[0]

// GitHub
const octokit = new Octokit({ auth: process.env.GITHUB_PAT })

const pullRequestDiff = async () => {
  const owner = process.env.GITHUB_OWNER || ''
  const repo = process.env.GITHUB_REPOSITORY || ''

  
  const response = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}.diff', {
    owner: owner,
    repo: repo,
    pull_number: parseInt(pullRequestNumber),
    headers: {
      'Accept': 'application/vnd.github.v3.diff',
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  // TODO: if PR is not 'Open' then return an error
  return response
}

// Execution
const main = async () => {
  const response = await pullRequestDiff()

  if (response.status == 200) {
    console.log(response.data)
  }
}

main()