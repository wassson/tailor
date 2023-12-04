#!/usr/bin/env node

import 'dotenv/config'
import { Octokit } from "@octokit/core"
import { Command } from "commander"

// Types
type PullRequestSummary = { 
  head: { ref: string; }; 
  number: string; 
  title: string; 
}

// CLI
const program = new Command();

program
  .version("1.0.1")
  .description("An AI code reviewer for GitHub pull requests")
  .option("-l, --ls", "List open pull requests")
  .option("-r <value>, --review <value>", "Review pull request")
  .option("-d <value>, --describe <value>", "Describe pull request")
  .parse(process.argv);

const options = program.opts();

// GitHub
const octokit = new Octokit({ auth: process.env.GITHUB_PAT })

const openPullRequests = async () => {
  const owner = process.env.GITHUB_OWNER || ''
  const repo = process.env.GITHUB_REPOSITORY || ''
  const author = process.env.GITHUB_LOGIN || ''

  const openPulls = await octokit.request('GET /repos/{owner}/{repo}/pulls?author={author}', {
    owner: owner,
    repo: repo,
    author: author,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  return openPulls
}

const listPullRequestSummaries = (pullRequests: { data: PullRequestSummary[]; }) => {
  pullRequests.data.forEach((pullRequest: PullRequestSummary) => {
    console.log(`${pullRequest.head.ref} #${pullRequest.number} - ${pullRequest.title}`)
  })
}

// Execution
const main = async () => {
  if (options.ls || options.l) {
    const response = await openPullRequests()
    if (response.status == 200) { 
      listPullRequestSummaries(response) 
    }
    else { 
      console.log({ status: response.status, message: response.data })
    }
  }

  if (options.review || options.r) {
    console.log("review")
  }
  
  if (options.describe || options.d) {
    console.log("describe")
  }
}

main()